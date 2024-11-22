import React from "react";
import Navbar from "./Header";
import HeroSection from "./HeroSection";
import ProGames from "./ProGames";

export default function Home ()
{
    return(
        <div>
            <Navbar/>
            <HeroSection/>
            <ProGames/>
            
        </div>
        
    );

}