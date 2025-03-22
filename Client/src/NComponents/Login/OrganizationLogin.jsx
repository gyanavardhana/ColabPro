import React, { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Logo1 from '../../assets/blacklogo.png'; // Adjust path as needed
import Logo2 from '../../assets/blacktext.png'; // Adjust path as needed
import Cookies from 'js-cookie'; // Make sure this is installed

const OrganizationLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_URL}org/login`, formData);
      
      if (response.status === 200 && response.data.token) {
        // Store the token in a cookie with the key "jwt"
        Cookies.set('jwt', response.data.token, { expires: 7 }); // Cookie expires in 7 days
        
        // Set the token in axios default headers for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        // Fetch user ID using the token
        await fetchUserId();
        
        navigate('/dashboard');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response) {
        if (error.response.status === 400) {
          setError('Invalid credentials. Please check your email and password.');
        } else if (error.response.status === 404) {
          setError('Organization not found. Please check your email or sign up.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    }
  };

  async function fetchUserId() {
    try {
      // Use the token from cookies for authentication
      const token = Cookies.get('jwt');
      
      const response = await axios.get(`${import.meta.env.VITE_APP_URL}userId`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log("User ID:", response.data.userId);
      
      // Establish socket connection with user ID and token
      const newSocket = io(`${import.meta.env.VITE_APP_URL}`, {
        transports: ["websocket", "polling", "flashsocket"],
        auth: {
          userId: response.data.userId,
          token: token
        }
      });

      newSocket.on("connect", () => {
        console.log("Connected to server!");
      });

      return () => {
        newSocket.disconnect();
      };
    } catch (error) {
      console.error("Error fetching user ID:", error);
      setError('Failed to authenticate session.');
    }
  }

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
            Organization Login
          </h2>
        </div>
        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
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

export default OrganizationLogin;