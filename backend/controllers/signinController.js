const supabase = require('../../supabase-client');
const admin = require('../firebase-client'); 

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in Firebase
        const userRecord = await admin.auth().getUserByEmail(email);

        if (!userRecord) {
            return res.status(404).json({ message: "User not found" });
        }

        // **Password validation**
        // Use Firebase Authentication on the frontend to verify password
        // If implementing custom password validation, fetch the hashed password from Supabase
        const { data: userData, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (fetchError || !userData) {
            return res.status(500).json({ message: "Error fetching user data from the database." });
        }

        // Verify password (if stored in Supabase as hashed)
        const isValidPassword = password === userData.password; // Replace with proper hash validation if needed
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid password." });
        }

        // **Generate Firebase token**
        const token = await admin.auth().createCustomToken(userRecord.uid);

        localStorage.setItem("userId", userData.id);

        // Return success response with token and user details
        return res.status(200).json({
            message: "User successfully logged in",
            token: token, // Firebase token
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                displayName: userRecord.displayName,
                databaseInfo: userData, 
            },

        });
        
    } catch (error) {
        console.error('Error signing in user:', error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { signin };
