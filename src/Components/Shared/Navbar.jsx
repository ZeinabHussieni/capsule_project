import React, { useState, useRef, useEffect } from 'react';
import Lottie from "lottie-react";
import LogoUnseal from "../../animations/logoUnlock.json";
import ThemeToggle from "./ThemeToggle"; 
import "../../Styles/Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className='Navbar'>
      <div className='logo'>
        <Lottie 
          animationData={LogoUnseal} loop={true} className='animation'
        />
        <div className='title'>
          <h2>Unseal</h2>
        </div>
      </div>

      <div className="right-section">
        <ThemeToggle />
        <div className="profile" onClick={toggleDropdown} ref={dropdownRef}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/027/448/973/large_2x/avatar-account-icon-default-social-media-profile-photo-vector.jpg"
            alt="Profile"
            className="pro-pic"
          />
          {showDropdown && (
            <ul className="dropdown">
              <li><a id="logout">Logout</a></li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
