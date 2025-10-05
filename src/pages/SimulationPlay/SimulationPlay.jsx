import { Card, CardActionArea, Typography, Grid2 } from "@mui/material";
import { useUser } from "../../core/access/userContext";
import { updateSimulationPlay } from "./services/service";
import ToastMessage from "../../components/ToastMessage";
import { API_STATUS_MAP, API_STATUS } from "../../utils/statusCodes";
import { useState } from "react";

export default function SimulationPlayCard() {
  const { userInfo } = useUser();

  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  // --- Card click handler
  const handlePlayClick = () => {
    if (!userInfo?.gameId || !userInfo?.gameBatch || !userInfo?.gameTeam) {
      setAlertData({
        severity: "error",
        message: "Missing team details",
        isVisible: true,
      });
      return;
    }

    // --- Call backend API
    updateSimulationPlay({
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
    })
      .then((response) => {
        const { returnValue, message } = response?.data;
      
        // --- Map SP returnValue to toast severity and default message
        const { severity, defaultMsg } =
          API_STATUS_MAP[returnValue] || API_STATUS_MAP[API_STATUS.SYSTEM_ERROR];

        setAlertData({
          severity,
          message: message || defaultMsg,
          isVisible: true,
        });
      })
      .catch((error) => {
        setAlertData({
          severity: "error",
          message: error?.response?.data?.message || "System error",
          isVisible: true,
        });
      });
  };

  return (
    <>
      <Grid2 container spacing={2} justifyContent="center" alignItems="center">
        <Grid2 item xs={12} sm={6} md={4}>
          <Card>
            <CardActionArea onClick={handlePlayClick}>
              <Typography variant="h6" align="center" sx={{ p: 3 }}>
                Simulation Play
              </Typography>
            </CardActionArea>
          </Card>
        </Grid2>
      </Grid2>

      {/* Toast message */}
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
        duration={5000}
        onClose={() => setAlertData({ ...alertData, isVisible: false })}
      />
    </>
  );
}
