import React from "react";

function Header() {
  return (
    <header className="flex flex-wrap gap-10 items-center w-full max-md:max-w-full">
      <div className="grow shrink self-stretch my-auto text-4xl w-[175px] max-sm:my-auto max-sm:mr-auto">
        <span className="text-white">Mate</span>{" "}
        <span className="text-green-600">Bets</span>
      </div>
      <button className="self-stretch px-14 py-5 text-2xl whitespace-nowrap bg-green-600 rounded-lg max-md:px-5">
        Login
      </button>
    </header>
  );
}

export default Header;