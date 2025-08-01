from flask_jwt_extended import get_jwt_identity
from functools import wraps
from flask import jsonify
from .models import User

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        identity = get_jwt_identity()
        user = User.query.get(identity["id"])
        if not user or not user.is_admin:
            return jsonify({"error": "Admins only"}), 403
        return fn(*args, **kwargs)
    return wrapper
