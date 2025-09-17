import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { enrollUser } from "./services/service.js";
import { API_STATUS, API_STATUS_MAP } from "../../utils/statusCodes.js";

/**
 * EnrollUserDialog Component
 *
 * Props:
 * - open (boolean): Controls dialog visibility
 * - onClose (function): Callback to close the dialog
 * - userId (string): The user ID to enroll
 * - learnMode (string, optional): If null, set default value ("Class_Room")
 * - onResult (function): Callback to return API result { severity, message }
 */
const EnrollUserDialog = ({ 
  open, 
  onClose, 
  userId, 
  learnMode,        // If null, set default value
  onResult 
}) => {
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!userId) return;

    // If null, set default value
    const modeToSend = learnMode || "Class_Room";

    setLoading(true);
    try {
      const res = await enrollUser({
        gameId: "OpsMgt",
        userId,
        learnMode: modeToSend,
      });

      const { returnValue, message } = res.data;
      const { severity, defaultMsg } =
        API_STATUS_MAP[returnValue] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

      onResult({
        severity,
        message: message || defaultMsg,
      });
    } catch (err) {
      console.error("Unhandled error:", err);
      onResult({
        severity: "error",
        message: "Unhandled error! Please try again.",
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Enrollment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to enroll this user into the learning program?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleEnroll}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : "Enroll"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnrollUserDialog;
