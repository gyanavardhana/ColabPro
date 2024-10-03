
const funcitons = [
  {
    title: "Home/Landing Page:",
    content: [
      "Displays all organization projects and project ideas.",
      "Provides links to login/register pages.",
      "Offers an overview of platform functionalities.",
      "Allows members to view project details and contact project leads."
    ]
  },
  {
    title: "Login/Signup Page:",
    content: [
      "Separate forms for Organizations and Members.",
      "Allows registration and login with necessary details."
    ]
  },
  {
    title: "Organization Dashboard:",
    content: [
      "Project creation and management interface.",
      "Posting projects and project ideas.",
      "Managing projects and project ideas.",
      "Access to chat and collaboration features."
    ]
  },
  {
    title: "Organization Listing Page:",
    content: [
      "Lists registered organizations.",
      "Allows organizations to post new projects."
    ]
  },
  {
    title: "Member Dashboard:",
    content: [
      "Browse available projects from various organizations.",
      "Filter projects based on skills, technology, or keywords.",
      "Apply to join project teams.",
      "Access to chat and collaboration features."
    ]
  },
  {
    title: "Project View Page:",
    content: [
      "Detailed information about specific projects.",
      "Includes project description, budget, team members, and open positions.",
      "Chat functionality for project team members.",
      "Option to schedule Google Meet for project discussions."
    ]
  },
  {
    title: "Profile Page:",
    content: [
      "View and edit profile information (skills, experience, etc.)."
    ]
  },
  {
    title: "Project Ideas Page:",
    content: [
      "Lists project ideas posted by organizations seeking members.",
      "Allows members to view idea details and contact project leads."
    ]
  },
  {
    title: "Team Members Page:",
    content: [
      "Lists all members of a specific project.",
      "Provides a profile page for each member, showcasing their skills and experience.",
      "Allows members to chat with each other and project leads."
    ]
  },
  {
    title: "Chat Page:",
    content: [
      "Dedicated chat application for project teams.",
      "Allows real-time communication between members and project leads."
    ]
  }
];
import React from 'react';

const Functionalities = () => {
  return (
    <div className="container mx-auto py-16 bg-gray-100">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900">Platform Functionalities Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {funcitons.map((item, index) => (
          <div key={index} className="p-6 bg-amber-50 rounded-lg shadow-md border-2 border-amber-200 transition-all duration-300 hover:shadow-lg hover:border-amber-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.title}</h3>
            <ul className="list-disc list-inside text-gray-800 space-y-2">
              {item.content.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Functionalities;

