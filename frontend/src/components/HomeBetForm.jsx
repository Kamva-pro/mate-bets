import React, { useState } from 'react';
import '../css/HomeBetForm.css';

export default function HomeBetForm() {
    const [isRandomMatch, setIsRandomMatch] = useState(false);
    const [gameFormat, setGameFormat] = useState('');
    const [gameSeries, setGameSeries] = useState('');
    const [opponentUsername, setOpponentUsername] = useState('');
    const [stake, setStake] = useState('');

    // This form is purely for display/design — no submit logic
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <section className="home-bet-section">
            <div className="home-bet-inner">
                <div className="home-bet-header">
                    <span className="home-bet-badge">♟ Place a Bet</span>
                    <h2 className="home-bet-title">Challenge a Friend, Win Big</h2>
                    <p className="home-bet-subtitle">
                        Set your terms, pick your format, and stake your claim on the board.
                    </p>
                </div>

                <div className="home-bet-card">
                    <form className="home-bet-form" onSubmit={handleSubmit}>

                        {/* Random Match Toggle */}
                        <label className="toggle-row">
                            <div className={`toggle-switch ${isRandomMatch ? 'active' : ''}`} onClick={() => setIsRandomMatch(!isRandomMatch)}>
                                <div className="toggle-knob" />
                            </div>
                            <span className="toggle-label">Random Matchmaking</span>
                        </label>

                        {/* Opponent Username */}
                        {!isRandomMatch && (
                            <div className="hbf-field">
                                <label htmlFor="hbf-opponent">Opponent's Lichess Username</label>
                                <input
                                    id="hbf-opponent"
                                    type="text"
                                    placeholder="e.g. Magnus2024"
                                    value={opponentUsername}
                                    onChange={(e) => setOpponentUsername(e.target.value)}
                                />
                            </div>
                        )}

                        {/* Game Format */}
                        <div className="hbf-field">
                            <label htmlFor="hbf-format">Game Format</label>
                            <select
                                id="hbf-format"
                                value={gameFormat}
                                onChange={(e) => setGameFormat(e.target.value)}
                            >
                                <option value="" disabled>Select a format</option>
                                <option value="blitz">⚡ Blitz</option>
                                <option value="rapid">🕐 Rapid</option>
                                <option value="bullet">🔥 Bullet</option>
                            </select>
                        </div>

                        {/* Game Series */}
                        <div className="hbf-field">
                            <label htmlFor="hbf-series">Game Series</label>
                            <select
                                id="hbf-series"
                                value={gameSeries}
                                onChange={(e) => setGameSeries(e.target.value)}
                            >
                                <option value="" disabled>Select a series</option>
                                <option value="one_game">1 Game</option>
                                <option value="best_of_three">Best of 3</option>
                                <option value="best_of_five">Best of 5</option>
                            </select>
                        </div>

                        {/* Stake */}
                        <div className="hbf-field">
                            <label htmlFor="hbf-stake">Stake (ZAR)</label>
                            <div className="stake-input-wrapper">
                                <span className="stake-prefix">R</span>
                                <input
                                    id="hbf-stake"
                                    type="number"
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    value={stake}
                                    onChange={(e) => setStake(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="hbf-submit-btn">
                            Place Bet
                            <span className="hbf-btn-arrow">→</span>
                        </button>

                        <p className="hbf-note">Sign in required to place a real bet.</p>
                    </form>

                    {/* Right side decoration */}
                    <div className="home-bet-deco">
                        <div className="deco-stat">
                            <span className="deco-num">2,400+</span>
                            <span className="deco-label">Bets Placed</span>
                        </div>
                        <div className="deco-divider" />
                        <div className="deco-stat">
                            <span className="deco-num">R 1.2M</span>
                            <span className="deco-label">Total Wagered</span>
                        </div>
                        <div className="deco-divider" />
                        <div className="deco-stat">
                            <span className="deco-num">98%</span>
                            <span className="deco-label">Payout Rate</span>
                        </div>
                        <div className="deco-board">
                            <div className="chess-board">
                                {Array.from({ length: 64 }, (_, i) => {
                                    const row = Math.floor(i / 8);
                                    const col = i % 8;
                                    const isLight = (row + col) % 2 === 0;
                                    return <div key={i} className={`chess-sq ${isLight ? 'light' : 'dark'}`} />;
                                })}
                            </div>
                            <div className="deco-glow" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
