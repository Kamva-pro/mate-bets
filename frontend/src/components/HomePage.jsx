import React from "react";
import Navbar from "./Header";
import HeroSection from "./HeroSection";
import ProGames from "./ProGames";
import FilterGames from "./Filter";

export default function Home ()
{
    return(
        <div>
            <Navbar/>
            <HeroSection/>
            <FilterGames/>
            <ProGames/>
            
        </div>
        
    );

}