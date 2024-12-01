const supabase = require('../supabase-client');
const admin = require('../firebase-client');

const signup = async (req, res) => {
    const { email, name, password } = req.body;

    try {
        // Create a new user in Firebase Authentication
        const firebaseUser = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });

        console.log('User created in Firebase:', firebaseUser);

        // Add the user to the database using Firebase UID
        const { data: userData, error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    id: firebaseUser.uid,  // Use Firebase's UID
                    username: name,
                    email: email,
                    lichess_username: '',  
                    balance: 0,  
                },
            ]);

        if (insertError) {
            return res.status(500).json({ message: insertError });
        }

        // Return success response
        return res.status(200).json({ message: "User successfully registered" });

    } catch (error) {
        // Handle errors during user creation
        console.error('Error creating user:', error);
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { signup };
