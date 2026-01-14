const { db } = require('../firebase-client');

const user = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const userDoc = await db.collection('users').doc(userId).get();

        if (!userDoc.exists) {
            return res.status(404).json({ message: "User not found" });
        }

        const userData = userDoc.data();

        return res.status(200).json({
            message: "User data successfully retrieved",
            user: {
                email: userData.email,
                username: userData.username,
                balance: userData.balance,
                lichess_username: userData.lichess_username,
                wins: userData.wins || 0,
                losses: userData.losses || 0
            },
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ message: "Error fetching user data from the database." });
    }
}

module.exports = { user };
