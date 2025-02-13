import React from "react";
import Navbar from "../components/Header";
import HeroSection from "../components/HeroSection";
import ProGames from "../components/ProGames";
import FilterGames from "../components/Filter";
import Footer from "../components/Footer";
import LiveGames from "../components/LiveGames";

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