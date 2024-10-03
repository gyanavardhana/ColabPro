import React from 'react';

const MemberBenefits = () => {
  return (
    <div className="container mx-auto py-16 bg-gray-100">
      <h2 className="text-3xl font-semibold mb-8 text-gray-900">Member Benefits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Access to Projects",
            content: "Opportunity to participate in various projects across different domains."
          },
          {
            title: "Skill Development",
            content: "Enhance your skills by working on real-world projects and collaborating with professionals."
          },
          {
            title: "Networking",
            content: "Connect with like-minded individuals and expand your professional network."
          },
          {
            title: "Learning Opportunities",
            content: "Access to resources, workshops, and training sessions to further your knowledge."
          },
          {
            title: "Recognition",
            content: "Recognition for your contributions to projects and the community."
          },
          {
            title: "Career Growth",
            content: "Potential career advancement opportunities through project experience and networking."
          }
        ].map((benefit, index) => (
          <div key={index} className="p-6 bg-amber-50 rounded-lg shadow-md border-2 border-amber-200 transition-all duration-300 hover:shadow-lg hover:border-amber-300">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">{benefit.title}</h3>
            <p className="text-gray-800">{benefit.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberBenefits;
