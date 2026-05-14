// File: src/pages/AuthHubPage/AuthHubPage.jsx
// Purpose: Main controller for Auth, Social Redirects, and Student-only Enrollment routing.

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
import ColorModeSelect from "../SignIn/theme/ColorModeSelect"; // Theme mode selector

// Components & Services
import AuthForm from "./components/AuthForm";
import EnrollUserDialog from "./components/EnrollUserDialog";
import { getAuthStatusFromUrl } from "./services/oauthService";

// ✅ Access authenticated user context
import { useUser } from "../../core/access/userContext.jsx";

// ✅ Reuse existing user hydration service
import { getUserDetails } from "../SignIn/services/signInServices.js";

// ✅ React router navigation
import { useNavigate } from "react-router-dom";

const AuthHubPage = () => {
  // UI Toggle State
  const [isLogin, setIsLogin] = useState(true);

  // ✅ Enrollment Logic State
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  // ✅ User session context handlers
  const { login, setUserInfo } = useUser();

  // ✅ Router navigation
  const navigate = useNavigate();

  // Handle post-authentication routing and user session initialization
  const handleAuthSuccess = (userData) => {
    // Extract routing flags from login response
    const { profession, isEnrolled, userEmail } = userData;

    // STUDENT GATE: Rule-based routing
    if (profession === "Student" && !isEnrolled) {
      setPendingUser({ userId: userData.userId });
      setEnrollOpen(true);
      return;
    }

    // ✅ Always hydrate full user context before app navigation
    getUserDetails({ userEmail })
      .then((response) => {
        const apiData = response?.data?.data?.[0];

        if (apiData) {
          // ✅ Initialize authenticated session
          login({
            User_Id: apiData.User_Id,
            User_Login: apiData.User_Login,
            RL_Id: apiData.RL_Id,
            Role: apiData.Role,
          });

          // ✅ Store full user profile in context
          setUserInfo(apiData);

          // ✅ SPA navigation (same as existing SignIn.jsx)
          navigate("/operationGame/homePage");
        }
      })
      .catch((err) => {
        console.error("User context initialization failed:", err);
      });
  };

  // Handle login result when returning from social sign-in
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
      {/* Theme selector for light/dark mode */}
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
        {/* BRAND SECTION */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="OMTP Logo"
            sx={{
              height: 65,
              mb: 2,
              filter: "drop-shadow(0px 4px 8px rgba(0,0,0,0.06))",
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {isLogin ? "Welcome Back to OMTP" : "Join OMTP"}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, fontWeight: 800, textAlign: "center" }}
          >
            {isLogin
              ? "Continue your Experiential Learning"
              : "Start your Experiential Learning"}
          </Typography>
        </Box>

        {/* SOCIAL LOGIN BUTTONS */}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <IconButton sx={{ border: "1px solid #ececec", p: 1.2 }}>
            <GoogleIcon sx={{ fontSize: 22 }} />
          </IconButton>
          <IconButton sx={{ border: "1px solid #ececec", p: 1.2 }}>
            <LinkedInIcon sx={{ fontSize: 22, color: "#0077b5" }} />
          </IconButton>
        </Stack>

        <Divider
          sx={{
            mb: 3,
            color: "text.disabled",
            fontSize: "0.65rem",
            fontWeight: 700,
          }}
        >
          OR
        </Divider>

        {/* Auth Form */}
        <AuthForm isLogin={isLogin} onSuccess={handleAuthSuccess} />

        {/* TOGGLE LINK */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {isLogin ? "New to OMTP?" : "Already have an account?"}{" "}
            <Typography
              component="span"
              onClick={() => setIsLogin(!isLogin)}
              sx={{
                color: "primary.main",
                fontWeight: 700,
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {isLogin ? "Create an Account" : "Sign In"}
            </Typography>
          </Typography>
        </Box>
      </Card>

      {/* Enrollment Dialog */}
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
    </Box>
  );
};

export default AuthHubPage;