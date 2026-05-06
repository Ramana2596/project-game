// File: src/pages/AuthHubPage/components/AuthForm.jsx
// Purpose: Controlled manual registration/login form switcher without duplicate titles

import React from "react";
import { Box, Typography, Link } from "@mui/material";
import SignInForm from "./SignInForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

// ✅ MODIFIED: Receives isLogin and setIsLogin as props from Parent
const AuthForm = ({ onSuccess, isLogin, setIsLogin }) => {

  // Purpose: Toggle handler updates the Parent's state to change the top title
  const handleToggle = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <Box sx={{ width: "100%" }}>
      
      {/* ✅ NO TITLE HERE: Title is now handled by AuthHubPage at the top */}

      {isLogin ? (
        <SignInForm onSuccess={onSuccess} />
      ) : (
        <RegisterForm onSuccess={onSuccess} />
      )}

      {/* ✅ Toggle Link remains at the bottom */}
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary">
          {isLogin ? "New to the platform?" : "Already have an account?"}
          {" "}
          <Link
            component="button"
            variant="body2"
            onClick={handleToggle}
            sx={{ fontWeight: 600, textDecoration: "none", cursor: "pointer" }}
          >
            {isLogin ? "Create an account" : "Sign in instead"}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthForm;