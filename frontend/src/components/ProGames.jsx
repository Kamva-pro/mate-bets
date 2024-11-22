import React from "react";
import "../css/ProGames.css";
import ProCard from "./ProCard";

function ProGames() {
    return (
        <div className="progames-section">
            <ProCard 
                playerOne="Anatoly Karpov" 
                playerOneImg="../src/assets/avatar2.png" 
                playerTwo="Gary Kasparov" 
                playerTwoImg="../src/assets/avatar1.png" 
            />
            <ProCard 
                playerOne="Robert Fischer" 
                playerOneImg="../src/assets/phumile.jpg" 
                playerTwo="Magnus Carlsen" 
                playerTwoImg="../src/assets/kd2.jpg" 
            />
               <ProCard 
                playerOne="Mikhal Tal" 
                playerOneImg="../src/assets/kd.jpg" 
                playerTwo="Levy Rozman" 
                playerTwoImg="../src/assets/phumile.jpg" 
            />
            <ProCard 
                playerOne="Ian Nepo" 
                playerOneImg="../src/assets/kd.jpg" 
                playerTwo="Hukaru Nakamura" 
                playerTwoImg="../src/assets/phumile.jpg" 
            />   
        </div>
    );
}

export default ProGames;
