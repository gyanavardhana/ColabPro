import React, { useState } from "react";
import NavigationBar from "../Homepage/Navigationbar";
import OrganizationProjects from "./OrganizationProjects";
import OrganizationProfile from "./OrganizationProfile";
import OrganizationProjectIdeas from "./OrganizationProjectIdeas";
import { FaBuilding, FaProjectDiagram, FaLightbulb } from "react-icons/fa";

const OrganizationDashboard = () => {
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
          <h1 className="text-2xl font-bold p-6 text-white ">Organization Dashboard</h1>
          <ul className="mt-4">
            {["Profile", "Projects", "Project Ideas"].map((option) => (
              <li
                key={option}
                className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
                  selectedOption === option
                    ? "bg-gray-800 border-l-4 border-amber-400 text-amber-400"
                    : "hover:bg-gray-600 hover:text-amber-400 "
                }`}
                onClick={() => handleOptionChange(option)}
              >
                {option === "Profile" && <FaBuilding className="mr-3" />}
                {option === "Projects" && <FaProjectDiagram className="mr-3" />}
                {option === "Project Ideas" && <FaLightbulb className="mr-3" />}
                {option}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-100">
          <div className="bg-gray-100">
            {selectedOption === "Profile" && <OrganizationProfile />}
            {selectedOption === "Projects" && <OrganizationProjects />}
            {selectedOption === "Project Ideas" && <OrganizationProjectIdeas />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;