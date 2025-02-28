from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import user_account_types

user_bp = Blueprint('user', __name__)

@user_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify({"message": "You have access to this protected route"}), 200

@user_bp.route('/select-role', methods=['POST'])
@jwt_required()
def set_account_type():
    data = request.get_json()
    current_user = get_jwt_identity()  # ดึง email ของผู้ใช้จาก JWT Token
    account_type = data.get('account_type')
    accept_policy = data.get('accept_policy')

    print(f"Received data: {data}")  # แสดงค่าที่ได้รับจาก Frontend

    if not account_type or account_type not in ["student", "graduate"]:
        print("❌ Invalid account type")
        return jsonify({"status": "error", "message": "Invalid account type"}), 400
    if not accept_policy:
        print("❌ Privacy policy not accepted")
        return jsonify({"status": "error", "message": "You must accept the privacy policy"}), 400

    # บันทึกประเภทบัญชีของผู้ใช้
    user_account_types[current_user] = account_type

    print(f"✅ Updated user_account_types: {user_account_types}")  # แสดงข้อมูลหลังอัปเดต

    return jsonify({"status": "success", "message": "Account type updated successfully"}), 200

@user_bp.route('/check-account-type', methods=['GET'])
@jwt_required()
def check_account_type():
    current_user = get_jwt_identity()  # ดึง email ของผู้ใช้จาก JWT Token

    # ตรวจสอบว่าผู้ใช้เคยกรอกประเภทบัญชีหรือยัง
    if current_user in user_account_types:
        account_type = user_account_types[current_user]
        redirect_url = "/dashboard" if account_type == "student" or account_type == "graduate" else "/select-role"

        return jsonify({
            "status": "success",
            "has_account_type": True,
            "account_type": account_type,
            "redirect_url": redirect_url  # ส่งค่า URL ไปให้ Frontend
        }), 200
    else:
        return jsonify({
            "status": "success",
            "has_account_type": False,
            "message": "Account type not set"
        }), 200
