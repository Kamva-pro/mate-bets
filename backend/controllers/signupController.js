const supabase = require('../../supabase-client');


const signup = async (req, res) => {
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
          throw insertError;  // Handle any error from inserting into the database
        }
  
        await updateProfile(firebaseUser, {
          displayName: name, // Replace `name` with the user's display name
        })
          .then(() => {
            console.log("Display name updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating display name:", error);
          });  
        // Success: Handle user registration success, show a success message, etc.
        setAlertMessage('Sign Up successful!');
        setAlertSeverity('success');
        setTimeout(() => {
          setAlertMessage("");
          handleLogin();
        }, 3000);
        console.log('User registered and added to the database!', userData);
    
      } catch (error) {
        console.error('Error during registration or login:', error.message);
        setAlertMessage('Something went wrong: ' + error.message);
        setAlertSeverity('error');
        setTimeout(() => {
          setAlertMessage("");
        }, 3000);
        // Handle any error that occurred during registration or database insertion
      }
}