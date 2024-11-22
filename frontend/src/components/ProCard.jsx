import React from "react";
import "../css/ProGames.css";

const ProCard = () => {
    return ( 
        <div className="progames-card">
            <div className='player-info'>
                <img className='profile-thumbnail' src="../src/assets/kd.jpg" alt="Player one" />
                <p>Player one</p>
            </div>
            <h3>VS</h3>
            <div className='player-info'>
                <img className='profile-thumbnail' src="../src/assets/conor.jpg" alt="Player two" />
                <p>Player two</p>
            </div>            
        </div>
    );
};

export default ProCard;
