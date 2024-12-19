import React from "react";
import "../css/ProGames.css";
import ProCard from "./ProCard";

function ProGames() {
    return (
        <div className="progames-section">
            <ProCard 
                playerOne="Wesley So" 
                playerOneImg="../src/assets/top-players/wesley.png" 
                playerOneOdds={"1.43"}
                playerTwo="Levon Aronian" 
                playerTwoImg="../src/assets/top-players/aronion.png" 
                playerTwoOdds={"2.10"}
            />
            <ProCard 
                playerOne="Ian Nepomniachtchi" 
                playerOneImg="../src/assets/top-players/nepo.png" 
                playerTwo="Magnus Carlsen" 
                playerTwoImg="../src/assets/top-players/magnus.png" 
            />
               <ProCard 
                playerOne="Vincent Keymer" 
                playerOneImg="../src/assets/top-players/keymer.png" 
                playerTwo="Wesley So" 
                playerTwoImg="../src/assets/top-players/wesley.png" 
            />
            <ProCard 
                playerOne="Alireza Firouzja" 
                playerOneImg="../src/assets/top-players/alireza.png" 
                playerTwo="Ian Nepomniathtchi" 
                playerTwoImg="../src/assets/top-players/nepo.png" 
            />   
            <ProCard 
                playerOne="Maxime Vachier-Lagrave" 
                playerOneImg="../src/assets/top-players/maxime.png" 
                playerTwo="Denis Lazavik" 
                playerTwoImg="../src/assets/top-players/denis.png" 
            />

            <ProCard 
                playerOne="Magnus Carslen" 
                playerOneImg="../src/assets/top-players/magnus.png" 
                playerTwo="Levon Aronian" 
                playerTwoImg="../src/assets/top-players/aronion.png" 
            />
        </div>
    );
}

export default ProGames;
