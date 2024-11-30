// // controllers/betController.js
const { placeBet } = require('../services/betService'); // Import the service

const placeBetController = async (req, res) => {
    const { opponentEmail, chessUsername, stake, gameFormat, gameSeries, opp_chessUsername } = req.body;

    try {
        // Call the service to place the bet
        const result = await placeBet({ opponentEmail, chessUsername, stake, gameFormat, gameSeries, opp_chessUsername });
        res.status(200).json(result); // Return a success response
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while placing the bet' }); // Return an error response
    }
};

module.exports = { placeBetController };
