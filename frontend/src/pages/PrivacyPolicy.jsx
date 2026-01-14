import React from 'react';
import Navbar from '../components/Header';

const PrivacyPolicy = () => {
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', marginTop: '100px' }}>
            <Navbar />
            <h1>Privacy Policy</h1>
            <p>Last updated: {new Date().toLocaleDateString()}</p>

            <h2>1. Introduction</h2>
            <p>Welcome to Mate Bets. We are committed to protecting your personal information and your right to privacy.</p>

            <h2>2. Information We Collect</h2>
            <p>We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website.</p>

            <h2>3. How We Use Your Information</h2>
            <p>We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>

            <h2>4. Will Your Information Be Shared With Anyone?</h2>
            <p>We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.</p>

            <h2>5. Security</h2>
            <p>We take security seriously and implement appropriate technical and organizational security measures.</p>
        </div>
    );
};

export default PrivacyPolicy;
