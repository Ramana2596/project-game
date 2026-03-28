// src/pages/ResetSimulation/ResetSimulation.jsx
// Component: To clean Team data from set of Simulation-related Tables
import { Card, CardActionArea, Typography, Box } from "@mui/material"; 
import { useUser } from "../../core/access/userContext";
import { updateResetSimulation } from "./services/service";
import ToastMessage from "../../components/ToastMessage";
import { API_STATUS_MAP, API_STATUS } from "../../utils/statusCodes";
import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function ResetSimulation() {
  // Context: Retrieve logged-in user and game credentials
  const { userInfo } = useUser();

  // State: Management for Toast notification feedback
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  // Action: Card click handler to execute reset logic
  const handleResetClick = () => {
    // Validate mandatory parameters before API call
    if (!userInfo?.gameId || !userInfo?.gameBatch || !userInfo?.gameTeam) {
      setAlertData({
        severity: "error",
        message: "Missing team details",
        isVisible: true,
      });
      return;
    }

    // Execution: Call backend API to execute Sim_Clean_Table
    updateResetSimulation({
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
    })
      .then((response) => {
        const { returnValue, message } = response?.data;
      
        // Map SP returnValue to toast severity and default message
        const { severity, defaultMsg } =
          API_STATUS_MAP[returnValue] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

        setAlertData({
          severity,
          message: message || defaultMsg,
          isVisible: true,
        });
      })
      .catch((error) => {
        // Handling: Catch and display system or network errors
        setAlertData({
          severity: "error",
          message: error?.response?.data?.message || "System error",
          isVisible: true,
        });
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* UI: Render the Reset Action Card for user interaction */}
      <Card sx={{ maxWidth: 300, border: '1px solid #d32f2f', borderRadius: 2 }}>
        <CardActionArea onClick={handleResetClick} sx={{ p: 3, textAlign: 'center' }}>
          <DeleteForeverIcon sx={{ color: '#d32f2f', fontSize: 40, mb: 1 }} />
          <Typography variant="h6" color="error" gutterBottom>
            Reset Simulation
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Wipe all transaction data for Team {userInfo?.gameTeam}
          </Typography>
        </CardActionArea>
      </Card>

      {/* Feedback: Toast message notification component for API responses */}
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
        duration={5000}
        onClose={() => setAlertData({ ...alertData, isVisible: false })}
      />
    </Box>
  );
}