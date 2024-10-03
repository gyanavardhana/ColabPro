import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IdeaCardContainer } from "../Homepage/AllProjectIdeas";
import NavigationBar from "../Homepage/Navigationbar";

function ProjectIdeasList() {
  const [groupedProjectIdeas, setGroupedProjectIdeas] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjectIdeas = useCallback(async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}everyprojectidea`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch project ideas");
    }
  }, []);

  const fetchName = useCallback(async (id, isMember) => {
    try {
      const endpoint = isMember ? 'mem/getmemberinfo' : 'org/getorganizationinfo';
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}${endpoint}/${id}`);
      return `${response.data.name}'s ${isMember ? 'Project Ideas' : 'Organization Project Ideas'}`;
    } catch (error) {
      console.error(`Error fetching name for id: ${id}`, error);
      return "Name Unavailable";
    }
  }, []);

  useEffect(() => {
    const groupAndFetchNames = async () => {
      setIsLoading(true);
      try {
        const projectIdeas = await fetchProjectIdeas();
        const groupedIdeas = {};

        for (const idea of projectIdeas) {
          const id = idea.memberId || idea.organizationId;
          if (!groupedIdeas[id]) {
            groupedIdeas[id] = {
              name: await fetchName(id, !!idea.memberId),
              projectIdeas: [],
            };
          }
          groupedIdeas[id].projectIdeas.push(idea);
        }

        setGroupedProjectIdeas(groupedIdeas);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    groupAndFetchNames();
  }, [fetchProjectIdeas, fetchName]);

  if (isLoading) return <div>Loading project ideas...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavigationBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Project Ideas</h2>
        {Object.values(groupedProjectIdeas).map((group, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">{group.name}</h3>
            <IdeaCardContainer cards={group.projectIdeas} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectIdeasList;