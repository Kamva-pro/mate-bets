import React from "react";
import '../css/Footer.css';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="grid-item first">
                <div className="footer-summary">
                    <div className="navbar-brand">Mate<span id='bets-text'> Bets</span></div>
                    <p>Mate Bets is a chess betting website where you can bet against your
                        friends on your own personal games and even pro games.
                    </p>
                </div>
            </div>
            <div className="grid-item">
                <div className="site-map"><h4>Quick Access</h4>
                    <ul>
                        <Link to="/playfriend"><li>Play a Friend</li></Link>
                        <Link to="/progames"><li>Pro Games</li></Link>
                        <Link to="/dashboard"><li>Deposit</li></Link>
                        <Link to="/dashboard"><li>Withdraw</li></Link>
                    </ul>
                </div>
            </div>
            <div className="grid-item">
                <div className="socials">
                    <h4>Stay in Touch</h4>
                    <div className="social-links">
                        {/* Facebook */}
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#e0c97f">
                                <path d="M22 12c0-5.522-4.478-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12" />
                            </svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#e0c97f">
                                <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                            </svg>
                        </a>
                        {/* X / Twitter */}
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link" aria-label="X (Twitter)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#e0c97f">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* Lichess */}
                        <a href="https://lichess.org" target="_blank" rel="noreferrer" className="social-link" aria-label="Lichess">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 50 50" fill="#e0c97f">
                                <path d="M38.956.5c-3.53.418-6.452 2.906-7.96 6.37l-3.498 8.521c-.174.426.01.917.43 1.09l.82.336c.42.173.913-.01 1.088-.43l3.5-8.521c1.17-2.85 3.536-4.886 6.285-5.213.496-.059.847-.499.788-.985A.883.883 0 0 0 39.4.5h-.444zM26.17 15.958L8.67 6.416l.007-.003a2.724 2.724 0 0 0-3.683 1.159L1.48 13.43a2.724 2.724 0 0 0 1.158 3.683l5.52 2.847-2.69 5.217a2.724 2.724 0 0 0 1.158 3.683l5.52 2.847-2.69 5.217a2.724 2.724 0 0 0 1.159 3.683l17.5 9.027a2.724 2.724 0 0 0 3.683-1.158l8.45-16.4A11.37 11.37 0 0 0 26.17 15.958z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer