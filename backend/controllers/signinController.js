const supabase = require('../../supabase-client');


const signin = async (req, res) => {
    const {email, password} = req.body;
    try{
        const auth = getAuth();

        // Attempt to sign in the user with Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
        const user = userCredential.user;  

        return res.status(200).json({"message: ": "User successfully logged in"});
    }

    catch(error)
    {
        return res.status(500).json({"message: ": error.message});
    }


}