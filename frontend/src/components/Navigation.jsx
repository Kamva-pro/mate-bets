import * as React from "react";
import styled from "styled-components";

export function Navigation() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Play a friend", href: "/play" },
    { label: "Pro Games", href: "/pro" }
  ];

  return (
    <NavContainer>
      <BrandLogo>
        <span>Mate</span>{" "}
        <GreenText>Bets</GreenText>
      </BrandLogo>
      
      <nav>
        <NavList>
          {navItems.map((item) => (
            <NavItem key={item.label}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </NavItem>
          ))}
        </NavList>
      </nav>

      <LoginButton>Login</LoginButton>
    </NavContainer>
  );
}

const NavContainer = styled.header`
  align-self: stretch;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const BrandLogo = styled.h1`
  align-self: stretch;
  margin: auto 0;
  font: 40px Inter, sans-serif;
`;

const GreenText = styled.span`
  color: #238b57;
`;

const NavList = styled.ul`
  align-self: stretch;
  display: flex;
  align-items: center;
  gap: 66px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  align-self: stretch;
  margin: auto 0;
`;

const NavLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 20px;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  border-radius: 8px;
  background-color: #238b57;
  border: none;
  color: inherit;
  font-size: 24px;
  padding: 21px 54px;
  cursor: pointer;

  @media (max-width: 991px) {
    padding: 15px 20px;
  }
`;