import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import HistoriesData from "../data/historiesdata.json";

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
  font-family: "Arial", sans-serif;
  background: linear-gradient(135deg, #1e3c72, #f56b2a);
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.h2`
  margin-top: 4rem;
  font-size: 2.5rem;
  margin-bottom: 4rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 5rem;
    margin-bottom: 2rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 7rem;
`;

const Card = styled.div`
  perspective: 1000px;
  width: 220px;
  height: 320px;
  position: relative;

  &:hover .card-inner {
    transform: rotateY(180deg);
  }
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  img {
    width: 100%;
    height: 85%;
    object-fit: cover;
  }

  div {
    padding: 1rem;
    text-align: center;
    font-weight: bold;
    color: black;
    background-color: #f5f5f5;
  }
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #f56b2a, #1e3c72);
  border-radius: 8px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  button {
    background: #ffffff;
    color: #f56b2a;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      background: #f56b2a;
      color: #ffffff;
    }
  }
`;

const Histories = () => {
  const navigate = useNavigate();
  const histories = HistoriesData.histories;

  useEffect(() => {
    document.title = "Types of Histories";
  }, []);

  const handleReadMore = (title) => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/histories/${formattedTitle}`);
  };

  return (  
    <PageWrapper>
      <PageContent>
        <Header>Types Of Histories</Header>
        <CardContainer>
          {Object.keys(histories).map((key) => {
            const history = histories[key];
            const image = require(`../images/${history.image}`);
            return (
              <Card key={key}>
                <CardInner className="card-inner">
                  <CardFront>
                    <img src={image.default || image} alt={history.title} />
                    <div>{history.title}</div>
                  </CardFront>
                  <CardBack>
                    <h3>{history.title}</h3>
                    <p>{history.carddesc}</p>
                    <button onClick={() => handleReadMore(history.title)}>
                      Read
                    </button>
                  </CardBack>
                </CardInner>
              </Card>
            );
          })}
        </CardContainer>
      </PageContent>
      <Footer />
    </PageWrapper>
  );
};

export default Histories;
