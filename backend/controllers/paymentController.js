const { db, admin } = require('../firebase-client');

const deposit = async (req, res) => {
    const { amount, paymentMethodId } = req.body;
    // paymentMethodId would be from Stripe in a real app.

    const userId = req.user.uid; // From authMiddleware

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    // SIMULATION OF PAYMENT GATEWAY
    // In real world:
    // await stripe.paymentIntents.create({ ... })
    // if success:

    try {
        const userRef = db.collection('users').doc(userId);

        await db.runTransaction(async (t) => {
            const doc = await t.get(userRef);
            if (!doc.exists) throw new Error("User does not exist");

            const newBalance = (doc.data().balance || 0) + Number(amount);

            t.update(userRef, {
                balance: newBalance,
                lastDepositAt: admin.firestore.FieldValue.serverTimestamp()
            });

            // Log transaction
            const txRef = db.collection('transactions').doc();
            t.set(txRef, {
                userId,
                type: 'deposit',
                amount: Number(amount),
                status: 'completed',
                createdAt: admin.firestore.FieldValue.serverTimestamp()
            });
        });

        res.status(200).json({ message: `Successfully deposited $${amount}` });
    } catch (error) {
        console.error("Deposit error:", error);
        res.status(500).json({ message: "Deposit failed" });
    }
};

module.exports = { deposit };
