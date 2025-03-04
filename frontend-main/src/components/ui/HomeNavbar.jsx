import { User, Menu, ChevronLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function HomeNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userData, setUserData] = useState(null); // เก็บข้อมูล current user
  const location = useLocation(); // Get current location/path

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); // ใช้ JWT Token จาก Local Storage
        if (!token) return;

        const response = await fetch('http://127.0.0.1:5000/current-user', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? 'w-16' : 'w-64 md:w-72 lg:w-80 xl:w-96'
        } flex flex-col shrink-0 transition-all duration-300 bg-white shadow-lg min-h-screen`}
      >
        {/* Profile Header */}
        <div className="bg-[#b24e50] p-4 text-white flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center">
              <div className="relative w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white">
                {userData && userData.profileImage ? (
                  <img
                    src={userData.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={24} className="text-gray-400" />
                )}
              </div>
              <div className="ml-3">
                <div className="text-lg font-bold">
                  {userData ? userData.fullName : 'Loading...'}
                </div>
                <div className="text-sm"> {"Faculty : "} 
                  {userData ? userData.faculty : 'Loading...'}
                </div>
                <div className="text-sm"> {"Major : "}
                  {userData ? userData.major : 'Loading...'}
                </div>
              </div>
            </div>
          )}
          {/* Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all"
          >
            {isCollapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 bg-gray-100 overflow-y-auto">
          {[
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Search by Faculty/Field of Study', path: '/faculties' },
            { label: 'Search by Company', path: '/companies' },
            { label: 'Search by Career Field', path: '/careers' },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`border-b border-gray-300 py-4 px-4 hover:bg-gray-200 flex items-center ${
                location.pathname === item.path ? 'bg-gray-300' : ''
              }`} // Apply bg-gray-300 if the path matches
            >
              {isCollapsed ? <div className="w-full text-center">📌</div> : item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeNavbar;
