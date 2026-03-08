// src/pages/SimulationSuite/SimulationSuite.jsx
// Composes hooks, components of Simulation UI, using centralized UI_STRINGS and STAGE_TEMPLATES

import React from "react";
import {
  Box, CircularProgress, Paper, Stack, Typography,
  LinearProgress, Tooltip, IconButton, Avatar
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import StageProp from "./components/StageProp.jsx";
import ReportDrawer from "./wizardreports/ReportDrawer.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";
import { useProgress } from "./hooks/useProgress.js";
import { useStageUi } from "./hooks/useStageUi.js";
import { formatDate } from "../../utils/formatDate.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { UI_STRINGS, STAGE_TEMPLATES } from "./constants/labels.js";
import { getApiMessage } from "../../utils/getApiMessage.js"; // ✔ Use centralized API message mapper

export default function SimulationSuite() {

  const { userInfo } = useUser();   // Fetch logged-in user info

  // Progress-simulation state and stage updates
  const { progress, loading, actionLoading, setStage } = useProgress();
  const userAccessible = progress?.AccessiblePages || [];  // Accessible reports

  // Build stage UI model from progress and accessibility
  const stages = useStageUi({ progress, userAccessiblePageIds: userAccessible });

  // Drawer and alert UI states
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeStageNo, setActiveStageNo] = React.useState(null);

  // ❌ const [alert, setAlert] = React.useState({ isVisible: false, message: "", severity: "info" });
  // ✔ Centralized API message state
  const [apiMessage, setApiMessage] = React.useState({ isVisible: false, message: "", severity: "info" });

  // Exit handler: clear session and redirect to home
  const handleExit = () => {
    sessionStorage.removeItem("wizardUserInfo");
    window.location.href = "/";
  };

  // Open report drawer for a selected stage
  const handleOpenReport = (stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerOpen(true);
  };

  // Handle user clicking a stage button and delegate stage update to hook
  const handleStageClick = async (stage) => {
    try {

      // ✔ Delegate stage update to hook
      const response = await setStage(stage.stageNo, progress?.Current_Period_No);

      // ✔ Show API message if hook returns response payload
      if (response?.returnValue !== undefined) {
        setApiMessage(getApiMessage(response.returnValue, response.message));
      }

    }
    catch {

      // ❌ setAlert({ severity: "error", message: "Error updating status", isVisible: true });

      // ✔ Use standardized API message helper
      setApiMessage(getApiMessage(-99, "Error updating status"));

    }
  };

  // Loading UI while fetching simulation progress
  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}>
        <CircularProgress />
      </Box>
    );

  // Get progress info for header
  const currentPeriodNo = progress?.Current_Period_No ?? 1;
  const totalPeriod = progress?.Total_Period ?? 1;
  const progressPercent = progress?.Progress_Percent ?? 0;
  const currentPeriodDate = progress?.Current_Period ?? null;

  const isFinished =
    (progress?.Completed_Period_No === totalPeriod) &&
    (progress?.Completed_Stage_No >= Math.max(...stages.map(s => s.stageNo)));

  // Compile header and exit labels based on learnMode
  const computeLabels = () => {
    const lm = userInfo?.learnMode;
    const header = `Simulation - ${lm}`;
    const exit = `${UI_STRINGS.LEAVE_SIMULATION} - ${lm}`;
    return { header, exit };
  };

  const labels = computeLabels();

  // Main render with background image and simulation header
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: `linear-gradient(rgba(241, 245, 249, 0.92), rgba(241, 245, 249, 0.85)), url('/assets/bg-simulation.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        py: 3
      }}
    >
      <Box sx={{ maxWidth: 900, margin: "0 auto", px: 3 }}>

        {/* Simulation header and progress display */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1200,
            bgcolor: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(8px)",
            pt: 2,
            pb: 2.5,
            mb: 3,
            px: 3,
            borderRadius: 2,
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 15px -10px rgba(0,0,0,0.1)"
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h4" fontWeight="900">{labels.header}</Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="h6" color="primary" fontWeight="900">
                Period {currentPeriodNo} / {totalPeriod}
              </Typography>

              <Tooltip title={labels.exit} arrow>
                <IconButton onClick={handleExit} sx={{ p: 0 }}>
                  <Avatar
                    sx={{
                      bgcolor: '#ef5350',
                      width: 32,
                      height: 32,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#d32f2f', transform: 'scale(1.1)' },
                      transition: 'all 0.2s'
                    }}
                  >
                    <ExitToApp sx={{ fontSize: 18, color: '#fff' }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Simulation progress bar */}
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{ height: 10, borderRadius: 5, mb: 1.5, bgcolor: "#e2e8f0" }}
          />

          {/* Current simulation stage status */}
          <Paper elevation={0} sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #cbd5e1" }}>
            <Typography variant="h6" fontWeight="700" color="primary.dark" textAlign="center">
              {isFinished
                ? UI_STRINGS.SIMULATION_COMPLETED
                : `Team Progress: ${formatDate(currentPeriodDate)} ${progress?.Current_Progress_Stage || ""}`}
            </Typography>
          </Paper>
        </Box>

        {/* Render Prop of all Stages*/}
        <StageProp
          stages={stages}
          actionLoading={actionLoading}
          onStageClick={handleStageClick}
          onOpenReport={handleOpenReport}
        />

        {/* Report drawer for accessible reports */}
        <ReportDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          stageNo={activeStageNo}
          completedPeriod={progress?.Completed_Period}
          completedPeriodNo={progress?.Completed_Period_No}
          stageTitle={
            stages.find(s => s.stageNo === activeStageNo)?.label ||
            STAGE_TEMPLATES.REPORTS_HEADER(activeStageNo)
          }
          userAccessiblePageIds={userAccessible}
        />

        {/* Toast alert messages */}
        <ToastMessage
          open={apiMessage.isVisible}   // ✔ Use centralized apiMessage state
          severity={apiMessage.severity}
          message={apiMessage.message}
          onClose={() => setApiMessage({ ...apiMessage, isVisible: false })}
        />
      </Box>
    </Box>
  );
}