import React from "react";
import Navbar from "./Header";
import ProGames from "./ProGames";
import FilterGames from "./Filter";
import "../css/ProGames.css";

const ProGamesPage = () => {
    return(
        <div id="progamespage"> 
            <Navbar/>
            <h4>Bet on Professional Chess Games</h4>
            <FilterGames/>
            <ProGames/>
        </div>
    )
}

export default ProGamesPage