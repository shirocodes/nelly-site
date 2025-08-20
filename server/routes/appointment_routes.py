from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.appointments import Appointment, AppointmentReason, Schedule
from models.db import db
from utils.auth import role_required
from datetime import datetime, timedelta

appointment_bp = Blueprint("appointments", __name__, url_prefix="/appointments")

# Helper function
def parse_identity():
    identity = get_jwt_identity()
    user_id, role = identity.split(":")
    return int(user_id), role

# Get booked slots for a therapist
@appointment_bp.route("/therapist/<int:therapist_id>/booked-slots", methods=["GET"])
@jwt_required()
def get_booked_slots(therapist_id):
    try:
        # Optional filters for a specific date or range
        start_date = request.args.get("start_date")  # e.g. "2025-08-20"
        end_date = request.args.get("end_date")      # e.g. "2025-08-25"

        query = Appointment.query.filter_by(
            therapist_id=therapist_id,
            status=Schedule.SCHEDULED
        )

        if start_date:
            start_dt = datetime.fromisoformat(start_date)
            query = query.filter(Appointment.start_time >= start_dt)

        if end_date:
            end_dt = datetime.fromisoformat(end_date)
            query = query.filter(Appointment.end_time <= end_dt)

        appointments = query.all()

        booked_slots = [
            {
                "start_time": appt.start_time.isoformat(),
                "end_time": appt.end_time.isoformat()
            }
            for appt in appointments
        ]

        return jsonify({"therapist_id": therapist_id, "booked_slots": booked_slots}), 200

    except Exception as e:
        return jsonify({"msg": "Failed to fetch booked slots", "error": str(e)}), 500
    
#  Create appointment (patient only) 
@appointment_bp.route("/", methods=["POST"])
@jwt_required()
@role_required(["patient"])
def create_appointment():
    try:
        user_id, role = parse_identity()
        data = request.get_json()

        therapist_id = data.get("therapist_id")
        start_time = data.get("start_time")
        end_time = data.get("end_time")
        child_age = data.get("child_age")
        reason = data.get("reason")
        notes = data.get("notes")

        # Validation
        if not therapist_id or not start_time or not end_time or not reason:
            return jsonify({"msg": "therapist_id, start_time, end_time, and reason are required"}), 400

        # Convert times
        start_time = datetime.fromisoformat(start_time)
        end_time = datetime.fromisoformat(end_time)

        # Validate reason and normalize to case-insensitive
        reason_key = reason.strip().replace(" ", "_").replace("-", "_").upper()
        if reason_key not in AppointmentReason.__members__:
            return jsonify({"msg": f"Invalid reason. Must be one of {list(AppointmentReason.__members__.keys())}"}), 400

        appointment = Appointment(
            patient_id=user_id,
            therapist_id=therapist_id,
            start_time=start_time,
            end_time=end_time,
            child_age=child_age,
            reason=AppointmentReason[reason_key],
            notes=notes,
            status=Schedule.SCHEDULED
        )

        db.session.add(appointment)
        db.session.commit()
        return jsonify(appointment.to_therapist_view_dict()), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Failed to create appointment", "error": str(e)}), 500

#  Edit appointment (patient only) 
@appointment_bp.route("/<int:appointment_id>", methods=["PUT"])
@jwt_required()
@role_required(["patient"])
def edit_appointment(appointment_id):
    try:
        user_id, role = parse_identity()
        appointment = Appointment.query.get(appointment_id)
        if not appointment:
            return jsonify({"msg": "Appointment not found"}), 404
        if appointment.patient_id != user_id:
            return jsonify({"msg": "Unauthorized"}), 403
        if appointment.status != Schedule.SCHEDULED:
            return jsonify({"msg": "Cannot edit a completed or cancelled appointment"}), 400

        data = request.get_json()
        # Update allowed fields
        for field in ["start_time", "end_time", "child_age", "reason", "notes", "therapist_id"]:
            if field in data:
                if field in ["start_time", "end_time"]:
                    setattr(appointment, field, datetime.fromisoformat(data[field]))
                elif field == "reason":
                    if data[field] not in AppointmentReason.__members__:
                        return jsonify({"msg": f"Invalid reason"}), 400
                    setattr(appointment, field, AppointmentReason[data[field]])
                else:
                    setattr(appointment, field, data[field])

        db.session.commit()
        return jsonify(appointment.to_therapist_view_dict()), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Failed to edit appointment", "error": str(e)}), 500

#  Cancel appointment (patient only) 
@appointment_bp.route("/<int:appointment_id>/cancel", methods=["PATCH"])
@jwt_required()
@role_required(["patient"])
def cancel_appointment(appointment_id):
    try:
        user_id, role = parse_identity()
        appointment = Appointment.query.get(appointment_id)
        if not appointment:
            return jsonify({"msg": "Appointment not found"}), 404
        if appointment.patient_id != user_id:
            return jsonify({"msg": "Unauthorized"}), 403
        if appointment.status != Schedule.SCHEDULED:
            return jsonify({"msg": "Appointment already completed or cancelled"}), 400

        appointment.status = Schedule.CANCELLED
        db.session.commit()
        return jsonify({"msg": "Appointment cancelled"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Failed to cancel appointment", "error": str(e)}), 500

#  Get all appointments for therapist 
# --- Get all appointments for therapist with optional filters ---
@appointment_bp.route("/assigned", methods=["GET"])
@jwt_required()
@role_required(["therapist"])
def get_assigned_appointments():
    try:
        user_id, role = parse_identity()
        query = Appointment.query.filter_by(therapist_id=user_id)

        # Optional query params
        patient_id = request.args.get("patient_id", type=int)
        status = request.args.get("status")
        date_str = request.args.get("date")  # YYYY-MM-DD

        if patient_id:
            query = query.filter_by(patient_id=patient_id)
        if status:
            if status not in Schedule.__members__:
                return jsonify({"msg": f"Invalid status. Must be one of {list(Schedule.__members__.keys())}"}), 400
            query = query.filter_by(status=Schedule[status])
        if date_str:
            try:
                date = datetime.fromisoformat(date_str).date()
                query = query.filter(
                    db.func.date(Appointment.start_time) == date
                )
            except ValueError:
                return jsonify({"msg": "Invalid date format. Use YYYY-MM-DD"}), 400

        appointments = query.all()
        return jsonify([a.to_patient_view_dict() for a in appointments]), 200

    except Exception as e:
        return jsonify({"msg": "Failed to fetch appointments", "error": str(e)}), 500

#  Update appointment status (therapist only) 
@appointment_bp.route("/<int:appointment_id>/status", methods=["PATCH"])
@jwt_required()
@role_required(["therapist"])
def update_status(appointment_id):
    try:
        user_id, role = parse_identity()
        appointment = Appointment.query.get(appointment_id)
        if not appointment:
            return jsonify({"msg": "Appointment not found"}), 404
        if appointment.therapist_id != user_id:
            return jsonify({"msg": "Unauthorized"}), 403

        data = request.get_json()
        status = data.get("status")
        if status not in Schedule.__members__:
            return jsonify({"msg": f"Invalid status. Must be one of {list(Schedule.__members__.keys())}"}), 400

        appointment.status = Schedule[status]
        db.session.commit()
        return jsonify(appointment.to_patient_view_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"msg": "Failed to update status", "error": str(e)}), 500

# Patient: See all of their individual appointments
@appointment_bp.route("/mine", methods=["GET"])
@jwt_required()
@role_required(["patient"])
def get_my_appointments():
    try:
        user_id, role = parse_identity()
        query = Appointment.query.filter_by(patient_id=user_id)

        # Optional filters
        status = request.args.get("status")
        date_str = request.args.get("date")  # YYYY-MM-DD

        if status:
            if status not in Schedule.__members__:
                return jsonify({"msg": f"Invalid status. Must be one of {list(Schedule.__members__.keys())}"}), 400
            query = query.filter_by(status=Schedule[status])

        if date_str:
            try:
                date = datetime.fromisoformat(date_str).date()
                query = query.filter(db.func.date(Appointment.start_time) == date)
            except ValueError:
                return jsonify({"msg": "Invalid date format. Use YYYY-MM-DD"}), 400

        appointments = query.all()
        return jsonify([a.to_dict() for a in appointments]), 200

    except Exception as e:
        return jsonify({"msg": "Failed to fetch appointments", "error": str(e)}), 500


# Therapist: See ALL appointments in the system
@appointment_bp.route("/all", methods=["GET"])
@jwt_required()
@role_required(["therapist"])
def get_all_appointments():
    try:
        query = Appointment.query

        # Optional filters
        patient_id = request.args.get("patient_id", type=int)
        status = request.args.get("status")
        date_str = request.args.get("date")  # YYYY-MM-DD

        if patient_id:
            query = query.filter_by(patient_id=patient_id)

        if status:
            if status not in Schedule.__members__:
                return jsonify({"msg": f"Invalid status. Must be one of {list(Schedule.__members__.keys())}"}), 400
            query = query.filter_by(status=Schedule[status])

        if date_str:
            try:
                date = datetime.fromisoformat(date_str).date()
                query = query.filter(db.func.date(Appointment.start_time) == date)
            except ValueError:
                return jsonify({"msg": "Invalid date format. Use YYYY-MM-DD"}), 400

        appointments = query.all()
        return jsonify([a.to_dict() for a in appointments]), 200

    except Exception as e:
        return jsonify({"msg": "Failed to fetch appointments", "error": str(e)}), 500
