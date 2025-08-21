from flask import Flask
from flask_cors import CORS
from config import Config
from flask_migrate import Migrate, upgrade
from flask_jwt_extended import JWTManager
from models import db
import os

migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    
    app.config.from_object(Config)
    CORS(app, resources={r"/*": {"origins": [
        "http://localhost:5173",          # local dev
        "https://littlepuzzles.vercel.app" # deployed frontend
    ]}}, supports_credentials=True)

    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
    # Auto-run migrations in production (Render)
    if os.getenv("FLASK_ENV") == "production":
        with app.app_context():
            try:
                print("Applying pending migrations...")
                upgrade()  # applies all pending migrations
                print("Migrations applied successfully!")
            except Exception as e:
                print(f"Migration failed: {e}")
    
    from routes.appointment_routes import appointment_bp
    from routes.auth_routes import auth_bp
    from routes.user_routes import user_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(appointment_bp)

    @app.route('/')
    def home():
        return {"message": "Backend is running!"}
    
    @app.route("/test-db")
    def test_db():
        return f"Database URL: {app.config['SQLALCHEMY_DATABASE_URI']}"

    return app

app = create_app()

if __name__ == "__main__":
    app.run(port=5555, debug=True)