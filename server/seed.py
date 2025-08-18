from app import create_app
from models import db, User
from models.appointments import Appointment, AppointmentReason, Schedule
from datetime import datetime, timedelta

# Initialize app and database
app = create_app()
app.app_context().push()

# Drop and recreate tables (optional, for fresh seeding)
db.drop_all()
db.create_all()

# Seed Users
def seed_users():
    users = []

    # Therapists
    therapist1 = User(
        name="Dr. Alice Therapist",
        email="alice@therapy.com",
        phone_number="0711000001",
        role="therapist"
    )
    therapist1.set_password("password123")
    
    therapist2 = User(
        name="Dr. Bob Therapist",
        email="bob@therapy.com",
        phone_number="0711000002",
        role="therapist"
    )
    therapist2.set_password("password123")

    # Patients
    patient1 = User(
        name="John Doe",
        email="john@patient.com",
        phone_number="0711000100",
        role="patient"
    )
    patient1.set_password("password123")

    patient2 = User(
        name="Jane Smith",
        email="jane@patient.com",
        phone_number="0711000101",
        role="patient"
    )
    patient2.set_password("password123")

    users.extend([therapist1, therapist2, patient1, patient2])
    db.session.add_all(users)
    db.session.commit()
    print("Seeded Users")
    return users

# Seed Appointments
def seed_appointments(users):
    # Map therapists and patients
    therapists = [u for u in users if u.role == "therapist"]
    patients = [u for u in users if u.role == "patient"]

    appointments = []

    # Example appointment: tomorrow 10am-11am
    appt1 = Appointment(
        patient_id=patients[0].id,
        therapist_id=therapists[0].id,
        start_time=datetime.utcnow() + timedelta(days=1, hours=10),
        end_time=datetime.utcnow() + timedelta(days=1, hours=11),
        child_age=5,
        reason=AppointmentReason.ASSESSMENT,
        notes="Initial assessment for developmental progress",
        status=Schedule.SCHEDULED
    )

    appt2 = Appointment(
        patient_id=patients[1].id,
        therapist_id=therapists[1].id,
        start_time=datetime.utcnow() + timedelta(days=2, hours=14),
        end_time=datetime.utcnow() + timedelta(days=2, hours=15),
        child_age=7,
        reason=AppointmentReason.THERAPY_SESSION,
        notes="Behavioral therapy session",
        status=Schedule.SCHEDULED
    )

    appointments.extend([appt1, appt2])
    db.session.add_all(appointments)
    db.session.commit()
    print("Seeded Appointments")

# --- Run seeds ---
if __name__ == "__main__":
    users = seed_users()
    seed_appointments(users)
    print("Database seeding complete.")

