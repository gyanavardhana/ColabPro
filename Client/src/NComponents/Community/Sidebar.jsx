import React from 'react';
import { FaComments, FaTasks, FaPoll, FaProjectDiagram, FaBook, FaCalendarAlt } from 'react-icons/fa';

const Sidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-gray-700 text-gray-200 w-72 min-h-screen shadow-lg">
      <h2 className="text-2xl font-bold p-6 text-white">Menu</h2>
      <ul className="mt-4">
        <li
          onClick={() => onTabChange('discussions')}
          className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
            activeTab === 'discussions'
              ? 'bg-gray-800 border-l-4 border-amber-500 text-amber-500'
              : 'hover:bg-gray-600 hover:text-amber-500'
          }`}
        >
          <FaComments className="mr-3" />
          Discussions
        </li>
        <li
          onClick={() => onTabChange('community-challenges')}
          className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
            activeTab === 'community-challenges'
              ? 'bg-gray-800 border-l-4 border-amber-500 text-amber-500'
              : 'hover:bg-gray-600 hover:text-amber-500'
          }`}
        >
          <FaTasks className="mr-3" />
          Community Challenges
        </li>
        <li
          onClick={() => onTabChange('polls')}
          className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
            activeTab === 'polls'
              ? 'bg-gray-800 border-l-4 border-amber-500 text-amber-500'
              : 'hover:bg-gray-600 hover:text-amber-500'
          }`}
        >
          <FaPoll className="mr-3" />
          Polls
        </li>
        <li
          onClick={() => onTabChange('ai-projects')}
          className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
            activeTab === 'ai-projects'
              ? 'bg-gray-800 border-l-4 border-amber-500 text-amber-500'
              : 'hover:bg-gray-600 hover:text-amber-500'
          }`}
        >
          <FaProjectDiagram className="mr-3" />
          Project Analysis
        </li>
        <li
          onClick={() => onTabChange('ai-resources')}
          className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
            activeTab === 'ai-resources'
              ? 'bg-gray-800 border-l-4 border-amber-500 text-amber-500'
              : 'hover:bg-gray-600 hover:text-amber-500'
          }`}
        >
          <FaBook className="mr-3" />
          AI Resources
        </li>
        <li
          onClick={() => onTabChange('ai-events')}
          className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
            activeTab === 'ai-events'
              ? 'bg-gray-800 border-l-4 border-amber-500 text-amber-500'
              : 'hover:bg-gray-600 hover:text-amber-500'
          }`}
        >
          <FaCalendarAlt className="mr-3" />
          AI Events
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
