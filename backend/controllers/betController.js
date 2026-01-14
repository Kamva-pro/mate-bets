const { db, admin } = require('../firebase-client');

const placeBet = async (req, res) => {
    const { opponentEmail, stake, gameFormat, gameSeries, userId } = req.body;

    if (!opponentEmail || !stake || !userId) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        await db.runTransaction(async (t) => {
            // Fetch User
            const userRef = db.collection('users').doc(userId);
            const userDoc = await t.get(userRef);

            if (!userDoc.exists) {
                throw new Error("User not found");
            }

            const userData = userDoc.data();

            // Fetch Opponent
            // Since we only have email, we need to query. 
            // Querying inside transaction requires the query to be part of the transaction or done before but validation inside.
            // Queries are tricky in transactions if not reading a doc reference.
            // Best practice: Query first in some cases, but for atomicity, we need to 'get' inside transaction.
            // However, Firestore transactions generally require reading a document by ref first.
            // We can search for the opponent document by email first (outside transaction or just query), then use its reference in transaction.
            // But if opponent changes in between... it's a small race condition window.
            // FOR ROBUSTNESS: We should probably store user IDs instead of emails if possible, but finding by email is a feature.

            const opponentSnapshot = await db.collection('users').where('email', '==', opponentEmail.toLowerCase()).limit(1).get();

            if (opponentSnapshot.empty) {
                throw new Error("Opponent not found");
            }

            const opponentDoc = opponentSnapshot.docs[0];
            const opponentRef = opponentDoc.ref;
            const opponentData = opponentDoc.data();

            // We need to re-read opponent inside transaction to ensure consistency?
            // Yes, strict reading:
            const opponentDocInTx = await t.get(opponentRef);
            if (!opponentDocInTx.exists) throw new Error("Opponent not found (re-check)");
            const currentOpponentData = opponentDocInTx.data(); // Use this data for balance check

            // Check Balances
            if (userData.balance < stake) {
                throw new Error("Insufficient funds to place the bet");
            }
            if (currentOpponentData.balance < stake) {
                throw new Error("Opponent has insufficient funds");
            }

            // Create Bet
            const betRef = db.collection('bets').doc(); // Auto-ID
            const now = admin.firestore.FieldValue.serverTimestamp();

            const betData = {
                bet_id: betRef.id,
                creator_uid: userId,
                opponent_uid: opponentDoc.id,
                creator_email: userData.email,
                opponent_email: currentOpponentData.email,
                creator_lichess: userData.lichess_username,
                opponent_lichess: currentOpponentData.lichess_username,
                match_format: gameFormat,
                match_type: gameSeries,
                bet_amount: stake,
                status: 'pending',
                result: 'in progress',
                createdAt: now,
                updatedAt: now
            };

            t.set(betRef, betData);

            // Deduct Balances
            t.update(userRef, { balance: userData.balance - stake });
            t.update(opponentRef, { balance: currentOpponentData.balance - stake });
        });

        res.status(200).json({ message: 'Bet placed successfully' });

    } catch (error) {
        console.error("Bet placement error:", error);
        // Map error messages
        if (error.message.includes('Insufficient funds') || error.message.includes('not found')) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'An error occurred while placing the bet' });
    }
};

module.exports = { placeBet };
