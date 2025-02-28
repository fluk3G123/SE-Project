import React from "react";
import { useNavigate } from "react-router-dom";
import userProfile from "../../assets/userProfile.png";

function InfoCard({ item }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/faculties/${item.faculty}/members/${item.id}`, { state: { item } });
  };

  return (
    <div
      className="bg-white p-4 rounded-2xl shadow-md text-center cursor-pointer hover:shadow-lg transition duration-300"
      onClick={handleClick}
    >
      <img 
        src={item.profileImage || userProfile}  
        alt={`${item.firstname} ${item.lastname}`} 
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-lg font-semibold">{item.firstname} {item.lastname}</h2>
      <p className="text-gray-600">{item.careerPosition} @ {item.careerCompany}</p>
      <p className="text-gray-800 font-medium">{item.faculty}</p>
    </div>
  );
}

export default InfoCard;
