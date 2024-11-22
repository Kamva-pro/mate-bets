import React from "react";
import "../css/ProGames.css";
import ProCard from "./ProCard";

function ProGames() {
    return (
        <div className="progames-section">
            <ProCard 
                playerOne="Player One" 
                playerOneImg="../src/assets/kd.jpg" 
                playerTwo="Player Two" 
                playerTwoImg="../src/assets/conor.jpg" 
            />
            <ProCard 
                playerOne="Alice" 
                playerOneImg="../src/assets/phumile.jpg" 
                playerTwo="Bob" 
                playerTwoImg="../src/assets/kd2.jpg" 
            />
        </div>
    );
}

export default ProGames;
