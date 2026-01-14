import React from 'react';
import Navbar from '../components/Header';

const FAQ = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', marginTop: '100px' }}>
            <Navbar />
            <h1>Frequently Asked Questions</h1>

            <div style={{ marginBottom: '20px' }}>
                <h3>How do I place a bet?</h3>
                <p>You can place a bet by navigating to the "Play a Friend" section, entering your opponent's email, stake amount, and game format.</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>How does Matchmaking work?</h3>
                <p>Go to "Find Match", enter your stake and preferred format. We will pair you with another user looking for a similar game.</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>How do I withdraw my winnings?</h3>
                <p>Go to the Withdraw section in your dashboard. Currently, this is a manual process processed within 24 hours.</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Is my data safe?</h3>
                <p>Yes, we use industry-standard encryption and Firebase security rules to protect your data.</p>
            </div>
        </div>
    );
};

export default FAQ;
