import React, { useState } from "react";
import NavigationBar from "../Homepage/Navigationbar";
import MemberProfile from "./MemberProfile";
import MemberProjectIdeas from "./MemberProjectIdeas";
import { FaUser, FaLightbulb } from "react-icons/fa";

const MemberDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Profile");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavigationBar />
      <div className="flex">
        {/* Sidebar */}
        <div className="bg-gray-700 text-gray-200 w-64 min-h-screen shadow-lg">
          <h1 className="text-2xl font-bold p-6  text-white">Member Dashboard</h1>
          <ul className="mt-4">
            <li
              className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
                selectedOption === "Profile"
                  ? "bg-gray-800 border-l-4 border-amber-500 text-amber-500"
                  : "hover:bg-gray-600 hover:text-amber-500"
              }`}
              onClick={() => handleOptionChange("Profile")}
            >
              <FaUser className="mr-3" />
              Profile
            </li>
            <li
              className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
                selectedOption === "Project Ideas"
                  ? "bg-gray-800 border-l-4 border-amber-500 text-amber-500"
                  : "hover:bg-gray-600 hover:text-amber-500"
              }`}
              onClick={() => handleOptionChange("Project Ideas")}
            >
              <FaLightbulb className="mr-3" />
              Project Ideas
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100">
          <div className="bg-gray-100 p-6">
            {selectedOption === "Profile" && <MemberProfile />}
            {selectedOption === "Project Ideas" && <MemberProjectIdeas />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
