import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import quizData from "../data/quizdata.json";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(135deg, #1e3c72, #ff5722);
  min-height: 100vh;
  color: #ffffff;
`;

const Header = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 3rem;
  text-decoration: underline;
  margin-top: 3rem;
  color: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const QuizGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem; 
  width: 100%;
  max-width: 900px; 
  margin: 0 auto; 

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); 
    justify-items: center; 
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr; 
    justify-items: center;
    gap: 1.5rem;
  }
`;

const QuizCard = styled.div`
  background: #1e1e1e;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 50%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    height: 140px;
    max-width: 80%; 
  }

  @media (max-width: 480px) {
    height: 130px;
    max-width: 90%;
  }
`;


const GradientText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
  background: ${(props) => props.gradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  color: transparent;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const QuizDetailList = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const history = quizData.histories.find(
    (historyItem) => historyItem.name === category
  );

  if (!history || history.quizzes.length === 0) {
    return (
      <PageWrapper>
        <Header>No quizzes found for {category}</Header>
      </PageWrapper>
    );
  }

  const gradients = [
    "linear-gradient(135deg, #FF5722, #FFFFFF)",
    "linear-gradient(350deg, #5C6BC0, #FFFFFF)",
    "linear-gradient(135deg, #4CAF50, #66BB6A)", 
    "linear-gradient(135deg, #FF5722, #FFFFFF)", 
    "linear-gradient(350deg, #5C6BC0, #FFFFFF)", 
    "linear-gradient(135deg, #4CAF50, #66BB6A)",
  ];

  return (
    <PageWrapper>
      <Header>{`${category.toUpperCase()} QUIZ`}</Header>
      <QuizGrid>
        {history.quizzes.map((quiz, index) => (
          <QuizCard
            key={index}
            onClick={() => navigate(`/quiz/${category}/${quiz.quiz_name}`)}
          >
            <GradientText gradient={gradients[index % gradients.length]}>
              Quiz {index + 1}
            </GradientText>
          </QuizCard>
        ))}
      </QuizGrid>
    </PageWrapper>
  );
};

export default QuizDetailList;
