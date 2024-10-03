import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Logo1 from '../../assets/blacklogo.png'; // Adjust path as needed
import Logo2 from '../../assets/blacktext.png'; // Adjust path as needed

const MemberLogin = () => {
  axios.defaults.withCredentials = true;
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}mem/login`, formData);
      if (response.status === 200) {
        navigate('/dashboard');
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('Error logging in:', error); // Handle error
    }
  };

  return (
    <div className="min-h-screen bg-amber-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-2xl transform transition-all hover:scale-105">
        {/* Logo Section */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <img src={Logo1} alt="Logo 1" className="h-16" />
          <img src={Logo2} alt="Logo 2" className="h-16 ml-2" />
        </div>
        {/* Title */}
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Member Login
          </h2>
        </div>
        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-center mt-8 text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberLogin;
