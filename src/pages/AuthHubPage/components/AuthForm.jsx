// Component: AuthForm controls switching between Sign In and Register forms

import React from "react";
import { Box } from "@mui/material";
import SignInForm from "./SignInForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

const AuthForm = ({
  onSuccess,
  isLogin,
  onForgotPassword,
  oauthContext = null,  //  OAuth (like Google) User context. Null for direct login/register
}) => {
  return (
    <Box sx={{ width: "100%" }}>

      {/*          Display Login Form   */}
      {isLogin ? (
        <SignInForm
          onSuccess={onSuccess}
          onForgotPassword={onForgotPassword}
          oauthContext={oauthContext}
        />
      ) : (

        /* Display Create Account form */
        <RegisterForm
          onSuccess={onSuccess}
          oauthContext={oauthContext}
        />
      )}

    </Box>
  );
};

export default AuthForm;