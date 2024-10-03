import React, { useState } from 'react';
import { BarChart2, Code, Building } from 'lucide-react';

const PollCard = ({ title, question, options, icon: Icon }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [votes, setVotes] = useState(new Array(options.length).fill(0));

  const handleVote = (index) => {
    if (selectedOption === null) {
      const newVotes = [...votes];
      newVotes[index]++;
      setVotes(newVotes);
      setSelectedOption(index);
    }
  };

  const totalVotes = votes.reduce((sum, current) => sum + current, 0);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-blue-500 mr-3" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{question}</p>
      <ul className="space-y-2">
        {options.map((option, index) => (
          <li key={index}>
            <button
              onClick={() => handleVote(index)}
              className={`w-full text-left p-2 rounded-md transition-colors duration-300 ${
                selectedOption === index
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              disabled={selectedOption !== null}
            >
              {option}
            </button>
            {selectedOption !== null && (
              <div className="mt-1">
                <div className="bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{
                      width: `${(votes[index] / totalVotes) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm text-gray-500">
                  {((votes[index] / totalVotes) * 100).toFixed(1)}% ({votes[index]} votes)
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
      {selectedOption === null && (
        <p className="mt-4 text-sm text-gray-500">Click an option to vote</p>
      )}
      {selectedOption !== null && (
        <p className="mt-4 text-sm text-gray-500">Total votes: {totalVotes}</p>
      )}
    </div>
  );
};

const PollsPage = () => {
  const polls = [
    {
      title: "Favorite Programming Language",
      question: "What is your favorite programming language?",
      options: ["JavaScript", "Python", "Java", "C++", "Other"],
      icon: Code,
    },
    {
      title: "Best Framework for Web Development",
      question: "Which framework do you prefer for web development?",
      options: ["React", "Angular", "Vue.js", "Express.js", "Other"],
      icon: BarChart2,
    },
    {
      title: "Favorite Tech Company",
      question: "Which tech company do you admire the most?",
      options: ["Google", "Apple", "Microsoft", "Amazon", "Other"],
      icon: Building,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">Tech Polls</h1>
      <p className="text-xl text-center text-gray-600 mb-12">Share your opinions on the latest in tech</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {polls.map((poll, index) => (
          <PollCard key={index} {...poll} />
        ))}
      </div>
    </div>
  );
};

export default PollsPage;