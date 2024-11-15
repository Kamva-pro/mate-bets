import React from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import FilterSection from "./FilterSection";

function Hero() {
  return (
    <div className="flex flex-col items-center px-20 pt-7 pb-28 font-bold text-white bg-zinc-900 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:pb-24">
      <div className="flex flex-col w-full max-w-[1198px] max-md:max-w-full">
        <Header />
        <MainContent />
        <FilterSection />
      </div>
    </div>
  );
}

export default Hero;