import React from "react";
import "../css/ProGames.css";

const ProCard = ({ playerOne, playerOneImg, playerTwo, playerTwoImg }) => {
    return (
        <div className="progames-card">
            <div className="player-info">
                <img className="profile-thumbnail" src={playerOneImg} alt={playerOne} />
                <p className="playername">{playerOne}</p>
            </div>
            <h3>VS</h3>
            <div className="player-info">
                <img className="profile-thumbnail" src={playerTwoImg} alt={playerTwo} />
                <p className="playername">{playerTwo}</p>
            </div>
        </div>
    );
};

export default ProCard;
