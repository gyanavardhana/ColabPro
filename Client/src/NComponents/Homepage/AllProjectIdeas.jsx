import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLink, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import projectidea from '../projectidea.jpg';

const IdeaCard = ({ title, skills, ideaData }) => {
  const navigate = useNavigate();
  const [showAllSkills, setShowAllSkills] = useState(false);
  const skillsList = skills.split(',').map(skill => skill.trim());
  const displayedSkills = showAllSkills ? skillsList : skillsList.slice(0, 3);

  const handleButtonClick = () => {
    const { memberId, organizationId } = ideaData;
    if (memberId) {
      navigate(`/message-app/${memberId}`);
    } else {
      navigate(`/message-app/${organizationId}`);
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 flex flex-col w-80 h-[460px]">
      <img src={projectidea} alt="Project Idea" className="w-full h-48 object-cover" />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font-bold text-xl mb-4">{title}</h3>
        <div className="mb-4 flex-grow">
          <p className="text-sm font-semibold text-gray-900 mb-2">Skills required:</p>
          <div className="flex flex-wrap gap-2">
            {displayedSkills.map((skill, index) => (
              <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
            {skillsList.length > 3 && !showAllSkills && (
              <button 
                onClick={() => setShowAllSkills(true)}
                className="text-amber-500 hover:text-amber-600 text-xs font-medium"
              >
                +{skillsList.length - 3} more
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="flex justify-end">
          <button 
            onClick={handleButtonClick} 
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-300 flex items-center"
          >
            <FaLink size={16} className="mr-2" />
            Connect
          </button>
        </div>
      </div>
    </div>
  );
};


const IdeaCardContainer = ({ cards }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative px-4 py-4 bg-gray-200 rounded-lg shadow-inner">
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth gap-6 pb-4"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {cards.map((idea) => (
          <div key={idea._id} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <IdeaCard
              title={idea.title}
              skills={idea.skillsRequired.join(", ")}
              ideaData={idea}
            />
          </div>
        ))}
      </div>
      {cards.length > 1 && (
        <>
          <button 
            onClick={() => scroll('left')} 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-800 hover:text-amber-500 z-10"
          >
            <FaChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md text-gray-800 hover:text-amber-500 z-10"
          >
            <FaChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};
const AllProjectsIdeas = () => {
  axios.defaults.withCredentials = true;
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        console.log(`${import.meta.env.VITE_APP_URL}everyprojectidea`);
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}everyprojectidea`);
        setIdeas(response.data);
      } catch (error) {
        console.error('Error fetching project ideas:', error);
      }
    };
    fetchIdeas();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-gray-900 ">Project Ideas</h2>
        <IdeaCardContainer cards={ideas} />
      </div>
    </div>
  );
};

export { AllProjectsIdeas, IdeaCardContainer };