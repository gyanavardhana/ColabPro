import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react';

const AdviceSection = ({ title, tips, isOpen, toggle }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    <button
      className="w-full px-6 py-4 flex justify-between items-center bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
      onClick={toggle}
    >
      <h3 className="text-xl font-bold text-blue-800">{title}</h3>
      {isOpen ? <ChevronUp className="text-blue-500" /> : <ChevronDown className="text-blue-500" />}
    </button>
    {isOpen && (
      <div className="px-6 py-4">
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <Circle className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-blue-500" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

const ProgressTracker = ({ completedSections, totalSections }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-8">
    <h3 className="text-xl font-bold mb-4 text-gray-800">Your Progress</h3>
    <div className="flex items-center">
      <div className="flex-grow bg-gray-200 rounded-full h-2 mr-4">
        <div
          className="bg-green-500 rounded-full h-2"
          style={{ width: `${(completedSections / totalSections) * 100}%` }}
        ></div>
      </div>
      <span className="text-lg font-semibold text-gray-700">
        {completedSections}/{totalSections}
      </span>
    </div>
  </div>
);

const CareerAdvice = () => {
  const [openSections, setOpenSections] = useState([]);
  const [completedSections, setCompletedSections] = useState(0);

  const adviceSections = [
    {
      title: "Resume Writing Tips",
      tips: [
        "Tailor your resume to each job application.",
        "Highlight your relevant skills and experiences.",
        "Use action verbs to describe your accomplishments.",
        "Keep your resume concise and easy to read.",
      ]
    },
    {
      title: "Interview Techniques",
      tips: [
        "Research the company and prepare questions to ask.",
        "Practice answering common interview questions.",
        "Dress appropriately and arrive on time.",
        "Communicate confidently and clearly.",
      ]
    },
    {
      title: "Career Growth Insights",
      tips: [
        "Set clear goals and develop a plan to achieve them.",
        "Seek out learning opportunities and professional development.",
        "Build relationships with mentors and network within your industry.",
        "Stay adaptable and open to new opportunities.",
      ]
    },
    {
      title: "Additional Career Tips",
      tips: [
        "Always follow up after an interview with a thank-you note or email.",
        "Develop a strong online presence through LinkedIn and professional portfolios.",
        "Practice continuous self-assessment and seek feedback from colleagues and superiors.",
        "Stay updated with industry trends and new technologies in your field.",
      ]
    },
  ];

  const toggleSection = (index) => {
    setOpenSections(prev => {
      const isCurrentlyOpen = prev.includes(index);
      const newOpenSections = prev.filter(i => i !== index);
      if (!isCurrentlyOpen) {
        newOpenSections.push(index);
      }
      setCompletedSections(newOpenSections.length);
      return newOpenSections;
    });
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold -mt-28 text-center text-gray-800">Career Advice</h1>
      
      <ProgressTracker completedSections={completedSections} totalSections={adviceSections.length} />

      <div className="space-y-6">
        {adviceSections.map((section, index) => (
          <AdviceSection
            key={index}
            title={section.title}
            tips={section.tips}
            isOpen={openSections.includes(index)}
            toggle={() => toggleSection(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CareerAdvice;