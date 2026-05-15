// File: src/pages/AuthHubPage/AuthHubPage.jsx
// Main Authentication flow (Login, Register, Password Setup, Social Redirects, Enrollment routing)

import React, { useState, useEffect } from "react";
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

// Auth components
import RegisterForm from "./components/RegisterForm";
import SetPasswordForm from "./components/SetPasswordForm";

import { getAuthStatusFromUrl } from "./services/oauthService";
import { useUser } from "../../core/access/userContext.jsx";
import { getUserDetails } from "../SignIn/services/signInServices.js";
import { useNavigate } from "react-router-dom";

const AuthHubPage = () => {

 // VIEW CONTROLLER
  const VIEW = {
    LOGIN: "LOGIN",
    REGISTER: "REGISTER",
    SET_PASSWORD: "Set_Password"
  };

  const [view, setView] = useState(VIEW.LOGIN);

 // ENROLLMENT STATE
   const [enrollOpen, setEnrollOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

 // USER CONTEXT
   const { login, setUserInfo } = useUser();
  const navigate = useNavigate();

 // REGISTRATION CONTEXT
  const [newUserContext, setNewUserContext] = useState(null);

 // AUTH SUCCESS FLOW
  const handleAuthSuccess = (userData) => {

    const { profession, isEnrolled, userEmail } = userData;

    // Student enrollment flow
    if (profession === "Student" && !isEnrolled) {
      setPendingUser({ userId: userData.userId });
      setEnrollOpen(true);
      return;
    }

    // Load user context after successful auth
    getUserDetails({ userEmail })
      .then((response) => {
        const apiData = response?.data?.data?.[0];

        if (apiData) {
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
      });
  };

 // REGISTER → PASSWORD FLOW
 
  // Store registration details locally only
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

 // OAUTH HANDLER
  useEffect(() => {
    const { status, userId } = getAuthStatusFromUrl();

    if (status === "success" && userId) {
      handleAuthSuccess({
        userId,
        profession: "Student",
        isEnrolled: false,
      });
    }
  }, []);

 // UI LABELS
  const isLogin = view === VIEW.LOGIN;

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
            {isLogin ? "Welcome Back to OMTP" : "Join OMTP"}
          </Typography>

          <Typography variant="body2" color="text.secondary" mt={0.5}>
            {isLogin
              ? "Continue your Experiential Learning"
              : "Start your Experiential Learning"}
          </Typography>
        </Box>

        {/* LOGIN VIEW */}

        {view === VIEW.LOGIN && (
          <>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mb: 3 }}
            >
              <IconButton sx={{ border: "1px solid #ececec", p: 1.2 }}>
                <GoogleIcon />
              </IconButton>

              <IconButton sx={{ border: "1px solid #ececec", p: 1.2 }}>
                <LinkedInIcon sx={{ color: "#0077b5" }} />
              </IconButton>
            </Stack>

            <Divider sx={{ mb: 3 }}>OR</Divider>

            <AuthForm isLogin={true} onSuccess={handleAuthSuccess} />
          </>
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

        {/* LOGIN ↔ REGISTER TOGGLE */}
        {view === VIEW.LOGIN && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              New to OMTP?{" "}
              <Typography
                component="span"
                onClick={() => setView(VIEW.REGISTER)}
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Create an Account
              </Typography>
            </Typography>
          </Box>
        )}

        {/* ENROLLMENT DIALOG */}
        <EnrollUserDialog
          open={enrollOpen}
          userId={pendingUser?.userId}
          onClose={() => setEnrollOpen(false)}
          onResult={(res) => {
            if (res.severity === "success") {
              navigate("/operationGame/homePage");
            }
          }}
        />

      </Card>
    </Box>
  );
};

export default AuthHubPage;