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

