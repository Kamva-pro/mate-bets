const { placeBet } = require('../services/betService');

const placeBetController = async (req, res) => {
    const { opponentEmail, chessUsername, stake, gameFormat, gameSeries, opp_chessUsername } = req.body;

    try {
        const result = await placeBet({ opponentEmail, chessUsername, stake, gameFormat, gameSeries, opp_chessUsername });
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { placeBetController };
