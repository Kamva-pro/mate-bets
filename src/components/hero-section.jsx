import React from 'react';
import MateBetsHeader from './MateBetsHeader';
import HeroBanner from './HeroBanner';
import FilterOptions from './FilterOptions';

const MateBets = () => {
  const handleLogin = () => {
    // Handle login logic
  };

  const handleBetNow = () => {
    // Handle bet now logic
  };

  const handleFilter = () => {
    // Handle filter logic
  };

  const filterOptions = [
    { label: 'Rapid', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/12195c45f221fe1fe1cfbc177a04fffcd13d8e64d0f662bd8ca6fd6444aedb97?placeholderIfAbsent=true&apiKey=6d35f1e4a4de483c8e715d4491c01e28' },
    { label: 'Date', iconSrc: 'https://cdn.builder.io/api/v1/image/assets/TEMP/12195c45f221fe1fe1cfbc177a04fffcd13d8e64d0f662bd8ca6fd6444aedb97?placeholderIfAbsent=true&apiKey=6d35f1e4a4de483c8e715d4491c01e28' },
  ];

  return (
    <main className="flex flex-col items-center px-20 pt-7 pb-28 font-bold text-white bg-zinc-900 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-md:px-5 max-md:pb-24">
      <div className="flex flex-col items-center w-full max-w-[1198px] max-md:max-w-full">
        <MateBetsHeader onLogin={handleLogin} />
        <HeroBanner onBetNow={handleBetNow} />
        <FilterOptions options={filterOptions} onFilter={handleFilter} />
      </div>
    </main>
  );
};

export default MateBets;
