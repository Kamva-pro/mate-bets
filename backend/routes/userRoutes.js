const express = require('express');
const router = express.Router();
const admin = require('../firebase-client'); // For Firebase user management

// Middleware to authenticate requests
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from "Authorization" header
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token); // Verify the token
    req.user = decodedToken; // Attach user info to the request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Endpoint to fetch current user data
router.get('/auth/user', authenticate, async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.user.uid); // Fetch user details from Firebase
    res.json({
      displayName: userRecord.displayName,
      email: userRecord.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user data' });
  }
});

module.exports = router;
