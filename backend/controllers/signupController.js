const { admin, db } = require('../firebase-client');
const bcrypt = require('bcrypt');
const dns = require("dns")
dns.setServers(['8.8.8.8', '8.8.4.4']);
const axios = require('axios');

const signup = async (req, res) => {
    const { email, name, lichess_username, password } = req.body;

    // Note: Password hashing is handled by Firebase Auth automatically if we used the client SDK,
    // but here we are creating the user server-side. Firebase stores the password securely.
    // We don't need to hash it manually for Firebase Auth 'createUser'.
    // However, if we were storing it in our DB (bad practice), we would.
    // We will trust Firebase Auth for authentication.

    try {
        /* TODO: authenticate the user on lichess with their username */
        // For now, we assume the username is valid or we verify existence.
        // real implementation would involve Lichess OAuth or public API check.
        if (!lichess_username) {
            return res.status(400).json({ message: "Lichess username is required" });
        }

        try {
            // Verify user exists on Lichess
            await axios.get(`https://lichess.org/api/user/${lichess_username}`);
        } catch (error) {
            return res.status(400).json({ message: "Invalid Lichess username (not found on Lichess)" });
        }

        // Create a new user in Firebase Authentication
        const firebaseUser = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });

        console.log('User created in Firebase:', firebaseUser.uid);

        // Add the user to Firestore
        await db.collection('users').doc(firebaseUser.uid).set({
            uid: firebaseUser.uid,
            username: name,
            email: email,
            lichess_username: lichess_username,
            chesscom_username: null, // Placeholder for future
            balance: 0,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            rating_history: [],
            wins: 0,
            losses: 0
        });

        return res.status(200).json({ message: "User successfully registered", uid: firebaseUser.uid });

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: error.message });
    }
};

const lichessAuth = (lichessUsername) => {
    return;
}
module.exports = { signup };
