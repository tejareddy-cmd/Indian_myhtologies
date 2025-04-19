import React from "react";
import styled, { keyframes } from "styled-components";
import GlobalStyle from "../styles/GlobalStyle";
import background from "../images/background.png";
import krishna from "../images/krishna.png";
import rama from "../images/karna.png";
import Footer from "../components/footer";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainSection = styled.main`
  flex: 1; 
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 2rem; 
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  z-index: -1;
  animation: ${fadeIn} 2s ease-in-out;
`;

const TitleSection = styled.div`
  text-align: center;
  margin-top: 4rem;
  margin-bottom: 2rem;
  z-index: 1;
  animation: ${zoomIn} 1s ease-in-out;

  @media (max-width: 768px) {
    margin-top: 3rem; 
  }

  @media (max-width: 480px) {
    margin-top: 3rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.2;
  background: linear-gradient(
    to right,
    #ff6700 25%,
    #ffffff 35%,
    #06427a 60%,
    #138808 80%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  padding: 2rem;
  box-sizing: border-box;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ContentCard = styled.div`
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  padding: 2rem;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 2s ease-in-out;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
    font-size: 0.8rem;
  }
`;

const ContentImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  &:nth-child(1) {
    animation: ${slideInFromLeft} 1.5s ease-out;
  }

  &:nth-child(3) {
    animation: ${slideInFromRight} 1.5s ease-out;
  }

  img {
    display: block;
    border-radius: 10px;
    max-width: 150px;
    height: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      max-width: 120px;
    }
    @media (max-width: 480px) {
      max-width: 100px;
    }
  }
`;

const ContentText = styled.p`
  color: #fff;
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
  font-weight: 400;
  flex: 1;
  margin: 0 20px;
  animation: ${zoomIn} 2s ease-in-out;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 1rem 0;
    text-align: center; 
    text-align: justity;
  }
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const Home = () => (
  <>
    <GlobalStyle />
    <PageWrapper>
      <MainSection>
        <BackgroundImage />
        <TitleSection>
          <Title>Indian History Mythologies</Title>
        </TitleSection>
        <Content>
          <ContentCard>
            <ContentImageWrapper>
              <img src={krishna} alt="Krishna" />
            </ContentImageWrapper>
            <ContentText>
              Indian history and mythology are inextricably linked, with
              writings such as the Ramayana, Mahabharata, and Bhagavad Gita
              providing the foundation of cultural and spiritual heritage. The
              Ramayana tells the legendary story of Lord Rama's exile, the
              kidnapping of his wife Sita by the demon king Ravana, and her
              eventual recovery, which represents the triumph of dharma
              (goodness). The Mahabharata is a large epic that tells the story
              of the Pandavas and Kauravas' Kurukshetra War while also delving
              into complicated human emotions, morality, and justice.
            </ContentText>
            <ContentImageWrapper>
              <img src={rama} alt="Lord Rama" />
            </ContentImageWrapper>
          </ContentCard>
        </Content>
      </MainSection>
      <Footer />
    </PageWrapper>
  </>
);

export default Home;
