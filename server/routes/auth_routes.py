from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token, jwt_required, 
    get_jwt_identity, get_jwt, unset_jwt_cookies)
from models.users import User
from models.db import db
from passlib.hash import bcrypt

auth_bp = Blueprint("auth", __name__, url_prefix='/auth')

@auth_bp.route("/register", methods=["POST"])
def register(): 
    try:
        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")
        role = data.get("role", "patient")  # default to patient

        if not name or not email or not password:
            return jsonify({"msg": "Name, email, and password are required"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"msg": "Email already registered"}), 400

        user = User(name=name, email=email, role=role)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        access_token = create_access_token(identity=f"{user.id}:{user.role}")
        return jsonify({"access_token": access_token}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Registration failed", "error": str(e)}), 500

@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"msg": "Email and password are required"}), 400

        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return jsonify({"msg": "Invalid credentials"}), 401

        access_token = create_access_token(identity=f"{user.id}:{user.role.lower()}")
        return jsonify({"access_token": access_token}), 200

    except Exception as e:
        return jsonify({"msg": "Login failed", "error": str(e)}), 500

#protected route
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_profile():
    try:
        identity = get_jwt_identity()
        user_id, role = identity.split(":")
        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "User not found"}), 404

        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone_number": user.phone_number,
            "role": user.role
        })

    except Exception as e:
        return jsonify({"msg": "Failed to fetch profile", "error": str(e)}), 500

@auth_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    try:
        response = jsonify({"msg": "Logout successful"})
        unset_jwt_cookies(response)
        return response, 200
    except Exception as e:
        return jsonify({"msg": "Logout failed", "error": str(e)}), 500