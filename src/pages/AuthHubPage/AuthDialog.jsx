// File: src/authHub/AuthDialog.jsx
// Purpose: Success/enrollment dialog shown after registration or OAuth login

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";

// ✅ AuthDialog Component
const AuthDialog = ({ open, onClose, userId }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* ✅ Title */}
      <DialogTitle sx={{ fontWeight: "bold", color: "primary.main" }}>
        🎉 Welcome!
      </DialogTitle>

      {/* ✅ Content */}
      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Your account has been created successfully.
        </Typography>
        {userId && (
          <Typography variant="body2" color="text.secondary">
            User ID: {userId}
          </Typography>
        )}
        <Typography variant="body1" sx={{ mt: 2 }}>
          You can now explore the platform, personalize your profile, and start learning.
        </Typography>
      </DialogContent>

      {/* ✅ Actions */}
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthDialog;
