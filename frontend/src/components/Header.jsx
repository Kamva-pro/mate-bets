import React from 'react';
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Mate<span id='bets-text'> Bets</span></div>
      <div className="navbar-links">
        <a href="#home" className="navbar-link">Home</a>
        <a href="#about" className="navbar-link">Play a Friend</a>
        <a href="#contact" className="navbar-link">Pro Games</a>
      </div>
      <button className="navbar-button">Login</button>
    </nav>
  );
}

export default Navbar;
