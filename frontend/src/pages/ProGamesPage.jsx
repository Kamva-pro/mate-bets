import React from "react";
import Navbar from "../components/Header";
import ProGames from "../components/ProGames";
import FilterGames from "../components/Filter";
import "../css/ProGamesPage.css";
import Footer from "../components/Footer";

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