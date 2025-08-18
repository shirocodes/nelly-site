from .db import db
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from sqlalchemy import Enum 
from enum import Enum as SqlEnum
from sqlalchemy import func
from .users import User

class AppointmentReason(SqlEnum):
    ASSESSMENT = "Assessment"
    THERAPY_SESSION = "Therapy Session"
    FOLLOW_UP = "Follow-up"
    CONSULTATION = "Consultation"

class Schedule(SqlEnum):
    SCHEDULED = 'scheduled'
    COMPLETED = 'completed'
    CANCELLED = 'cancelled'
    
class Appointment(db.Model, SerializerMixin): 
    __tablename__ = 'appointments'
    
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    therapist_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    start_time = db.Column(db.DateTime, nullable=False)
    end_time = db.Column(db.DateTime, nullable=False)

    child_age = db.Column(db.Integer, nullable=True)
    reason = db.Column(Enum(AppointmentReason), nullable=False)
    notes = db.Column(db.Text, nullable=True)  # extra notes from patient

    status = db.Column(Enum(Schedule), default=Schedule.SCHEDULED, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())

    # Relationships
    patient = db.relationship('User', foreign_keys=[patient_id], backref='appointments_as_patient', lazy='joined')
    therapist = db.relationship('User', foreign_keys=[therapist_id], backref='appointments_as_therapist', lazy='joined')

    def __repr__(self):
        return f'<Appointment: id={self.id}, patient={self.patient_id}, therapist={self.therapist_id}, (from {self.start_time} to {self.end_time})>'
