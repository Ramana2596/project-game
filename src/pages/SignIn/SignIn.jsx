import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ColorModeSelect from "./theme/ColorModeSelect";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../core/access/userContext.js";
import { getUserDetails, intiateTeamPlay } from "./services/signInServices.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.js";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props) {
  const { setIsLoading } = useLoading();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [isValidUser, setValidUser] = React.useState(false);
  const [shouldTriggerApiCall, setShouldTriggerApiCall] = React.useState(false);
  const [userEmailValue, setUserEmailValue] = React.useState(null);
  const routeHistory = useNavigate();
  const { login, setUserInfo, userInfo } = useUser();
  const [userDetailsData, setUserDetailsData] = React.useState(null);

  React.useEffect(() => {
    if (shouldTriggerApiCall) {
      setIsLoading(true);
      getUserDetails({ userEmail: userEmailValue }).then((response) => {
        if (response) {
          setUserDetailsData(response.data);
        }
      })
        .catch(() => null)
        .finally(() => setIsLoading(false));
    }
  }, [shouldTriggerApiCall]);

  React.useEffect(() => {
    if (userDetailsData && userDetailsData.length > 0) {
      login(userDetailsData[0]?.Role);
      setUserInfo(userDetailsData[0]);
      setValidUser(true);
    } else {
      setValidUser(false);
    }
    setShouldTriggerApiCall(false);

    if (isValidUser) {
      intiateTeamPlay({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam
      }).then((response) => {
        if (response) {
          console.log('login successful');
        }
      });
      routeHistory("/operationGame/homePage");
    }
  }, [userDetailsData, isValidUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError) {
      return;
    }

    if (isValidUser) {
      routeHistory("/operationGame/homePage");
    }
  };

  const onLoginClick = () => {
    const email = document.getElementById("email");

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
      setUserEmailValue(email.value);
      setShouldTriggerApiCall(true);
    }
  };

  return (
    <div>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            className='standard-title-color'
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <FormControl>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? "error" : "primary"}
                sx={{ ariaLabel: "email" }}
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              className="standard-button-primary-button"
              onClick={onLoginClick}
            >
              Sign in
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </div>
  );
}
