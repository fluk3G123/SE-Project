import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InfoCard from "../../components/ui/InfoCard.jsx";
import { Search, ArrowLeft } from "lucide-react";

function CompanyMembers() {
  const { company } = useParams();
  const navigate = useNavigate();
  const [searchCompany, setSearchCompany] = useState(company || "");
  const [graduates, setGraduates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch graduates from backend
  useEffect(() => {
    const fetchGraduates = async () => {
      if (!searchCompany) return;
      setLoading(true);
      try {
        const response = await fetch(`http://127.0.0.1:5000/graduates-by-company?company=${encodeURIComponent(searchCompany)}`);
        if (!response.ok) {
          throw new Error("Failed to fetch graduates");
        }
        const data = await response.json();
        setGraduates(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGraduates();
  }, [searchCompany]);

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
        <div className="w-full flex justify-center">
          <div className="w-3/5 flex items-center border rounded-lg p-2 bg-white">
            <input
              type="text"
              placeholder="Search company..."
              className="w-full p-2 outline-none"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
            />
            <Search className="text-gray-500 ml-2 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="sm:ml-8 sm:mr-8 md:ml-16 md:mr-16 lg:ml-16 lg:mr-16 xl:ml-16 xl:mr-16">
        <h1 className="text-xl font-bold">
          {searchCompany ? `Graduates in ${searchCompany}` : "Search for a company"} 
        </h1>
        
        {loading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">Error: {error}</p>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[200px]">
            {graduates.length > 0 ? (
              graduates.map((item) => <InfoCard key={item.studentId} item={item} />)
            ) : (
              <div className="flex justify-center items-center w-full col-span-3">
                <p className="text-gray-500 text-lg">No graduates found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyMembers;