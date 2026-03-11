import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/ProGames.css";
import ProCard from "./ProCard";

// Import top player images
import alireza from "../assets/top-players/alireza.png";
import aronian from "../assets/top-players/aronion.png";
import denis from "../assets/top-players/denis.png";
import fabi from "../assets/top-players/fabi.jpg";
import hikaru from "../assets/top-players/hikaru.jpg";
import keymer from "../assets/top-players/keymer.png";
import magnus from "../assets/top-players/magnus.png";
import maxime from "../assets/top-players/maxime.png";
import nepo from "../assets/top-players/nepo.png";
import wesley from "../assets/top-players/wesley.png";
import { avatar1 as defaultPlayer } from "../assets";

const playerImageMap = {
    "wesleyso": wesley,
    "levaronian": aronian,
    "magnuscarlsen": magnus,
    "drnykterstein": magnus, // Magnus alias
    "lachesisq": nepo, // Nepo alias
    "gmhikaru": hikaru,
    "firouzja2003": alireza,
    "mvl": maxime,
    "keymer_vincent": keymer,
    "denn_laz": denis,
    "fabianocaruana": fabi,
};

const getPlayerImage = (name) => {
    if (!name) return defaultPlayer;
    const normalized = name.toLowerCase();
    return playerImageMap[normalized] || defaultPlayer;
};

function ProGames() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/games`);
                if (response.data.success) {
                    setGames(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching pro games:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (loading) return <div className="loading">Fetching live pro games...</div>;

    return (
        <div className="progames-section">
            {games.length > 0 ? (
                games.map((game) => (
                    <ProCard
                        key={game.id}
                        playerOne={game.players.white.user.name}
                        playerOneImg={getPlayerImage(game.players.white.user.name)}
                        playerOneOdds={(1.5 + Math.random()).toFixed(2)} // Simulation odds
                        playerOneRating={game.players.white.rating}
                        playerTwo={game.players.black.user.name}
                        playerTwoImg={getPlayerImage(game.players.black.user.name)}
                        playerTwoOdds={(1.5 + Math.random()).toFixed(2)} // Simulation odds
                        playerTwoRating={game.players.black.rating}
                    />
                ))
            ) : (
                <div className="no-games">No live pro games available at the moment.</div>
            )}
        </div>
    );
}

export default ProGames;
