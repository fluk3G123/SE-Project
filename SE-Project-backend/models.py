users_db = {}  # เก็บข้อมูล user (email -> hashed password)
student_data_db = {}  # เก็บข้อมูลของนักศึกษาที่ยังไม่จบการศึกษา
graduate_data_db = {
    "1001": {
        "fullName": "Alice Johnson",
        "studentId": "1001",
        "gender": "Female",
        "dateOfBirth": "1998-05-20",
        "email": "alice.johnson@example.com",
        "phoneNumber": "0812345678",
        "faculty": "Engineering",
        "major": "Computer Science",
        "yearOfEnrollment": "2016",
        "currentAcademicYear": "Graduated",
        "extracurricularActivities": "Coding Club, Robotics Team",
        "academicProjects": "AI-based Chatbot for Customer Support",
        "internship": {
            "status": "Completed",
            "company": "Google",
            "position": "Software Engineer Intern",
            "duration": "3 months",
            "task": "Developed an internal tool for automating code review",
            "experience": "Gained experience in Python and CI/CD pipeline"
        },
        "career": {
            "status": "Employed",
            "company": "Facebook",
            "position": "Software Engineer",
            "dateOfEmployment": "2020-07-15",
            "task": "Developing web applications and optimizing backend services",
            "experience": "Expert in React.js, Node.js, and GraphQL"
        },
        "profileImage": r"\uploads\S__4055050_0.jpg"
    },
    "1002": {
        "fullName": "Bob Smith",
        "studentId": "1002",
        "gender": "Male",
        "dateOfBirth": "1997-12-15",
        "email": "bob.smith@example.com",
        "phoneNumber": "0823456789",
        "faculty": "Engineering",
        "major": "Software Engineering",
        "yearOfEnrollment": "2015",
        "currentAcademicYear": "Graduated",
        "extracurricularActivities": "Hackathons, Open Source Contributions",
        "academicProjects": "Cloud-based Task Management System",
        "internship": {
            "status": "Completed",
            "company": "Microsoft",
            "position": "Cloud Engineer Intern",
            "duration": "4 months",
            "task": "Worked on Azure cloud storage optimization",
            "experience": "Deepened knowledge in cloud computing and Kubernetes"
        },
        "career": {
            "status": "Employed",
            "company": "Amazon Web Services (AWS)",
            "position": "Cloud Solutions Architect",
            "dateOfEmployment": "2019-09-01",
            "task": "Designing and implementing cloud architectures for clients",
            "experience": "Specialist in AWS Lambda, S3, and DynamoDB"
        },
        "profileImage": r"\uploads\S__4055061_0.jpg"
    },
    "1003": {
        "fullName": "Charlie Brown",
        "studentId": "1003",
        "gender": "Non-binary",
        "dateOfBirth": "1999-02-10",
        "email": "charlie.brown@example.com",
        "phoneNumber": "0834567890",
        "faculty": "Information Technology",
        "major": "Cybersecurity",
        "yearOfEnrollment": "2017",
        "currentAcademicYear": "Graduated",
        "extracurricularActivities": "Cybersecurity Club, Ethical Hacking Workshops",
        "academicProjects": "Penetration Testing Toolkit for SMEs",
        "internship": {
            "status": "Completed",
            "company": "IBM",
            "position": "Security Analyst Intern",
            "duration": "5 months",
            "task": "Conducted vulnerability assessments and security audits",
            "experience": "Learned ethical hacking and penetration testing methodologies"
        },
        "career": {
            "status": "Employed",
            "company": "Cisco",
            "position": "Cybersecurity Engineer",
            "dateOfEmployment": "2021-03-10",
            "task": "Protecting enterprise networks from cyber threats",
            "experience": "Skilled in firewalls, IDS/IPS, and threat intelligence"
        }
    },
    "1004": {
        "fullName": "Daniel Lee",
        "studentId": "1004",
        "gender": "Male",
        "dateOfBirth": "1996-07-25",
        "email": "daniel.lee@example.com",
        "phoneNumber": "0845678901",
        "faculty": "Computer Science",
        "major": "Artificial Intelligence",
        "yearOfEnrollment": "2014",
        "currentAcademicYear": "Graduated",
        "extracurricularActivities": "AI Research Group, Machine Learning Competitions",
        "academicProjects": "Autonomous Driving System using Deep Learning",
        "internship": {
            "status": "Completed",
            "company": "Tesla",
            "position": "AI Research Intern",
            "duration": "6 months",
            "task": "Developed machine learning models for autonomous vehicles",
            "experience": "Advanced skills in TensorFlow and reinforcement learning"
        },
        "career": {
            "status": "Employed",
            "company": "OpenAI",
            "position": "Machine Learning Engineer",
            "dateOfEmployment": "2020-05-20",
            "task": "Building state-of-the-art NLP models",
            "experience": "Proficient in GPT models and large-scale data processing"
        }
    },
    "1005": {
        "fullName": "Eve Martinez",
        "studentId": "1005",
        "gender": "Female",
        "dateOfBirth": "2000-11-11",
        "email": "eve.martinez@example.com",
        "phoneNumber": "0856789012",
        "faculty": "IT",
        "major": "Data Science",
        "yearOfEnrollment": "2018",
        "currentAcademicYear": "Graduated",
        "extracurricularActivities": "Big Data Club, Kaggle Competitions",
        "academicProjects": "Predictive Analytics for Healthcare",
        "internship": {
            "status": "Completed",
            "company": "Netflix",
            "position": "Data Analyst Intern",
            "duration": "3 months",
            "task": "Analyzed user behavior for content recommendations",
            "experience": "Hands-on experience with Python, SQL, and data visualization"
        },
        "career": {
            "status": "Unemployed",
            "company": "",
            "position": "",
            "dateOfEmployment": "",
            "task": "",
            "experience": "Actively seeking opportunities in data science"
        }
    },
}
# เก็บข้อมูลของบัณฑิตที่จบแล้ว
user_account_types = {}  # เก็บประเภทบัญชีของผู้ใช้ (email -> account_type)
