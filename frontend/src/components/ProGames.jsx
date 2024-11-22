import React from 'react';
import "../css/ProGames.css";

 function ProGames()
 {
    return(
        <div className="progames-section">
        <div className="progames-card">
            <div className='player-info'>
            <img className='profile-thumbnail' src="../src/assets/kd.jpg" />
            <p>Player one</p>
            </div>
            <h3>VS</h3>
            <div className='player-info'>
            <img className='profile-thumbnail' src="../src/assets/conor.jpg" />
            <p>Player two</p>
            </div>            
            
        </div>
        <div className="progames-card">Card 2</div>
        </div>
    )
 }

 export default ProGames