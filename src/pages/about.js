import React from "react";
import styled, { keyframes } from "styled-components";
import Footer from "../components/footer";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const grow = keyframes`
  from {
    transform: scale(0.95);
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

const PageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
  background-color: #ffffff;
  color: #000000;
`;

const Section = styled.div`
  width: 100%;
  max-width: 800px;
  margin: ${({ first }) => (first ? "4rem 0 2rem" : "2rem 0")};
  background-color: ${({ bg }) => bg || "#f5f5f5"};
  color: ${({ color }) => color || "#000"};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${grow} 1s ease-in-out;
`;

const SectionTitle = styled.h3`
  font-size: 2rem;
  color: ${({ color }) => color || "#ffa500"};
  margin-bottom: 1.5rem;
  text-align: ${({ align }) => align || "left"};
  animation: ${slideIn} 0.8s ease-in-out;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  text-align: justify;
  animation: ${fadeIn} 1.2s ease-in-out;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const About = () => (
  <PageWrapper>
    <PageContent>
      <Section bg="#ffff" color="#000" first>
        <SectionTitle color="#ffa500" align="center">
          What Indian History Teaches
        </SectionTitle>
        <Paragraph>
          Indian history teaches the story of a diverse and vibrant civilization, marked by rich
          cultural heritage, intellectual achievements, and profound spiritual traditions. It
          highlights the evolution of ancient civilizations like the Indus Valley, the development
          of Vedic culture, the rise of empires like the Maurya and Gupta, and the contributions of
          prominent leaders and thinkers in fields like philosophy, science, and art. Indian history
          also reflects periods of foreign invasions, cultural assimilation, and resistance,
          culminating in the struggle for independence from British rule. It emphasizes resilience,
          unity in diversity, and the enduring quest for harmony and justice.
        </Paragraph>
      </Section>

      <Section bg="#e3e3e3" color="#000">
        <SectionTitle color="#333" align="center">
          Who Are There in Mythological Indian History
        </SectionTitle>
        <Paragraph>
          Mythological Indian history is rich with legendary figures and deities, each symbolizing
          profound moral, spiritual, and philosophical values. Key figures include Rama, the
          righteous hero of the Ramayana, and Krishna, the divine strategist and philosopher of the
          Mahabharata, both incarnations of Lord Vishnu. Shiva, the destroyer and transformer, and
          Durga, the fierce goddess of protection, are central to Hindu mythology. Other notable
          characters include Arjuna, the brave warrior, and Draupadi, the embodiment of resilience,
          from the Mahabharata. Figures like Hanuman, known for devotion and strength, and Sita,
          representing virtue and loyalty, also play pivotal roles.
        </Paragraph>
      </Section>

      <Section bg="#ffff" color="#000">
        <SectionTitle color="#ffa500" align="center">
          What One Should Know About IHM
        </SectionTitle>
        <Paragraph>
          Indian mythology history is a tapestry of timeless stories, epics, and legends that weave
          together the cultural, moral, and spiritual fabric of ancient India. It is primarily drawn
          from sacred texts like the Vedas, Puranas, and epic narratives such as the Mahabharata and
          Ramayana. These stories explore the interactions of gods, humans, and demons, often
          depicting the eternal struggle between good and evil. Themes of dharma (righteousness),
          karma (action and consequence), and moksha (liberation) are central, teaching profound life
          lessons. Indian mythology is also deeply symbolic, using allegories to explain universal
          truths and foster cultural values like devotion, humility, and resilience.
        </Paragraph>
      </Section>
    </PageContent>
    <Footer />
  </PageWrapper>
);

export default About;
