const supabase = require('../../supabase-client');
const admin = require('../firebase-client');
const bcrypt = require('bcrypt');
const dns = require("dns")
dns.setServers(['8.8.8.8', '8.8.4.4']); 
const axios = require('axios');

const signup = async (req, res) => {
    const { email, name, lichess_username, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        /* TODO: authenticate the user on lichess with their username
                if they authenticate successfully continue with the 
                sign up process. If not return and exit the sign up.
        */

        // Create a new user in Firebase Authentication
        const firebaseUser = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });

        console.log('User created in Firebase:', firebaseUser);

        // Add the user to the supabase database using their Firebase UID
        const { data: userData, error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    id: firebaseUser.uid,  
                    username: name,
                    email: email,
                    lichess_username: lichess_username,  
                    balance: 0,  
                    password: hashedPassword
                },
            ]);

        if (insertError) 
        {
            /*
            TODO: DELETE THE NEWLY AUTHENTICATED USER ACCOUNT IN FIREBASE
            */
            return res.status(501).json({ message: insertError.message });

        }

        else if (userData)
            return res.status(200).json({ message: "User successfully registered" });

    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: error.message });
    }
};

const lichessAuth = (lichessUsername) => 
{
    return;
}
module.exports = { signup };
