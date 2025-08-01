from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User, MoveRequest, InventoryChecklist, QuoteApproval, Booking
import smtplib
from email.message import EmailMessage

main = Blueprint("main", __name__)

@main.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    hashed_pw = generate_password_hash(data["password"])
    new_user = User(
        full_name=data["full_name"],
        email=data["email"],
        password=hashed_pw
    )
    db.session.add(new_user)
    db.session.commit()

    
    try:
        send_email(data["email"], "Welcome to MoveMate", "Thank you for signing up, " + data["full_name"] + "!")
    except Exception as e:
        print("Email error:", e)

    return jsonify({"message": "User created successfully"})

@main.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if user and check_password_hash(user.password, data["password"]):
        token = create_access_token(identity={"id": user.id, "name": user.full_name})
        return jsonify({"message": f"Welcome {user.full_name}", "token": token})
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@main.route("/move-request", methods=["POST"])
@jwt_required()
def move_request():
    data = request.get_json()
    user_id = get_jwt_identity()["id"]
    request_entry = MoveRequest(
        user_id=user_id,
        from_location=data["from_location"],
        to_location=data["to_location"],
        move_date=data["move_date"]
    )
    db.session.add(request_entry)
    db.session.commit()
    return jsonify({"message": "Move request submitted"})

@main.route("/inventory", methods=["POST"])
@jwt_required()
def inventory():
    data = request.get_json()
    user_id = get_jwt_identity()["id"]
    entry = InventoryChecklist(
        user_id=user_id,
        items=data["items"]
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({"message": "Inventory saved"})

@main.route("/quote", methods=["POST"])
@jwt_required()
def quote():
    data = request.get_json()
    user_id = get_jwt_identity()["id"]
    quote = QuoteApproval(
        user_id=user_id,
        quote_amount=data["quote_amount"]
    )
    db.session.add(quote)
    db.session.commit()
    return jsonify({"message": "Quote submitted"})

@main.route("/quote/approve", methods=["PUT"])
@jwt_required()
def approve_quote():
    data = request.get_json()
    quote = QuoteApproval.query.get(data["quote_id"])
    if quote:
        quote.is_approved = True
        db.session.commit()
        return jsonify({"message": "Quote approved"})
    return jsonify({"message": "Quote not found"}), 404

@main.route("/book", methods=["POST"])
@jwt_required()
def book():
    user_id = get_jwt_identity()["id"]
    booking = Booking(user_id=user_id, confirmed=True)
    db.session.add(booking)
    db.session.commit()
    return jsonify({"message": "Booking confirmed"})


def send_email(to, subject, content):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = "noreply@movemate.com"
    msg["To"] = to
    msg.set_content(content)

    with smtplib.SMTP("localhost") as server:
        server.send_message(msg).
