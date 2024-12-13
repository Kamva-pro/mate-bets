const axios = require('axios');

const fetchGame = async (req, res) => {
  const { playerOne } = req.query;

  if (!playerOne) {
    return res.status(400).json({
      success: false,
      message: 'PlayerOne is required.',
    });
  }

  const lichessUrl = `https://lichess.org/api/games/user/${playerOne}?max=5`;

  try {
    const response = await axios.get(lichessUrl, {
      headers: { Accept: 'application/x-ndjson' },
    });

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error('Error fetching game:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch games.',
    });
  }
};

module.exports = { fetchGame };
