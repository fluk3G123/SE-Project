import React from "react";

function SearchCard({ item, onClick, type }) {
  return (
    <div 
      className="p-4 bg-white border rounded-lg mb-2 cursor-pointer hover:bg-gray-100"
      onClick={() => onClick(item[type])} // Send either faculty or career
    >
      <p><strong>{type === "career" ? "Career" : "Faculty"}:</strong> {item[type]}</p>
    </div>
  );
}

export default SearchCard;
