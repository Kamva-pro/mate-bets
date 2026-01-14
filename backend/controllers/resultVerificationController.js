const { db, admin } = require('../firebase-client');
const axios = require('axios');

// Helper to fetch games from Lichess
const fetchLichessGames = async (playerOne, playerTwo, sinceTimestamp) => {
    // timestamp in ms
    // Lichess API for games export: https://lichess.org/api/games/user/{username}
    // We can filter by vs {opponent}
    // query params: vs, since, max

    try {
        const response = await axios.get(`https://lichess.org/api/games/user/${playerOne}`, {
            params: {
                vs: playerTwo,
                since: sinceTimestamp,
                max: 5,
                moves: false,
                pgnInJson: false
            },
            headers: {
                'Accept': 'application/x-ndjson'
            }
        });

        // ndjson response needs parsing
        const games = response.data.trim().split('\n').map(line => line ? JSON.parse(line) : null).filter(g => g);
        return games;
    } catch (error) {
        console.error("Lichess API error:", error.message);
        return [];
    }
}

const verifyBetResult = async (req, res) => {
    const { betId } = req.body;
    const userId = req.user.uid;

    if (!betId) return res.status(400).json({ message: "Missing betId" });

    try {
        await db.runTransaction(async (t) => {
            const betRef = db.collection('bets').doc(betId);
            const betDoc = await t.get(betRef);

            if (!betDoc.exists) throw new Error("Bet not found");
            const bet = betDoc.data();

            if (bet.status !== 'pending' && bet.status !== 'active') {
                throw new Error("Bet is already completed or not active");
            }

            // Verify logic
            // We need to fetch games from Lichess that started AFTER the bet was created/matched.
            // bet.updatedAt is a timestamp of match.
            const matchTime = bet.updatedAt.toMillis();

            // Lichess 'since' is in milliseconds
            const games = await fetchLichessGames(bet.creator_lichess, bet.opponent_lichess, matchTime);

            if (games.length === 0) {
                // No game found yet
                throw new Error("No new game found yet");
            }

            // Find the first valid game
            // Check time control matches? (blitz, rapid etc). Lichess returns 'speed'.
            const validGame = games.find(g => g.speed === bet.match_format && g.rated === true);
            // Relaxed check: just check players and time?

            if (!validGame) {
                throw new Error("Game found but format mismatch (must be rated " + bet.match_format + ")");
            }

            // Determine winner
            let winnerUid = null;
            let result = 'draw';

            if (validGame.winner) {
                if (validGame.winner === 'white') {
                    const whitePlayer = validGame.players.white.user.name.toLowerCase();
                    if (whitePlayer === bet.creator_lichess.toLowerCase()) winnerUid = bet.creator_uid;
                    else winnerUid = bet.opponent_uid;
                } else {
                    const blackPlayer = validGame.players.black.user.name.toLowerCase();
                    if (blackPlayer === bet.creator_lichess.toLowerCase()) winnerUid = bet.creator_uid;
                    else winnerUid = bet.opponent_uid;
                }
                result = (winnerUid === userId) ? "Won" : "Lost"; // Perspective of caller? No, store absolute result.
            } else {
                result = 'draw';
            }

            // Update Bet
            t.update(betRef, {
                status: 'completed',
                result: result === 'draw' ? 'draw' : 'decided', // or 'completed'
                winner_uid: winnerUid,
                game_link: `https://lichess.org/${validGame.id}`,
                completedAt: admin.firestore.FieldValue.serverTimestamp()
            });

            // Payouts
            const pot = bet.bet_amount * 2;
            const fee = pot * 0.05; // 5% fee
            const winnings = pot - fee;

            if (winnerUid) {
                const winnerRef = db.collection('users').doc(winnerUid);
                const winnerDoc = await t.get(winnerRef);
                t.update(winnerRef, {
                    balance: winnerDoc.data().balance + winnings,
                    wins: (winnerDoc.data().wins || 0) + 1
                });

                const loserUid = (winnerUid === bet.creator_uid) ? bet.opponent_uid : bet.creator_uid;
                const loserRef = db.collection('users').doc(loserUid);
                t.update(loserRef, {
                    losses: (await t.get(loserRef)).data().losses || 0 + 1
                });

            } else {
                // Draw: refund stakes (minus fee? or full refund?)
                // Usually refund stakes.
                const user1Ref = db.collection('users').doc(bet.creator_uid);
                const user2Ref = db.collection('users').doc(bet.opponent_uid);

                t.update(user1Ref, { balance: (await t.get(user1Ref)).data().balance + bet.bet_amount });
                t.update(user2Ref, { balance: (await t.get(user2Ref)).data().balance + bet.bet_amount });
            }

        });

        res.status(200).json({ message: "Bet verified and settled" });

    } catch (error) {
        console.error("Verification error:", error);
        // If error is "No new game found", we might return 200 with a message
        if (error.message.includes("No new game")) {
            return res.status(200).json({ message: "No game found yet" });
        }
        res.status(400).json({ message: error.message });
    }
};

module.exports = { verifyBetResult };
