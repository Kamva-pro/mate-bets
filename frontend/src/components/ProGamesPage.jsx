import React from "react";
import Navbar from "./Header";
import ProGames from "./ProGames";
import FilterGames from "./Filter";
import "../css/ProGamesPage.css";
import Footer from "./Footer";

const ProGamesPage = () => {
    return(
        <div id="progamespage"> 
            <Navbar/>
            <h4 className="heading">Bet on Professional Chess Games</h4>
            <FilterGames/>
            <ProGames/>
            <Footer/>
        </div>
    )
}

export default ProGamesPage