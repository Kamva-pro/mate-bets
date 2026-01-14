const { db, admin } = require('../firebase-client');

const findMatch = async (req, res) => {
    const { stake, gameFormat, gameSeries, userId } = req.body;

    if (!stake || !gameFormat || !gameSeries || !userId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        await db.runTransaction(async (t) => {
            // 1. Check User Balance
            const userRef = db.collection('users').doc(userId);
            const userDoc = await t.get(userRef);
            if (!userDoc.exists) throw new Error("User not found");
            const userData = userDoc.data();

            if (userData.balance < stake) {
                throw new Error("Insufficient funds");
            }

            // 2. Search for existing pending bet (waiting for opponent)
            // Query needs to be outside transaction if we want to scan? 
            // OR we iterate? No, query first.
            // CAUTION: Firestore transactions require reads to come before writes.
            // But we can't query cleanly inside transaction unless using runTransaction's ability to read documents we know.
            // "Queries" inside transactions are supported but need to be careful.
            // Better strategy: Query for a potential match first (outside transaction?), then Try to claim it in transaction.
            // If claiming fails (someone else took it), retry.
            // For simplicity in this demo, we will query first.

            // We'll search for 'waiting_for_opponent' bets with matching criteria
            // We need to match stake + gameFormat + gameSeries.
            // Also ensure we don't match our own bet.

            throw new Error("Transaction Retry needed"); // Just a signal to use logic outside? No.
        });
    } catch (e) {
        // ...
    }

    // RETRY LOOP LOGIC or Simple approach:
    // 1. Query for Open Bets
    const betsRef = db.collection('bets');
    const matchingBetsSnapshot = await betsRef
        .where('status', '==', 'waiting_for_opponent')
        .where('match_format', '==', gameFormat)
        .where('match_type', '==', gameSeries)
        .where('bet_amount', '==', Number(stake)) // Type consistency important
        .limit(5)
        .get();

    let matchFound = false;
    let matchBetId = null;

    // Try to join one
    for (const doc of matchingBetsSnapshot.docs) {
        const betData = doc.data();
        if (betData.creator_uid === userId) continue; // Can't play self

        try {
            await db.runTransaction(async (t) => {
                const betDocRef = betsRef.doc(doc.id);
                const freshBetDoc = await t.get(betDocRef);
                if (!freshBetDoc.exists) throw new Error("Bet gone");
                const freshBetData = freshBetDoc.data();

                if (freshBetData.status !== 'waiting_for_opponent') {
                    throw new Error("Already taken");
                }

                // Check balances again (atomic)
                const userRef = db.collection('users').doc(userId);
                const userDoc = await t.get(userRef);
                if (userDoc.data().balance < stake) throw new Error("Insufficient funds");

                // Claim it
                t.update(betDocRef, {
                    status: 'pending', // Now it's a pending active game
                    opponent_uid: userId,
                    opponent_email: userDoc.data().email,
                    opponent_lichess: userDoc.data().lichess_username,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp()
                });

                // Deduct balances for BOTH? 
                // Wait, the creator should have had balance deducted when CREATING the open bet?
                // Yes, deduct from creator when they create the open bet.
                // Deduct from joiner NOW.
                t.update(userRef, {
                    balance: userDoc.data().balance - Number(stake)
                });
            });
            matchFound = true;
            matchBetId = doc.id;
            break;
        } catch (err) {
            console.log("Failed to join bet " + doc.id + ": " + err.message);
            continue; // Try next
        }
    }

    if (matchFound) {
        return res.status(200).json({ message: "Match found!", betId: matchBetId });
    }

    // If no match, CREATE a new waiting bet
    try {
        await db.runTransaction(async (t) => {
            const userRef = db.collection('users').doc(userId);
            const userDoc = await t.get(userRef);
            if (userDoc.data().balance < stake) throw new Error("Insufficient funds");

            const newBetRef = db.collection('bets').doc();
            const now = admin.firestore.FieldValue.serverTimestamp();

            t.set(newBetRef, {
                bet_id: newBetRef.id,
                creator_uid: userId,
                creator_email: userDoc.data().email,
                creator_lichess: userDoc.data().lichess_username,
                opponent_uid: null, // Waiting
                match_format: gameFormat,
                match_type: gameSeries,
                bet_amount: Number(stake),
                status: 'waiting_for_opponent',
                result: 'in progress',
                createdAt: now,
                updatedAt: now
            });

            // Deduct balance from creator
            t.update(userRef, {
                balance: userDoc.data().balance - Number(stake)
            });
        });

        return res.status(200).json({ message: "No match found immediately. Created a simplified open bet." });

    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
};

module.exports = { findMatch };
