import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import historiesData from "../data/historiesdata.json";
import Footer from "../components/footer";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const PageContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  background: linear-gradient(135deg, #1e3c72, #f56b2a);
  color: #ffffff;
  font-family: "Arial", sans-serif;
  padding: 2rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const MainContent = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  padding-right: 2rem;

  @media (max-width: 1024px) {
    padding-right: 0;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 5rem;
  font-size: 3rem;
  margin-bottom: 2rem;
  text-decoration: underline;
  color: #ffff;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 3rem;
  }
`;

const DescriptionContainer = styled.div`
  background: #000000;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1.2rem;
  color: #f2cb05;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
    text-align: justify;
  }
`;

const PartTitle = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${({ index }) =>
    index === 0
      ? "#C75000"
      : index === 1
      ? "#E57227"
      : index === 2
      ? "#EF8B4A"
      : index === 3
      ? "#3F51B5"
      : index === 4
      ? "#4CAF50"
      : index === 5
      ? "#388E3C"
      : "#1B5E20"};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DescriptionBox = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  line-height: 1.6;
  font-size: 1.2rem;
  color: #f2cb05;

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
  }
`;

const PartsBar = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  margin: auto;
  margin-top: 6rem;

  @media (max-width: 1024px) {
    width: 90%;
    margin: 2rem auto;
    min-height: auto;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #ffffff;
  text-decoration: underline;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const PartLink = styled.button`
  display: block;
  font-size: 1rem;
  margin: 0.5rem 0;
  padding: 0.75rem 0;
  width: 100%;
  text-align: center;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: ${({ index }) =>
    index === 0
      ? "#C75000"
      : index === 1
      ? "#E57227"
      : index === 2
      ? "#EF8B4A"
      : index === 3
      ? "#3F51B5"
      : index === 4
      ? "#4CAF50"
      : index === 5
      ? "#388E3C"
      : "#1B5E20"};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #ffffff;
    color: #1e3c72;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const PartsDetails = () => {
  const { id } = useParams();
  const descriptionRef = useRef(null);

  const history = historiesData.histories[id] || { parts: [] };
  const [selectedPart, setSelectedPart] = useState(history.parts[0] || {});
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePartClick = (part, index) => {
    setSelectedPart(part);
    setSelectedIndex(index);
  };

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedPart]);

  if (!history.parts.length) {
    return <PageContent>History not found.</PageContent>;
  }

  return (
    <PageWrapper>
      <PageContent>
        <MainContent ref={descriptionRef}>
          <Title>{history.title}</Title>
          <DescriptionContainer>
            <PartTitle index={selectedIndex}>{selectedPart.title}</PartTitle>
            <DescriptionBox>{selectedPart.story}</DescriptionBox>
          </DescriptionContainer>
        </MainContent>

        <PartsBar>
          <SidebarTitle>Parts</SidebarTitle>
          {history.parts.map((part, index) => (
            <PartLink
              key={index}
              onClick={() => handlePartClick(part, index)}
              index={index}
            >
              {part.title}
            </PartLink>
          ))}
        </PartsBar>
      </PageContent>
      <Footer />
    </PageWrapper>
  );
};

export default PartsDetails;
