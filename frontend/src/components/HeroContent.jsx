import * as React from "react";
import styled from "styled-components";

export function HeroContent() {
  return (
    <main>
      <HeroTitle>Put your money where your moves are</HeroTitle>
      <HeroSubtitle>Play against your friends and place a bet</HeroSubtitle>
      <CallToAction>Bet Now</CallToAction>
      <StatsContainer aria-hidden="true" />
    </main>
  );
}

const HeroTitle = styled.h2`
  font-size: 64px;
  width: 803px;
  margin: 259px 0 0 115px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin: 40px 0 0 0;
    font-size: 40px;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 28px;
  font-weight: 500;
  margin: 26px 0 0 115px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin: 26px 0 0 0;
  }
`;

const CallToAction = styled.button`
  border-radius: 4px;
  background-color: #000;
  box-shadow: 12px 12px 25px rgba(255, 255, 255, 0.5);
  border: none;
  color: inherit;
  font-size: 28px;
  margin: 26px 0 0 115px;
  padding: 24px 65px;
  cursor: pointer;

  @media (max-width: 991px) {
    margin: 26px 0 0 10px;
    padding: 20px;
  }
`;

const StatsContainer = styled.div`
  align-self: center;
  display: flex;
  margin-top: 152px;
  width: 100%;
  max-width: 1148px;
  gap: 20px;
  font-size: 20px;
  font-weight: 500;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;