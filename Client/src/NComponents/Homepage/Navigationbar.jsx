import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Assuming you have axios installed
import Logout from "../Login/Logout";
import { AccountCircle, Dashboard } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemButton } from "@mui/material"; // Import ListItemButton

// Import your logos
import Logo1 from "../../assets/blacklogo.png";
import Logo2 from "../../assets/blacktext.png"; // Adjust the path to your logo

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to fetch user type based on the decoded JWT token
    const fetchUserType = async () => {
      const token = getCookie("jwt"); // Get the JWT token from cookies

      if (token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_URL}usertype`
          );
          const userType = response.data; // Accessing the data property of the response

          setUserType(userType); // Setting user type
          setIsLoggedIn(true); // Marking user as logged in
        } catch (error) {
          // Handle error
          console.error("Error fetching user type:", error);
        }
      }

      setIsLoading(false); // Marking loading as complete
    };

    fetchUserType();
  }, []);

  // Function to get cookie value by name
  const getCookie = (name) => {
    const cookieValue = document.cookie.match(
      "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
    );
    return cookieValue ? cookieValue.pop() : null;
  };

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="text-gray-900 hover:text-gray-700 font-medium transition duration-300 px-3 py-2 rounded-md hover:bg-amber-500 text-lg" // Increase text size and adjust hover
    >
      {children}
    </Link>
  );

  const handleLogout = () => {
    // Logic for logout
    setIsLoggedIn(false);
    handleClose();
    // Clear the token from cookies
  };

  return (
    <nav className="bg-amber-300 text-gray-900 shadow-md border-b-2 border-gray-700">
      <div className="container mx-auto flex items-center justify-between h-24">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center">
            <img src={Logo1} alt="Logo 1" className="h-16" />
            <img src={Logo2} alt="Logo 2" className="h-16 ml-2" />
          </Link>
        </div>

        {/* Navigation Links and Account Icon */}
        <div className="flex items-center space-x-6">
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/projectideas">Project Ideas</NavLink>
          <NavLink to="/community">Community</NavLink>
          <NavLink to="/contactus">Contact Us</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          <NavLink to="/chat">Chat</NavLink>

          {/* Account/Dropdown Section */}
          <IconButton
            onClick={handleDropdownClick}
            aria-haspopup="true"
            aria-controls="navbar-menu"
            color="inherit"
            className="bg-gray-900 text-amber-500 hover:bg-gray-800 transition-colors duration-300"
          >
            {isLoggedIn ? <Dashboard /> : <AccountCircle />}
          </IconButton>
          <Menu
            id="navbar-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {isLoggedIn &&
            (userType === "organization" || userType === "member")
              ? [
                  <MenuItem key="dashboard" onClick={handleClose}>
                    <ListItemButton component={Link} to="/dashboard">
                      Dashboard
                    </ListItemButton>
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    <Logout />
                  </MenuItem>,
                ]
              : [
                  <MenuItem key="login" onClick={handleClose}>
                    <ListItemButton component={Link} to="/login">
                      Login
                    </ListItemButton>
                  </MenuItem>,
                  <MenuItem key="signup" onClick={handleClose}>
                    <ListItemButton component={Link} to="/signup">
                      Signup
                    </ListItemButton>,
                  </MenuItem>,
                ]}
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
