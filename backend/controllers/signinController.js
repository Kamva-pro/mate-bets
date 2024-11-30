const signin = async (req, res) => {
    const auth = getAuth();

    // Attempt to sign in the user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;  // Firebase user object
}