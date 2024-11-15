import React from "react";

function MainContent() {
  return (
    <main className="flex flex-col items-start px-6 mt-64 w-full text-3xl max-md:px-5 max-md:mt-10 max-md:max-w-full">
      <h1 className="text-6xl w-[803px] max-md:max-w-full max-md:text-4xl">
        Put your money where your moves are
      </h1>
      <p className="mt-7 font-medium max-md:max-w-full">
        Play against your friends and place a bet
      </p>
      <button className="overflow-hidden px-16 py-6 mt-7 bg-black rounded shadow-[12px_12px_25px_rgba(255,255,255,0.5)] max-md:px-5">
        Bet Now
      </button>
    </main>
  );
}

export default MainContent;