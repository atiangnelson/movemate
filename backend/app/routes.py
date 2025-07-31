from flask import Blueprint ,request, jsonify
from flask_jwt_extended import create_access_token,jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash,check_password_hash
from . import db
from .models import User,MoveRequest,InventoryChecklist,QuoteApproval,Booking
import smtplib 
from email.message import EmailMessage

main = Blueprint("main" , __name__)

@main.route("/signup" , methods=["POST"])
def signup():
    data = request.get_json()
    hashed_pw = generate_password_hash(data["password"])
    new_user = User(
        full_name = data["full_name"],
        email = data["email"],
        password=hashed_pw
    )
    db.session.add(new_user)
    db.session.commit()

    try:
        send_email(data["email"],"Welcome to MoveMate","Thank You For Signing Up," + data["full_name"] + "!")
    except Exception as e:
        print("Email error:",e)

    return jsonify({"message":"User created succesfully"})

@main.route("/login",methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if user and check_password_hash(user.password, data["password"]):
        token = create_access_token(identity={
            "id": user.id,
            "name": user.full_name,
            "is_admin": user.is_admin
        })
        return jsonify({"message": f"Welcome {user.full_name}", "token": token})
    else:
        return jsonify({"message":"Invalid Credentials"}), 401


@main.route('/move-request', methods=['POST'])
@jwt_required()
def create_move_request():
    data = request.get_json()
    user_id = get_jwt_identity()["id"]

    move = MoveRequest(
        user_id=user_id,
        full_name=data.get("full_name"),
        location=data.get("location"),
        date=data.get("date"),
        inventory=data.get("inventory")
    )
    db.session.add(move)
    db.session.commit()

    return jsonify({"message": "Move request created successfully", "move_id": move.id}), 201
@main.route("/inventory",methods=["POST"])
@jwt_required()
def inventory():
    data = request.get_json()
    user_id =  get_jwt_identity()["id"]
    entry = InventoryChecklist(
        user_id=user_id,
        items=data["items"]
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({"message" : "Inventory saved"})

@main.route("/quote",methods=["POST"])
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
    return jsonify({"message" : "Quote submitted"})

@main.route("/quote/approve",methods=["PUT"])
@jwt_required()
def approve_quote():
    data = request.get_json()
    quote = QuoteApproval.query.get(data["quote_id"])
    if quote:
        quote.is_approved = True
        db.session.commit()
        return jsonify({"message" : "Quote approved"})
    return jsonify({"message": "Quote not found"}), 404

@main.route("/book",methods=["POST"])
@jwt_required()
def book():
    user_id = get_jwt_identity()["id"]
    booking = Booking(user_id=user_id, confirmed=True)
    db.session.add(booking)
    db.session.commit()
    return jsonify({"message" : "Booking confirmed"})


@main.route("/admin/move-requests", methods=["GET"])
@jwt_required()
def get_all_move_requests():
    move_requests = MoveRequest.query.all()
    output = []
    for req in move_requests:
        output.append({
            "id": req.id,
            "user_id": req.user_id,
            "from_location": req.from_location,
            "to_location": req.to_location,
            "move_date": req.move_date.strftime("%Y-%m-%d")
        })
    return jsonify(output)


@main.route("/admin/quotes", methods=["GET"])
@jwt_required()
def get_all_quotes():
    current_user = get_jwt_identity()

    if not current_user.get("is_admin"):
        return jsonify({"message": "Admins only"}), 403

    quotes = QuoteApproval.query.all()
    output = []
    for quote in quotes:
        output.append({
            "id": quote.id,
            "user_id": quote.user_id,
            "quote_amount": quote.quote_amount,
            "is_approved": quote.is_approved
        })
    return jsonify(output)


@main.route("/admin/bookings", methods=["GET"])
@jwt_required()
def get_all_bookings():
    bookings = Booking.query.all()
    output = []
    for book in bookings:
        output.append({
            "id": book.id,
            "user_id": book.user_id,
            "confirmed": book.confirmed
        })
    return jsonify(output)

@main.route("/notifications", methods=["GET"])
@jwt_required()
def get_notifications():
    user_id = get_jwt_identity()["id"]
    notifications = Notification.query.filter_by(user_id=user_id).all()
    output = []
    for notif in notifications:
        output.append({
            "id": notif.id,
            "message": notif.message,
            "timestamp": notif.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        })
    return jsonify(output)

@main.route("/my-booking", methods=["GET"])
@jwt_required()
def get_my_booking():
    user_id = get_jwt_identity()["id"]
    booking = Booking.query.filter_by(user_id=user_id).first()
    if not booking:
        return jsonify({"message": "No booking found"}), 404

    return jsonify({
        "id": booking.id,
        "confirmed": booking.confirmed,
        "date": booking.date.strftime("%Y-%m-%d") if booking.date else "Not set"
    })






def send_email(to, subject, content):
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = "noreply@movemate.com"
    msg["To"] = to
    msg.set_content(content)

    with smtplib.SMTP("localhost") as server:
        server.send_message(msg)

   
