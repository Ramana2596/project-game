// src/pages/SimulationSuite/SimulationSuite.jsx
// Composes hooks, components of Simulation UI, using centralized UI_STRINGS and STAGE_TEMPLATES

import React from "react";
import { Box, CircularProgress, Paper, Stack, Typography, LinearProgress, Tooltip, IconButton, Avatar } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import StageList from "./components/StageList.jsx";
import ReportDrawer from "./wizardreports/ReportDrawer.jsx";
import ToastMessage from "../../components/ToastMessage.jsx";
import { useProgress } from "./hooks/useProgress.js";
import { useStageUi } from "./hooks/useStageUi.js";
import { formatDate } from "../../utils/formatDate.jsx";
import { useUser } from "../../core/access/userContext.jsx";
import { UI_STRINGS, STAGE_TEMPLATES } from "./constants/labels.js";

// Component: Simulation Page as per User Configuration
export default function SimulationSuite() {
  const { userInfo } = useUser();
  const { progress, loading, actionLoading, fetch, setStage } = useProgress();
  const userAccessible = progress?.AccessiblePages || [];
  const stageUi = useStageUi({ progress, userAccessiblePageIds: userAccessible });
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [activeStageNo, setActiveStageNo] = React.useState(null);
  const [alert, setAlert] = React.useState({ isVisible: false, message: "", severity: "info" });

  // Exit handler: clear session and redirect to home 
  const handleExit = () => {
    sessionStorage.removeItem("wizardUserInfo");
    window.location.href = "/";
  };

  // Open report drawer for a stage
  const handleOpenReport = (stageNo) => { setActiveStageNo(Number(stageNo)); setDrawerOpen(true); };

  // Stage click handler delegates to hook
  const handleStageClick = async (Stage) => {
    try { await setStage(Stage.stageNo, progress?.Current_Period_No); }
    catch { setAlert({ severity: "error", message: "Error updating status", isVisible: true }); }
  };

  // Loading UI
  if (loading) return <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}><CircularProgress /></Box>;

  // Derived header values
  const currentPeriodNo = progress?.Current_Period_No ?? 1;
  const totalPeriod = progress?.Total_Period ?? 1;
  const progressPercent = progress?.Progress_Percent ?? 0;
  const currentPeriodDate = progress?.Current_Period ?? null;
  const isFinished = (progress?.Completed_Period_No === totalPeriod) && (progress?.Completed_Stage_No >= Math.max(...stageUi.map(s => s.stageNo)));

  // Header and exit labels with learnMode (DB)
  const computeLabels = () => {
    const lm = userInfo?.learnMode;
    const header = `Simulation - ${lm}`;
    const exit = `${UI_STRINGS.LEAVE_SIMULATION} - ${lm}`;
    return { header, exit };
  };

  // Compile Labels for header and exit button
  const labels = computeLabels();

  // Main render
  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", p: 3 }}>
      {/* Header & progress */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="900">{labels.header}</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="subtitle1" color="primary" fontWeight="900">Period {currentPeriodNo} / {totalPeriod}</Typography>
            <Tooltip title={labels.exit} arrow>
              <IconButton onClick={handleExit} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: '#ef5350', width: 32, height: 32, cursor: 'pointer', '&:hover': { bgcolor: '#d32f2f', transform: 'scale(1.1)' }, transition: 'all 0.2s' }}>
                  <ExitToApp sx={{ fontSize: 18, color: '#fff' }} />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 12, borderRadius: 6, mb: 3, bgcolor: "#e2e8f0" }} />

        <Paper elevation={0} sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #cbd5e1" }}>
          <Typography variant="h6" fontWeight="700" color="primary.dark" textAlign="center">
            {isFinished ? UI_STRINGS.SIMULATION_COMPLETED : `Team Progress: ${formatDate(currentPeriodDate)} ${progress?.Current_Progress_Stage || ""}`}
          </Typography>
        </Paper>
      </Box>

      {/* Stage list */}
      <StageList stages={stageUi} onStageClick={handleStageClick} onOpenReport={handleOpenReport} actionLoading={actionLoading} />

      {/* Report drawer and toast */}
      <ReportDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        stageNo={activeStageNo}
        completedPeriod={progress?.Completed_Period}
        completedPeriodNo={progress?.Completed_Period_No}
        stageTitle={stageUi.find(s => s.stageNo === activeStageNo)?.label || STAGE_TEMPLATES.REPORTS_HEADER(activeStageNo)}
      />

      <ToastMessage open={alert.isVisible} severity={alert.severity} message={alert.message} onClose={() => setAlert({ ...alert, isVisible: false })} />
    </Box>
  );
}
