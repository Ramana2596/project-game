// File: src/pages/AuthHubPage/AuthHubPage.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  Typography,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import logo from "../../assets/GreenTree.png";
import ColorModeSelect from "../SignIn/theme/ColorModeSelect";

import AuthForm from "./components/AuthForm";
import EnrollUserDialog from "./components/EnrollUserDialog";
import ToastMessage from "../../components/ToastMessage.jsx";

// Auth components
import RegisterForm from "./components/RegisterForm";
import SetPasswordForm from "./components/SetPasswordForm";

import { getAuthStatusFromUrl } from "./services/oauthService";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from "../SignIn/services/signInServices.js";
import { useNavigate } from "react-router-dom";

const SOCIAL_CONFIG = {
  GOOGLE_ENABLED: false, 
  LINKEDIN_ENABLED: false,
};

const VIEW = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  SET_PASSWORD: "Set_Password"
};

const AuthHubPage = () => {
  const [view, setView] = useState(VIEW.LOGIN);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [alertData, setAlertData] = useState({
    open: false,
    severity: "info",
  });

  const { login, setUserInfo } = useUser();
  const navigate = useNavigate();
  const [newUserContext, setNewUserContext] = useState(null);
  
  // Track mounting state to prevent memory leaks on unmounted promises
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // Centralized session initializer
  const initializeUserSession = (email) => {
    return getUserDetails({ userEmail: email })
      .then((response) => {
        const apiData = response?.data?.data?.[0];
        if (apiData && isMounted.current) {
          login({
            User_Id: apiData.User_Id,
            User_Login: apiData.User_Login,
            RL_Id: apiData.RL_Id,
            Role: apiData.Role,
          });
          setUserInfo(apiData);
          navigate("/operationGame/homePage");
        }
      })
      .catch((err) => {
        console.error("User context initialization failed:", err);
        if (isMounted.current) {
          setToastMessage("Unable to initialize user session.");
          setAlertData({ open: true, severity: "error" });
        }
      });
  };

  const handleAuthSuccess = (userData) => {
    const { profession, isEnrolled, userEmail } = userData;

    if (profession === "Student" && !isEnrolled) {
      setPendingUser(userData); // Save complete userData context
      setEnrollOpen(true);
      return;
    }

    initializeUserSession(userEmail);
  };

  const handleRegisterSuccess = (userData) => {
    setNewUserContext(userData);
    setView(VIEW.SET_PASSWORD);
  };

  const handlePasswordSuccess = (finalUser) => {
    handleAuthSuccess({
      userId: finalUser.userId,
      userEmail: finalUser.email,
      profession: newUserContext?.profession,
      isEnrolled: false
    });
  };

  // Handle URL parsing cleanly & strip them instantly
  useEffect(() => {
    const { status, userId } = getAuthStatusFromUrl();

    if (status === "success" && userId) {
      // Clean query parameters from address bar to prevent execution loop
      navigate(".", { replace: true });

      handleAuthSuccess({
        userId,
        profession: "Student",
        isEnrolled: false,
      });
    }
  }, [navigate]);

  const isLogin = view === VIEW.LOGIN;
  const hasSocialLogins = SOCIAL_CONFIG.GOOGLE_ENABLED || SOCIAL_CONFIG.LINKEDIN_ENABLED;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f7f9",
        p: 2,
      }}
    >
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />

      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            component="img"
            src={logo}
            alt="OMTP Logo"
            sx={{ height: 65, mb: 2 }}
          />
          <Typography variant="h5" fontWeight={800}>
            {isLogin ? "Welcome Back to OMTP" : "Create Account to OMTP "}
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {isLogin ? "Continue your Experiential Learning" : "Start your Experiential Learning"}
          </Typography>
        </Box>

        {(view === VIEW.LOGIN || view === VIEW.REGISTER) && hasSocialLogins && (
          <>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
              {SOCIAL_CONFIG.GOOGLE_ENABLED && (
                <IconButton sx={{ border: "1px solid #ececec", p: 1.2 }}>
                  <GoogleIcon />
                </IconButton>
              )}
              {SOCIAL_CONFIG.LINKEDIN_ENABLED && (
                <IconButton sx={{ border: "1px solid #ececec", p: 1.2 }}>
                  <LinkedInIcon sx={{ color: "#0077b5" }} />
                </IconButton>
              )}
            </Stack>
            <Divider sx={{ mb: 3 }}>OR</Divider>
          </>
        )}

        {view === VIEW.LOGIN && <AuthForm isLogin={true} onSuccess={handleAuthSuccess} />}
        {view === VIEW.REGISTER && <RegisterForm onSuccess={handleRegisterSuccess} />}
        {view === VIEW.SET_PASSWORD && (
          <SetPasswordForm
            userContext={newUserContext}
            onSuccess={handlePasswordSuccess}
            onBack={() => setView(VIEW.REGISTER)}
          />
        )}

        {(view === VIEW.LOGIN || view === VIEW.REGISTER) && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {view === VIEW.LOGIN ? "New to OMTP? " : "Already have an account? "}
              <Typography
                component="span"
                onClick={() => setView(view === VIEW.LOGIN ? VIEW.REGISTER : VIEW.LOGIN)}
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {view === VIEW.LOGIN ? "Create an Account" : "Sign in"}
              </Typography>
            </Typography>
          </Box>
        )}

        <EnrollUserDialog
          open={enrollOpen}
          userId={pendingUser?.userId}
          onClose={() => setEnrollOpen(false)}
          onResult={(res) => {
            setToastMessage(res.message);
            setAlertData({ open: true, severity: res.severity });

            if (res.severity === "success") {
              // Now initialize session using the email preserved in pendingUser context
              initializeUserSession(pendingUser?.userEmail);
            }
          }}
        />
      </Card>

      <ToastMessage
        open={alertData.open}
        severity={alertData.severity}
        message={toastMessage}
        onClose={() => setAlertData((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  );
};

export default AuthHubPage;