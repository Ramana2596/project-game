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

  // ✅ API Call Trigger
  React.useEffect(() => {
    if (shouldTriggerApiCall) {
      setIsLoading(true);
      getUserDetails({ userEmail: userEmailValue })
        .then((response) => {
          if (response) {
            setUserDetailsData(response.data);
          }
        })
        .catch(() => null)
        .finally(() => setIsLoading(false));
    }
  }, [shouldTriggerApiCall]);

  // ✅ Effect 1: Handle API Response (only sets state)
  React.useEffect(() => {
    if (userDetailsData && userDetailsData.length > 0) {
      login(userDetailsData[0]?.Role);
      setUserInfo(userDetailsData[0]);
      setValidUser(true);   // ✅ state update only
    } else {
      setValidUser(false);
    }
    setShouldTriggerApiCall(false);
  }, [userDetailsData]);  // ❌ removed isValidUser from deps

  // ✅ Effect 2: Runs when isValidUser updates 
  React.useEffect(() => {
    if (isValidUser && userInfo) {   // user is valid AND we have user details ready.
      intiateTeamPlay({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam,
      }).then(() => {
        console.log("login successful");
      });
      routeHistory("/operationGame/homePage");
    }
  }, [isValidUser, userInfo]);   // ✅ new effect

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailError) return;

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
            className="standard-title-color"
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
