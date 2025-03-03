from flask import Flask, Blueprint, request, jsonify , send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from models import student_data_db, graduate_data_db

app = Flask(__name__)
data_bp = Blueprint('data', __name__)
CORS(data_bp)

# ✅ กำหนดโฟลเดอร์สำหรับอัปโหลด
UPLOAD_FOLDER = os.path.join(os.getcwd(), 'uploads')  # ใช้ path ของโปรเจค backend
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # สร้างโฟลเดอร์ถ้ายังไม่มี

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ✅ Endpoint สำหรับเสิร์ฟรูปภาพจากโฟลเดอร์ uploads
@data_bp.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# ✅ Endpoint สำหรับดึงข้อมูลบัณฑิตทั้งหมด
@data_bp.route('/graduate-data', methods=['GET'])
def get_graduate_data():
    try:
        graduates = list(graduate_data_db.values())
        for grad in graduates:
            if grad.get("profileImage"):  # แปลง path ให้เป็น URL
                filename = os.path.basename(grad['profileImage'])
                grad["profileImage"] = f"http://127.0.0.1:5000/uploads/{filename}"
        return jsonify(graduates), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    
# ✅ เพิ่ม endpoint สำหรับดึงบัณฑิตตามคณะ
@data_bp.route('/graduates', methods=['GET'])
def get_graduates_by_faculty():
    faculty = request.args.get('faculty')

    if not faculty:
        return jsonify({"status": "error", "message": "Faculty parameter is required"}), 400

    matching_graduates = [grad for grad in graduate_data_db.values() if grad.get("faculty") == faculty]

    return jsonify(matching_graduates), 200

# ✅ Endpoint สำหรับดึงคณะทั้งหมด (ไม่ซ้ำกัน)
@data_bp.route('/faculties', methods=['GET'])
def get_faculties():
    try:
        faculties = list(set(user_data["faculty"] for user_data in graduate_data_db.values() if "faculty" in user_data))
        return jsonify(faculties), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ✅ Endpoint ดึงบัณฑิตตามบริษัท
@data_bp.route('/graduates-by-company', methods=['GET'])
def get_graduates_by_company():
    company_name = request.args.get('company', '').strip()

    if not company_name:
        return jsonify({"status": "error", "message": "Company name is required"}), 400

    graduates = [
        user_data for user_data in graduate_data_db.values()
        if user_data.get('career', {}).get('company', '') == company_name
    ]
    return jsonify(graduates), 200

# ✅ Endpoint ดึงรายชื่อบริษัททั้งหมด (ไม่ซ้ำกัน)
@data_bp.route('/companies', methods=['GET'])
def get_companies():
    try:
        companies = list(set(user_data.get('career', {}).get('company', '') for user_data in graduate_data_db.values()))
        companies = [company for company in companies if company]  # กรองค่า "" ออก
        return jsonify(companies), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ✅ Endpoint ดึงรายชื่ออาชีพทั้งหมด (ไม่ซ้ำกัน)
@data_bp.route('/careers', methods=['GET'])
def get_careers():
    try:
        careers = list(set(user_data.get('career', {}).get('position', '') for user_data in graduate_data_db.values()))
        careers = [career for career in careers if career]  # กรองค่า "" ออก
        return jsonify(careers), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    
# ✅ Endpoint ดึงบัณฑิตตามอาชีพ
@data_bp.route('/graduates-by-career', methods=['GET'])
def get_graduates_by_career():
    career_name = request.args.get('career', '').strip()

    if not career_name:
        return jsonify({"status": "error", "message": "Career name is required"}), 400

    graduates = [
        user_data for user_data in graduate_data_db.values()
        if user_data.get('career', {}).get('position', '') == career_name
    ]
    return jsonify(graduates), 200

# ✅ ฟังก์ชันเพิ่มข้อมูลนักศึกษา
@data_bp.route('/student-form', methods=['POST'])
def Student():
    if 'profileImage' in request.files:
        profile_image = request.files['profileImage']
        if profile_image and allowed_file(profile_image.filename):
            filename = secure_filename(profile_image.filename)
            file_path = os.path.join("uploads", filename).replace("\\", "/")
            profile_image.save(file_path)
            file_path = f"/uploads/{filename}"  # เปลี่ยนเป็น URL
        else:
            return jsonify({"status": "error", "message": "Invalid file type"}), 400
    else:
        file_path = ""  # ไม่มีไฟล์อัปโหลด

    data = request.form.to_dict()
    required_fields = ['firstName', 'lastName', 'studentId', 'gender', 'dateOfBirth', 'email',
                        'phoneNumber', 'faculty', 'major', 'yearOfEnrollment', 'currentAcademicYear',
                        'extracurricularActivities', 'academicProjects']

    if not all(field in data for field in required_fields):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    student_id = data.get('studentId')
    student_data_db[student_id] = {
        "fullName": f"{data.get('firstName')} {data.get('lastName')}",
        "studentId": student_id,
        "gender": data.get('gender'),
        "dateOfBirth": data.get('dateOfBirth'),
        "email": data.get('email'),
        "phoneNumber": data.get('phoneNumber'),
        "faculty": data.get('faculty'),
        "major": data.get('major'),
        "yearOfEnrollment": data.get('yearOfEnrollment'),
        "currentAcademicYear": data.get('currentAcademicYear'),
        "extracurricularActivities": data.get('extracurricularActivities'),
        "academicProjects": data.get('academicProjects'),
        "profileImage": file_path
    }
    return jsonify({"message": "Student data received successfully"}), 200

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

@data_bp.route('/graduate-form', methods=['POST'])
def Graduate():
    if 'profileImage' in request.files:
        profile_image = request.files['profileImage']
        if profile_image and allowed_file(profile_image.filename):
            filename = secure_filename(profile_image.filename)
            file_path = os.path.join("uploads", filename).replace("\\", "/")
            profile_image.save(file_path)
            file_path = f"/uploads/{filename}"  # เปลี่ยนเป็น URL
        else:
            return jsonify({"status": "error", "message": "Invalid file type"}), 400
    else:
        file_path = ""  # ไม่มีไฟล์อัปโหลด
    
    data = request.form.to_dict()
    required_fields = ['firstName', 'lastName', 'studentId', 'gender', 'dateOfBirth', 'email',
                        'phoneNumber', 'faculty', 'major', 'yearOfEnrollment', 'currentAcademicYear',
                        'extracurricularActivities', 'academicProjects', 'internshipStatus',
                        'internshipCompany', 'internshipPosition', 'internshipDuration', 'internshipTask', 'internshipExperience',
                        'careerStatus', 'careerCompany', 'careerPosition', 'dateOfEmployment', 'careerTask', 'careerExperience']
    
    if not all(field in data for field in required_fields):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400
    
    graduate_id = data.get('studentId')
    graduate_data_db[graduate_id] = {
        "fullName": f"{data.get('firstName')} {data.get('lastName')}",
        "studentId": graduate_id,
        "gender": data.get('gender'),
        "dateOfBirth": data.get('dateOfBirth'),
        "email": data.get('email'),
        "phoneNumber": data.get('phoneNumber'),
        "faculty": data.get('faculty'),
        "major": data.get('major'),
        "yearOfEnrollment": data.get('yearOfEnrollment'),
        "currentAcademicYear": data.get('currentAcademicYear'),
        "extracurricularActivities": data.get('extracurricularActivities'),
        "academicProjects": data.get('academicProjects'),
        "internship": {
            "status": data.get('internshipStatus'),
            "company": data.get('internshipCompany'),
            "position": data.get('internshipPosition'),
            "duration": data.get('internshipDuration'),
            "task": data.get('internshipTask'),
            "experience": data.get('internshipExperience')
        },
        "career": {
            "status": data.get('careerStatus'),
            "company": data.get('careerCompany'),
            "position": data.get('careerPosition'),
            "dateOfEmployment": data.get('dateOfEmployment'),
            "task": data.get('careerTask'),
            "experience": data.get('careerExperience')
        },
        "profileImage": file_path
    }
    print("Updated User Data Database:", graduate_data_db)
    return jsonify({"message": "Graduate data received successfully"}), 200

# ✅ เพิ่ม Blueprint ให้ API ใช้งานได้
app.register_blueprint(data_bp)

if __name__ == '__main__':
    app.run(debug=True)
