import React from 'react';
import "../css/Hero.css";
import { Link } from 'react-router-dom';

 function HeroSection() {
  return (
    <div className='hero-section'>
      <div className='hero-banner'>
        <div className='hero-content'>
        <h1>Put Your Money Where Your Moves Are!</h1>
        <h6>Play against your friends and win big!</h6>
        <Link  type='button' to="/playfriend" className='bet-now'>Bet Now</Link>
      </div></div>
      
    </div>
  );
}


export default HeroSection