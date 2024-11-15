import React from 'react';

type MateBetsHeaderProps = {
  onLogin: () => void;
};

const MateBetsHeader: React.FC<MateBetsHeaderProps> = ({ onLogin }) => {
  return (
    <header className="flex flex-wrap gap-10 items-center self-stretch w-full max-md:max-w-full">
      <h1 className="grow shrink self-stretch my-auto text-4xl w-[175px]">
        <span className="text-white">Mate</span>{" "}
        <span className="text-green-600">Bets</span>
      </h1>
      <nav className="flex gap-10 items-center self-stretch my-auto text-xl font-medium max-md:max-w-full max-sm:hidden">
        <a href="#" className="self-stretch my-auto">Home</a>
        <a href="#" className="self-stretch my-auto">Play a friend</a>
        <a href="#" className="self-stretch my-auto">Pro Games</a>
      </nav>
      <button
        onClick={onLogin}
        className="self-stretch px-14 py-5 text-2xl whitespace-nowrap bg-green-600 rounded-lg max-md:px-5"
      >
        Login
      </button>
    </header>
  );
};

export default MateBetsHeader;