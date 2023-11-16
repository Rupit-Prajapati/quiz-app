import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useColorMode } from "./ColorModeProvider";
import { Typography } from "@mui/material";

type ColorModeType = {
  toggleColorMode: () => void;
  themeMode: boolean;
};

const ToggleMode: React.FC = () => {
  const { toggleColorMode, themeMode }: ColorModeType = useColorMode();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4"> Quiz App</Typography>
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {themeMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default ToggleMode;
