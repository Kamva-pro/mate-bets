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
                playerOneOdds={"2.56"}
                playerTwo="Magnus Carlsen" 
                playerTwoImg="../src/assets/top-players/magnus.png" 
                playerTwoOdds={"1.25"}
            />
               <ProCard 
                playerOne="Vincent Keymer" 
                playerOneImg="../src/assets/top-players/keymer.png" 
                playerOneOdds={"1.98"}
                playerTwo="Wesley So" 
                playerTwoOdds={"1.34"}
                playerTwoImg="../src/assets/top-players/wesley.png" 
            />
            <ProCard 
                playerOne="Alireza Firouzja" 
                playerOneImg="../src/assets/top-players/alireza.png" 
                playerOneOdds={"2.34"}
                playerTwo="Ian Nepomniathtchi" 
                playerTwoImg="../src/assets/top-players/nepo.png" 
                playerTwoOdds={"1.19"}
            />   
            <ProCard 
                playerOne="Maxime Vachier-Lagrave" 
                playerOneImg="../src/assets/top-players/maxime.png" 
                playerTwo="Denis Lazavik" 
                playerTwoImg="../src/assets/top-players/denis.png" 
                playerOneOdds={"1.45"}
                playerTwoOdds={"1.67"}
            />

            <ProCard 
                playerOne="Magnus Carlsen" 
                playerOneImg="../src/assets/top-players/magnus.png" 
                playerTwo="Levon Aronian" 
                playerTwoImg="../src/assets/top-players/aronion.png" 
                playerOneOdds={"1.22"}
                playerTwoOdds={"3.67"}
            />
        </div>
    );
}

export default ProGames;
