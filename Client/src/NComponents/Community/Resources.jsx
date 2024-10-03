import React from 'react';
import { BookOpen, GraduationCap, Code } from 'lucide-react';

const ResourceCard = ({ title, description, icon: Icon, linkText, linkHref }) => (
  <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 text-blue-500 mr-3" />
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    <p className="text-gray-600 mb-4">{description}</p>
    <a 
      href={linkHref} 
      className="inline-block bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300"
    >
      {linkText}
    </a>
  </div>
);

const Resources = () => {
  const resources = [
    {
      title: "AI Blogs",
      description: "Dive into insightful AI blogs covering machine learning, deep learning, NLP, and emerging trends in artificial intelligence.",
      icon: BookOpen,
      linkText: "Explore Blogs",
      linkHref: "#blogs"
    },
    {
      title: "Online Courses",
      description: "Enhance your AI skills with top-rated online courses from leading instructors and prestigious universities worldwide.",
      icon: GraduationCap,
      linkText: "Browse Courses",
      linkHref: "#courses"
    },
    {
      title: "AI Libraries",
      description: "Discover cutting-edge AI libraries and frameworks like TensorFlow, PyTorch, and scikit-learn for building powerful AI applications.",
      icon: Code,
      linkText: "View Libraries",
      linkHref: "#libraries"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12  min-h-screen">
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">AI Resources Hub</h1>
      <p className="text-xl text-center text-gray-600 mb-12">Your gateway to AI knowledge and tools</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>
    </div>
  );
};

export default Resources;