const bets = [];

export const placeLiveBet = (req, res) => {
  const { gameId, player, amount } = req.body;

  if (!gameId || !player || !amount) {
    return res.status(400).json({ message: "Invalid bet data" });
  }

  bets.push({ gameId, player, amount });
  res.json({ message: "Bet placed successfully", bets });
};
