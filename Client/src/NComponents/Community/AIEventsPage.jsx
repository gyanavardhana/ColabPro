import React, { useState } from 'react';
import { Search, MapPin, Globe } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "AI Summit 2024",
    description: "Join us for the AI Summit 2024, where experts from around the world will gather to discuss the latest advancements in artificial intelligence.",
    date: "September 15-17, 2024",
    location: "Virtual Event",
    isVirtual: true,
  },
  {
    id: 2,
    title: "AI Expo 2024",
    description: "Experience the future of AI at the AI Expo 2024, featuring cutting-edge technologies, keynote presentations, and networking opportunities.",
    date: "November 10-12, 2024",
    location: "Convention Center, San Francisco",
    isVirtual: false,
  },
  {
    id: 3,
    title: "AI Conference 2024",
    description: "Don't miss the AI Conference 2024, where industry leaders will share insights and strategies for leveraging AI in business and technology.",
    date: "December 5-7, 2024",
    location: "Hilton Hotel, New York City",
    isVirtual: false,
  },
];

const AIEventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showVirtualOnly, setShowVirtualOnly] = useState(false);

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!showVirtualOnly || event.isVirtual)
  );

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">AI Events</h1>

      <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
        <div className="relative mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search events..."
            className="pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="virtualOnly"
            className="mr-2"
            checked={showVirtualOnly}
            onChange={() => setShowVirtualOnly(!showVirtualOnly)}
          />
          <label htmlFor="virtualOnly" className="text-gray-700">Show virtual events only</label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">{event.title}</h2>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex items-center text-gray-700 mb-2">
                <MapPin size={18} className="mr-2" />
                <p>{event.location}</p>
              </div>
              <div className="flex items-center text-gray-700">
                <Globe size={18} className="mr-2" />
                <p>{event.date}</p>
              </div>
            </div>
            <div className={`p-4 text-white ${event.isVirtual ? 'bg-green-500' : 'bg-blue-500'}`}>
              {event.isVirtual ? 'Virtual Event' : 'In-Person Event'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIEventsPage;