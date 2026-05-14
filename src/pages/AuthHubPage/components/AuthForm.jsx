// File: src/pages/AuthHubPage/components/AuthForm.jsx
// Toggle Login and Registration forms.

import React from "react";
import { Box } from "@mui/material";
import SignInForm from "./SignInForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

// onSuccess: Feedback to parent-call
// isLogin: true = show login, false = show register: 

const AuthForm = ({ onSuccess, isLogin }) => {
  return (
    <Box sx={{ width: "100%" }}>

      {isLogin ? (
        <SignInForm onSuccess={onSuccess} />
      ) : (
        <RegisterForm onSuccess={onSuccess} />
      )}

    </Box>
  );
};

export default AuthForm;