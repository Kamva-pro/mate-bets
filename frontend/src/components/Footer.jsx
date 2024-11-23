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
                    <a href="#"><li>Home</li></a>
                    <li>Play a Friend</li>
                    <li>Pro Games</li>
                    <li>Deposit</li>
                    <li>Withdraw</li>

                </ul>
                </div>
            </div>
            <div class="grid-item">Column 3</div>
        </div>

    )
}

export default Footer