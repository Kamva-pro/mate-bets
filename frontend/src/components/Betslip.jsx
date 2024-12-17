import React from "react";


import "./style.css";

export const Betslip = () => {
  return (
    <div id="webcrumbs"> 
                	<div className="w-[400px] h-[400px] bg-neutral-200 shadow-lg rounded-lg relative">    <details className="absolute rounded-lg transform top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    	    <summary className="w-fit bg-neutral-300 rounded-md py-2 px-4 mx-auto cursor-pointer text-neutral-950 font-title text-center">Betslip</summary>
    	    <div className="overflow-y-auto h-[calc(100%_-_56px)] relative mt-2">
    	      <button className="absolute top-4 right-4 w-[24px] h-[24px] bg-neutral-400 text-neutral-950 rounded-full flex justify-center items-center">
    	        <span className="material-symbols-outlined text-sm">close</span>
    	      </button>
    	      <div className="w-[350px] bg-neutral-300 p-4 rounded-md mx-auto">
    	        <h2 className="font-title text-neutral-950 text-lg mb-4">Betslip</h2>
    	        <ul className="space-y-4">
    	          <li className="p-3 bg-white shadow-md rounded-md flex justify-between items-center">
    	            <span className="text-neutral-950">Bet 1</span>
    	            <span className="text-neutral-950">2.0</span>
    	          </li>
    	          <li className="p-3 bg-white shadow-md rounded-md flex justify-between items-center">
    	            <span className="text-neutral-950">Bet 2</span>
    	            <span className="text-neutral-950">1.8</span>
    	          </li>
    	          <li className="p-3 bg-white shadow-md rounded-md flex justify-between items-center">
    	            <span className="text-neutral-950">Bet 3</span>
    	            <span className="text-neutral-950">1.5</span>
    	          </li>
    	        </ul>
    	        <div className="mt-4 border-t border-neutral-400 pt-4">
    	          <div className="flex justify-between text-neutral-950 mb-2">
    	            <span>Total Odds:</span>
    	            <span>6.5</span>
    	          </div>
    	          <div className="flex justify-between text-neutral-950 mb-4">
    	            <span>Potential Return:</span>
    	            <span>$650</span>
    	          </div>
    	        </div>
    	      </div>
    	    </div>
    	    <button className="w-[350px] bg-primary-500 text-primary-50 py-2 rounded-md mt-4">
    	      Place Bet
    	    </button>
    	  </details>
    	</div> 
                </div>
  )
}

