from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.users import User
from models.db import db
from passlib.hash import bcrypt
from utils.auth import role_required

user_bp = Blueprint("users", __name__, url_prefix="/users")

# Get own profile
@user_bp.route("/me", methods=["GET"])
@jwt_required()
def get_own_profile():
    try:
        identity = get_jwt_identity()
        user_id, role = identity.split(":")
        user = User.query.get(int(user_id))
        if not user:
            return jsonify({"msg": "User not found"}), 404

        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone_number": user.phone_number,
            "role": user.role
        }), 200
        
    except Exception as e:
        return jsonify({"msg": "Failed to fetch profile", "error": str(e)}), 500

#Get user by ID (therapist/admin only)
@user_bp.route("/<int:user_id>", methods=["GET"])
@jwt_required()
@role_required(["therapist"])
def get_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "User not found"}), 404
        return jsonify({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone_number": user.phone_number,
            "role": user.role
        }), 200
    except Exception as e:
        return jsonify({"msg": "Failed to fetch user", "error": str(e)}), 500

# Update user info
@user_bp.route("/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    try:
        identity = get_jwt_identity()
        current_user_id, role = identity.split(":")
        if int(current_user_id) != user_id and role != "therapist":
            return jsonify({"msg": "Unauthorized"}), 403

        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "User not found"}), 404

        data = request.get_json()
        name = data.get("name")
        email = data.get("email")
        phone_number = data.get("phone_number")

        if name:
            user.name = name
        if email:
            user.email = email
        if phone_number:
            user.phone_number = phone_number

        db.session.commit()
        return jsonify(user.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Update failed", "error": str(e)}), 500

# Change password
@user_bp.route("/<int:user_id>/password", methods=["PATCH"])
@jwt_required()
def change_password(user_id):
    try:
        identity = get_jwt_identity()
        current_user_id, role = identity.split(":")
        if int(current_user_id) != user_id:
            return jsonify({"msg": "Unauthorized"}), 403

        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "User not found"}), 404

        data = request.get_json()
        old_password = data.get("old_password")
        new_password = data.get("new_password")

        if not old_password or not new_password:
            return jsonify({"msg": "Old and new passwords are required"}), 400

        if not user.check_password(old_password):
            return jsonify({"msg": "Old password is incorrect"}), 401

        user.set_password(new_password)
        db.session.commit()
        return jsonify({"msg": "Password updated successfully"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Password change failed", "error": str(e)}), 500

# Delete user 
@user_bp.route("/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    try:
        identity = get_jwt_identity()
        current_user_id, role = identity.split(":")
        if int(current_user_id) != user_id and role != "therapist":
            return jsonify({"msg": "Unauthorized"}), 403

        user = User.query.get(user_id)
        if not user:
            return jsonify({"msg": "User not found"}), 404

        db.session.delete(user)
        db.session.commit()
        return jsonify({"msg": "User deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Delete failed", "error": str(e)}), 500
