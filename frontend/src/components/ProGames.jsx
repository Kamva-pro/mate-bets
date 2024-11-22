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
                playerOne="Ding Liren" 
                playerOneImg="../src/assets/meerkat.png" 
                playerTwo="Gukesh Dommaraju" 
                playerTwoImg="../src/assets/rabbit.png" 
            />
            <ProCard 
                playerOne="Alireza Firouzja" 
                playerOneImg="../src/assets/cat.png" 
                playerTwo="Hikaru Nakamura" 
                playerTwoImg="../src/assets/dinosaur.png" 
            />   
        </div>
    );
}

export default ProGames;
