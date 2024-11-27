import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // For the user icon
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase auth
import "../css/Responsive.css";
import "../css/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Store the user object if logged in
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [auth]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = () => {
    if (user) {
      navigate('/deposit');
    } else {
      navigate('/signin');
    }
  };

  const handleProfileClick = () => {
    navigate('/dashboard'); // Navigate to the profile page
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
        {user && (
          <FaUserCircle 
            onClick={handleProfileClick} 
            className="profile-icon" 
            style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px' }} 
          />
        )}
        <button onClick={handleButtonClick} className="navbar-button">
          {user ? 'Deposit' : 'Login'}
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
