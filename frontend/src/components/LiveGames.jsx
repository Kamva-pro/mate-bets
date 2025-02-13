import { useEffect, useState } from "react";
import axios from "axios";
import "../css/ProGamesPage.css";


export default function LiveGames() {
  const [games, setGames] = useState([]);
  const [selectedBet, setSelectedBet] = useState({ gameId: "", player: "", amount: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/games")
      .then(response => setGames(response.data))
      .catch(error => console.error("Error fetching games:", error));
  }, []);

  const placeBet = async () => {
    if (!selectedBet.gameId || !selectedBet.player || !selectedBet.amount) return;
    try {
      await axios.post("http://localhost:5000/api/live-bet", selectedBet);
      alert("Bet placed successfully!");
    } catch (error) {
      alert("Failed to place bet");
    }
  };

  return (
    <div className="p-6">
      <h4 className="heading mt-4">Bet on Live Games</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map(game => (
          <div key={game.id} className="p-4 border rounded-lg shadow-md">
            <p><strong>{game.player1}</strong> ({game.player1Rating}) vs <strong>{game.player2}</strong> ({game.player2Rating})</p>
            <p>Odds: {game.odds.player1} - {game.odds.player2}</p>
            <button className="bg-blue-500 text-white p-2 mt-2 rounded" onClick={() => setSelectedBet({ gameId: game.id, player: game.player1, amount: "10" })}>Bet on {game.player1}</button>
            <button className="bg-red-500 text-white p-2 mt-2 rounded ml-2" onClick={() => setSelectedBet({ gameId: game.id, player: game.player2, amount: "10" })}>Bet on {game.player2}</button>
          </div>
        ))}
      </div>
      {selectedBet.gameId && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Place Your Bet</h2>
          <input type="number" className="border p-2 mr-2" value={selectedBet.amount} onChange={(e) => setSelectedBet({ ...selectedBet, amount: e.target.value })} />
          <button className="bg-green-500 text-white p-2 rounded" onClick={placeBet}>Confirm Bet</button>
        </div>
      )}
    </div>
  );
}
