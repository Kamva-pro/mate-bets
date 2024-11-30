const supabase = require('../../supabase-client');
import { auth } from '../../frontend/firebase'; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";  


const signup = async (req, res) => {
    const {email, name, password} = req.body;
    try {
        // Register the user with Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;  // Firebase user object
    
        console.log('User object:', firebaseUser);
        
        // Now you have the Firebase user UID (string) and you can use that directly in the database
        const userId = firebaseUser.uid;  // Use Firebase's UID, it's a string, not a UUID
    
        // Add the user to the database using the Firebase UID as the user ID
        const { data: userData, error: insertError } = await supabase
          .from('users')
          .insert([
            {
              id: userId,  
              username: name,
              email: email,
              lichess_username: '',  
              balance: 0,  
            },
          ]);
    
        if (insertError) {
            return res.status(500).json({"message": insertError})
        }
  
        await updateProfile(firebaseUser, {
          displayName: name,
        })
          .then(() => {
            return res.status(200).json({"message": "display name successfully updated"});
          })
          .catch((error) => {
            return res.status(400).json({"message: ": error.message})
          });  
        
        return res.status(200).json({"message: ": "User successfully registered"});
    
      } catch (error) {
        return res.status(500).json({"message: ": error.message});
                          }
};

module.exports = {signup};
