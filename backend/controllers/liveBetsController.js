const axios = require("axios");

const fetchLiveGames = async (req, res) => {
    try {
        const response = await axios.get("https://lichess.org/api/tv/feed");
        const rawGames = response.data;

        const filteredGames = rawGames
            .filter(game => 
                game.moves.split(" ").length < 10 && 
                Math.abs(game.evaluation) <= 5 && 
                !game.mate
            )
            .map(game => {
                const { id, players, evaluation } = game;

                const player1 = {
                    username: players.white.user.name,
                    rating: players.white.rating,
                };
                const player2 = {
                    username: players.black.user.name,
                    rating: players.black.rating,
                };

                const odds = calculateOdds(player1.rating, player2.rating, evaluation);

                return { id, player1, player2, odds };
            });

        res.json(filteredGames);
    } catch (error) {
        console.error("Error fetching live games:", error);
        res.status(500).json({ message: "Error fetching games" });
    }
};

const calculateOdds = (rating1, rating2, eval) => {
    const ratingDiff = rating1 - rating2;
    const evalWeight = eval * 10;

    const player1Odds = 50 + ratingDiff / 10 + evalWeight;
    const player2Odds = 100 - player1Odds;

    return {
        player1: `${player1Odds.toFixed(2)}%`,
        player2: `${player2Odds.toFixed(2)}%`,
    };
};

module.exports = { fetchLiveGames };
