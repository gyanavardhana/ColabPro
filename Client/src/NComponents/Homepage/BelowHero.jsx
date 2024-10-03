import React from "react";
import { useNavigate } from "react-router-dom";
import Accordion from "./Accordion"; // Adjust the path as necessary
import organization from "../../assets/organization.png";
import projectOwners from "../../assets/owner.png";
import teamMembers from "../../assets/team4.png";

const BelowHero = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("/signup");
  };

  const howItWorksItems = [
    {
      title: "Propose Ideas",
      description: "Submit and brainstorm project ideas.",
      image: "src/assets/organization.png", // Replace with actual image path
    },
    {
      title: "Create Projects",
      description: "Transform ideas into actionable projects.",
      image: "src/assets/organization.png", // Replace with actual image path
    },
    {
      title: "Manage Tasks",
      description: "Assign responsibilities and set milestones.",
      image: "src/assets/organization.png", // Replace with actual image path
    },
    {
      title: "Collaborate & Communicate",
      description: "Use built-in chat and notifications.",
      image: "src/assets/organization.png", // Replace with actual image path
    },
  ];

  return (
    <>
      <Accordion items={howItWorksItems} />

      {/* Target Audience Section */}
      <div className="bg-gray-100 py-20 px-4 md:px-10 border-b border-gray-300">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Who Is It For?
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center">
            {/* Audience 1 */}
            <div className="md:w-1/3 mb-8 md:mb-0 flex flex-col items-center">
              <div className="w-full h-48 mb-4">
                <img
                  src={organization}
                  alt="Organizations"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Organizations
              </h3>
              <p className="text-base text-gray-700">
                Streamline project management across departments.
              </p>
            </div>
            {/* Audience 2 */}
            <div className="md:w-1/3 mb-8 md:mb-0 flex flex-col items-center">
              <div className="w-full h-48 mb-4">
                <img
                  src={projectOwners}
                  alt="Project Owners"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Project Owners
              </h3>
              <p className="text-base text-gray-700">
                Effectively manage and track project progress.
              </p>
            </div>
            {/* Audience 3 */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="w-full h-48 mb-4">
                <img
                  src={teamMembers}
                  alt="Team Members"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Team Members
              </h3>
              <p className="text-base text-gray-700">
                Collaborate and stay updated on tasks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-500 py-20 px-4 md:px-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Projects?
        </h1>
        <p className="text-base md:text-lg text-white mb-8">
          Join Project Collaboration Pro and start enhancing your team's
          efficiency today.
        </p>
        <button
          onClick={handleSignup}
          className="bg-white hover:bg-gray-200 text-black text-lg font-semibold py-3 px-8 rounded-md shadow-md transition duration-300"
        >
          Get Started
        </button>
      </div>
    </>
  );
};

export default BelowHero;