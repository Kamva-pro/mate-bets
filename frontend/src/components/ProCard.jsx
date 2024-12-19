import React from "react";
import "../css/ProGames.css";
import { useNavigate } from "react-router-dom";

const ProCard = ({ playerOne, playerOneImg, playerTwo, playerTwoImg }) => {


    return (
        <div onClick={handleClick(playerOne, playerTwo)} className="progames-card">
            <div className="player-info">
                <img className="profile-thumbnail" src={playerOneImg} alt={playerOne} />
                <div className="picks"></div>
                <p className="playername">{playerOne}</p>
            </div>
            <h3>VS</h3>
            <div className="player-info">
                <img className="profile-thumbnail" src={playerTwoImg} alt={playerTwo} />
                <div className="picks"></div>

                <p className="playername">{playerTwo}</p>
            </div>
        </div>
    );
};

export default ProCard;
