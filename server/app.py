from flask import Flask
from flask_cors import CORS
from config import Config
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from models import db

migrate = Migrate()
jwt = JWTManager()

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    
    app.config.from_object(Config)
    CORS(app, supports_credentials=True)
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    
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