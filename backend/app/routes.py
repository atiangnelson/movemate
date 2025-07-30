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
    new_user = user (
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
        token = create_access_token(identity={"id": user.id, "name"user.full_name})
        return jsonify({"message": f"Welcome {user.full_name}", "token": token})
    else:
        return jsonify({"message":"Invalid Credentials"}), 401

@main.route("/move-request", methods=["POST"])
@jwt_required()
def move_request():
    data = request.get_json()
    user_id = get_jwt_identity()["id"]
    request_entry =MoveRequest(
        user_id=user_id
        from_location=data["from_location"],
        to_location=data["to_location"],
        move_date=data["move_date"]
    )
    
