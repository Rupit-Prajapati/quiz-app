import React from "react";
import ToggleMode from "./ToggleMode";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Box } from "@chakra-ui/react";
import QuestionCard from "./QuestionCard";
const App = () => {
  const theme = useTheme();
  const Color = theme.palette.primary.main;
  const backgroundColor = theme.palette.secondary.main;
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
        color: Color,
        p: 20,
        maxWidth: 400,
        margin: "20px auto",
        borderRadius: 10,
      }}
    >
      <ToggleMode />
      <QuestionCard />
    </Box>
  );
};

export default App;
