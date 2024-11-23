import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import "../css/Responsive.css";
import "../css/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    navigate('/signin'); // Navigate to the Sign-In page
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Mate<span id="bets-text"> Bets</span></div>

      {/* Desktop Navbar Links */}
      <div className="navbar-links">
        <a href="#home" className="navbar-link active">Home</a>
        <a href="#about" className="navbar-link">Play a Friend</a>
        <a href="#contact" className="navbar-link">Pro Games</a>
      </div>

      <button onClick={handleLoginClick} className="navbar-button">Login</button>

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
          <a href="#home" className="navbar-link active">Home</a>
          <a href="#about" className="navbar-link">Play a Friend</a>
          <a href="#contact" className="navbar-link">Pro Games</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
