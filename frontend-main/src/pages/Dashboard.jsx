import React, {  useState } from "react";
import { Search } from "lucide-react";
import mockData from "../../src/components/ui/mockData";
import InfoCard from "../../src/components/ui/InfoCard";

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");


  // Filter data based on search input (searching across faculty, career, and company)
  const filteredResults = mockData.filter((item) =>
    item.faculty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.career.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-[#FEEDED] min-h-screen">
      {/* Search Bar */}
      <div className="mt-4 mb-10 flex items-center border rounded-lg p-2 w-3/5 mx-auto bg-white">
        <input
          type="text"
          placeholder="Search Faculty, Career, or Company..."
          className="w-full p-2 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="text-gray-500 ml-2 cursor-pointer" />
      </div>

      {/* Display Results */}
      <div className="sm:ml-8 sm:mr-8 md:ml-16 md:mr-16 lg:ml-16 lg:mr-16 xl:ml-16 xl:mr-16">
        <h1 className="text-xl font-bold">Search Results</h1>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 min-h-[200px]">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => <InfoCard key={item.id} item={item} />)
          ) : (
            <div className="flex justify-center items-center w-full col-span-3">
              <p className="text-gray-500 text-lg">No results found.</p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
