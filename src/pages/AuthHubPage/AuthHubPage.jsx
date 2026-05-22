// File: src/pages/AuthHubPage/AuthHubPage.jsx
// Main Authentication flow (Login, Register, Password Setup, Social Redirects, Enrollment routing)

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
import ForgotPasswordForm from "./components/ForgotPasswordForm";

import { getAuthStatusFromUrl } from "./services/oauthService";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from "../SignIn/services/signInServices.js";
import { useNavigate } from "react-router-dom";

// Dynamic Visibility Settings for OAuth Providers
const SOCIAL_CONFIG = {
  GOOGLE_ENABLED: false,   // Flag: True / False 
  LINKEDIN_ENABLED: false, // Flag: True / False
};

const VIEW = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
  SET_PASSWORD: "SET_PASSWORD",
  FORGOT_PASSWORD: "FORGOT_PASSWORD" 
};

const AuthHubPage = () => {

  // VIEW CONTROLLER
  const [view, setView] = useState(VIEW.LOGIN);
  const [prefilledEmail, setPrefilledEmail] = useState("");

  // ENROLLMENT STATE
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [toast_message, setToastMessage] = useState("");
  const [alertData, setAlertData] = useState({
    open: false,
    severity: "info",
  });


  const { login, setUserInfo } = useUser();
  const navigate = useNavigate();
  const [newUserContext, setNewUserContext] = useState(null);

  // Track layout mount state
  const isMounted = useRef(true); 

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);


  // Iinitialize user context session safely across auth types
  const initializeUserSession = (userEmail) => { 
    return getUserDetails({ userEmail })
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

          setAlertData({
            open: true,
            severity: "error",
          });
        }
      });
  };

  // AUTH SUCCESS FLOW
  // authentication parameters and map routing to contextual destinations
  const handleAuthSuccess = (userData) => {

    const { profession, isEnrolled, userEmail } = userData;

    // Student enrollment flow
    if (profession === "Student" && !isEnrolled) {
      setPendingUser(userData); 
      setEnrollOpen(true);
      return;
    }

    initializeUserSession(userEmail); 
  };

  // REGISTER → PASSWORD FLOW
  
  // Store registration details locally
  const handleRegisterSuccess = (userData) => {
    setNewUserContext(userData);
    setView(VIEW.SET_PASSWORD);
  };

  // Final registration + password creation success
  const handlePasswordSuccess = (finalUser) => {
    handleAuthSuccess({
      userId: finalUser.userId,
      userEmail: finalUser.email,
      profession: newUserContext?.profession,
      isEnrolled: false
    });
  };

  // PASSWORD RECOVERY FLOW
  const handleForgotPasswordSuccess = (message) => { 
    setToastMessage(message || "Password reset instructions sent to your email.");
    setAlertData({
      open: true,
      severity: "success",
    });
    setPrefilledEmail("");
    setView(VIEW.LOGIN); // Returns customer to identity confirmation panel 
  };

  // OAUTH HANDLER
  useEffect(() => {
    const { status, userId } = getAuthStatusFromUrl();

    if (status === "success" && userId) {
      navigate(".", { replace: true }); 

      handleAuthSuccess({
        userId,
        profession: "Student",
        isEnrolled: false,
      });
    }
  }, [navigate]); 

  // UI LABELS
  const isLogin = view === VIEW.LOGIN;

  // Compute status if any provider is active
  const hasSocialLogins =
    SOCIAL_CONFIG.GOOGLE_ENABLED || SOCIAL_CONFIG.LINKEDIN_ENABLED;

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

      <ColorModeSelect
        sx={{ position: "fixed", top: "1rem", right: "1rem" }}
      />

      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
        }}
      >

        {/* BRAND HEADER */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            component="img"
            src={logo}
            alt="OMTP Logo"
            sx={{ height: 65, mb: 2 }}
          />

          <Typography variant="h5" fontWeight={800}>
            {view === VIEW.FORGOT_PASSWORD 
              ? "Reset Password" 
              : isLogin 
                ? "Welcome Back to OMTP" 
                : "Join OMTP"}
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {view === VIEW.FORGOT_PASSWORD
              ? "Enter your email to receive recovery instructions"
              : isLogin
                ? "Continue your Experiential Learning"
                : "Start your Experiential Learning"}
          </Typography>
        </Box>

        {/* Dynamic Social Login Bar */}
        {(view === VIEW.LOGIN || view === VIEW.REGISTER) && hasSocialLogins && (
          <>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mb: 3 }}
            >
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

        {/* LOGIN VIEW */}
        {view === VIEW.LOGIN && (
          <AuthForm 
            isLogin={true} 
            onSuccess={handleAuthSuccess} 
            onForgotPassword={(email) => {
              setPrefilledEmail(email || "");
              setView(VIEW.FORGOT_PASSWORD);
            }} 
          />
        )}

        {/* REGISTER VIEW */}
        {view === VIEW.REGISTER && (
          <RegisterForm onSuccess={handleRegisterSuccess} />
        )}

        {/* PASSWORD VIEW */}
        {view === VIEW.SET_PASSWORD && (
          <SetPasswordForm
            userContext={newUserContext}
            onSuccess={handlePasswordSuccess}

            // Return to Register (retain collected user info)
            onBack={() => setView(VIEW.REGISTER)}
          />
        )}

        {/* FORGOT PASSWORD VIEW */}
        {view === VIEW.FORGOT_PASSWORD && ( 
          <ForgotPasswordForm 
            initialEmail={prefilledEmail}
            onSuccess={handleForgotPasswordSuccess}
            onBack={() => setView(VIEW.LOGIN)}
          />
        )}

        {/* LOGIN ↔ REGISTER TOGGLE */}
        {(view === VIEW.LOGIN || view === VIEW.REGISTER) && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {/* Toggle static text based on view */}
              {view === VIEW.LOGIN
                ? "New to OMTP? "
                : "Already have an account? "}

              <Typography
                component="span"

                // Switch view
                onClick={() =>
                  setView(
                    view === VIEW.LOGIN
                      ? VIEW.REGISTER
                      : VIEW.LOGIN
                  )
                }
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {/* Toggle link label text */}
                {view === VIEW.LOGIN
                  ? "Create an Account"
                  : "Sign in"}
              </Typography>
            </Typography>
          </Box>
        )}

        {/* ENROLLMENT DIALOG */}
        <EnrollUserDialog
          open={enrollOpen}
          userId={pendingUser?.userId}
          onClose={() => setEnrollOpen(false)}

          // Enrollment response messages
          onResult={(res) => {
            setToastMessage(res.message);
            setAlertData({
              open: true,
              severity: res.severity,
            });

            // Navigate only for success
            if (res.severity === "success") {
              initializeUserSession(pendingUser?.userEmail); 
            }
          }}
        />

      </Card>

      {/* GLOBAL TOAST MESSAGE */}
      <ToastMessage
        open={alertData.open}
        severity={alertData.severity}
        message={toast_message}
      />

    </Box>
  );
};

export default AuthHubPage;