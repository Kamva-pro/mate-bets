const supabase = require('../../supabase-client');

const user = async (req, res) => {
    const userId = req.cookies.userId; // Using cookies to get userId (or modify as per your auth strategy)

    const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (fetchError || !userData) {
        return res.status(500).json({ message: "Error fetching user data from the database." });
    }

    // Assuming 'userData' has properties like 'email', 'displayName', 'balance'
    return res.status(200).json({
        message: "User data successfully retrieved",
        user: {
            email: userData.email,
            username: userData.displayName, // Or the appropriate property
            balance: userData.balance,
            lichess_username: userData.lichess_username,
            databaseInfo: userData, // Include additional data as needed
        },
    });
}

module.exports = { user };
