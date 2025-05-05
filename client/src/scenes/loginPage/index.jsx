import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Form from "./Form";
import { setMode } from "../../state/index.js";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const dispatch = useDispatch();
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="0.5rem 6% 0.1rem 6%"
        textAlign="center"
      >
        {/*<Typography*/}
        {/*  fontWeight="bold"*/}
        {/*  fontSize="32px"*/}
        {/*  color="primary"*/}
        {/*></Typography>*/}
        <Box sx={{ width: "10rem", margin: "0 auto" }}>
          <img
            src={`/assets/${theme.palette.mode === "dark" ? "ryappi%20dark.png" : "ryappi%20white.png"}`}
            alt="logo"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Box>

      <Box
        width={isNonMobileScreens ? "30%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
        position="relative"
      >
        <IconButton
          onClick={() => dispatch(setMode())}
          sx={{ position: "absolute", top: "5px", right: "5px" }}
        >
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px" }} />
          ) : (
            <LightMode
              sx={{ color: theme.palette.neutral.dark, fontSize: "25px" }}
            />
          )}
        </IconButton>
        <Typography
          fontWeight="500"
          variant="h5"
          leading="10px"
          sx={{ mb: "1.5rem" }}
          textAlign="center"
          letterSpacing={"0.08rem"}
        >
          Welcome to the ryappi site
        </Typography>

        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
