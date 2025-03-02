users_db = {}  # เก็บข้อมูล user (email -> hashed password)
student_data_db = {}  # เก็บข้อมูลของนักศึกษาที่ยังไม่จบการศึกษา
graduate_data_db = {
    "2021001": {
        "fullName": "John Doe",
        "studentId": "2021001",
        "gender": "Male",
        "dateOfBirth": "1999-05-15",
        "email": "johndoe@example.com",
        "phoneNumber": "123456789",
        "faculty": "Engineering",
        "major": "Computer Engineering",
        "yearOfEnrollment": "2018",
        "currentAcademicYear": "4",
        "extracurricularActivities": "Robotics Club, Programming Contest",
        "academicProjects": "AI-based Traffic Light Optimization",
        "internship": {
            "status": "completed",
            "company": "Google",
            "position": "Software Engineer Intern",
            "duration": "3 months",
            "task": "Developed an internal dashboard for data analytics",
            "experience": "Gained experience in backend development using Python and Flask"
        },
        "career": {
            "status": "employed",
            "company": "Microsoft",
            "position": "Software Engineer",
            "dateOfEmployment": "2023-07-01",
            "task": "Developing cloud-based solutions",
            "experience": "Working with Azure and distributed systems"
        }
    },
    "2021002": {
        "fullName": "Jane Smith",
        "studentId": "2021002",
        "gender": "Female",
        "dateOfBirth": "2000-02-10",
        "email": "janesmith@example.com",
        "phoneNumber": "987654321",
        "faculty": "Business Administration",
        "major": "Marketing",
        "yearOfEnrollment": "2019",
        "currentAcademicYear": "4",
        "extracurricularActivities": "Marketing Club, Debate Team",
        "academicProjects": "Market Analysis on Consumer Behavior",
        "internship": {
            "status": "completed",
            "company": "Coca-Cola",
            "position": "Marketing Intern",
            "duration": "6 months",
            "task": "Analyzed consumer data and supported campaign strategies",
            "experience": "Developed strong analytical and teamwork skills"
        },
        "career": {
            "status": "unemployed",
            "company": "",
            "position": "",
            "dateOfEmployment": "",
            "task": "",
            "experience": ""
        },
        "profileImage": "https://i.pinimg.com/736x/fe/5b/83/fe5b83e7dff29a16e9ab387d4a927ea6.jpg"
    },
    "2021003": {
        "fullName": "Alice Brown",
        "studentId": "2021003",
        "gender": "Female",
        "dateOfBirth": "1998-11-20",
        "email": "alicebrown@example.com",
        "phoneNumber": "1122334455",
        "faculty": "Science",
        "major": "Biotechnology",
        "yearOfEnrollment": "2017",
        "currentAcademicYear": "Graduated",
        "extracurricularActivities": "Biotech Research Group",
        "academicProjects": "CRISPR Gene Editing Research",
        "internship": {
            "status": "completed",
            "company": "Pfizer",
            "position": "Research Intern",
            "duration": "4 months",
            "task": "Conducted laboratory experiments on vaccine development",
            "experience": "Learned advanced laboratory techniques"
        },
        "career": {
            "status": "employed",
            "company": "Moderna",
            "position": "Research Scientist",
            "dateOfEmployment": "2023-09-15",
            "task": "Developing next-generation mRNA vaccines",
            "experience": "Hands-on experience in vaccine development and clinical trials"
        }
    }
}  # เก็บข้อมูลของบัณฑิตที่จบแล้ว
user_account_types = {}  # เก็บประเภทบัญชีของผู้ใช้ (email -> account_type)
