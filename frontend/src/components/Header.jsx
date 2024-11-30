import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBell } from 'react-icons/fa'; 
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 
import supabase from '../../../supabase-client';
import "../css/Responsive.css";
import "../css/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  const auth = getAuth();
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const updateBalance = async () => {
      const {data: balanceData, balanceError} = await supabase
      .from("users")
      .select("balance")
      .eq("id", user.uid)
      .single();
  
      if (balanceError)
      {
        console.log("Error getting balance: ", balanceError);
      }
  
      setBalance(balanceData.balance);
    };

    return () => updateBalance();
  })
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDepositClick = () => {
    navigate('/deposit');
  };

  const handleProfileClick = () => {
    navigate('/dashboard'); 
  };

  const handleButtonClick = () => {
    navigate('/signin');
  };

  


  return (
    <nav className="navbar">
      <Link to={'/'} className="navbar-brand">Mate<span id="bets-text"> Bets</span></Link>

      {/* Desktop Navbar Links */}
      <div className="navbar-links">
        <Link id='home' to="/" className="navbar-link">Home</Link>
        <Link id='playfriend' to="/playfriend" className="navbar-link">Play a Friend</Link>
        <Link id='progames' to="/progames" className="navbar-link">Pro Games</Link>
      </div>

      {/* User Section */}
      <div className="navbar-actions">
        {user ? (
          <div className="navbar-user-info">
            <FaBell
              className="notification-icon"
              style={{ cursor: 'pointer', fontSize: '20px', marginRight: '10px' }}
            />
            <FaUserCircle 
              className="profile-icon" 
              onClick={handleProfileClick}
              style={{ cursor: 'pointer', fontSize: '24px', marginRight: '10px' }} 
            />
            <span className="display-name"><span id='currency'>$</span>{balance}</span>
            <button
              onClick={handleDepositClick}
              className="navbar-button"
              style={{
                marginLeft: '24px',
                
              }}
            >
              Deposit
            </button>
          </div>
        ) : (
          <button onClick={handleButtonClick} className="navbar-button">
            Login
          </button>
        )}
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
