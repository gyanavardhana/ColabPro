import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Logout = () => {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            // Get the token from cookies
            const token = Cookies.get('jwt');
            
            // If token exists, send it in the Authorization header
            if (token) {
                const response = await axios.post(
                    `${import.meta.env.VITE_APP_URL}logout`, 
                    null, 
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                
                // Remove the JWT from cookies regardless of response
                Cookies.remove('jwt');
                
                // Remove Authorization header from axios defaults
                delete axios.defaults.headers.common['Authorization'];
                
                if (response.status === 200) {
                    navigate("/");
                    console.log("Logged out successfully");
                } else {
                    console.log("Error logging out");
                }
            } else {
                // If no token exists, just navigate to home
                console.log("No active session found");
                navigate("/");
            }
        } catch (error) {
            console.error("Logout error:", error);
            
            // Even if server logout fails, remove local token and redirect
            Cookies.remove('jwt');
            delete axios.defaults.headers.common['Authorization'];
            navigate("/");
        }
    };

    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;