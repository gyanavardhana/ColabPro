import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { isTokenExpired } from "../../utils/authutils";

const HeroColabPro = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('jwt');
    setIsLoggedIn(token && !isTokenExpired(token));
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div
      className="bg-gray-100 px-4 md:px-10 border-b border-gray-300"
      style={{ marginTop: "64px" }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Streamline Project Management & Collaboration
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Empower your teams with a unified platform for ideation, management, and communication.
        </p>
        {!isLoggedIn && (
          <>
            <button 
              onClick={handleSignupClick} 
              className="bg-amber-500 hover:bg-amber-600 text-white text-xl font-semibold py-3 px-8 rounded-md shadow-md transition duration-300"
            >
              Get Started
            </button>
            <p className="mt-6 text-gray-800">
              Already have an account?{" "}
              <span
                className="cursor-pointer text-amber-600 hover:underline"
                onClick={handleLoginClick}
              >
                Log in now
              </span>
            </p>
          </>
        )}
      </div>
      
      <div className="bg-gray-100 py-10 px-4 md:px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Block 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 mb-5 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl text-amber-500">🌟</span>
            </div>
            <h3 className="text-4xl font-medium text-gray-900 mb-2">
              Centralized Hub
            </h3>
            <p className="text-xl text-gray-700">
              Manage all your projects in one place.
            </p>
          </div>

          {/* Block 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 mb-5 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl text-amber-500">💬</span>
            </div>
            <h3 className="text-4xl font-medium text-gray-900 mb-2">
              Enhanced Collaboration
            </h3>
            <p className="text-xl text-gray-700">
              Real-time chat and seamless communication.
            </p>
          </div>

          {/* Block 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 mb-5 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl text-amber-500">🔒</span>
            </div>
            <h3 className="text-4xl font-medium text-gray-900 mb-2">
              Robust Security
            </h3>
            <p className="text-xl text-gray-700">
              Role-based access control for project confidentiality.
            </p>
          </div>

          {/* Block 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 mb-5 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl text-amber-500">⚙️</span>
            </div>
            <h3 className="text-4xl font-medium text-gray-900 mb-2">
              DevOps Integration
            </h3>
            <p className="text-xl text-gray-700">
              Leverage Docker and Prometheus for scalability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroColabPro;
