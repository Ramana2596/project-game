// src/pages/DemoOmg/DemoOmg.jsx
// VIrtual Simulation for DEMO purpose
// Stage Manager: Page, hooks, stage list, report drawer, RBAC Reports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography, LinearProgress, Paper, Avatar, IconButton, Tooltip, CircularProgress } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

import heroBG from "../../assets/navigation-menu/heroOpsMgtUniversal.png"
import { useUser } from "../../core/access/userContext";
import { formatDate } from "../../utils/formatDate";
import { useDemoProgress } from "./hooks/useDemoProgress";
import { useDemoUi } from "./hooks/useDemoUi";
import StageProp from "./components/StageProp";
import ReportDrawer from "./wizardreports/ReportDrawer";
import ToastMessage from "../../components/ToastMessage";
import { STAGE_TITLE_MAP } from "./stagesMaster";
import { UI_STRINGS } from "./constants/labels";

export default function DemoOmg() {
  const { userInfo, login, setUserInfo, userAccessiblePageIds } = useUser();
  const navigate = useNavigate();

  // Hooks for logic and state management
  const {
    progressData, loading, actionLoading, alertData, setAlertData,
    fetchProgress, updatePlay, effectiveHalt, haltStageNo,
    nextMonthAck, setNextMonthAck
  } = useDemoProgress(userInfo);

  // Compute UI mapping based on virtual progress data

  const stageUI = useDemoUi(
    progressData,
    userAccessiblePageIds,
    effectiveHalt,
    progressData?.Is_Period_Closed ?? false,
    progressData?.Is_Simulation_End ?? false);

  // Local state for drawer and active reporting
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  // Cleanup session and navigate to entry on exit
  const handleExit = () => {
    sessionStorage.removeItem("wizardUserInfo");
    login(null); setUserInfo(null); navigate('/');
  };

  // Persist user data to session storage for refresh resilience
  useEffect(() => {
    if (userInfo?.gameId) {
      sessionStorage.setItem("wizardUserInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  // Rehydrate userInfo state from session storage if lost
  useEffect(() => {
    if (!userInfo?.gameId) {
      const stored = sessionStorage.getItem("wizardUserInfo");
      if (stored) { setUserInfo(JSON.parse(stored)); }
      else { navigate('/'); }
    }
  }, [userInfo, navigate, setUserInfo]);

  // Initial fetch: Passing PascalCase keys and NULL markers for first-load
  useEffect(() => {
    if (userInfo?.gameId && !progressData) {
      fetchProgress(
        userInfo.gameId,
        userInfo.gameBatch,
        userInfo.gameTeam,
        null,
        null);
    }
  }, [fetchProgress, userInfo, progressData]);

  // Click handler marks stage as completed to advance virtual orchestration
  const [loadingStageNo, setLoadingStageNo] = useState(null);

  const handleStageClick = async (Stage) => {
    setLoadingStageNo(Stage.stageNo); // mark clicked stage
    setTimeout(async () => {
      await fetchProgress(
        userInfo.gameId,
        userInfo.gameBatch,
        userInfo.gameTeam,
        progressData?.Current_Period,
        Stage.stageNo
      );
      setLoadingStageNo(null); // clear after fetch
    }, 500);
  };

  // Report handler to open side drawer for specific stages
  const handleOpenReport = (stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerOpen(true);
  };

  // Logic for period transition acknowledgment
  const handleNextMonth = () => setNextMonthAck(true);

  // Render full page loader during initial data acquisition
  if (loading && !progressData) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}><CircularProgress /></Box>
  );

  return (
    // Outer container with BG image and Header
    <Box sx={{
      minHeight: "100vh", width: "100%",
      backgroundImage:
        `linear-gradient(rgba(255, 255, 255, 0.75),
       rgba(255, 255, 255, 0.40)),
       url(${heroBG})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed", py: 6, px: 2
    }}>
      {/* High-Contrast Content Card for Bright Visibility */}
      <Box sx={{
        maxWidth: 700, margin: "0 auto", p: 4,
        bgcolor: "#ffffff",
        borderRadius: 8,
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e2e8f0"
      }}>

        {/* STICKY Heading: Progress and Navigation controls */}
        <Box sx={{
          position: "sticky",
          top: 64,
          zIndex: 1100,
          bgcolor: "#ffffff",
          pt: 1,
          pb: 2,
          mb: 3,
          borderBottom: "1px solid #f1f5f9",
        }}>

          {/* Progress header and exit action:  */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Typography variant="h5" fontWeight="900" color="text.primary">{UI_STRINGS.TITLE}</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="subtitle1" color="primary" fontWeight="800">
                {UI_STRINGS.PERIOD_DISPLAY(progressData?.Current_Period_No, progressData?.Total_Period)}
              </Typography>
              <Tooltip title={UI_STRINGS.EXIT_TOOLTIP} arrow>
                <IconButton onClick={handleExit} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: '#fee2e2', width: 32, height: 32, cursor: 'pointer', '&:hover': { bgcolor: '#fecaca' } }}>
                    <ExitToApp sx={{ fontSize: 18, color: '#ef4444' }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Progress bar styling:  */}
          <LinearProgress variant="determinate" value={progressData?.Progress_Percent ?? 0} sx={{ height: 10, borderRadius: 5, mb: 2, bgcolor: "#f1f5f9" }} />

          {/* Team banner*/}
          <Paper elevation={0} sx={{
            p: 2,
            bgcolor: progressData?.Is_Simulation_End ? "#fff9c4" : "#f8fafc",
            borderRadius: 4,
            border: progressData?.Is_Simulation_End ? "1px solid #fbc02d" : "1px solid #e2e8f0"
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="800" color={progressData?.Is_Simulation_End ? "#af8500" : "primary.dark"}>
                {UI_STRINGS.TEAM_PREFIX(userInfo?.gameTeam || "")}
              </Typography>
              <Typography variant="h6" fontWeight="800" color={progressData?.Is_Simulation_End ? "#af8500" : "primary.dark"} sx={{ textAlign: 'right' }}>
                {progressData?.Is_Simulation_End
                  ? UI_STRINGS.SIM_COMPLETED
                  : `${formatDate(progressData?.Current_Period)}`
                }
              </Typography>
            </Stack>
          </Paper>
        </Box>

        {/* List of interactive stages orchestrated by progress state */}
        <StageProp
          stageUI={stageUI}
          actionLoading={actionLoading}
          effectiveHalt={effectiveHalt}
          isSimulationEnd={progressData?.Is_Simulation_End ?? false}
          haltStageNo={haltStageNo}
          handleStageClick={handleStageClick}
          handleOpenReport={handleOpenReport}
          handleNextMonth={handleNextMonth}
          loadingStageNo={loadingStageNo}
        />

        {/* Side-panel reports drawer with period and stage markers for historical data */}
        <ReportDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          stageNo={activeStageNo}
          completedPeriod={progressData?.Completed_Period}
          completedStageNo={progressData?.Completed_Stage_No}
          stageTitle={STAGE_TITLE_MAP[activeStageNo] || ""}
          userAccessiblePageIds={userAccessiblePageIds} // Pass accessible reports
          gameTeam={userInfo?.gameTeam}
        />

        {/* Toast notifications for error and status feedback */}
        <ToastMessage
          open={alertData.isVisible}
          severity={alertData.severity}
          message={alertData.message}
          onClose={() => setAlertData({ ...alertData, isVisible: false })}
        />
      </Box>
    </Box>
  );
}