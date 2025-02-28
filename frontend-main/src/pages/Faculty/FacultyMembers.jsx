import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockData from "../../components/ui/mockData.jsx";
import InfoCard from "../../components/ui/InfoCard.jsx";
import { Search, ArrowLeft } from "lucide-react";

function FacultyMembers() {
  const { faculty } = useParams();
  const navigate = useNavigate();
  const [searchFaculty, setSearchFaculty] = useState(faculty || "");
  const [filteredGraduates, setFilteredGraduates] = useState([]); // Change to filteredGraduates

  // Update the list of graduates based on search input
  useEffect(() => {
    if (searchFaculty) {
      const matchedGraduates = mockData.filter((item) =>
        item.faculty.toLowerCase().includes(searchFaculty.toLowerCase())
      );
      setFilteredGraduates(matchedGraduates); // Use setFilteredGraduates instead of setFilteredStudents
    } else {
      setFilteredGraduates([]);
    }
  }, [searchFaculty]);

  // Handler for Search icon click
  const handleSearchClick = () => {
    if (searchFaculty) {
      const matchedGraduates = mockData.filter((item) =>
        item.faculty.toLowerCase().includes(searchFaculty.toLowerCase())
      );
      setFilteredGraduates(matchedGraduates); // Use setFilteredGraduates
    }
  };

  return (
    <div className="p-4 bg-[#FEEDED] min-h-screen">
      {/* Header with Back Button and Search in the same line */}
      <div className="relative flex items-center mt-4 mb-10">
        {/* Back Button - positioned absolutely on the left */}
        <div className="absolute left-0 z-10">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-700 hover:text-black transition-colors duration-300 flex items-center gap-2 ml-6 cursor-pointer sm:ml-4 md:ml-6 lg:ml-8"
          >
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Search Bar - exactly w-1/2 and centered */}
        <div className="w-full flex justify-center ">
          <div className="w-3/5 flex items-center border rounded-lg p-2 bg-white">
            <input
              type="text"
              placeholder="Search faculty..."
              className="w-full p-2 outline-none"
              value={searchFaculty}
              onChange={(e) => setSearchFaculty(e.target.value)}
            />
            <Search
              className="text-gray-500 ml-2 cursor-pointer"
              onClick={handleSearchClick}
            />
          </div>
        </div>
      </div>

      <div className="sm:ml-8 sm:mr-8 md:ml-16 md:mr-16 lg:ml-16 lg:mr-16 xl:ml-16 xl:mr-16">
        <h1 className="text-xl font-bold">
          {searchFaculty ? `Graduates in ${searchFaculty}` : "Search for a faculty"}
        </h1>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[200px]">
          {filteredGraduates.length > 0 ? (
            filteredGraduates.map((item) => <InfoCard key={item.id} item={item} />)
          ) : (
            <div className="flex justify-center items-center w-full col-span-3">
              <p className="text-gray-500 text-lg">No graduates found.</p> {/* Changed text to "graduates" */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacultyMembers;
