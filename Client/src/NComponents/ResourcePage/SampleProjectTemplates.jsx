import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Code, Cloud, Zap, BarChart } from 'lucide-react';

const ProjectCard = ({ project, isOpen, toggle }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <div 
      className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
      onClick={toggle}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">{project.title}</h2>
        {isOpen ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
      </div>
      <p className="mt-2 text-gray-600">{project.shortDescription}</p>
      <div className="mt-4 flex items-center space-x-2">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(project.difficulty)}`}>
          {project.difficulty}
        </span>
        {project.technologies.map((tech, index) => (
          <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-xs font-semibold text-gray-700">
            {tech}
          </span>
        ))}
      </div>
    </div>
    {isOpen && (
      <div className="px-6 py-4 border-t border-gray-200">
        <p className="mb-4"><strong>Description:</strong> {project.description}</p>
        <p className="mb-4"><strong>Technologies Used:</strong> {project.technologies.join(', ')}</p>
        <p className="mb-4"><strong>Skills Required:</strong> {project.skills.join(', ')}</p>
        <p><strong>Project Scope:</strong> {project.scope}</p>
      </div>
    )}
  </div>
);

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-green-100 text-green-800';
    case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const SampleProjectTemplate = () => {
  const [openProjects, setOpenProjects] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const projects = [
    {
      title: "To-Do List Application",
      shortDescription: "A simple to-do list app for task management.",
      description: "A simple to-do list application where users can add, edit, and delete tasks.",
      technologies: ["React", "CSS"],
      skills: ["React.js", "State management", "Event handling"],
      difficulty: "Beginner",
      scope: "Suitable for learning React fundamentals. Can be expanded with features like task completion, task categories, and more advanced UI/UX design."
    },
    {
      title: "Weather App",
      shortDescription: "Weather application displaying current conditions and forecast.",
      description: "A weather application that displays the current weather conditions, forecast, and temperature for a specified location.",
      technologies: ["React", "CSS", "OpenWeatherMap API"],
      skills: ["React.js", "API integration", "Asynchronous JavaScript"],
      difficulty: "Intermediate",
      scope: "Requires API integration and data fetching. Offers opportunities for learning about handling asynchronous operations in React."
    },
    {
      title: "E-commerce Platform",
      shortDescription: "Fully functional online store with product listings and cart.",
      description: "An e-commerce platform where users can browse products, add items to cart, and complete a checkout process.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      skills: ["Full-stack development", "Database management", "State management (Redux)", "Payment integration"],
      difficulty: "Advanced",
      scope: "Comprehensive project covering both frontend and backend. Includes complex state management, user authentication, and possibly integration with payment gateways."
    },
    {
      title: "Blog Application",
      shortDescription: "A platform for creating and sharing blog posts.",
      description: "A blogging platform where users can create, edit, and publish blog posts, as well as comment on other posts.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      skills: ["Full-stack development", "User authentication", "Rich text editing"],
      difficulty: "Intermediate",
      scope: "Covers user authentication, database interactions, and potentially rich text editing. Can be expanded with features like categories, tags, and user profiles."
    },
    {
      title: "Data Visualization Dashboard",
      shortDescription: "Interactive dashboard for visualizing complex datasets.",
      description: "An interactive dashboard that visualizes complex datasets using various chart types and allows users to filter and explore the data.",
      technologies: ["React", "D3.js", "CSS"],
      skills: ["Data visualization", "React.js", "D3.js", "Data manipulation"],
      difficulty: "Advanced",
      scope: "Focuses on data visualization techniques and working with large datasets. Challenges include creating responsive and interactive visualizations."
    }
  ];

  const toggleProject = (index) => {
    setOpenProjects(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const filteredProjects = difficultyFilter === 'All' 
    ? projects 
    : projects.filter(project => project.difficulty === difficultyFilter);

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-bold mb-8 mt-8 text-center text-gray-800">Project Templates</h1>
      
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
            <button
              key={difficulty}
              className={`px-4 py-2 text-sm font-medium ${
                difficultyFilter === difficulty
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200 ${
                difficulty === 'All' ? 'rounded-l-lg' : difficulty === 'Advanced' ? 'rounded-r-lg' : ''
              }`}
              onClick={() => setDifficultyFilter(difficulty)}
            >
              {difficulty}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            isOpen={openProjects.includes(index)}
            toggle={() => toggleProject(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SampleProjectTemplate;