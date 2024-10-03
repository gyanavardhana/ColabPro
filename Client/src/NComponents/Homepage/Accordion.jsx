import React, { useState } from "react";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-10 px-4 md:px-10 border-b border-gray-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="md:w-2/3">
            {items.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-300 pb-4 mb-4 cursor-pointer"
                onClick={() => handleItemClick(index)}
              >
                <h3 className="text-3xl font-medium text-gray-900 mb-2">
                  {item.title}
                </h3>
                {(activeIndex === index ||
                  (activeIndex === null && index === 0)) && (
                  <p className="text-lg text-gray-700">{item.description}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 mx-auto max-w-full">
            <img
              src={items[activeIndex]?.image || ""}
              alt="Accordion Image"
              className="w-full h-64 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
