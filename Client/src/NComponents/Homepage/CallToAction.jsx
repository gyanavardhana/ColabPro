import React from 'react';

const StaticContent = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-gray-900">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Latest Blog Posts",
              content: "Check out our latest blog posts for insightful articles on technology trends and industry updates."
            },
            {
              title: "Social Media",
              content: "Connect with us on social media to stay updated with our community events and activities."
            },
            {
              title: "Newsletter",
              content: "Join our newsletter to receive exclusive offers, updates, and tips directly to your inbox."
            }
          ].map((item, index) => (
            <div key={index} className="p-6 bg-amber-50 rounded-lg shadow-md border-2 border-amber-200 transition-all duration-300 hover:shadow-lg hover:border-amber-300">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">{item.title}</h3>
              <p className="text-gray-800">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaticContent;
