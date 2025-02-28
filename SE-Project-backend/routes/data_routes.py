from flask import Blueprint, request, jsonify
from models import student_data_db
from models import graduate_data_db
from flask_cors import CORS

data_bp = Blueprint('data', __name__)
CORS(data_bp)

# ฟังก์ชันเลือกบริษัท
@data_bp.route('/hendle-selection-company', methods=['POST'])
def hendle_selection_Company():
    data = request.get_json()
    selected_company = data.get('selectedCompany')

    print("Selected Company:", selected_company)

    if not selected_company:
        return jsonify({"status": "error", "message": "No company selected"}), 400

    # ค้นหา user ที่มี companyName ตรงกับ selected_company
    matching_data_company = [
        user_data for user_data in graduate_data_db.values()
        if user_data.get('companyName') == selected_company
    ]

    if matching_data_company:
        return jsonify({"status": "success", "matchingDataStudent": matching_data_company}), 200
    else:
        return jsonify({"status": "no_match", "message": "No matching company found"}), 200


# ฟังก์ชันเลือกคณะ
@data_bp.route('/hendle-selection-faculty', methods=['POST'])
def hendle_selection_faculty():
    data = request.get_json()
    selected_faculty = data.get('selectedFaculty')

    print("Selected Faculty:", selected_faculty)


    if not selected_faculty:
        return jsonify({"status": "error", "message": "No faculty selected"}), 400

    # ค้นหา user ที่มี facultyName ตรงกับ selected_faculty
    matching_data_faculty = [
        user_data for user_data in graduate_data_db.values()
        if user_data.get('faculty') == selected_faculty
    ]

    if matching_data_faculty:
        return jsonify({"status": "success", "matchingDataStudent": matching_data_faculty}), 200
    else:
        return jsonify({"status": "no_match", "message": "No matching faculty found"}), 200

# ฟังก์ชันเลือกตำแหน่งงาน
@data_bp.route('/handle-selection-jobPosition', methods=['POST'])
def handle_selection_job_position():
    data = request.get_json()
    selected_job_position = data.get('selectedJobPosition')

    print("Selected Job Position:", selected_job_position)

    if not selected_job_position:
        return jsonify({"status": "error", "message": "No job position selected"}), 400

    # ค้นหา user ที่มี jobPosition ตรงกับ selected_job_position
    matching_data_job_position = [
        user_data for user_data in graduate_data_db.values()
        if user_data.get('jobPosition') == selected_job_position
    ]

    if matching_data_job_position:
        return jsonify({"status": "success", "matchingDataStudent": matching_data_job_position}), 200
    else:
        return jsonify({"status": "no_match", "message": "No matching job position found"}), 200

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
    }

    print(type(graduate_data_db)) 
    print("Updated Graduate Data Database:", graduate_data_db)

    return jsonify({"message": "Graduate data received successfully"}), 200