import React from "react";
import "../css/ProGames.css";
import { useNavigate } from "react-router-dom";

const ProCard = ({ playerOne, playerOneImg, playerOneOdds, playerOneRating, playerTwo, playerTwoImg, playerTwoOdds, playerTwoRating, onClick}) => {


    return (
        <div className="progames-card" onClick={onClick}>
            <div className="player-info">
                <img className="profile-thumbnail" src={playerOneImg} alt={playerOne} />
                <p className="playername">{playerOne}</p>
                <p className="playerRating">{playerOneRating}</p>

                <div className="picks">
                    <p className="odds">{playerOneOdds}</p>
                </div>
            </div>
            <h3>VS</h3>
            <div className="player-info">
                <img className="profile-thumbnail" src={playerTwoImg} alt={playerTwo} />
                <p className="playername">{playerTwo}</p>
                <p className="playerRating">{playerTwoRating}</p>
                <div className="picks">
                    <p className="odds">{playerTwoOdds}</p>
                </div>
            </div>
        </div>
    );
};

export default ProCard;
