  import React, {useEffect} from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import styled, { keyframes } from "styled-components";
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
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

  const MainContent = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-right: 2rem;

    @media (max-width: 768px) {
      padding-right: 0;
    }
  `;

  const PartsBar = styled.div`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  padding: 1.5rem;
  border-radius: 8px;
  margin: auto 0;
  text-align: center;
  max-width: 100%; 
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 90%;
    margin: 2rem auto;
  }
`;

const PartLink = styled.a`
  display: block;
  font-size: 1rem;
  margin: 0.5rem 0;
  text-decoration: none;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
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
  font-weight: bold;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    background: #ffffff;
    color: #f56b2a;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.5rem 0;
  }
`;


const SidebarTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #ffffff;
  text-decoration: underline;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;


  const Title = styled.h1`
    text-align: center;
    margin-top: 6rem;
    font-size: 3rem;
    margin-bottom: 1rem;
    text-decoration: underline;
    font-weight: 300;

    @media (max-width: 768px) {
      font-size: 2rem;
      margin-top: 4rem;
    }
  `;

  const Description = styled.p`
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 8px;
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 100%;
  text-align: justify;
  line-height: 1.8;
  color: #f2cb05;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 1rem;
    line-height: 1.6;
  }
`;

  const CharactersSection = styled.div`
    margin-top: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  `;

  const CharacterContainer = styled.div`
    display: flex;
    justify-content: left;
    gap: 1.5rem;
    flex-wrap: wrap;
    cursor: pointer;

    @media (max-width: 768px) {
      justify-content: center;
      gap: 1rem;
    }
  `;

  const CharacterCard = styled.div`
    background: rgba(255, 255, 255, 0.1);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    width: 120px;
    transition: transform 0.3s ease;

    &:hover {
      transform: translateY(-5px);
    }

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 0.5rem;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    }

    div {
      font-size: 0.9rem;
      font-weight: bold;

      @media (max-width: 768px) {
        font-size: 0.8rem;
      }
    }
  `;

  const HistoryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const history = historiesData.histories[id];
  
    useEffect(() => {
      if (history) {
        document.title = history.title;
      } else {
        document.title = "History Not Found";
      }
    }, [history]);
  
    if (!history) {
      return <PageContent>History not found.</PageContent>;
    }
  
    const handleCharacterClick = (name) => {
      navigate(`/histories/${id}/characters/${name.toLowerCase()}`);
    };
  
    const handlePartClick = (title) => {
      navigate(`/histories/${id}/parts/${title.toLowerCase().replace(/\s+/g, "-")}`);
    };
  
    return (
      <PageWrapper>
        <PageContent>
          <MainContent>
            <Title>{history.title}</Title>
            <Description>{history.description}</Description>
            <CharactersSection>
              <h2 style={{ textAlign: "left", color: "#ffff", marginBottom: "1rem" }}>
                Characters:
              </h2>
              <CharacterContainer>
                {history.characters.map((char, index) => {
                  const image = require(`../images/${char.img}`);
                  return (
                    <CharacterCard key={index} onClick={() => handleCharacterClick(char.name)}>
                      <img src={image.default || image} alt={char.name} />
                      <div>{char.name}</div>
                    </CharacterCard>
                  );
                })}
              </CharacterContainer>
            </CharactersSection>
          </MainContent>
  
          <PartsBar>
            <SidebarTitle>Parts</SidebarTitle>
            {history.parts.map((part, index) => (
              <PartLink
                key={index}
                onClick={() => handlePartClick(part.title)}
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
  
  export default HistoryDetails;