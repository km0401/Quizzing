import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent } from "@mui/material";
import { useParams } from "react-router-dom"; // Import useParams

function Gameplay() {
  const { roomcode } = useParams(); // Retrieve the "roomcode" parameter from the URL

  const sampleQuestions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Madrid", "Paris"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars",
    },
    // Add more questions here
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [scores, setScores] = useState({});
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    // Start a timer when the component mounts
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    // Clean up the timer interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleOptionClick = (selectedOption) => {
    // Ensure the game is not over before handling the click
    if (!gameOver) {
      const currentQuestionObj = sampleQuestions[currentQuestion];

      // Check if the selected option is correct
      if (selectedOption === currentQuestionObj.correctAnswer) {
        // Increase the user's score
        setScores((prevScores) => ({
          ...prevScores,
          [currentQuestion]: (prevScores[currentQuestion] || 0) + 1,
        }));
      }

      // Store the user's answer
      setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedOption]);

      // Move to the next question
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Game over, calculate the winner
        setGameOver(true);
        const highestScore = Math.max(...Object.values(scores));
        const winners = Object.keys(scores).filter(
          (userId) => scores[userId] === highestScore
        );

        // Display the winners and end the game
        alert(`Game Over! Winners: Users ${winners.join(", ")}`);
      }
    }
  };

  return (
    <div>
      <Typography variant="h4">Gameplay</Typography>
      <Typography variant="h6">Room Code: {roomcode}</Typography>
      {gameOver ? (
        <Typography variant="h5">Game Over!</Typography>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h5">
              Question {currentQuestion + 1}:
            </Typography>
            <Typography variant="body1">
              {sampleQuestions[currentQuestion].question}
            </Typography>
            {sampleQuestions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outlined"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
      <Typography variant="body1">Timer: {timer} seconds</Typography>
      <Typography variant="body1">
        Your Score: {scores[currentQuestion]}
      </Typography>
    </div>
  );
}

export default Gameplay;
