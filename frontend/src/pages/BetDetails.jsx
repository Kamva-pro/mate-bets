import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Header";

const BetDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {
        bet_id, status, bet_amount, result,
        player_one_lichess_username,
        player_two_lichess_username, format
    } = location.state || {};

    return (
        <div style={{ background: '#121212', minHeight: '100vh' }}>
            <Navbar />
            <div style={{
                maxWidth: 520,
                margin: '0 auto',
                paddingTop: 120,
                paddingBottom: 60,
                paddingLeft: 20,
                paddingRight: 20,
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, #1a1a1a, #161616)',
                    border: '1px solid #2a2a2a',
                    borderRadius: 20,
                    padding: '36px 32px',
                    boxShadow: '0 8px 60px rgba(0,0,0,0.6)',
                    fontFamily: "'Montserrat', sans-serif",
                }}>
                    {/* Header */}
                    <div style={{ borderBottom: '1px solid #2a2a2a', paddingBottom: 20, marginBottom: 28 }}>
                        <span style={{
                            display: 'inline-block',
                            background: 'linear-gradient(135deg, #e0c97f, #c8a84b)',
                            color: '#0a0a0a',
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: 2,
                            textTransform: 'uppercase',
                            padding: '5px 14px',
                            borderRadius: 100,
                            marginBottom: 14,
                        }}>Bet Receipt</span>
                        <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 800, margin: 0 }}>Bet Details</h1>
                    </div>

                    {/* Players */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: '#1e1e1e',
                        borderRadius: 12,
                        padding: '16px 20px',
                        marginBottom: 20,
                        border: '1px solid #2a2a2a',
                    }}>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Player 1</div>
                            <div style={{ color: '#e0c97f', fontWeight: 700, fontSize: 16 }}>{player_one_lichess_username || '—'}</div>
                        </div>
                        <div style={{ color: '#444', fontWeight: 900, fontSize: 18 }}>VS</div>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                            <div style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Player 2</div>
                            <div style={{ color: '#e0c97f', fontWeight: 700, fontSize: 16 }}>{player_two_lichess_username || '—'}</div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 12,
                        marginBottom: 24,
                    }}>
                        {[
                            { label: 'Format', value: format },
                            { label: 'Status', value: status },
                            { label: 'Stake', value: bet_amount ? `R ${bet_amount}` : '—' },
                            { label: 'Result', value: result, highlight: true },
                        ].map(({ label, value, highlight }) => (
                            <div key={label} style={{
                                background: '#1e1e1e',
                                borderRadius: 10,
                                padding: '14px 16px',
                                border: '1px solid #2a2a2a',
                            }}>
                                <div style={{ color: '#666', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>{label}</div>
                                <div style={{
                                    fontWeight: 700,
                                    fontSize: 15,
                                    color: highlight
                                        ? (value === 'Won' ? '#4ade80' : value === 'Lost' ? '#f87171' : '#e0c97f')
                                        : '#fff',
                                }}>
                                    {value || '—'}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: 20, textAlign: 'center', color: '#555', fontSize: 13 }}>
                        Thanks for your bet! 🎯
                    </div>

                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            marginTop: 20,
                            width: '100%',
                            background: 'linear-gradient(135deg, #e0c97f, #c8a84b)',
                            color: '#0a0a0a',
                            border: 'none',
                            padding: '13px 24px',
                            borderRadius: 10,
                            fontSize: 15,
                            fontWeight: 800,
                            fontFamily: "'Montserrat', sans-serif",
                            cursor: 'pointer',
                            letterSpacing: 0.5,
                        }}
                    >
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BetDetails;
