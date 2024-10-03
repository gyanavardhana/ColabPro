import React, { useState } from 'react';
import { Code, Paintbrush, Dumbbell, Calendar, Clock, Award } from 'lucide-react';

const ChallengeCard = ({ title, description, icon: Icon, details, startDate }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-blue-500 mr-3" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className={`overflow-hidden transition-max-height duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
        <ul className="space-y-2 mb-4">
          {Object.entries(details).map(([key, value]) => (
            <li key={key} className="flex items-center">
              <span className="font-semibold mr-2">{key}:</span> {value}
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">Starts: {startDate}</span>
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300">
            Join Challenge
          </button>
        </div>
      </div>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="mt-4 text-blue-500 hover:text-blue-600 transition-colors duration-300"
      >
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

const CommunityChallengesPage = () => {
  const challenges = [
    {
      title: "30-Day Coding Challenge",
      description: "Boost your coding skills with daily programming tasks!",
      icon: Code,
      details: {
        Duration: "30 days",
        Skills: "Programming, Problem Solving",
        Level: "Beginner to Intermediate",
        Rewards: "Certificates, Recognition"
      },
      startDate: "September 1, 2024"
    },
    {
      title: "UI/UX Design Sprint",
      description: "Create innovative user interfaces in our design challenge!",
      icon: Paintbrush,
      details: {
        Theme: "User Interface Design",
        Duration: "2 weeks",
        Tools: "Figma, Adobe XD, Sketch",
        Rewards: "Portfolio Showcase, Mentorship"
      },
      startDate: "August 15, 2024"
    },
    {
      title: "Tech Fitness Challenge",
      description: "Balance your digital life with our community fitness program!",
      icon: Dumbbell,
      details: {
        Activities: "Running, Yoga, Strength Training",
        Duration: "1 month",
        Support: "Fitness Tips, Group Workouts",
        Rewards: "Improved Health, Smart Fitness Tracker"
      },
      startDate: "October 1, 2024"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12  min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">Community Challenges</h1>
      <p className="text-xl text-center text-gray-600 mb-12">Join exciting challenges and grow with our community!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {challenges.map((challenge, index) => (
          <ChallengeCard key={index} {...challenge} />
        ))}
      </div>
    </div>
  );
};

export default CommunityChallengesPage;