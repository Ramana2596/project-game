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
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { enrollUser, getUserProfile } from "../services/authApiService.js";
import { API_STATUS, API_STATUS_MAP } from "../../../utils/statusCodes.js";
import { useUser } from "../../../core/access/userContext.jsx";

const EnrollUserDialog = ({
  open,
  onClose,
  onResult,
  userId: propUserId,
  gameId: propGameId,
  learnMode: propLearnMode
}) => {
  const { userInfo } = useUser();
  
  // 1: User ID: Just registered, use new ID. Else, get from logged-in session.
  const isPropMode = !!propUserId; 
  const gameId = propGameId || userInfo?.gameId || "OpsMgt";
  const userId = isPropMode ? propUserId : userInfo?.userId;
  const defaultMode = propLearnMode || userInfo?.learnMode || "";

  const [learnModes, setLearnModes] = useState([]);
  const [selectedMode, setSelectedMode] = useState(defaultMode);
  const [loading, setLoading] = useState(false);

  // 2: Fetch available learning modes (Online, In-Person, etc.)
  useEffect(() => {
    if (open && gameId) {
      getUserProfile({ cmdLine: "Learn_Mode", gameId })
        .then((res) => {
          const modes = res.data || [];
          setLearnModes(modes);

          // If the list isn't empty, pick the first one automatically
          if (modes.length > 0 && !selectedMode) {
            setSelectedMode(modes[0].Learn_Mode);
          }
        })
        .catch((err) => {
          console.error("Error fetching modes:", err);
          setLearnModes([]);
        });
    }
  }, [open, gameId]);

  // STEP 3: Send the final choice to BD when the button is clicked
  const handleEnroll = async () => {
    setLoading(true);
    try {
      const res = await enrollUser({
        gameId: gameId,
        userId: userId,
        learnMode: selectedMode,
      });

      // Check response
      const { returnValue, message } = res.data;
      const { severity, defaultMsg } =
        API_STATUS_MAP[returnValue] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

      onResult({
        severity: severity,
        message: message || defaultMsg,
      });
      
      onClose(); 
    } catch (err) {
      onResult({
        severity: "error",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: 3, p: 1, width: "100%", maxWidth: 400 }
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
        Final Step: Enrollment
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          To complete your <strong>OMTP registration</strong>, please select how you want to learn.
        </DialogContentText>

        <FormControl fullWidth size="small" sx={{ mt: 1 }}>
          <Select
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            {learnModes.length === 0 ? (
              <MenuItem disabled value=""><em>Loading...</em></MenuItem>
            ) : (
              learnModes.map((modeObj) => (
                <MenuItem key={modeObj.Learn_Mode} value={modeObj.Learn_Mode}>
                  {modeObj.Learn_Mode.replace(/_/g, " ")}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
          Note: This helps us put you in the right classroom or team.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading} sx={{ textTransform: "none" }}>
          Cancel
        </Button>
        <Button
          onClick={handleEnroll}
          variant="contained"
          disabled={loading || !selectedMode}
          sx={{ 
            textTransform: "none", 
            fontWeight: 600, 
            px: 4,
            borderRadius: 2,
            boxShadow: "none" 
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Confirm Enrollment"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnrollUserDialog;