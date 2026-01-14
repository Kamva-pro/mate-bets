import { useEffect, useState } from "react";
import axios from "axios";
import "../css/ProGamesPage.css";
import ProCard from "./ProCard";
import { meerkat, cat, dog, dinosaur, avatar1, avatar2, rabbit, bear } from "../assets";

export default function ChessBettingApp() {
  const [games, setGames] = useState([]);
  const [selectedBet, setSelectedBet] = useState({ gameId: "", player: "", amount: "" });

  const userId = localStorage.getItem('userId')

  const avatars = [meerkat, cat, dog, dinosaur, avatar1, avatar2, rabbit, bear];

  const selectRandom = () => {
    return Math.random(0, avatars.length);
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/games`)
      .then(response => setGames(response.data))
      .catch(error => console.error("Error fetching games:", error));
  }, []);

  const placeBet = async () => {
    if (!selectedBet.gameId || !selectedBet.player || !selectedBet.amount) return;
    try {
      await axios.post("http://localhost:3000/api/bet", { selectedBet, userId });
      alert("Bet placed successfully!");
    } catch (error) {
      alert("Failed to place bet");
    }
  };

  return (
    <div className="p-6">
      <h3 className="heading mt-4">Live Chess Betting</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* {games.map(game => ( */}
        {/* <div key={game.id} className="p-4 border rounded-lg shadow-md">
            <p><strong>{game ? game.player1.username : "Player One"}</strong> ({game ? game.player1.rating : "2400"}) vs <strong>{game ? game.player2.username : "Player Two"}</strong> ({game ? game.player2.rating : "2360"})</p>
            <p>Odds: {game ? game.odds.player1 : "1.59"} - {game ? game.odds.player2 : "1.86"}</p>
            <button className="bg-blue-500 text-white p-2 mt-2 rounded" onClick={() => setSelectedBet({ gameId: game.id, player: game.player1.username, amount: "10" })}>Bet on {game.player1.username}</button>
            <button className="bg-red-500 text-white p-2 mt-2 rounded ml-2" onClick={() => setSelectedBet({ gameId: game.id, player: game.player2.username, amount: "10" })}>Bet on {game.player2.username}</button>
          </div> */}
        {/* ))}  */}

        {games.map(game => {
          <ProCard
            key={game.id}
            playerOne={game.player1.username}
            playerOneRating={game.player1.rating}
            playerOneOdds={game.odds.player1}
            playerOneImg={avatars[selectRandom()]}
            playerTwo={game.player2.username}
            playerTwoRating={game.player2.rating}
            playerTwoOdds={game.odds.player2}
            playerTwoImg={avatars[selectRandom()]}
          />
        })}


      </div>
      {/* {selectedBet.gameId && ( 
         <div className="mt-4">
          <h2 className="text-lg font-semibold">Place Your Bet</h2>
          <input type="number" className="border p-2 mr-2" value={selectedBet.amount} onChange={(e) => setSelectedBet({ ...selectedBet, amount: e.target.value })} />
          <button className="bg-green-500 text-white p-2 rounded" onClick={placeBet}>Confirm Bet</button>
        </div> *
       )} */}
    </div>
  );
}
