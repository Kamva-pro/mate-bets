const admin = require('../firebase-client'); 
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const supabase = require('../../supabase-client');

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Use Firebase Authentication to sign in the user
        const firebaseAuth = getAuth(); // Initialize Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        
        const userRecord = userCredential.user; // Successfully authenticated Firebase user

        if (!userRecord) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch additional user data from Supabase (optional, if needed)
        const { data: userData, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (fetchError) {
            console.warn("Error fetching user data from Supabase:", fetchError.message);
        }

        // Generate a custom Firebase token
        const token = await admin.auth().createCustomToken(userRecord.uid);

        // Return success response with token and user details
        return res.status(200).json({
            message: "User successfully logged in",
            token: token, // Firebase token
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                displayName: userRecord.displayName,
                databaseInfo: userData || null, // Include additional user data if available
            },
        });
    } catch (error) {
        console.error('Error signing in user:', error);
        return res.status(401).json({ message: "Invalid email or password." });
    }
};

module.exports = { signin };
