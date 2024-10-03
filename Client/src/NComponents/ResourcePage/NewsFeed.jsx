import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

const NewsCard = ({ title, description, category }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
    <div className="p-6">
      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
        {category}
      </span>
      <h3 className="text-xl font-bold mt-2 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const NewsFeed = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const news = [
    {
      id: 1,
      category: 'Technology',
      title: 'New iPhone Model Announced',
      description: 'Apple unveils the latest iPhone model with advanced features.',
    },
    {
      id: 2,
      category: 'Sports',
      title: 'Football Championship Finals',
      description: 'Exciting match between top teams in the football championship finals.',
    },
    {
      id: 3,
      category: 'Business',
      title: 'Stock Market Update',
      description: 'Latest updates on stock market trends and performance.',
    },
    {
      id: 4,
      category: 'Entertainment',
      title: 'New Movie Release',
      description: 'Highly anticipated movie hits theaters this weekend. Get the details here.',
    },
    {
      id: 5,
      category: 'Health',
      title: 'New Study on Nutrition',
      description: 'Researchers reveal findings from a groundbreaking study on nutrition and health.',
    },
  ];

  const categories = ['All', ...new Set(news.map(item => item.category))];

  const filteredNews = news.filter(item =>
    (activeCategory === 'All' || item.category === activeCategory) &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 -mt-28 text-center text-gray-800">News Feed</h1>
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <div className="relative w-full md:w-64 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search news..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400" />
          <div className="flex space-x-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredNews.length === 0 ? (
        <p className="text-center text-gray-600">No news found. Try a different search term or category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item) => (
            <NewsCard
              key={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsFeed;