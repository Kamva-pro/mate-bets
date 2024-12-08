const supabase = require('../../supabase-client');

const user = async (req, res) => {
    const userId = localStorage.getItem("userId");

    const { data: userData, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

    if (fetchError || !userData) {
        return res.status(500).json({ message: "Error fetching user data from the database." });
    }


    return res.status(200).json({
        message: "User data successfully retrieved",
        token: token,
        user: {
            uid: userRecord.uid,
            email: userRecord.email,
            displayName: userRecord.displayName,
            databaseInfo: userData, 
        },

    });
    
}

module.exports = {user};