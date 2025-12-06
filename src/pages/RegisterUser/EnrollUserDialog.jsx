import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { enrollUser, getUserProfile } from "./services/service.js";
import { API_STATUS, API_STATUS_MAP } from "../../utils/statusCodes.js";
import { useUser } from "../../core/access/userContext.jsx";

/**
 * EnrollUserDialog
 *
 * Props:
 * - open (boolean): Controls dialog visibility
 * - onClose (function): Closes the dialog
 * - userId (string): ID of the user to enroll 
 * - gameId (string): Game context for enrollment 
 * - learnMode (string): Optional preselected mode 
 * - onResult (function): Callback with { severity, message }
 */
const EnrollUserDialog = ({
  open,
  onClose,
  onResult,
  userId: propUserId,       //  Accept userId via props
  gameId: propGameId,       //  Accept gameId via props
  learnMode: propLearnMode  //  Accept learnMode via props
}) => {

  const { userInfo } = useUser(); // Context for authenticated users
  
  const isPropMode = !!propUserId; //  Determine mode based on presence of prop userId

  const gameId = userInfo?.gameId || "OpsMgt"; //  Use context/default
 
  const userId = isPropMode ? propUserId : userInfo?.userId;             //  Use prop or context
  const defaultMode = isPropMode ? propLearnMode : userInfo?.learnMode || "Class_Room"; //  Initial mode

  const [learnModes, setLearnModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState(defaultMode); //  Initialize with defaultMode
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && gameId) {
      getUserProfile({ cmdLine: "Learn_Mode", gameId })
        .then((res) => {
          const modes = res.data || [];
          setLearnModes(modes);

          //  Select first mode from API response if none selected
          if (modes.length > 0 && !selectedMode) {
            setSelectedMode(modes[0].Learn_Mode);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch learn modes:", err);
          setLearnModes([]);
        });
    }
  }, [open, gameId]); //  Added gameId to dependency list

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const res = await enrollUser({
        gameId: gameId,
        userId: userId,
        learnMode: selectedMode,
      });

      const { returnValue, message } = res.data;
      const { severity, defaultMsg } =
        API_STATUS_MAP[returnValue] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

      onResult({
        severity: severity,
        message: message || defaultMsg,
      });
    } catch (err) {
      console.error("Unhandled error:", err);
      onResult({
        severity: "error",
        message: "Unhandled error: Please try again.",
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
          Please select a learning mode !
        </DialogContentText>

        {/* 🔹 Dropdown for Learning Mode */}
        <FormControl fullWidth margin="normal">
          <Select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
          >
            {learnModes.map((modeObj) => {
              const value = modeObj.Learn_Mode;
              const label = value.replace(/_/g, " ");
              return (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleEnroll}
          variant="contained"
          color="primary"
          disabled={loading || !selectedMode}
          autoFocus //  Ensures this button gets focus immediately
        >
          {loading ? <CircularProgress size={20} /> : "Enroll"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnrollUserDialog;
