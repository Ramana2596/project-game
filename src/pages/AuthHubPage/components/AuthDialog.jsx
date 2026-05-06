// File: src/pages/AuthHubPage/AuthDialog.jsx
// Purpose: Success/enrollment dialog shown after registration or OAuth login

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from "@mui/material";

// ✔ AuthDialog component
const AuthDialog = ({ open, onClose, userId }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">

      {/* Purpose: Display dialog title */}
      <DialogTitle sx={{ fontWeight: "bold", color: "primary.main" }}>
        Welcome to OM Training Platform
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body1" gutterBottom>
          Your account is ready to use.
        </Typography>

        {userId && (
          <Typography variant="body2" color="text.secondary">
            Reference ID: {userId}
          </Typography>
        )}

        <Typography variant="body1" sx={{ mt: 2 }}>
          Access the platform and begin your learning journey.
        </Typography>
      </DialogContent>

      {/* Purpose: Display dialog action button */}
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          Get Started
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthDialog;