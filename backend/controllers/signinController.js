import admin from "firebase-admin";
import { supabase } from "./supabaseClient.js"; // Replace with your Supabase client initialization
import bcrypt from "bcrypt"; // Assuming passwords are hashed

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // Or provide a service account
  });
}

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch the user from Supabase
    const { data: users, error } = await supabase
      .from("users")
      .select("id, password, name, email")
      .eq("email", email)
      .limit(1);

    if (error || users.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const dbUser = users[0];

    // Compare the provided password with the hashed password in Supabase
    const isPasswordValid = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Use Firebase to retrieve or verify the user's authentication data
    const firebaseUser = await admin.auth().getUserByEmail(email);

    if (!firebaseUser) {
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

module.exports = signin;