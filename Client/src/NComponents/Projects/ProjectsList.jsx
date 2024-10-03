import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CardContainer } from "../Homepage/AllProjects";
import NavigationBar from "../Homepage/Navigationbar";

function ProjectsList() {
  const [groupedProjects, setGroupedProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectsAndOrganizations = async () => {
      try {
        setIsLoading(true);
        const projectsResponse = await axios.get(`${import.meta.env.VITE_APP_URL}everyproject`);
        const projects = projectsResponse.data;

        const grouped = {};
        for (const project of projects) {
          if (!grouped[project.organizationId]) {
            const orgResponse = await axios.get(
              `${import.meta.env.VITE_APP_URL}org/getorganizationinfo/${project.organizationId}`
            );
            grouped[project.organizationId] = {
              name: `${orgResponse.data.name}'s Organization Projects`,
              projects: [],
            };
          }
          grouped[project.organizationId].projects.push(project);
        }

        setGroupedProjects(grouped);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectsAndOrganizations();
  }, []);

  const handleConnect = (projectId) => {
    navigate(`/message-app/${projectId}`);
  };

  if (isLoading) return <div>Loading projects...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">All Projects</h2>
        {Object.values(groupedProjects).map((organization, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">{organization.name}</h3>
            <CardContainer 
              cards={organization.projects}
              onConnect={handleConnect}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsList;