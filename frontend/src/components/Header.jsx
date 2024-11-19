import React from 'react';
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">My Brand</div>
      <div className="navbar-links">
        <a href="#home" className="navbar-link">Home</a>
        <a href="#about" className="navbar-link">About</a>
        <a href="#contact" className="navbar-link">Contact</a>
      </div>
      <button className="navbar-button">Sign Up</button>
    </nav>
  );
}

export default Navbar;
