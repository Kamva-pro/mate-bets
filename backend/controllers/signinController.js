const admin = require('../firebase-client');
const supabase = require('../../supabase-client');
const bcrypt = require('bcrypt');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
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
  

    console.log('Users from Supabase:', users); 

    if (error || users.length === 0) {
      console.error("Supabase error:", error); 
      return res.status(404).json({ message: "User not found." });
    }

    const dbUser = users[0];

    const isPasswordValid = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    let firebaseUser;
    try {
      firebaseUser = await admin.auth().getUserByEmail(email);
      console.log('Firebase user:', firebaseUser); 
    } catch (err) {
      console.error("Firebase error:", err); 
      return res.status(404).json({ message: "Firebase user not found." });
    }

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
