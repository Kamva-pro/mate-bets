import React from "react";
import '../css/Footer.css';

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
                    <a href=""><li>Play a Friend</li></a>
                    <a href=""><li>Pro Games</li></a>
                    <a href=""><li>Deposit</li></a>
                    <a href=""><li>Withdraw</li></a>

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
            <img className="social-link" src="../src/assets/twitter.png" alt="Twitter" />
            <img className="social-link lichess" src="../src/assets/lichess.png" alt="Lichess" />
        </div>
    </div>
</div>

        </div>

    )
}

export default Footer