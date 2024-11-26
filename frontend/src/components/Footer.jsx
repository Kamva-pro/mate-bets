import React from "react";
import '../css/Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
    return(
        <div class="footer-container">
            <div class="grid-item first">
                <div className="footer-summary">
                <div className="navbar-brand">Mate<span id='bets-text'> Bets</span></div>
            <p>Mate Bets is a chess betting website where you can bet against your 
                friends on your own personal games and even pro games. 
            </p>
                </div>
            
            </div>
            <div class="grid-item">
                <div className="site-map"><h4>Quick Access</h4>
                <ul>
                    <Link to="/playfriend"><li>Play a Friend</li></Link>
                    <Link to="/progames"><li>Pro Games</li></Link>
                    <Link to="/deposit"><li>Deposit</li></Link>
                    <Link to="/withdraw"><li>Withdraw</li></Link>
                </ul>
                </div>
            </div>
            <div class="grid-item">
    <div className="socials">
        <h4>Stay in Touch</h4>
        <div className="social-links">
            <img className="social-link" src="../src/assets/facebook.png" alt="Facebook" />
            <img className="social-link" src="../src/assets/linkedin.png" alt="LinkedIn" />
            <img className="social-link" src="../src/assets/twitter.png" alt="Twitter" />
            <img className="social-link lichess" src="../src/assets/lichess.png" alt="Lichess" />
        </div>
    </div>
</div>

        </div>

    )
}

export default Footer