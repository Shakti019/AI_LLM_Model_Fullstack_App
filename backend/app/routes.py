from flask import request, jsonify, Blueprint
from . import db, bcrypt
from .models import User, Export, Import, Transport
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch
import plotly.graph_objects as go
import pandas as pd
import json
import google.generativeai as genai
import os


routes = Blueprint('routes', __name__)  #  Define the Blueprint properly

@routes.route('/',methods=['GET'])
def home():
    return jsonify({'message': 'Hello, World!'}), 200

@routes.route('/register', methods=['POST'])
def register_user():
    data = request.json
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    new_user = User(
        name=data['name'], email=data['email'], password=hashed_password,
        phone=data['number'], address=data['address'], agency_name=data.get('agencyName', ''),
        agency_number=data.get('agencyNumber', ''), agency_address=data.get('agencyAddress', ''),
        country=data.get('country', ''), state=data.get('stateName', ''),
        region=data.get('region', ''), category=data.get('category', '')
    )
    print(new_user)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!"}), 201

@routes.route('/login', methods=['POST'])
def login_user():
    data = request.json
    
    
    # Check if either 'email' or 'username' is provided
    email = data.get('email')
    username = data.get('username')
    print("Email received:", email)
    print("Username received:", username)
    
    if not email and not username:
        return jsonify({"error": "Either email or username is required"}), 400
    
    if 'password' not in data:
        return jsonify({"error": "Password is required"}), 400
    
    # Find user by email or username
    user = None
    if email:
        user = User.query.filter_by(email=email).first()
        print("User found by email:", user.name if user else "No user found")
    elif username:
        user = User.query.filter_by(name=username).first()
        print("User found by username:", user.name if user else "No user found")

    if user:
        print("Stored password hash:", user.password)
        print("Attempting to verify password")
        if bcrypt.check_password_hash(user.password, data['password']):
            print("Password verified successfully")
            access_token = create_access_token(identity=user.name)
            return jsonify({
                "access_token": access_token,
                "username": user.name,
                "message": "Login successful"
            }), 200
        else:
            print("Password verification failed")
    else:
        print("No user found with provided credentials")
    
    return jsonify({"error": "Invalid credentials"}), 401

@routes.route('/export', methods=['POST'])
@jwt_required()
def create_export():
    try:
        data = request.get_json()

        # Parse the export date
        try:
            export_date = datetime.strptime(data['export_date'], '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD.'}), 400

        # Create a new Export record
        new_export = Export(
            user_id=data['user_id'],
            product_name=data['product_name'],
            product_category=data['product_category'],
            quality=data['quality'],
            product_pricing=data['product_pricing'],
            loc_state=data['loc_state'],
            loc_city=data['loc_city'],
            landmark=data['landmark'],
            gps=data['gps'],
            address=data['address'],
            market_type=data['market_type'],
            export_date=export_date,
            market_analysis=data['market_analysis'],
            available_supply=data['available_supply']
        )

        db.session.add(new_export)
        db.session.commit()

        return jsonify({
            'message': 'Export data submitted successfully!',
            'id': new_export.id
        }), 201

    except KeyError as e:
        db.session.rollback()
        return jsonify({'error': f'Missing required field: {str(e)}'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

@routes.route('/import', methods=['POST'])
def save_import():
    data = request.get_json()

    # Validate required fields
    required_fields = [
        'user_id', 'product_name', 'product_category', 'quality', 'product_pricing',
        'loc_state', 'loc_city', 'landmark', 'gps', 'address', 'source_market',
        'import_date', 'market_analysis', 'required_quantity'
    ]
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400

    # Parse the import date
    try:
        import_date = datetime.strptime(data['import_date'], '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    # Create a new Import record
    new_import = Import(
        user_id=data['user_id'],
        product_name=data['product_name'],
        product_category=data['product_category'],
        quality=data['quality'],
        product_pricing=data['product_pricing'],
        loc_state=data['loc_state'],
        loc_city=data['loc_city'],
        landmark=data['landmark'],
        gps=data['gps'],
        address=data['address'],
        source_market=data['source_market'],
        import_date=import_date,
        market_analysis=data['market_analysis'],
        required_quantity=data['required_quantity']
    )
    db.session.add(new_import)
    db.session.commit()

    return jsonify({'message': 'Import record created successfully', 'id': new_import.id}), 201


@routes.route('/transport', methods=['POST'])

def submit_transport():

    try:
        data = request.json

        # Convert date string to Python date object
        transport_date = datetime.strptime(data['TransportDate'], '%Y-%m-%d').date()

        new_transport = Transport(
            user_id=data['user_id'],
            vehicle_type=data['VehicleType'],
            vehicle_capacity=data['VehicleCapacity'],
            transport_mode=data['TransportMode'],
            transport_cost=float(data['TransportCost']),
            pickup_state=data['PickupState'],
            pickup_city=data['PickupCity'],
            pickup_landmark=data['PickupLandmark'],
            pickup_gps=data['PickupGPS'],
            pickup_address=data['PickupAddress'],
            delivery_state=data['DeliveryState'],
            delivery_city=data['DeliveryCity'],
            delivery_landmark=data['DeliveryLandmark'],
            delivery_gps=data['DeliveryGPS'],
            delivery_address=data['DeliveryAddress'],
            estimated_time=data['EstimatedTime'],
            transport_date=transport_date,
            additional_notes=data.get('AdditionalNotes', '')
        )

        db.session.add(new_transport)
        db.session.commit()

        return jsonify({"message": "Transport data submitted successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400



@routes.route('/user/profile', methods=['GET'])
@jwt_required()
def profile():
    try:
        # Get the username (subject) from the JWT
        username = get_jwt_identity()  # Decodes the token and gets the subject (username)
        
        # Query the user from the database using the username
        user = User.query.filter_by(name=username).first()

        if user is None:
            return jsonify({"message": "User not found"}), 404

        # Prepare the user profile data to be returned as a JSON response
        user_data = {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "phone": user.phone,
            "address": user.address,
            "agency_name": user.agency_name,
            "agency_number": user.agency_number,
            "agency_address": user.agency_address,
            "country": user.country,
            "state": user.state,
            "region": user.region,
            "category": user.category
        }

        # Print the user data in the terminal for debugging
        print("User profile data:", user_data)

        # Return the user profile details as a JSON response
        return jsonify(user_data)

    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error for further inspection
        return jsonify({"message": "Error processing the request"}), 422

@routes.route('/importpost', methods=['GET'])
@jwt_required()
def get_imports():
    try:
        # Query imports ordered by created_at in descending order (newest first)
        imports = Import.query.order_by(Import.created_at.desc()).all()
        imports_list = []
        
        for import_item in imports:
            user = User.query.get(import_item.user_id)
            import_data = {
                'id': import_item.id,
                'user_id': import_item.user_id,
                'user_name': user.name,
                'product_name': import_item.product_name,
                'product_category': import_item.product_category,
                'quality': import_item.quality,
                'product_pricing': import_item.product_pricing,
                'loc_state': import_item.loc_state,
                'loc_city': import_item.loc_city,
                'landmark': import_item.landmark,
                'gps': import_item.gps,
                'address': import_item.address,
                'source_market': import_item.source_market,
                'import_date': import_item.import_date.strftime('%Y-%m-%d'),
                'market_analysis': import_item.market_analysis,
                'required_quantity': import_item.required_quantity,
                'created_at': import_item.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            imports_list.append(import_data)
            
        return jsonify(imports_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@routes.route('/exportpost', methods=['GET'])
@jwt_required()
def get_exports():
    try:
        # Query exports ordered by created_at in descending order (newest first)
        exports = Export.query.order_by(Export.created_at.desc()).all()
        exports_list = []
        
        for export_item in exports:
            user = User.query.get(export_item.user_id)
            export_data = {
                'id': export_item.id,
                'user_id': export_item.user_id,
                'user_name': user.name if user else "Unknown",
                'product_name': export_item.product_name,
                'product_category': export_item.product_category,
                'quality': export_item.quality,
                'product_pricing': export_item.product_pricing,
                'loc_state': export_item.loc_state,
                'loc_city': export_item.loc_city,
                'landmark': export_item.landmark,
                'gps': export_item.gps,
                'address': export_item.address,
                'market_type': export_item.market_type,
                'export_date': export_item.export_date.strftime('%Y-%m-%d'),
                'market_analysis': export_item.market_analysis,
                'available_supply': export_item.available_supply,
                'created_at': export_item.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            exports_list.append(export_data)
            
        return jsonify(exports_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@routes.route('/transportpost', methods=['GET'])
@jwt_required()
def get_transports():
    try:
        # Query transports ordered by created_at in descending order (newest first)
        transports = Transport.query.order_by(Transport.created_at.desc()).all()
        transports_list = []
        
        for transport in transports:
            user = User.query.get(transport.user_id)
            print(user)
            transport_data = {
                'id': transport.id,
                'user_id': transport.user_id,
                'user_name': user.name,
                'vehicle_type': transport.vehicle_type,
                'vehicle_capacity': transport.vehicle_capacity,
                'transport_mode': transport.transport_mode,
                'transport_cost': transport.transport_cost,
                'pickup_state': transport.pickup_state,
                'pickup_city': transport.pickup_city,
                'pickup_landmark': transport.pickup_landmark,
                'pickup_gps': transport.pickup_gps,
                'pickup_address': transport.pickup_address,
                'delivery_state': transport.delivery_state,
                'delivery_city': transport.delivery_city,
                'delivery_landmark': transport.delivery_landmark,
                'delivery_gps': transport.delivery_gps,
                'delivery_address': transport.delivery_address,
                'estimated_time': transport.estimated_time,
                'transport_date': transport.transport_date.strftime('%Y-%m-%d'),
                'additional_notes': transport.additional_notes,
                'created_at': transport.created_at.strftime('%Y-%m-%d %H:%M:%S')
            }
            transports_list.append(transport_data)
            
        return jsonify(transports_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Use a real model from Hugging Face instead of the placeholder
# We'll use GPT-2 as an example, but you might want to use a more specialized model
tokenizer = AutoTokenizer.from_pretrained("gpt2")
model = AutoModelForCausalLM.from_pretrained("gpt2")

@routes.route('/api/ai-chat', methods=['POST'])
@jwt_required()
def ai_chat():
    try:
        data = request.json
        user_message = data['message']

        genai.configure(api_key="AIzaSyCh87qjsV4j1sQo1IyhxPdkyHN59eop2CM")
        model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
        response = model.generate_content(user_message)
        ai_response = response.text

        response_data = {
            "text": ai_response,
            "charts": [],
            "tables": []
        }

        return jsonify(response_data)

    except Exception as e:
        print("Gemini API error:", e)
        return jsonify({"error": str(e)}), 500
