import axios from "axios";

export const fetchLiveGames = async (req, res) => {
  try {
    const response = await axios.get("https://lichess.org/api/tv/feed");
    const games = response.data
      .filter(game => game.moves.split(" ").length < 10) // Less than 10 moves
      .map(game => ({
        id: game.id,
        player1: game.players.white.user.name,
        player1Rating: game.players.white.rating,
        player2: game.players.black.user.name,
        player2Rating: game.players.black.rating,
        evaluation: game.analysis?.eval || 0, // Get evaluation score
      }))
      .filter(game => Math.abs(game.evaluation) <= 5); // Remove games with eval > 5

    // Calculate odds based on evaluation and rating
    const processedGames = games.map(game => {
      const ratingDiff = game.player1Rating - game.player2Rating;
      const evalFactor = game.evaluation * 10;
      const odds1 = 50 + ratingDiff / 10 - evalFactor;
      const odds2 = 100 - odds1;

      return { ...game, odds: { player1: Math.max(0, odds1), player2: Math.max(0, odds2) } };
    });

    res.json(processedGames);
  } catch (error) {
    res.status(500).json({ message: "Error fetching games", error });
  }
};
