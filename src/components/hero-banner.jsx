import React from 'react';

type HeroBannerProps = {
  onBetNow: () => void;
};

const HeroBanner: React.FC<HeroBannerProps> = ({ onBetNow }) => {
  return (
    <section className="flex flex-col items-start mt-72 ml-20 max-w-full text-3xl w-[803px] max-md:mt-10">
      <h2 className="self-stretch text-6xl max-md:max-w-full max-md:text-4xl">
        Put your money where your moves are
      </h2>
      <p className="mt-5 font-medium max-md:max-w-full">
        Play against your friends and place a bet
      </p>
      <button
        onClick={onBetNow}
        className="overflow-hidden px-16 py-6 mt-4 bg-black rounded shadow-[12px_12px_25px_rgba(255,255,255,0.5)] max-md:px-5"
      >
        Bet Now
      </button>
    </section>
  );
};

export default HeroBanner;