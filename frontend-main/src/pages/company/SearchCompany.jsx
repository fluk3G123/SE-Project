import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import mockData from "../../components/ui/mockData.jsx";
import SearchCard from "../../components/ui/SearchCard.jsx";

function SearchCompany() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ดึงเฉพาะบริษัท (ไม่ซ้ำกัน)
  const companies = [...new Set(mockData.map(item => item.company))]; // Change 'faculty' to 'company'

  // กรองบริษัทตามคำค้นหา
  const filteredCompanies = companies.filter(company =>
    company.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // Handler for Search icon click
  const handleSearchClick = () => {
    // Trigger the filtering manually when the icon is clicked
    setSearchTerm(searchTerm.trim());
  };

  return (
    <div className="p-4 bg-[#FEEDED] min-h-screen">
      <div className="mt-4 mb-10 flex items-center border rounded-lg p-2 w-3/5 mx-auto bg-white">
        <input
          type="text"
          placeholder="Search company..."
          className="w-full p-2 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search
          className="text-gray-500 ml-2 cursor-pointer"
          onClick={handleSearchClick} // Add onClick to trigger search
        />
      </div>

      <div className="ml-16 mr-16">
        <h1 className="text-xl font-bold">Select Company</h1> {/* Change title from Faculty to Company */}

        <div className="mt-4 flex flex-col gap-4">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <SearchCard 
                key={index} 
                item={{ company }} // Change 'faculty' to 'company'
                type="company" // Change type to 'company'
                onClick={() => navigate(`/companies/${company}`)} // Go to company page
              />
            ))
          ) : (
            <p className="text-center text-gray-500">{/* Change message to 'No companies found' */}No companies found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchCompany;
