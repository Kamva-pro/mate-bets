import React from "react";
import "../css/ProGames.css";
import ProCard from "./ProCard";

function ProGames() {
    return (
        <div className="progames-section">
            <ProCard 
                playerOne="Wesley So" 
                playerOneImg="../src/assets/avatar2.png" 
                playerTwo="Vidit Gujrathi" 
                playerTwoImg="../src/assets/avatar1.png" 
            />
            <ProCard 
                playerOne="Ian Nepomniachtchi" 
                playerOneImg="../src/assets/bear.png" 
                playerTwo="Magnus Carlsen" 
                playerTwoImg="../src/assets/dog.png" 
            />
               <ProCard 
                playerOne="Mikhal Tal" 
                playerOneImg="../src/assets/kd.jpg" 
                playerTwo="Levy Rozman" 
                playerTwoImg="../src/assets/phumile.jpg" 
            />
            <ProCard 
                playerOne="Alireza Firouzja" 
                playerOneImg="../src/assets/kd.jpg" 
                playerTwo="Hikaru Nakamura" 
                playerTwoImg="../src/assets/phumile.jpg" 
            />   
        </div>
    );
}

export default ProGames;
