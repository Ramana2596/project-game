// Toast message (Snackbar + Alert) with close button; optional onClose lets the parent reset its flag
import React, { useState, useEffect } from "react";
import { Snackbar, Alert, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Props: open, message, severity, duration (ms), onClose
const ToastMessage = ({ open, message, severity, duration = 5000, onClose }) => {

  // Local open state, starts from the parent's open prop
  const [isOpen, setIsOpen] = useState(open);

  // Follow the parent's open prop whenever it changes
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // Close on X or auto-hide (not on click-away), then tell the parent if it passed onClose
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
    onClose?.();
  };

  // Toast at bottom-left, auto-hides after duration
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={isOpen}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      {/* Coloured alert box by severity, with a close button */}
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;