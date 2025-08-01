from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User, MoveRequest, InventoryChecklist, QuoteApproval, Booking
import smtplib
from .decorators import admin_required
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


@main.route('/api/book/<int:quote_id>', methods=['POST'])
@jwt_required()
def book_move(quote_id):
    user_id = get_jwt_identity()["id"]
    data = request.get_json()
    date = data.get('date')
    time = data.get('time')

    quote = QuoteApproval.query.get_or_404(quote_id)
    if quote.user_id != user_id or not quote.is_approved:
        return jsonify({"error": "Unauthorized or quote not approved"}), 403

    booking = Booking(quote_id=quote_id, date=date, time=time, user_id=user_id, confirmed=True)
    db.session.add(booking)
    db.session.commit()
    return jsonify({"message": "Booking successful"})


# ======== GET Routes for Dashboard =========

@main.route("/user/profile", methods=["GET"])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()["id"]
    user = User.query.get(user_id)
    return jsonify({
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email
    })


@main.route("/user/move-requests", methods=["GET"])
@jwt_required()
def get_move_requests():
    user_id = get_jwt_identity()["id"]
    requests = MoveRequest.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": r.id,
        "from": r.from_location,
        "to": r.to_location,
        "move_date": r.move_date
    } for r in requests])


@main.route("/user/inventory", methods=["GET"])
@jwt_required()
def get_inventory():
    user_id = get_jwt_identity()["id"]
    checklist = InventoryChecklist.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": i.id,
        "items": i.items
    } for i in checklist])


@main.route("/user/quotes", methods=["GET"])
@jwt_required()
def get_quotes():
    user_id = get_jwt_identity()["id"]
    quotes = QuoteApproval.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": q.id,
        "quote_amount": q.quote_amount,
        "is_approved": q.is_approved
    } for q in quotes])


@main.route("/user/bookings", methods=["GET"])
@jwt_required()
def get_bookings():
    user_id = get_jwt_identity()["id"]
    bookings = Booking.query.filter_by(user_id=user_id).all()
    return jsonify([{
        "id": b.id,
        "quote_id": b.quote_id,
        "date": b.date,
        "time": b.time,
        "confirmed": b.confirmed
    } for b in bookings])

@main.route("/admin/users", methods=["GET"])
@jwt_required()
@admin_required
def admin_get_users():
    users = User.query.all()
    return jsonify([{
        "id": u.id,
        "name": u.full_name,
        "email": u.email,
        "is_admin": u.is_admin
    } for u in users])


@main.route("/admin/move-requests", methods=["GET"])
@jwt_required()
@admin_required
def admin_get_move_requests():
    requests = MoveRequest.query.all()
    return jsonify([{
        "id": r.id,
        "user_id": r.user_id,
        "from": r.from_location,
        "to": r.to_location,
        "move_date": r.move_date
    } for r in requests])


@main.route("/admin/quotes", methods=["GET"])
@jwt_required()
@admin_required
def admin_get_quotes():
    quotes = QuoteApproval.query.all()
    return jsonify([{
        "id": q.id,
        "user_id": q.user_id,
        "quote_amount": q.quote_amount,
        "is_approved": q.is_approved
    } for q in quotes])


@main.route("/admin/bookings", methods=["GET"])
@jwt_required()
@admin_required
def admin_get_bookings():
    bookings = Booking.query.all()
    return jsonify([{
        "id": b.id,
        "user_id": b.user_id,
        "quote_id": b.quote_id,
        "date": b.date,
        "time": b.time,
        "confirmed": b.confirmed
    } for b in bookings])





def send_email(to, subject, content):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = "noreply@movemate.com"
    msg["To"] = to
    msg.set_content(content)

    with smtplib.SMTP("localhost") as server:
        server.send_message(msg)
