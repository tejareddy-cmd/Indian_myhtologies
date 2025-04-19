import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import quizData from "../data/quizdata.json";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #1e3c72, #f56b2a); 
  min-height: 100vh;
  padding: 20px;
`;

const QuizGrid = styled.div`
  margin-top: 7rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 6rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  width: 200px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 200px;
    height: 250px;
    object-fit: cover;
  }

  h3 {
    padding: 10px;
    font-size: 1.2rem;
    text-align: center;
    color: black;
    margin: 0;
    font-weight: bold;
  }
`;

const QuizList = () => {
  const navigate = useNavigate();

  const handleCardClick = (name) => {
    navigate(`/quiz/${name}`);
  };

  return (
    <PageWrapper>
      <QuizGrid>
        {quizData.histories.map((history, index) => {
          const image = require(`../images/${history.image}`);
          return (
            <Card key={index} onClick={() => handleCardClick(history.name)}>
              <img src={image.default || image} alt={history.name} />
              <h3>{history.name}</h3>
            </Card>
          );
        })}
      </QuizGrid>
    </PageWrapper>
  );
};

export default QuizList;
