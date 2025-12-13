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
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from "./services/signInServices.js";
import { useLoading } from "../../hooks/loadingIndicatorContext.jsx";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  borderRadius: "20px",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "0 20px 60px rgba(123, 31, 162, 0.25)",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(123, 31, 162, 0.1)",
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
    background: "linear-gradient(180deg, #fafbfc 0%, #f6f5f8 100%)",
    backgroundRepeat: "no-repeat",
  },
  "&::after": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: "-50%",
    width: "200%",
    height: "100%",
    background: "radial-gradient(circle at 20% 50%, rgba(123, 31, 162, 0.08) 0%, transparent 50%)",
    animation: "float 20s ease-in-out infinite",
  },
}));


export default function SignIn(props) {
  const { setIsLoading } = useLoading();
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const navigate = useNavigate();
  const { login, setUserInfo } = useUser();

  // Handle sign in with email validation
  const handleSignIn = () => {
    const emailInput = document.getElementById("email");
    const email = emailInput?.value || "";

    // Validate email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      return;
    }

    setEmailError(false);
    setEmailErrorMessage("");
    setIsLoading(true);

    // Fetch user details
    getUserDetails({ userEmail: email })
      .then((response) => {
        // response.data contains the API response: { returnStatus, message, data: [...] }
        const apiData = response?.data?.data?.[0];
        if (apiData) {
          login(apiData.Role);
          setUserInfo(apiData);
          navigate("/operationGame/homePage");
        } else {
          setEmailError(true);
          setEmailErrorMessage("User not found. Please check your email.");
        }
      })
      .catch(() => {
        setEmailError(true);
        setEmailErrorMessage("Sign in failed. Please try again.");
      })
      .finally(() => setIsLoading(false));
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
            className="standard-title-color"
            sx={{ 
              width: "100%", 
              fontSize: "clamp(1.75rem, 8vw, 2.25rem)",
              mb: 2,
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontWeight: 700,
              letterSpacing: '-0.3px',
              lineHeight: 1.3,
              overflow: 'visible',
              pb: 0.5,
            }}
          >
            Log in
          </Typography>
          <Box
            component="form"
            // onSubmit={handleSubmit}  // ❌ commented since not executed
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2.5,
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
                sx={{ 
                  ariaLabel: "email",
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    fontSize: '15px',
                    height: '52px',
                    padding: '0 16px',
                    '& input': {
                      padding: '16px 0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#7b1fa2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#7b1fa2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    fontSize: '14px',
                  },
                }}
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              className="standard-button-primary-button"
              onClick={handleSignIn}
            >
              Log in
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </div>
  );
}
