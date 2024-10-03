import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaLink, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import project from '../project.jpg';
const Card = ({ title, content, techused, github, projectInfo }) => {
  const navigate = useNavigate();
  const [showAllTech, setShowAllTech] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const techList = techused.split(',').map(tech => tech.trim());
  const displayedTech = showAllTech ? techList : techList.slice(0, 3);

  const handleButtonClick = () => {
    navigate(`/message-app/${projectInfo.organizationId}`);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 flex flex-col w-80 h-[500px]">
      <img src={project} alt="Image" className="w-full h-48 object-cover" />
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div className="mb-4">
          <h3 className="font-bold text-xl mb-2 text-gray-900">{title}</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {showFullContent ? content : `${content.slice(0, 100)}...`}
          </p>
          {content.length > 100 && (
            <button 
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-amber-500 hover:text-amber-600 text-xs font-medium mt-2"
            >
              {showFullContent ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">Tech Stack:</p>
          <div className="flex flex-wrap gap-2">
            {displayedTech.map((tech, index) => (
              <span key={index} className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                {tech}
              </span>
            ))}
            {techList.length > 3 && !showAllTech && (
              <button 
                onClick={() => setShowAllTech(true)}
                className="text-amber-500 hover:text-amber-600 text-xs font-medium"
              >
                +{techList.length - 3} more
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-auto">
          <a 
            href={github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-700 hover:text-amber-500 transition-colors duration-300 flex items-center"
          >
            <FaGithub size={20} className="mr-2" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
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

const CardContainer = ({ cards }) => {
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
        {cards.map((card) => (
          <div key={card._id} style={{ scrollSnapAlign: 'start', flexShrink: 0 }}>
            <Card
              title={card.title}
              content={card.description}
              techused={card.techUsed.join(', ')}
              github={card.githubLink}
              projectInfo={card}
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
const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_URL}everyproject`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl  font-bold mb-12 text-gray-900 ">Projects By Organizations</h2>
        <CardContainer cards={projects} />
      </div>
    </div>
  );
};

export { AllProjects, CardContainer };