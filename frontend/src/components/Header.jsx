import React from 'react';
import "../css/Responsive.css";
import '../css/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Mate<span id='bets-text'> Bets</span></div>
      <div className="navbar-links">
        <a href="#home"  className="navbar-link active">Home</a>
        <a href="#about" className="navbar-link">Play a Friend</a>
        <a href="#contact" className="navbar-link">Pro Games</a>
      </div>
      <button className="navbar-button">Login</button>
      <h3 id='menu' >Menu</h3>
    </nav>
  );
}

// const showMenu = () => {
//   return(
//     <div className="menu-links">
//         <a href="#home"  className="navbar-link active">Home</a>
//         <a href="#about" className="navbar-link">Play a Friend</a>
//         <a href="#contact" className="navbar-link">Pro Games</a>
//       </div>
      
//   )
// }

export default Navbar;
