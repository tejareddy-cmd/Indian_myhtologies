import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import quizData from "../data/quizdata.json";
import congratulationsAnimation from "../images/congratulations.json";
import sadAnimation from "../images/sad.json";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${(props) =>
    props.isResult ? "#ffffff" : "linear-gradient(135deg, #1e3c72, #ff5722)"};
  min-height: 100vh;
  color: ${(props) => (props.isResult ? "#000000" : "#ffffff")};
  transition: background-color 0.3s ease;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Header = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 2rem 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const QuestionCard = styled.div`
  background: #1e1e1e;
  border-radius: 10px;
  padding: 30px;
  margin: 2rem;
  width: 90%;
  max-width: 800px;
  text-align: left;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  h3 {
    color: #f2cb05;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const OptionButton = styled.button`
  display: block;
  width: 100%;
  background: ${(props) =>
    props.isCorrect ? "#4CAF50" : props.isWrong ? "#FF5722" : "#ffffff"};
  color: ${(props) => (props.isCorrect || props.isWrong ? "#ffffff" : "#000000")};
  border: none;
  padding: 20px;
  margin: 10px 0;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  transition: background-color 0.3s ease;
  font-weight: bold;

  &:hover {
    background: ${(props) =>
      props.disabled
        ? props.background
        : props.isCorrect || props.isWrong
        ? props.background
        : "#ffffff"};
    color: #000000;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const TimerContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  margin-top: 7rem;

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    margin-top: 10rem;
  }

    @media (max-width: 768px) {
    margin-top: 10rem;
  }
`;

const ResultCard = styled.div`
  background: #ffffff;
  border-radius: 10px;
  text-align: center;
  color: #000000;
  width: 100%; 
  max-width: 600px; 
  padding: 2rem;
  margin: auto; 

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const PlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    margin-bottom: 0.8rem;
  }
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Score = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #FF6700;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ResultButton = styled.button`
  background: #4caf50;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const QuizQuestions = () => {
  const { category, quizName } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(10);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const history = quizData.histories.find(
    (historyItem) => historyItem.name === category
  );

  const quiz = history.quizzes.find(
    (quizItem) => quizItem.quiz_name === quizName
  );

  const questions = quiz.questions;

  useEffect(() => {
    if (!isAnswered && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleNext();
    }
  }, [timer, isAnswered]);

  const handleOptionClick = (option) => {
    if (isAnswered) return;

    const isCorrect = option === questions[currentQuestion].answer;
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    setTimeout(() => {
      handleNext();
    }, 2000);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setTimer(10);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    const isSuccess = correctCount >= 6;
    const animation = isSuccess ? congratulationsAnimation : sadAnimation;
    const message = isSuccess
      ? "You got very good in this quiz"
      : "Needs to improve!";

    return (
      <PageWrapper isResult>
        <ResultCard>
          <PlayerWrapper>
            <Player autoplay loop src={animation} style={{ height: "150px", width: "150px" }} />
          </PlayerWrapper>
          <Title>{isSuccess ? "Congratulations!" : "Needs to Improve More!"}</Title>
          <Score>
            {correctCount} out of {questions.length}
          </Score>
          <Message>{message}</Message>
          <ResultButton onClick={() => navigate(`/quiz/${category}`)}>
            Back to Quiz Menu
          </ResultButton>
        </ResultCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <TimerContainer>{timer}</TimerContainer>
      <Header>{quiz.quiz_name}</Header>
      <QuestionCard>
        <h3>
          Q{currentQuestion + 1}. {questions[currentQuestion].question}
        </h3>
        <div>
          {questions[currentQuestion].options.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              isCorrect={isAnswered && option === questions[currentQuestion].answer}
              isWrong={
                isAnswered &&
                selectedAnswer === option &&
                option !== questions[currentQuestion].answer
              }
            >
              {option}
            </OptionButton>
          ))}
        </div>
      </QuestionCard>
    </PageWrapper>
  );
};

export default QuizQuestions;
