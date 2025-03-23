import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Logout from "../Login/Logout";
import { AccountCircle, Dashboard, Menu as MenuIcon, Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { ListItemButton } from "@mui/material";

// Import your logos
import Logo1 from "../../assets/blacklogo.png";
import Logo2 from "../../assets/blacktext.png";

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserType = async () => {
      const token = getCookie("jwt");

      if (token) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_URL}usertype`
          );
          const userType = response.data;
          setUserType(userType);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user type:", error);
        }
      }

      setIsLoading(false);
    };

    fetchUserType();
  }, []);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    handleClose();
    // Clear the token from cookies
  };

  const NavLink = ({ to, children, onClick }) => (
    <Link
      to={to}
      onClick={onClick}
      className="text-gray-900 hover:text-gray-700 font-medium transition duration-300 px-3 py-2 rounded-md hover:bg-amber-500 text-lg"
    >
      {children}
    </Link>
  );

  return (
    <nav className="bg-amber-300 text-gray-900 shadow-md border-b-2 border-gray-700 relative z-50">
      <div className="container mx-auto flex items-center justify-between h-24">
        <div className="flex items-center space-x-2 ml-4 md:ml-0">
          <Link to="/" className="flex items-center">
            <img src={Logo1} alt="Logo 1" className="h-16" />
            <img src={Logo2} alt="Logo 2" className="h-16 ml-2" />
          </Link>
        </div>

        <div className="md:hidden mr-4">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-900 hover:bg-amber-200 p-2 rounded transition duration-300"
            aria-label="Toggle mobile menu"
          >
            <MenuIcon />
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/projectideas">Project Ideas</NavLink>
          <NavLink to="/community">Community</NavLink>
          <NavLink to="/contactus">Contact Us</NavLink>
          <NavLink to="/resources">Resources</NavLink>
          <NavLink to="/chat">Chat</NavLink>

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

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-amber-300 pt-16">
          <div className="flex flex-col items-center justify-center h-full">
            <button
              onClick={closeMobileMenu}
              className="absolute top-4 right-4 text-gray-900 hover:bg-amber-200 p-2 rounded transition duration-300"
              aria-label="Close mobile menu"
            >
              <Close fontSize="large" />
            </button>

            <div className="flex flex-col items-center space-y-6">
              <NavLink to="/projects" onClick={closeMobileMenu}>Projects</NavLink>
              <NavLink to="/projectideas" onClick={closeMobileMenu}>Project Ideas</NavLink>
              <NavLink to="/community" onClick={closeMobileMenu}>Community</NavLink>
              <NavLink to="/contactus" onClick={closeMobileMenu}>Contact Us</NavLink>
              <NavLink to="/resources" onClick={closeMobileMenu}>Resources</NavLink>
              <NavLink to="/chat" onClick={closeMobileMenu}>Chat</NavLink>

              {isLoggedIn ? (
                <>
                  <NavLink to="/dashboard" onClick={closeMobileMenu}>Dashboard</NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      closeMobileMenu();
                    }}
                    className="text-gray-900 hover:text-gray-700 font-medium transition duration-300 px-3 py-2 rounded-md hover:bg-amber-500 text-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" onClick={closeMobileMenu}>Login</NavLink>
                  <NavLink to="/signup" onClick={closeMobileMenu}>Signup</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
