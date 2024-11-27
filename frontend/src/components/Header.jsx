import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // For the user icon
import "../css/Responsive.css";
import "../css/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual authentication logic
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate('/deposit');
    } else {
      navigate('/signin');
    }
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Mate<span id="bets-text"> Bets</span></div>

      {/* Desktop Navbar Links */}
      <div className="navbar-links">
        <Link id='home' component="home" to="/" className="navbar-link">Home</Link>
        <Link id='playfriend' component="button" to="/playfriend" className="navbar-link">Play a Friend</Link>
        <Link id='progames' component="button" to="/progames" className="navbar-link">Pro Games</Link>
      </div>

      <div className="navbar-actions">
        {isLoggedIn && (
          <FaUserCircle 
            onClick={handleProfileClick} 
            className="profile-icon" 
            style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px' }} 
          />
        )}
        <button onClick={handleButtonClick} className="navbar-button">
          {isLoggedIn ? 'Deposit' : 'Login'}
        </button>
      </div>

      {/* Menu Icon for Mobile */}
      <img
        id="menu"
        src="../src/assets/menu.png"
        alt="Menu Icon"
        className="menu-icon"
        onClick={toggleMenu}
      />

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="menu-links">
          <Link to="/" className="navbar-link active">Home</Link>
          <Link to="/playfriend" className="navbar-link">Play a Friend</Link>
          <Link to="/progames" className="navbar-link">Pro Games</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
