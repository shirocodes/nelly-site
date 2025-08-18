from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from passlib.hash import bcrypt
from .db import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    
    serialize_rules = ('-password_hash')
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), nullable=True)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='patient')  # 'patient' or 'therapist'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
     # Password hashing
    def set_password(self, password):
        self.password_hash = bcrypt.hash(password)

    def check_password(self, password):
        return bcrypt.verify(password, self.password_hash)

    
    def __repr__(self):
        return f'<User id={self.id} username={self.name} role={self.role}>'
