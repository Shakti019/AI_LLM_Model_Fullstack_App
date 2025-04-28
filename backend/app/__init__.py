from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS  # Make sure CORS is imported
from .config import Config

from flask_migrate import Migrate
from datetime import timedelta

bcrypt = Bcrypt()
db = SQLAlchemy()
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # CORS Configuration (allowing requests from localhost:5173)
    CORS(app, origins=["http://localhost:5173"], allow_headers=["Authorization", "Content-Type"])  # Restrict CORS to specific origin

    # Initialize extensions
    app.config.from_object(Config)  # Load config from Config class
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)  # Access token expiration time
    app.config['DEBUG'] = True
    app.config['JWT_SECRET_KEY'] = 'your-secret-key' 

    # Initialize database, bcrypt, JWT, and migrations
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Import and register Blueprints
    from .routes import routes
    app.register_blueprint(routes)

    # Ensure database migrations are handled via Flask-Migrate
    # Remove db.create_all() for production
    # with app.app_context():
    #     db.create_all()  # Remove this in production

    return app
