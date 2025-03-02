import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchCard from "../../components/ui/SearchCard.jsx";

function FacultySearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ดึงข้อมูลจาก backend
  useEffect(() => {
    const fetchFaculties = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:5000/faculties"); 
        if (!response.ok) {
          throw new Error("Failed to fetch faculties");
        }
        const data = await response.json();
        setFaculties(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculties();
  }, []);

  // กรองคณะตามคำค้นหา
  const filteredFaculties = faculties.filter(faculty =>
    faculty.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="p-4 bg-[#FEEDED] min-h-screen">
      <div className="mt-4 mb-10 flex items-center border rounded-lg p-2 w-3/5 mx-auto bg-white">
        <input
          type="text"
          placeholder="Search faculty..."
          className="w-full p-2 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="text-gray-500 ml-2 cursor-pointer" />
      </div>

      <div className="ml-16 mr-16">
        <h1 className="text-xl font-bold">Select Faculty</h1>
        
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {filteredFaculties.length > 0 ? (
              filteredFaculties.map((faculty, index) => (
                <SearchCard 
                  key={index} 
                  item={{ faculty }}
                  type="faculty" 
                  onClick={() => navigate(`/faculties/${faculty}`)} 
                />
              ))
            ) : (
              <p className="text-center text-gray-500">No faculties found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultySearch;
