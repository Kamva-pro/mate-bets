import * as React from "react";
import styled from "styled-components";
import { Navigation } from "./Navigation";
import { HeroContent } from "./HeroContent";

export function HeroLayout() {
  return (
    <StyledHeroSection>
      <Navigation />
      <HeroContent />
    </StyledHeroSection>
  );
}

const StyledHeroSection = styled.section`
  background-color: #121212;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: start;
  font-family: Montserrat, sans-serif;
  color: #fff;
  font-weight: 700;
  padding: 27px 31px 110px;

  @media (max-width: 991px) {
    padding: 0 20px 100px;
  }
`;