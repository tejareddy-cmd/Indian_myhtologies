import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1e3c72, #f56b2a);
  color: #ffffff;
  text-align: center;
  padding: 1.5rem 0;
  font-family: "Arial", sans-serif;
  font-size: 1rem;
  width: 100%;

  p {
    margin: 0;
    letter-spacing: 0.5px;
    font-weight: 500;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

    @media (max-width: 768px) {
      p {
        font-size: 0.7rem;
        margin: 0;
        letter-spacing: 0.5px;
        font-weight: 500;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      }
    }

  @media (max-width: 480px) {
      p {
        font-size: 0.7rem;
        margin: 0;
        letter-spacing: 0.5px;
        font-weight: 500;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      }
  }
`;

const Footer = () => (
  <FooterContainer>
    <p>© 2024 Indian History Mythologies. All rights reserved.</p>
  </FooterContainer>
);

export default Footer;
