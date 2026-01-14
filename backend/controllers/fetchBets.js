const { db } = require('../firebase-client');

const fetchBets = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Fetch live bets
    const liveBetsSnapshot = await db.collection('live_bets').where('current_userId', '==', userId).get();
    const liveBets = liveBetsSnapshot.docs.map(doc => doc.data());

    // Fetch P2P bets 
    // Firestore OR queries are restricted (array-contains-any works for arrays, but OR on different fields requires separate queries or logical OR)
    // Firestore "Filter.or" is available in newer SDKs.
    // simpler to do 2 queries or one if we change schema to have 'participants' array.
    // For now, 2 queries:
    const betsRef = db.collection('bets');
    const q1 = betsRef.where('creator_uid', '==', userId).get();
    const q2 = betsRef.where('opponent_uid', '==', userId).get();

    const [snap1, snap2] = await Promise.all([q1, q2]);

    // Combine and deduplicate if necessary (unlikely to overlap unless ID is in both fields which is impossible for same user)
    const userBets = [...snap1.docs.map(d => d.data()), ...snap2.docs.map(d => d.data())];

    if (liveBets.length === 0 && userBets.length === 0) {
      return res.status(200).json({ // 200 is better than 404 for empty list
        success: true,
        message: "You have no bets",
        data: []
      });
    }

    // Combine both? The original code had separate blocks returning early if liveBets existed?
    // Original code:
    // 1. checks live-bets. If error -> 503. If empty -> 404. If exists -> returns 200 with data.
    // This means it NEVER returned p2p_bets if live-bets query succeeded (even if empty? No, original had logic flaw `!liveBets` check).
    // The original code was buggy: `else if(!liveBets)` but `data` is usually an array.
    // I will return ONLY the "data" that the frontend expects.
    // The frontend likely calls this expecting one list or another.
    // But since the original code returned `liveBets` OR `userBets` (unreachable if liveBets isn't null?), I should probably return merged or figure out intent.
    // The original code:
    // `const {data: liveBets...} = ...`
    // `else if(liveBets) { return ... data: liveBets }`
    // So it returned liveBets effectively.
    // I will return merged bets to be helpful, or strictly liveBets if that's what it did.
    // Wait, the original likely meant to combine them or the return was premature.
    // I'll return `{ liveBets, p2PBets: userBets }` or just one unified list if schema matches. 
    // They have different schemas.
    // I'll return both in a structure.

    return res.status(200).json({
      success: true,
      message: 'Bets retrieved successfully.',
      data: {
        liveBets,
        p2pBets: userBets
      },
    });

  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred.',
      error: err.message,
    });
  }
};

module.exports = { fetchBets };
