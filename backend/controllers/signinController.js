const admin = require('../firebase-client');
const supabase = require('../../supabase-client');
const bcrypt = require('bcrypt');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Or provide a service account
  });
}

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user from Supabase
    const { data: users, error } = await supabase
    .from("users")
    .select("id, password, username, email")
    .eq("email", email)
    .limit(1);
  

    console.log('Users from Supabase:', users); // Log returned users

    if (error || users.length === 0) {
      console.error("Supabase error:", error); // Log any error
      return res.status(404).json({ message: "User not found." });
    }

    const dbUser = users[0];

    // Compare the provided password with the hashed password in Supabase
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Use Firebase to retrieve or verify the user's authentication data
    let firebaseUser;
    try {
      firebaseUser = await admin.auth().getUserByEmail(email);
      console.log('Firebase user:', firebaseUser); // Log Firebase user
    } catch (err) {
      console.error("Firebase error:", err); // Log Firebase error
      return res.status(404).json({ message: "Firebase user not found." });
    }

    // Successful login, return the user ID and details
    return res.status(200).json({
      message: "Sign-in successful.",
      userId: firebaseUser.uid,
      userDetails: {
        email: firebaseUser.email,
        name: dbUser.name,
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { signin };
