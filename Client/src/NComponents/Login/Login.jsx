import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OrganizationLogin from './OrganizationLogin';
import MemberLogin from './MemberLogin';
import ToggleSwitch from './ToggleSwitch';
import NavigationBar from '../Homepage/Navigationbar';
import { FaUserTie, FaUser } from 'react-icons/fa';
import orgImage from '../../assets/mem1.png'; // Replace with actual path
import memImage from '../../assets/org.png'; // Replace with actual path

const Login = () => {
  const [isOrganization, setIsOrganization] = useState(true);

  const toggleLoginType = () => {
    setIsOrganization(!isOrganization);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <NavigationBar />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="md:flex">
            {/* Image and Toggle Section */}
            <div className="md:w-1/2 flex flex-col justify-center items-center bg-amber-200 p-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <FaUserTie className={`text-4xl ${isOrganization ? 'text-indigo-400' : 'text-gray-300'}`} />
                <div className="w-16">
                  <ToggleSwitch
                    checked={isOrganization}
                    onChange={toggleLoginType}
                  />
                </div>
                <FaUser className={`text-4xl ${!isOrganization ? 'text-indigo-400' : 'text-gray-300'}`} />
              </div>
              <motion.img
                key={isOrganization ? 'orgImage' : 'memImage'}
                src={isOrganization ? orgImage : memImage}
                alt={isOrganization ? 'Organization' : 'Member'}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="object-contain max-w-full max-h-full"
              />
              <p className="text-center mt-4 text-lg font-bold">
                {isOrganization ? 'Organization Login' : 'Member Login'}
              </p>
            </div>
            {/* Login Form Section */}
            <div className="md:w-1/2">
              <motion.div
                key={isOrganization ? 'org' : 'member'}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {isOrganization ? <OrganizationLogin /> : <MemberLogin />}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
