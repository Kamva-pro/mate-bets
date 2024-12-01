const supabase = require('../supabase-client');
const admin = require('../firebase-client'); // Import Firebase Admin SDK

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verify user credentials
        const userRecord = await admin.auth().getUserByEmail(email);

        // You can't directly validate the password with Firebase Admin SDK.
        // This assumes you trust frontend validation or manage password checks elsewhere.

        if (!userRecord) {
            return res.status(404).json({ message: "User not found" });
        }

        // Optionally fetch additional data from the database (Supabase)
        const { data: userData, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (fetchError) {
            return res.status(500).json({ message: fetchError });
        }

        // Return success response
        return res.status(200).json({
            message: "User successfully logged in",
            user: {
                uid: userRecord.uid,
                email: userRecord.email,
                displayName: userRecord.displayName,
                databaseInfo: userData, // Add any additional data fetched
            },
        });
    } catch (error) {
        console.error('Error signing in user:', error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { signin };
