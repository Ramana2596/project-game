// src/pages/SimulationHub/SimulationHub.jsx
// Operations Mgt Learning Platform: Simulation Centre for all Learning-Modes 
// Stage Manager: Page, hooks, stage list, report drawer, RBAC Reports
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";//  Added for rehydration navigation
import {
  Box, Stack, Typography, LinearProgress, Paper,
  Avatar, IconButton, Tooltip, CircularProgress
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import omgBg from "../../assets/navigation-menu/omgBgSrp.png";

// Internal components and hooks
import StageProp from "./components/StageProp";
import ReportDrawer from "./wizardreports/ReportDrawer";
import ToastMessage from "../../components/ToastMessage";
import { useProgress } from "./hooks/useProgress";
import { useStageUi } from "./hooks/useStageUi";

// Utilities and Constants
import { formatDate } from "../../utils/formatDate";
import { useUser } from "../../core/access/userContext";
import { UI_STRINGS } from "./constants/labels";
import { getApiMessage } from "../../utils/getApiMessage";

export default function SimulationHub() {

  // USER CONTEXT: RBAC accessible pages from user session
  const { userInfo, login, setUserInfo, userAccessiblePageIds } = useUser();
  const navigate = useNavigate();
  const isLeader = userInfo?.isGameLeader?.toUpperCase() === "YES";

  // Progress-simulation state and stage updates / orchestration
  const {
    progress,
    loading,
    actionLoading,
    setStage,
    handleNextMonth,
    effectiveHalt,
    haltStageNo,
    apiMessage,
    setApiMessage
  } = useProgress();

  const userAccessible = userAccessiblePageIds || []; // RBAC reports

  //  Simulation Stages Model-UI using RBAC accessible pages
  const stages = useStageUi({
    progress,
    userAccessiblePageIds: userAccessible,
    isPeriodClosed: progress?.Is_Period_Closed ?? false,
    effectiveHalt,
    isSimulationEnd: progress?.Is_Simulation_End ?? false
  });

  // Local state for drawer and active reporting
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);
  const [loadingStageNo, setLoadingStageNo] = useState(null);

  // SESSION PERSISTENCE: Save user data for refresh resilience
  useEffect(() => {
    if (userInfo?.gameId) {
      sessionStorage.setItem("wizardUserInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  // REHYDRATION: Restore session userInfo after refresh
  useEffect(() => {
    if (!userInfo?.gameId) {
      const stored = sessionStorage.getItem("wizardUserInfo");
      if (stored) {
        setUserInfo(JSON.parse(stored));
      } else {
        navigate('/');
      }
    }
  }, [userInfo, navigate, setUserInfo]);

  // SESSION CLEANUP: Exit simulation and reset session
  const handleExit = () => {
    sessionStorage.removeItem("wizardUserInfo");
    login(null);
    setUserInfo(null);
    navigate('/');
  };

  // STAGE CLICK: Execute stage completion and refresh progress
  const handleStageClick = async (stage) => {
    setLoadingStageNo(stage.stageNo);

    try {
      setApiMessage({ ...apiMessage, isVisible: false }); // Reset 
      await setStage(stage.stageNo, progress?.Current_Period_No);

    } catch {
      setApiMessage(getApiMessage(-99, UI_STRINGS.ERROR_STATUS)); // Set,if API fails
    } finally {
      setLoadingStageNo(null);
    }
  };

  // Block stage clicks for non-leaders
  const handleStageClickSafe = (stage) => {
    if (!isLeader) return; //Student blocked
    handleStageClick(stage); //Leader allowed
  };

  // REPORT HANDLER: Open side drawer for selected stage reports
  const handleOpenReport = (stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerOpen(true);
  };

  // SIMULATION END: all periods and stages completed
  /*
  const isSimulationEnd =
    (progress?.Completed_Period_No === progress?.Total_Period) &&
    (progress?.Completed_Stage_No >= Math.max(...stages.map(s => s.stageNo), 0));
    */
  const isSimulationEnd = progress?.Is_Simulation_End ?? false;


  // FULL PAGE LOADER: Render during initial progress fetch
  if (loading && !progress) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}>
      <CircularProgress />
    </Box>
  );

  return (
    // PAGE CONTAINER: Background and layout
    <Box sx={{
      minHeight: "100vh", width: "100%",
      backgroundImage:
        `linear-gradient(rgba(255, 255, 255, 0.75), 
        rgba(255, 255, 255, 0.40)), 
        url(${omgBg})`,
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

        {/* STICKY HEADER: Progress and exit controls */}
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

          {/* Progress header and exit action */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Typography variant="h5" fontWeight="900" color="text.primary">
              {`${UI_STRINGS.HEADER} - ${userInfo?.learnMode || 'Standard'}`}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="subtitle1" color="primary" fontWeight="800">
                {`${UI_STRINGS.PERIOD} ${progress?.Current_Period_No || 1} / ${progress?.Total_Period || 1}`}
              </Typography>

              <Tooltip title={UI_STRINGS.EXIT_TOOLTIP} arrow>
                <IconButton onClick={handleExit} sx={{ p: 0 }}>
                  <Avatar sx={{
                    bgcolor: '#fee2e2',
                    width: 32,
                    height: 32,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#fecaca' }
                  }}>
                    <ExitToApp sx={{ fontSize: 18, color: '#ef4444' }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Progress bar styling */}
          <LinearProgress
            variant="determinate"
            value={progress?.Progress_Percent ?? 0}
            sx={{ height: 10, borderRadius: 5, mb: 2, bgcolor: "#f1f5f9" }}
          />

          {/* Team banner */}
          <Paper elevation={0} sx={{
            p: 2,
            bgcolor: isSimulationEnd ? "#fff9c4" : "#f8fafc",
            borderRadius: 4,
            border: isSimulationEnd ? "1px solid #fbc02d" : "1px solid #e2e8f0"
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="800" color={isSimulationEnd ? "#af8500" : "primary.dark"}>
                {`${UI_STRINGS.TEAM} ${userInfo?.gameTeam || ""}`}
              </Typography>

              <Typography
                variant="h6"
                fontWeight="800"
                color={isSimulationEnd ? "#af8500" : "primary.dark"}
                sx={{ textAlign: 'right' }}
              >
                {isSimulationEnd
                  ? UI_STRINGS.SIM_COMPLETED
                  : formatDate(progress?.Current_Period)}
              </Typography>
            </Stack>
          </Paper>
        </Box>

        {/* Stage list orchestrated by simulation progress */}
        <StageProp
          stages={stages}
          actionLoading={actionLoading}
          effectiveHalt={effectiveHalt}
          isSimulationEnd={isSimulationEnd}
          haltStageNo={haltStageNo}
          onStageClick={handleStageClickSafe} //RBAC
          onOpenReport={handleOpenReport}
          onNextMonth={handleNextMonth}
          loadingStageNo={loadingStageNo}
          isLeader={isLeader}
        />

        {/* ✔ REPORT DRAWER: RBAC filtered reports */}
        <ReportDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          stageNo={activeStageNo}
          completedPeriod={progress?.Completed_Period}
          completedStageNo={progress?.Completed_Stage_No}
          stageTitle={stages.find(s => s.stageNo === activeStageNo)?.label || ""}
          userAccessiblePageIds={userAccessible}
          gameTeam={userInfo?.gameTeam}
        />

        {/* Toast notifications for error and status feedback */}
        <ToastMessage
          open={apiMessage.isVisible}
          severity={apiMessage.severity}
          message={apiMessage.message}
          onClose={() => setApiMessage({ ...apiMessage, isVisible: false })}
        />

      </Box>
    </Box>
  );
}