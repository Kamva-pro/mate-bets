import React from "react";
import Navbar from "./Header";
import HeroSection from "./HeroSection";
import ProGames from "./ProGames";
import FilterGames from "./Filter";
import Footer from "./Footer";
import LiveGames from "./LiveGames";

export default function Home ()
{
    return(
        <div>
            <Navbar/>
            <HeroSection/>
            <FilterGames/>
            <LiveGames/>
            {/* <Betslip/> */}
            <Footer/>
        </div>
        
    );

}