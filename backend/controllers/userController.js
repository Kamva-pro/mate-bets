const supabase = require('../../supabase-client');

const user = async (req, res) => {
    const { userId } = req.query;

    const { data: userData, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (fetchError || !userData) {
        console.log(userData)
        console.log(fetchError)
        return res.status(500).json({ message: "Error fetching user data from the database." });
    }

    return res.status(200).json({
        message: "User data successfully retrieved",
        user: {
            email: userData.email,
            username: userData.username, 
            balance: userData.balance,
            lichess_username: userData.lichess_username,
        },
    });
}

module.exports = { user };
