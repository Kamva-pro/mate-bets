const axios = require('axios');

const fetchGame = async (req, res) => {
  const { playerOne, opponent } = req.query;

  if (!playerOne) {
    return res.status(400).json({
      success: false,
      message: 'PlayerOne is required.',
    });
  }

  if (!opponent) {
    return res.status(401).json({
      success: false,
      message: 'Opponent is required.',
    });
  }

  const lichessUrl = `https://lichess.org/api/games/user/${playerOne}?max=5`;

  try {
    const response = await axios.get(lichessUrl, {
      headers: { Accept: 'application/x-ndjson' },
    });

    const games = response.data
      .split('\n')
      .filter((game) => game.trim() !== '')
      .map((game) => JSON.parse(game)); 

    const latestGameWithOpponent = games.find(
      (game) =>
        (game.players.white.user.name === opponent || game.players.black.user.name === opponent)
    );

    if (!latestGameWithOpponent) {
      return res.status(404).json({
        success: false,
        message: `No recent game found between ${playerOne} and ${opponent}.`,
      });
    }

    res.status(200).json({
      success: true,
      data: latestGameWithOpponent,
    });
  } catch (error) {
    console.error('Error fetching game:', error);
    if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);
    } else if (error.request) {
        console.error('No response received:', error.request);
    } else {
        console.error('Error Message:', error.message);
    }

    res.status(500).json({
        success: false,
        message: `Error fetching game data: ${error.message}`,
    });
}

};

module.exports = { fetchGame };
