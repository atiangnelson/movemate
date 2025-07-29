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
    