// backend/controllers/fetchGame.js
const axios = require("axios");

// Helper function to fetch the current or last game for a user
const getCurrentOrLastGame = async (username) => {
  const url = `https://lichess.org/api/user/${username}/current-game`;
  const headers = { Accept: "application/json" };

  try {
    const response = await axios.get(url, { headers });

    if (response.status === 200) {
      return response.data; // Return game data
    } else if (response.status === 204) {
      console.log(`No ongoing or recent game found for user: ${username}`);
      return null;
    } else {
      console.error(
        `Error fetching game for ${username}. Status code: ${response.status}`
      );
      return null;
    }
  } catch (error) {
    console.error(`Error occurred while fetching data for ${username}:`, error);
    return null;
  }
};

// Function to check if a game is between two users
const getGameBetweenPlayers = async (playerOne, playerTwo) => {
  const gameOne = await getCurrentOrLastGame(playerOne);
  const gameTwo = await getCurrentOrLastGame(playerTwo);

  if (!gameOne || !gameTwo) {
    return "One or both players have no ongoing or recent games or an error occurred.";
  }

  const playersInGame = [gameOne.players.white.user.id, gameOne.players.black.user.id];

  if (playersInGame.includes(playerOne) && playersInGame.includes(playerTwo)) {
    return gameOne; // Return game data if both players are involved
  } else {
    return `No game found between ${playerOne} and ${playerTwo}.`;
  }
};

// Controller function for the fetch-game endpoint
const fetchGame = async (req, res) => {
  const { playerOne, playerTwo } = req.query; // Now using req.query for GET request

  if (!playerOne || !playerTwo) {
    return res.status(400).json({
      success: false,
      message: "Both playerOne and playerTwo are required in the request query.",
    });
  }

  try {
    const gameData = await getGameBetweenPlayers(playerOne, playerTwo);

    if (typeof gameData === "object") {
      return res.status(200).json({
        success: true,
        data: gameData,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: gameData,
      });
    }
  } catch (error) {
    console.error("Error fetching game data:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching game data.",
    });
  }
};

module.exports = {
  fetchGame,
};
