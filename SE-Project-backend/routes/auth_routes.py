from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from flask_cors import CORS

from models import users_db

bcrypt = Bcrypt()
auth_bp = Blueprint('auth', __name__)
CORS(auth_bp)  # อนุญาตให้ React frontend เรียก API ได้

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # ตรวจสอบข้อมูลที่ส่งมา
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if email in users_db:
        return jsonify({"message": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users_db[email] = {
        "password": hashed_password,
        "created_at": "2025-03-01T12:00:00Z",  # ควรใช้ datetime จริง
        "role": "user"  # หรือกำหนด role ตามความต้องการ
    }
    return jsonify({"message": "User created successfully"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # ตรวจสอบข้อมูลที่ส่งมา
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    if email not in users_db or not bcrypt.check_password_hash(users_db[email]["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=email)

    response = jsonify({
        "message": "Login successful",
        "token": access_token,
        "redirect": "/select-role"
    })
    
    response.headers["X-Content-Type-Options"] = "nosniff"  # ป้องกัน MIME sniffing
    return response, 200
