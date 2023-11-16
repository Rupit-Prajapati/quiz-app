import { ThemeProvider, createTheme } from "@mui/material";
import { ReactNode, createContext, useContext, useState } from "react";
import themeConfig from "./Theme";

interface ColorModeProviderProps {
  children: ReactNode;
}

interface ColorModeContextType {
  toggleColorMode: () => void;
  themeMode: boolean;
  QNA: QNArray[];
}

interface QNArray {
  question: string;
  options: {
    answerText: string;
    isCorrect: boolean;
  }[];
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined
);

function ColorModeProvider({ children }: ColorModeProviderProps) {
  const [themeMode, setThemeMode] = useState(false);
  const theme = themeConfig(themeMode);
  const toggleColorMode = () => {
    setThemeMode(!themeMode);
  };

  const QNA: QNArray[] = [
    {
      question: "What is the capital of France?",
      options: [
        { answerText: "Paris", isCorrect: true },
        { answerText: "Berlin", isCorrect: false },
        { answerText: "Rome", isCorrect: false },
        { answerText: "Madrid", isCorrect: false },
      ],
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: [
        { answerText: "Venus", isCorrect: false },
        { answerText: "Mars", isCorrect: true },
        { answerText: "Jupiter", isCorrect: false },
        { answerText: "Saturn", isCorrect: false },
      ],
    },
    {
      question: "In which year did the United States declare its independence?",
      options: [
        { answerText: "1789", isCorrect: false },
        { answerText: "1801", isCorrect: false },
        { answerText: "1776", isCorrect: true },
        { answerText: "1824", isCorrect: false },
      ],
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: [
        { answerText: "Charles Dickens", isCorrect: false },
        { answerText: "Jane Austen", isCorrect: false },
        { answerText: "Mark Twain", isCorrect: false },
        { answerText: "William Shakespeare", isCorrect: true },
      ],
    },
    {
      question: "What is the largest mammal in the world?",
      options: [
        { answerText: "Elephant", isCorrect: false },
        { answerText: "Blue Whale", isCorrect: true },
        { answerText: "Giraffe", isCorrect: false },
        { answerText: "Polar Bear", isCorrect: false },
      ],
    },
    {
      question: "Which country is known as the 'Land of the Rising Sun'?",
      options: [
        { answerText: "China", isCorrect: false },
        { answerText: "Japan", isCorrect: true },
        { answerText: "India", isCorrect: false },
        { answerText: "Australia", isCorrect: false },
      ],
    },
    {
      question: "Who developed the theory of relativity?",
      options: [
        { answerText: "Isaac Newton", isCorrect: false },
        { answerText: "Albert Einstein", isCorrect: true },
        { answerText: "Galileo Galilei", isCorrect: false },
        { answerText: "Stephen Hawking", isCorrect: false },
      ],
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: [
        { answerText: "Oxygen", isCorrect: true },
        { answerText: "Gold", isCorrect: false },
        { answerText: "Iron", isCorrect: false },
        { answerText: "Silver", isCorrect: false },
      ],
    },
    {
      question: "What is the currency of Japan?",
      options: [
        { answerText: "Yuan", isCorrect: false },
        { answerText: "Dollar", isCorrect: false },
        { answerText: "Euro", isCorrect: false },
        { answerText: "Yen", isCorrect: true },
      ],
    },
    {
      question: "Who painted the Mona Lisa?",
      options: [
        { answerText: "Vincent van Gogh", isCorrect: false },
        { answerText: "Pablo Picasso", isCorrect: false },
        { answerText: "Leonardo da Vinci", isCorrect: true },
        { answerText: "Michelangelo", isCorrect: false },
      ],
    },
  ];

  const contextValue: ColorModeContextType = {
    toggleColorMode,
    themeMode,
    QNA,
  };

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};

export { ColorModeContext, useColorMode, ColorModeProvider };
