const { db, admin } = require('../firebase-client');

const placeLiveBet = async (req, res) => {
    const { selectedBet, userId } = req.body;

    if (!selectedBet || !userId || !selectedBet.amount) {
        return res.status(400).json({ message: 'Invalid bet data' });
    }

    try {
        await db.runTransaction(async (t) => {
            const userRef = db.collection('users').doc(userId);
            const userDoc = await t.get(userRef);

            if (!userDoc.exists) {
                throw new Error('User not authenticated');
            }

            const userData = userDoc.data();

            if (userData.balance < selectedBet.amount) {
                throw new Error('Insufficient funds to place the bet');
            }

            const betRef = db.collection('live_bets').doc();
            const now = admin.firestore.FieldValue.serverTimestamp();

            const betData = {
                bet_id: betRef.id, // storing ID in doc is redundant if doc ID is same, but fine
                current_userId: userId,
                game_id: selectedBet.gameId,
                stake: selectedBet.amount,
                player_picked: selectedBet.player,
                result: "in progress",
                createdAt: now
            };

            t.set(betRef, betData);

            const newBalance = userData.balance - selectedBet.amount;
            t.update(userRef, { balance: newBalance });
        });

        res.status(200).json({ message: 'Bet placed successfully' });

    } catch (error) {
        console.error('Error placing live bet:', error);
        if (error.message.includes('Insufficient funds') || error.message.includes('not authenticated')) {
            return res.status(403).json({ message: error.message });
        }
        res.status(500).json({ message: 'An unexpected error occured: ', error: error.message });
    }
}

module.exports = { placeLiveBet };