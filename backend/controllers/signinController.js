const { admin, db } = require('../firebase-client');

const signin = async (req, res) => {
  // We expect the frontend to send the ID Token obtained from Firebase Client SDK
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ message: "ID Token is required" });
  }

  try {
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Fetch user profile from Firestore
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User profile not found in database." });
    }

    const userData = userDoc.data();

    return res.status(200).json({
      message: "Sign-in successful.",
      userId: uid,
      userDetails: {
        email: userData.email,
        name: userData.username,
        balance: userData.balance,
        lichess_username: userData.lichess_username,
        // Add other fields as needed
      },
    });

  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = { signin };
