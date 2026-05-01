// File: src/authHub/OAuthButtons.jsx
// Purpose: OAuth login buttons with modern styling

import React from "react";
import { Box, Button } from "@mui/material";

const OAuthButtons = () => {
  /*
    const handleOAuth = (provider) => {
      window.location.href = `/auth/${provider}`; // Backend handles OAuth
    };
  */
  const handleOAuth = (provider) => {
    window.location.href = `https://daring-pro-silkworm.ngrok-free.app/auth/${provider}`;
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Button variant="contained" color="primary" onClick={() => handleOAuth("google")}>
        Continue with Google
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleOAuth("github")}>
        Continue with GitHub
      </Button>
      <Button variant="contained" sx={{ backgroundColor: "#2F2F72", color: "#fff" }} onClick={() => handleOAuth("microsoft")}>
        Continue with Microsoft
      </Button>
    </Box>
  );
};

export default OAuthButtons;
