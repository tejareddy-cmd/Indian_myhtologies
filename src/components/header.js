import React, { useState, useEffect } from "react";
import { NavLink as RouterNavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${({ isHome }) => (isHome ? "transparent" : "#1E1E1E")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  z-index: 100;
  transition: background 0.3s ease;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #f39c12;
  font-family: "Arial Black", sans-serif;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
    z-index: 101;
  }

  & span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: white;
    margin: 5px 0;
    transition: transform 0.3s ease, opacity 0.3s ease, background-color 0.3s ease;
  }

  &.open span {
    background-color: #f39c12;
  }

  &.open span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.open span:nth-child(2) {
    opacity: 0;
  }

  &.open span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.95);
    padding: 1rem 0;
    transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-200%)")};
    opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    z-index: 100;
    text-align: center;
  }

  @media (min-width: 769px) {
    flex-direction: row;
    position: static;
    justify-content: flex-end;
    width: auto;
    background: none;
    padding: 0;
    transform: none;
    opacity: 1;
  }
`;

const StyledNavLink = styled(RouterNavLink)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.5rem 1rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  border: 2px solid transparent;
  border-radius: 20px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(to right, #f2cb05, #ffffff);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    transition: background 0.3s ease-in-out;
  }

  &.active {
    color: #f39c12;
    &::before {
      background: linear-gradient(to right, #ff6700, #ffffff, #138808);
    }
  }

  &:hover {
    color: #f2cb05;
  }
`;

const QuizNavLink = styled(StyledNavLink)`
  &:hover {
    background: linear-gradient(to right, #ff9933, #ffffff, #138808);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: background 0.5s ease-in-out;
  }

  &::before {
    content: none;
  }

  &.active {
    background: linear-gradient(to right, #ff9933, #ffffff, #138808);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get the current location

  // Close the menu when the location changes
  useEffect(() => {
    setMenuOpen(false); // Close the menu
  }, [location]); // Trigger on location change

  const isHome = location.pathname === "/"; // Check if current page is Home

  return (
    <HeaderContainer isHome={isHome}>
      <Logo>IHM</Logo>
      <MenuIcon
        onClick={() => setMenuOpen(!menuOpen)}
        className={menuOpen ? "open" : ""}
      >
        <span></span>
        <span></span>
        <span></span>
      </MenuIcon>
      <Nav $isOpen={menuOpen}>
        <StyledNavLink to="/" exact>
          Home
        </StyledNavLink>
        <StyledNavLink to="/about">
          About
        </StyledNavLink>
        <StyledNavLink to="/histories">
          Histories
        </StyledNavLink>
        <StyledNavLink to="/contactus">
          Contact
        </StyledNavLink>
        <QuizNavLink to="/quiz">
          Quiz
        </QuizNavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
