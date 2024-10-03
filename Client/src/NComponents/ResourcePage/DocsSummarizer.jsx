import React, { useState } from 'react';
import { Search } from 'lucide-react';

const TechnologyCard = ({ name, description, imageUrl }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
    <div className="h-48 p-4 flex items-center justify-center bg-gray-100">
      <img 
        src={imageUrl} 
        alt={name} 
        className="max-h-full max-w-full object-contain"
      />
    </div>
    <div className="p-6 flex-grow">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const DocsSummarizer = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const technologies = [
    {
      name: 'React',
      description: 'A JavaScript library for building user interfaces.',
      imageUrl: 'https://reactjs.org/logo-og.png'
    },
    {
      name: 'Node.js',
      description: 'An open-source, cross-platform JavaScript runtime environment.',
      imageUrl: 'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg'
    },
    {
      name: 'Python',
      description: 'A high-level programming language known for its simplicity and readability.',
      imageUrl: 'https://www.python.org/static/community_logos/python-logo.png'
    },
    {
      name: 'Angular',
      description: 'One framework. Mobile & desktop.',
      imageUrl: 'https://angular.io/assets/images/logos/angular/angular.png'
    },
    {
      name: 'Vue.js',
      description: 'The progressive JavaScript framework.',
      imageUrl: 'https://vuejs.org/images/logo.png'
    },
    {
      name: 'Django',
      description: 'The web framework for perfectionists with deadlines.',
      imageUrl: 'https://www.djangoproject.com/s/img/logos/django-logo-negative.png'
    },
    {
      name: 'Express.js',
      description: 'Fast, unopinionated, minimalist web framework for Node.js.',
      imageUrl: 'https://expressjs.com/images/express-facebook-share.png'
    }
  ];

  const filteredTechnologies = technologies.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Discover Technologies</h1>
      
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search technologies..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {filteredTechnologies.length === 0 ? (
        <p className="text-center text-gray-600">No technologies found. Try a different search term.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTechnologies.map((technology, index) => (
            <TechnologyCard
              key={index}
              name={technology.name}
              description={technology.description}
              imageUrl={technology.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DocsSummarizer;