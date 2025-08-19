from flask_jwt_extended import get_jwt_identity
from functools import wraps
from flask import jsonify

def role_required(allowed_roles):
    """
    Decorator to restrict access based on user role.
    Usage: @role_required(['therapist', 'admin'])
    """
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            identity = get_jwt_identity()
            # Expect identity to be "user_id:role"
            role = identity.split(":")[1] if ":" in identity else None
            if role not in allowed_roles:
                return jsonify({
                    "msg": f"Unauthorized: role '{role}' not in allowed roles {allowed_roles}"
                }), 403
            return fn(*args, **kwargs)
        return wrapper
    return decorator
