from flask import Blueprint, request, jsonify
from models import student_data_db, graduate_data_db
from flask_cors import CORS

data_bp = Blueprint('data', __name__)
CORS(data_bp)

# ✅ เพิ่ม endpoint สำหรับดึงข้อมูลบัณฑิตทั้งหมด
@data_bp.route('/graduate-data', methods=['GET'])
def get_graduate_data():
    try:
        return jsonify(list(graduate_data_db.values())), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

# ✅ ฟังก์ชันเลือกบริษัท
@data_bp.route('/handle-selection-company', methods=['POST'])
def handle_selection_company():
    data = request.get_json()
    selected_company = data.get('selectedCompany')

    if not selected_company:
        return jsonify({"status": "error", "message": "No company selected"}), 400

    matching_data_company = [
        user_data for user_data in graduate_data_db.values()
        if user_data.get('companyName') == selected_company
    ]

    return jsonify({"status": "success" if matching_data_company else "no_match", 
                    "matchingDataStudent": matching_data_company}), 200


# ✅ ฟังก์ชันเลือกคณะ
@data_bp.route('/handle-selection-faculty', methods=['POST'])
def handle_selection_faculty():
    data = request.get_json()
    selected_faculty = data.get('selectedFaculty')

    if not selected_faculty:
        return jsonify({"status": "error", "message": "No faculty selected"}), 400

    matching_data_faculty = [
        user_data for user_data in graduate_data_db.values()
        if user_data.get('faculty') == selected_faculty
    ]

    return jsonify({"status": "success" if matching_data_faculty else "no_match", 
                    "matchingDataStudent": matching_data_faculty}), 200

# ✅ ฟังก์ชันเลือกตำแหน่งงาน
@data_bp.route('/handle-selection-jobPosition', methods=['POST'])
def handle_selection_job_position():
    data = request.get_json()
    selected_job_position = data.get('selectedJobPosition')

    if not selected_job_position:
        return jsonify({"status": "error", "message": "No job position selected"}), 400

    matching_data_job_position = [
        user_data for user_data in graduate_data_db.values()
        if user_data.get('jobPosition') == selected_job_position
    ]

    return jsonify({"status": "success" if matching_data_job_position else "no_match", 
                    "matchingDataStudent": matching_data_job_position}), 200

# ฟังก์ชันเพิ่มข้อมูลนักศึกษา
@data_bp.route('/student-form', methods=['POST'])
def Student():
    data = request.get_json()

    # ตรวจสอบข้อมูลที่จำเป็น
    required_fields = ['firstName', 'lastName', 'studentId', 'gender', 'dateOfBirth', 'email'
                        , 'phoneNumber','faculty','major','yearOfEnrollment','currentAcademicYear',
                        'extracurricularActivities','academicProjects']
    if not all(key in data for key in required_fields):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    # สร้างข้อมูลนักศึกษา
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
    }

    print("Updated User Data Database:", student_data_db)

    return jsonify({"message": "Data received successfully"}), 200

# ฟังก์ชันเพิ่มข้อมูลนักศึกษาที่จบเเล้ว
@data_bp.route('/graduate-form', methods=['POST'])
def Graduate():
    data = request.get_json()

    # ตรวจสอบข้อมูลที่จำเป็น
    required_fields = ['firstName', 'lastName', 'studentId', 'gender', 'dateOfBirth', 'email',
                        'phoneNumber', 'faculty', 'major', 'yearOfEnrollment', 'currentAcademicYear',
                        'extracurricularActivities', 'academicProjects', 'internship', 'career']
    
    if not all(key in data for key in required_fields):
        return jsonify({"status": "error", "message": "Missing required fields"}), 400

    # สร้างข้อมูลบัณฑิต
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
        "internship": data.get('internship'),
        "career": data.get('career'),
        "profileImage": ""
    }

    print(type(graduate_data_db)) 
    print("Updated Graduate Data Database:", graduate_data_db)

    return jsonify({"message": "Graduate data received successfully"}), 200