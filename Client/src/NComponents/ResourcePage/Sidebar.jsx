import React from 'react';
import { FaFileAlt, FaNewspaper, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';

const Sidebar = ({ onSelect, selected }) => {
  return (
    <div className="bg-gray-700 text-gray-200 w-64 min-h-screen shadow-lg">
      <div className="p-6 bg-gray-700">
        <h2 className="text-2xl font-bold text-white">Menu</h2>
      </div>
      <ul className="mt-4 flex-1 overflow-y-auto">
        <li
          onClick={() => onSelect('docs')}
          className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
            selected === 'docs'
              ? 'bg-gray-800 border-l-4 border-amber-500 text-amber-500'
              : 'hover:bg-gray-600 hover:text-amber-500'
          }`}
        >
          <FaFileAlt className="mr-3" />
          Docs Summarizer
        </li>
        <li
          onClick={() => onSelect('news')}
          className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
            selected === 'news'
              ? 'bg-gray-800 border-l-4 border-amber-500 text-amber-500'
              : 'hover:bg-gray-600 hover:text-amber-500'
          }`}
        >
          <FaNewspaper className="mr-3" />
          News Feed
        </li>
        <li
          onClick={() => onSelect('careeradvice')}
          className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
            selected === 'careeradvice'
              ? 'bg-gray-800 border-l-4 border-amber-500 text-amber-500'
              : 'hover:bg-gray-600 hover:text-amber-500'
          }`}
        >
          <FaChalkboardTeacher className="mr-3" />
          Career Advice
        </li>
        <li
          onClick={() => onSelect('templates')}
          className={`p-4 flex items-center cursor-pointer transition-colors duration-200 ${
            selected === 'templates'
              ? 'bg-gray-800 border-l-4 border-amber-500 text-amber-500'
              : 'hover:bg-gray-600 hover:text-amber-500'
          }`}
        >
          <FaClipboardList className="mr-3" />
          Sample Project Templates
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
