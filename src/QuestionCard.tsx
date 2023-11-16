import React, { useEffect, useState } from "react";
import { Box, Flex, useFormControlStyles } from "@chakra-ui/react";
import { useColorMode } from "./ColorModeProvider";
import { Button, FormControl, FormGroup, Typography } from "@mui/material";
interface Option {
  answerText?: string;
  isCorrect?: boolean;
  isUserAnswered?: boolean | undefined;
}

interface UserAnswer {
  question: string;
  selectedOptions: Option[];
}

const QuestionCard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const { QNA } = useColorMode();

  useEffect(() => {}, [userAnswers]);
  const handleAnswerCheck = (option: Option) => {
    if (option.isCorrect) {
      setScore(score + 1);
    }
    const updatedUserAnswer = {
      question: QNA[currentQuestion].question,
      selectedOptions: [
        ...QNA[currentQuestion].options.map((qOption) => ({
          ...qOption,
          isUserAnswered: qOption === option,
        })),
      ],
    };

    setUserAnswers((prevAnswers) => [...prevAnswers, updatedUserAnswer]);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < QNA.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const nextQuestion = (currentNumber: number) => {
    const updatedUserAnswer = {
      question: QNA[currentQuestion].question,
      selectedOptions: [
        ...QNA[currentQuestion].options.map((qOption) => ({
          ...qOption,
          isUserAnswered: false,
        })),
      ],
    };

    setUserAnswers((prevAnswers) => [...prevAnswers, updatedUserAnswer]);

    const nextQuestion = currentNumber + 1;
    if (nextQuestion < QNA.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const previousQuestion = (currentNumber: number) => {
    const nextQuestion = currentNumber - 1;
    if (nextQuestion > 0) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <>
      {showScore ? (
        <>
          <Typography paddingTop={2} variant="h5">
            Correct Questions Answered {score}
          </Typography>
          <Flex paddingTop={10} flexDirection={"column"} gap={"20px"}>
            {userAnswers.map((userAnswers, index) => {
              return (
                <Flex flexDirection={"column"} key={index} gap={"10px"}>
                  <Typography variant="h6">{userAnswers.question}</Typography>
                  <Flex flexDirection={"column"} gap={0}>
                    {userAnswers.selectedOptions.map((option, index) => {
                      const Correct = option.isCorrect;
                      const UserAnswer = option.isUserAnswered;
                      return (
                        <Typography
                          key={index}
                          variant="subtitle1"
                          color={
                            Correct
                              ? "green"
                              : UserAnswer && !Correct
                              ? "red"
                              : "white"
                          }
                        >
                          {index + 1}. {option.answerText}
                        </Typography>
                      );
                    })}
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </>
      ) : (
        <Box>
          <Typography paddingTop={2} variant="h5">
            Question {currentQuestion + 1}
          </Typography>
          <Typography paddingTop={1} variant="h6">
            {QNA[currentQuestion].question}
          </Typography>
          <FormControl>
            <FormGroup>
              <Flex
                flexWrap={"wrap"}
                justifyContent={"space-between"}
                gap={"10px"}
                paddingTop={"10px"}
              >
                {QNA[currentQuestion].options.map((option, index: number) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerCheck(option)}
                    fullWidth
                    variant="contained"
                  >
                    {option.answerText}
                  </Button>
                ))}
              </Flex>
            </FormGroup>
          </FormControl>
          <Flex pt={"20px"} gap={"10px"}>
            <Button
              variant="outlined"
              onClick={() => previousQuestion(currentQuestion)}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              onClick={() => nextQuestion(currentQuestion)}
            >
              Next
            </Button>
          </Flex>
        </Box>
      )}
    </>
  );
};

export default QuestionCard;
