import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/footer";
import historiesData from "../data/historiesdata.json";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72, #f56b2a);
  font-family: "Arial", sans-serif;
  color: #ffffff;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 5rem;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    gap: 1.5rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;

  h1 {
    font-size: 2rem;
    color: #ffffff;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  img {
    width: 220px;
    height: 260px;
    border-radius: 12px;
    object-fit: cover;

    @media (max-width: 768px) {
      width: 180px;
      height: 220px;
    }
  }
`;

const DescriptionContainer = styled.div`
  flex: 2;
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 12px;
  color: #f2cb05;

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    text-align: justify;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const CharactersAndHistoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const CharactersContainer = styled.div`
  
  flex: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start; 
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  margin-left: -2rem; 
  h2 {
    width: 100%; 
    font-size: 2rem;
    font-weight: bold;
    color: #ffffff;
    text-align: left;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 1024px) {
    margin-left: 0; 
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 1rem;
  }
`;


const CharacterCard = styled.div`
  background: ${({ isSelected }) =>
    isSelected ? "rgba(255, 255, 255, 0.2)" : "rgba(255, 255, 255, 0.1)"};
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  width: 150px; 
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 150px;
    height: 200px;
    border-radius: 12px;
    object-fit: cover;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      width: 120px;
      height: 160px;
    }
  }

  div {
    font-size: 1rem;
    font-weight: bold;
    color: #ffffff;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

const HistoryBar = styled.div`
  flex: 1;
  min-width: 250px; 
  max-width: 250px;
  background: #000000;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
    text-decoration: underline;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }

  ul {
    list-style-type: none;
    padding: 0;

    li {
      margin-bottom: 1rem;
      font-size: 1.2rem;

      @media (max-width: 768px) {
        font-size: 1rem;
      }

      a {
        text-decoration: none;
        font-weight: bold;
        color: #ffffff;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const CharacterPage = () => {
  const { id, characterName } = useParams();
  const navigate = useNavigate();
  const titleRef = useRef(null);

  const history = historiesData.histories[id];
  const [selectedCharacter, setSelectedCharacter] = useState(
    history?.characters.find(
      (char) => char.name.toLowerCase() === characterName.toLowerCase()
    )
  );

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedCharacter]);

  const handleCharacterClick = (char) => {
    setSelectedCharacter(char);
    navigate(`/histories/${id}/characters/${char.name.toLowerCase()}`);
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <ImageContainer ref={titleRef}>
          <h1>{selectedCharacter.name}</h1>
          <img
            src={require(`../images/${selectedCharacter.img}`)}
            alt={selectedCharacter.name}
          />
        </ImageContainer>

        <DescriptionContainer>
          <p>{selectedCharacter.desc}</p>
        </DescriptionContainer>
      </ContentWrapper>

      <CharactersAndHistoryWrapper>
      <CharactersContainer>
  <h2>Characters</h2>
  {history.characters.map((char) => (
    <CharacterCard
      key={char.name}
      isSelected={char.name === selectedCharacter.name}
      onClick={() => handleCharacterClick(char)}
    >
      <img src={require(`../images/${char.img}`)} alt={char.name} />
      <div>{char.name}</div>
    </CharacterCard>
  ))}
</CharactersContainer>


        <HistoryBar>
          <h3>Histories</h3>
          <ul>
            {Object.keys(historiesData.histories).map((historyId) => (
              <li key={historyId}>
                <a onClick={() => navigate(`/histories/${historyId}`)}>
                  {historiesData.histories[historyId].title}
                </a>
              </li>
            ))}
          </ul>
        </HistoryBar>
      </CharactersAndHistoryWrapper>
      <Footer />
    </PageWrapper>
  );
};

export default CharacterPage;
