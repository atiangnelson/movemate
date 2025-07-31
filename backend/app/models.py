import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))  


from app import db
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(200))
    is_admin = db.Column(db.Boolean, default=False) 

class MoveRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    full_name = db.Column(db.String(120))
    location = db.Column(db.String(200))
    date = db.Column(db.String(20))
    inventory = db.Column(db.Text)

class InventoryChecklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    items = db.Column(db.Text)
class QuoteApproval(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    quote_amount = db.Column(db.Float)
    is_approved = db.Column(db.Boolean, default=False)
class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer)
    confirmed = db.Column(db.Boolean, default=False)
    date = db.Column(db.Date, default=datetime.utcnow) 

