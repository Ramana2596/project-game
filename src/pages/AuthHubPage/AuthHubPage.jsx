// File: src/authHub/AuthHubPage.jsx
// Purpose: Modern authentication hub with OAuth + manual form

import React, { useState } from "react";
import { Container, Box, Typography, Card, CardContent, Divider } from "@mui/material";
import AuthForm from "./AuthForm.jsx";
import OAuthButtons from "./OAuthButtons.jsx";
import AuthDialog from "./AuthDialog.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";

// Main Authentication Hub
const AuthHubPage = () => {
  const [alertData, setAlertData] = useState({ severity: "", message: "", isVisible: false });
  const [showDialog, setShowDialog] = useState(false);
  const [userId, setUserId] = useState(null);

  // Manual registration success handler
  const handleManualSuccess = (id) => {
    setUserId(id);
    setShowDialog(true);
    setAlertData({ severity: "success", message: "Welcome aboard!", isVisible: true });
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Card sx={{ boxShadow: 4, width: 500, maxWidth: 800, padding: 3 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "primary.main" }}>
              Join Our Platform
            </Typography>

            {/* OAuth Buttons */}
            <OAuthButtons />

            <Divider sx={{ my: 3 }}>OR</Divider>

            {/* Manual Registration/Login Form */}
            <AuthForm onSuccess={handleManualSuccess} />
          </CardContent>
        </Card>
      </Box>

      {/* Success Dialog */}
      <AuthDialog open={showDialog} onClose={() => setShowDialog(false)} userId={userId} />

      {/* Toast Feedback */}
      <ToastMessage open={alertData.isVisible} severity={alertData.severity} message={alertData.message} />
    </Container>
  );
};

export default AuthHubPage;
