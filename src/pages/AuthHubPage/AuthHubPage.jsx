// File: AuthHubPage.jsx
// Purpose: Main traffic controller for authentication, role-based routing, and student enrollment.

import React, { useState } from "react";
import { 
  Box, 
  Card, 
  Typography, 
  Divider, 
  Stack, 
  IconButton 
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AuthForm from "./components/AuthForm";

// ✅ Import image to fix the "Missing Logo" issue
import logo from "../../assets/GreenTree.png"; 

const AuthHubPage = () => {
  const [isLogin, setIsLogin] = useState(true);

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
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        {/* ✅ BRAND & WELCOME SECTION (Grouped Together) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Box
            component="img"
            src={logo} 
            alt="OMTP Logo"
            sx={{ 
              height: 65, 
              width: 'auto', 
              mb: 2, // Spacing between logo and text
              filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.06))' 
            }}
          />

          <Typography variant="h5" sx={{ fontWeight: 800, color: "text.primary" }}>
            {isLogin ? "Welcome Back" : "Join OMTP"}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, textAlign: 'center' }}>
            {isLogin ? "Continue your professional journey" : "Start your professional learning path"}
          </Typography>
        </Box>

        {/* ✅ QUICK ACCESS ICONS */}
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 3 }}>
          <IconButton sx={{ border: '1px solid #ececec', p: 1.2 }}>
            <GoogleIcon sx={{ fontSize: 22 }} />
          </IconButton>
          <IconButton sx={{ border: '1px solid #ececec', p: 1.2 }}>
            <LinkedInIcon sx={{ fontSize: 22, color: '#0077b5' }} />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 3, "&::before, &::after": { borderColor: "#eee" }, color: "text.disabled", fontSize: "0.65rem", fontWeight: 700, letterSpacing: 1 }}>
          OR
        </Divider>

        {/* ✅ AUTHENTICATION FORM */}
        <AuthForm isLogin={isLogin} />

        {/* ✅ SINGLE FOOTER TOGGLE (Fixes the double-line issue) */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            {isLogin ? "New to OMTP?" : "Already have an account?"}{" "}
            <Typography
              component="span"
              variant="body2"
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
    </Box>
  );
};

export default AuthHubPage;