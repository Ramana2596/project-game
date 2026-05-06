// File: src/pages/AuthHubPage/components/OAuthButtons.jsx
// OAuth login buttons

import React from "react";
import { Box, Button, Typography, Divider, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

import {
  loginWithGoogle,
  loginWithMicrosoft,
  loginWithLinkedIn,
  loginWithFacebook
} from "../services/oauthService.js";

//OAuth provider master configuration
const oauthProviders = [
  {
    name: "Google",
    icon: <GoogleIcon />,
    action: loginWithGoogle
  },
  {
    name: "Microsoft",
    icon: <MicrosoftIcon />,
    action: null
  },
  {
    name: "LinkedIn",
    icon: <LinkedInIcon />,
    action: null
  },
  {
    name: "Facebook",
    icon: <FacebookIcon />,
    action: null
  }
];

// OAuth buttons component
const OAuthButtons = () => {
  
  //Filter active OAuth providers
  const activeProviders = oauthProviders.filter(
    (provider) => provider.action
  );

  //Hide entire OAuth block if no providers are active
  if (activeProviders.length === 0) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        
        {/* OAuth section heading */}
        <Typography
          variant="subtitle2"
          sx={{
            textAlign: "center",
            fontWeight: 600,
            color: "text.primary"
          }}
        >
          Quick Sign-In Options
        </Typography>

        {/* OAuth helper text */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary"
          }}
        >
          Use your existing account for faster access
        </Typography>

        <Divider />

        {/*Render only enabled OAuth providers */}
        {activeProviders.map((provider) => (
          <Button
            key={provider.name}
            variant="outlined"
            startIcon={provider.icon}
            onClick={provider.action}
            fullWidth
            sx={{
              py: 1.4,
              justifyContent: "flex-start",
              pl: 2,
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2
            }}
          >
            Continue with {provider.name}
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

export default OAuthButtons;