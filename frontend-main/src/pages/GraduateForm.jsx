import React, { useState } from 'react';
import GraduateNavbar from '../components/ui/GraduateNavbar';
import { useNavigate } from "react-router-dom";

function GraduateForm() {
    const [activeTab, setActiveTab] = useState("personal");
    const [internStatus, setInternStatus] = useState("none");
    const [careerStatus, setCareerStatus] = useState("none");    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        studentId: '',
        gender: '',
        dateOfBirth: { day: '', month: '', year: '' },
        email: '',
        phoneNumber: '',
        faculty: '',
        major: '',
        yearOfEnrollment: { day: '', month: '', year: '' },
        currentAcademicYear: '',
        extracurricularActivities: '',
        academicProjects: '',
        internship: {
            status: '',
            company: '',
            position: '',
            duration: '',
            task: '',
            experience: ''
        },
        career: {
            status: '',
            company: '',
            position: '',
            dateOfEmployment: { day: '', month: '', year: '' },
            task: '',
            experience: ''
        }
    });
    
    const handleChange = (e) => {
        const { name, value, dataset } = e.target;

        if (dataset.parent && ["day", "month", "year"].includes(name)) {
            setFormData((prevData) => ({
                ...prevData,
                [dataset.parent]: {
                    ...prevData[dataset.parent],
                    [name]: value,
                },
            }));
        } else if (dataset.section) {
            if (["day", "month", "year"].includes(name) && dataset.dateField) {
                setFormData((prevData) => ({
                    ...prevData,
                    [dataset.section]: {
                        ...prevData[dataset.section],
                        [dataset.dateField]: {
                            ...prevData[dataset.section][dataset.dateField],
                            [name]: value
                        }
                    },
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [dataset.section]: {
                        ...prevData[dataset.section],
                        [name]: value,
                    },
                }));
            }
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleStatusChange = (e) => {
        const status = e.target.value;
        if (e.target.name === "status-intern") {
            setInternStatus(status);
            setFormData((prev) => ({
                ...prev,
                internship: { ...prev.internship, status }
            }));
        } else if (e.target.name === "status-career") {
            setCareerStatus(status);
            setFormData((prev) => ({
                ...prev,
                career: { ...prev.career, status }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Format dates for submission
        const formattedData = {
            ...formData,
            dateOfBirth: formData.dateOfBirth.year && formData.dateOfBirth.month && formData.dateOfBirth.day ? 
                `${formData.dateOfBirth.year}-${formData.dateOfBirth.month}-${formData.dateOfBirth.day}` : '',
            yearOfEnrollment: formData.yearOfEnrollment.year && formData.yearOfEnrollment.month && formData.yearOfEnrollment.day ? 
                `${formData.yearOfEnrollment.year}-${formData.yearOfEnrollment.month}-${formData.yearOfEnrollment.day}` : '',
            career: {
                ...formData.career,
                dateOfEmployment: formData.career.dateOfEmployment.year && formData.career.dateOfEmployment.month && formData.career.dateOfEmployment.day ? 
                    `${formData.career.dateOfEmployment.year}-${formData.career.dateOfEmployment.month}-${formData.career.dateOfEmployment.day}` : ''
            }
        };

        try {
            console.log("Sending data:", formattedData);
            const response = await fetch('http://127.0.0.1:5000/graduate-form', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                alert('Data submitted successfully!');
                navigate("/dashboard");
            } else {
                const errorData = await response.json();
                alert(`Error submitting data: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form');
        }
    };

    return (
        <div className="flex bg-[#FEEDED]">
            <GraduateNavbar activeTab={activeTab} onTabChange={setActiveTab} />
            {/* Main Form Content */}
            <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6 mt-10">
                    Please Enter Your Information
                </h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {activeTab === "personal" && (
                        <>
                            <h2 className="text-xl font-medium text-gray-700 mb-2">Personal Information</h2>
                            <div className="space-y-6">
                                {/* First Name */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                        placeholder="Enter your first name"
                                    />
                                </div>

                                {/* Last Name */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                        placeholder="Enter your last name"
                                    />
                                </div>

                                {/* Student Code */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Student Code</label>
                                    <input
                                        type="text"
                                        name="studentId"
                                        value={formData.studentId}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                        placeholder="Enter your student code"
                                    />
                                </div>

                                {/* Gender Selection */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Gender</label>
                                    <div className="flex items-center gap-6 mt-2">
                                        <label className="flex items-center space-x-2">
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                value="male" 
                                                checked={formData.gender === 'male'}
                                                onChange={handleChange}
                                                className="accent-[#b24e50]" 
                                            />
                                            <span>Male</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                value="female" 
                                                checked={formData.gender === 'female'}
                                                onChange={handleChange}
                                                className="accent-[#b24e50]" 
                                            />
                                            <span>Female</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
                                    <div className="flex gap-2 mt-2">
                                        <select
                                            name="day"
                                            className="w-1/3 p-4 rounded-lg border border-gray-300 bg-white text-center focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                            data-parent="dateOfBirth"
                                            value={formData.dateOfBirth.day} 
                                            onChange={handleChange}
                                        >
                                            <option value="">Day</option>
                                            {[...Array(31)].map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>

                                        <select
                                            name="month"
                                            className="w-1/3 p-4 rounded-lg border border-gray-300 bg-white text-center focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                            data-parent="dateOfBirth"
                                            value={formData.dateOfBirth.month} 
                                            onChange={handleChange}
                                        >
                                            <option value="">Month</option>
                                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                                                <option key={index} value={index + 1}>{month}</option>
                                            ))}
                                        </select>

                                        <select
                                            name="year"
                                            className="w-1/3 p-4 rounded-lg border border-gray-300 bg-white text-center focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                            data-parent="dateOfBirth"
                                            value={formData.dateOfBirth.year} 
                                            onChange={handleChange}
                                        >
                                            <option value="">Year</option>
                                            {[...Array(100)].map((_, index) => (
                                                <option key={index} value={new Date().getFullYear() - index}>{new Date().getFullYear() - index}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                        placeholder="Enter your email"
                                    />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                type="button"
                                className="px-8 py-3 bg-[#b24e50] text-white font-semibold rounded-lg shadow-md hover:bg-[#a35f5f] focus:outline-none focus:ring-2 focus:ring-[#b24e50d3] focus:ring-opacity-50 cursor-pointer" 
                                onClick={() => setActiveTab("academic")}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {activeTab === "academic" && (
                        <>
                            <h2 className="text-xl font-medium text-gray-700 mb-2 ">Academic Information</h2>
                            <div className="space-y-6">
                                {/* Faculty */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Faculty</label>
                                    <input
                                        type="text"
                                        name="faculty"
                                        value={formData.faculty}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                        placeholder="Enter your faculty"
                                    />
                                </div>

                                {/* Major */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Major</label>
                                    <input
                                        type="text"
                                        name="major"
                                        value={formData.major}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                        placeholder="Enter your major"
                                    />
                                </div>

                                {/* Year of Enrollment */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Year of Enrollment</label>
                                    <div className="flex gap-2 mt-2">
                                        <select
                                            name="day"
                                            className="w-1/3 p-4 rounded-lg border border-gray-300 bg-white text-center focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                            data-parent="yearOfEnrollment"
                                            value={formData.yearOfEnrollment.day} 
                                            onChange={handleChange}
                                        >
                                            <option value="">Day</option>
                                            {[...Array(31)].map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>

                                        <select
                                            name="month"
                                            className="w-1/3 p-4 rounded-lg border border-gray-300 bg-white text-center focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                            data-parent="yearOfEnrollment"
                                            value={formData.yearOfEnrollment.month} 
                                            onChange={handleChange}
                                        >
                                            <option value="">Month</option>
                                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                                                <option key={index} value={index + 1}>{month}</option>
                                            ))}
                                        </select>

                                        <select
                                            name="year"
                                            className="w-1/3 p-4 rounded-lg border border-gray-300 bg-white text-center focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                            data-parent="yearOfEnrollment"
                                            value={formData.yearOfEnrollment.year} 
                                            onChange={handleChange}
                                        >
                                            <option value="">Year</option>
                                            {[...Array(100)].map((_, index) => (
                                                <option key={index} value={new Date().getFullYear() - index}>{new Date().getFullYear() - index}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Current Academic Year */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Current Academic Year</label>
                                    <input
                                        type="text"
                                        name="currentAcademicYear"
                                        value={formData.currentAcademicYear}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                        placeholder="Enter your current academic year"
                                    />
                                </div>

                                {/* Extracurricular Activities */}
                                <div>
                                    <label className="block text-gray-700 font-medium ">Extracurricular Activities</label>
                                    <p className="text-gray-600 text-sm mb-2">( Clubs, Student Union, Academic Events, Sports, etc. )</p>
                                    <textarea
                                        name="extracurricularActivities"
                                        value={formData.extracurricularActivities}
                                        onChange={handleChange}
                                        className="w-full p-4 h-32 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                        placeholder="Enter your extracurricular activities . . ."
                                    />
                                </div>

                                {/* Academic Projects & Research Work */}
                                <div>
                                    <label className="block text-gray-700 font-medium mb-2">Academic Projects & Research Work</label>
                                    <textarea
                                        name="academicProjects"
                                        value={formData.academicProjects}
                                        onChange={handleChange}
                                        className="w-full p-4 h-32 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                        placeholder="Enter your academic projects & research work . . ."
                                    />
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <button
                                    type="button"
                                    className="px-8 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 cursor-pointer"
                                    onClick={() => setActiveTab("personal")}
                                >
                                    Back
                                </button>
                                <button
                                    type="button"
                                    className="px-8 py-3 bg-[#b24e50] text-white font-semibold rounded-lg shadow-md hover:bg-[#a35f5f] focus:outline-none focus:ring-2 focus:ring-[#b24e50d3] focus:ring-opacity-50 cursor-pointer"
                                    onClick={() => setActiveTab("internship")}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}

                    {activeTab === "internship" && (
                        <>
                            <h2 className="text-xl font-medium text-gray-700 mb-6 ">Internship Information</h2>
                            <div>
                                <div>
                                    <div className="flex items-center gap-6 mt-2">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="status-intern"
                                                value="completed"
                                                checked={internStatus === "completed"}
                                                className="accent-[#b24e50]"
                                                onChange={handleStatusChange}
                                            />
                                            <span>Internship Completed</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="status-intern"
                                                value="uncomplete"
                                                checked={internStatus === "uncomplete"}
                                                className="accent-[#b24e50]"
                                                onChange={handleStatusChange}
                                            />
                                            <span>No Internship Experience</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Show additional form if "Internship Completed" is selected */}
                                {internStatus === "completed" && (
                                    <div className="mt-6">
                                        <div className="space-y-6">
                                            
                                            {/* Company / Organization for Internship */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Company / Organization for Internship</label>
                                                <input
                                                    type="text"
                                                    name="company" 
                                                    value={formData.internship.company}
                                                    onChange={handleChange}
                                                    data-section="internship"
                                                    className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                    placeholder="Enter your company / organization for internship"
                                                />
                                            </div>

                                            {/* Internship Position */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Internship Position</label>
                                                <input
                                                    type="text"
                                                    name="position" 
                                                    value={formData.internship.position}
                                                    onChange={handleChange} 
                                                    data-section="internship"
                                                    className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                    placeholder="Enter your internship position"
                                                />
                                            </div>

                                            {/* Internship Duration */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Internship Duration</label>
                                                <input
                                                    type="text"
                                                    name="duration" 
                                                    value={formData.internship.duration}
                                                    onChange={handleChange} 
                                                    data-section="internship"
                                                    className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                    placeholder="Enter your internship duration"
                                                />
                                            </div>

                                            {/* Responsibilities and Tasks */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Responsibilities and Tasks</label>
                                                <textarea
                                                    name="task"
                                                    value={formData.internship.task}
                                                    onChange={handleChange}
                                                    data-section="internship"
                                                    className="w-full p-4 h-32 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                    placeholder="Enter your responsibilities and tasks . . ."
                                                />
                                            </div>

                                            {/* Feedback on Internship Experience */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Feedback on Internship Experience</label>
                                                <textarea
                                                    name="experience" 
                                                    value={formData.internship.experience}
                                                    onChange={handleChange} 
                                                    data-section="internship"
                                                    className="w-full p-4 h-32 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                    placeholder="Enter your feedback on internship experience . . ."
                                                />
                                            </div>

                                        </div>
                                        <div className="mt-6 flex justify-between">
                                            <button
                                                className="px-8 py-3 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 cursor-pointer"
                                                onClick={() => setActiveTab("academic")}
                                            >
                                                Back
                                            </button>
                                            <button
                                                className="px-8 py-3 bg-[#b24e50] text-white font-semibold rounded-lg shadow-md hover:bg-[#a35f5f] focus:outline-none focus:ring-2 focus:ring-[#b24e50d3] focus:ring-opacity-50 cursor-pointer"
                                                onClick={() => setActiveTab("career")}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* Proceed to next page if "No Internship Experience" is selected */}
                    {internStatus === "uncomplete" && (
                                    <div className="mt-6">
                                        <button className="px-8 py-3 bg-[#b24e50] text-white font-semibold rounded-lg shadow-md hover:bg-[#a35f5f] focus:outline-none focus:ring-2 focus:ring-[#b24e50d3] focus:ring-opacity-50 cursor-pointer"
                                        onClick={() => setActiveTab("career")}>
                                            Next
                                        </button>
                                    </div>
                                )}

                    {activeTab === "career" && (
                        <>
                            <h2 className="text-xl font-medium text-gray-700 mb-6 ">Career Information</h2>

                            <div>
                                <div>
                                    <div className="flex items-center gap-6 mt-2">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="status-career"
                                                value="employed"
                                                checked={careerStatus === "employed"}
                                                className="accent-[#b24e50]"
                                                onChange={handleStatusChange}
                                            />
                                            <span>Employed</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="status-career"
                                                value="studying"
                                                checked={careerStatus === "studying"}
                                                className="accent-[#b24e50]"
                                                onChange={handleStatusChange}
                                            />
                                            <span>Pursuing Further Education</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="status-career"
                                                value="unemployed"
                                                checked={careerStatus === "unemployed"}
                                                className="accent-[#b24e50]"
                                                onChange={handleStatusChange}
                                            />
                                            <span>Unemployed</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Show form if "Employed" is selected */}
                                {careerStatus === "employed" && (
                                    <div className="mt-6">
                                        <div className="space-y-6">

                                            {/* Company / Organization Name */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Company / Organization Name</label>
                                                <input
                                                    type="text"
                                                    name="company" 
                                                    value={formData.career.company}
                                                    onChange={handleChange} 
                                                    data-section="career" 
                                                    className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                    placeholder="Enter your company / organization name"
                                                />
                                            </div>

                                            {/* Job Position */}
                                            <div>
                                                <label className="block text-gray-700 font-medium mb-2">Job Position</label>
                                                <input
                                                    type="text"
                                                    name="position" 
                                                    value={formData.career.position}
                                                    onChange={handleChange} 
                                                    data-section="career"
                                                className="w-full p-4 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                placeholder="Enter your job position"
                                            />
                                        </div>

                                        {/* "Date of Employment */}
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Date of Employment</label>
                                            <div className="flex gap-2 mt-2">
                                                <select
                                                    name="day"
                                                    className="w-1/3 p-4 rounded-lg border border-gray-300 bg-white text-center focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                >
                                                    <option value="">Day</option>
                                                    {[...Array(31)].map((_, index) => (
                                                        <option key={index} value={index + 1}>{index + 1}</option>
                                                    ))}
                                                </select>

                                                <select
                                                    name="month"
                                                    className="w-1/3 p-4 rounded-lg border border-gray-300 bg-white text-center focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                >
                                                    <option value="">Month</option>
                                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                                                        <option key={index} value={index + 1}>{month}</option>
                                                    ))}
                                                </select>

                                                <select
                                                    name="year"
                                                    className="w-1/3 p-4 rounded-lg border border-gray-300 bg-white text-center focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                >
                                                    <option value="">Year</option>
                                                    {[...Array(100)].map((_, index) => (
                                                        <option key={index} value={new Date().getFullYear() - index}>{new Date().getFullYear() - index}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        {/* Responsibilities and Tasks */}
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Responsibilities and Tasks</label>
                                            <input
                                                type="text"
                                                name="task"
                                                onChange={handleChange} 
                                                data-section="career"
                                                className="w-full pt-4 pl-4 py-20 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                placeholder="Enter your responsibilities and tasks . . ."
                                            />
                                        </div>

                                        {/* Feedback on  Work Experience */}
                                        <div>
                                            <label className="block text-gray-700 font-medium mb-2">Feedback on Work Experience</label>
                                            <input
                                                type="text"
                                                name="experience" onChange={handleChange} 
                                                data-section="career"
                                                className="w-full pt-4 pl-4 py-20 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-[#b24e50] focus:outline-none"
                                                placeholder="Enter your feedback on work experience . . ."
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-center items-center">
                                        <button className="px-8 py-3 bg-[#b24e50] text-white font-semibold rounded-lg shadow-md hover:bg-[#a35f5f] focus:outline-none focus:ring-2 focus:ring-[#b24e50d3] focus:ring-opacity-50 cursor-pointer" 
                                        onClick={() => navigate("/dashboard")}>
                                            Submit
                                        </button>
                                    </div>


                                </div>
                            )}

                            {/* Submit button for "Pursuing Further Education" or "Unemployed" */}
                            {(careerStatus === "studying" || careerStatus === "unemployed") && (
                            <div className="mt-6 flex justify-center items-center">
                                <button className="px-8 py-3 bg-[#b24e50] text-white font-semibold rounded-lg shadow-md hover:bg-[#a35f5f] focus:outline-none focus:ring-2 focus:ring-[#b24e50d3] focus:ring-opacity-50 cursor-pointer"
                                onClick={() => navigate("/dashboard")}>
                                    Submit
                                </button>
                            </div>
                        )}

                        </div>
                    </>
                )}

            </form>
        </div>
        </div>
    );
}

export default GraduateForm;
