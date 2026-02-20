// src/pages/SimulationSuiteNew/SimulationSuiteNew.jsx
// ✅ Main page component orchestrating hooks, stage list, report drawer, and toast messages.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography, LinearProgress, Paper, Avatar, IconButton, Tooltip, CircularProgress } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";

import { useUser } from "../../../core/access/userContext";
import { formatDate } from "../../utils/formatDate";
import { useProgress } from "./hooks/useProgress";
import { useStageUi } from "./hooks/useStageUi";
import StageList from "./components/StageList";
import ReportDrawer from "./wizardreports/ReportDrawer";
import ToastMessage from "../../components/ToastMessage";
import { STAGE_TITLE_MAP } from "./simconstants";
import { UI_STRINGS } from "./constants/labels"; // ✅ Added labels

export default function DemoFree() {
  const { userInfo, login, setUserInfo, userAccessiblePageIds } = useUser();
  const navigate = useNavigate();

  // ✅ Hooks for logic and UI state
  const {
    progressData, loading, actionLoading, alertData, setAlertData,
    fetchProgress, updatePlay, effectiveHalt, haltStageNo,
    nextMonthAck, setNextMonthAck
  } = useProgress(userInfo);

  // ✅ Compute UI mapping
  const stageUI = useStageUi(progressData, userAccessiblePageIds, effectiveHalt, progressData?.Is_Period_Closed ?? false);

  // ✅ Local state for drawer
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);

  // ✅ Cleanup session and exit
  const handleExit = () => {
    sessionStorage.removeItem("wizardUserInfo");
    login(null); setUserInfo(null); navigate('/');
  };

  // ✅ Persist user data
  useEffect(() => {
    if (userInfo?.gameId) {
      sessionStorage.setItem("wizardUserInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  // ✅ Rehydrate state on refresh
  useEffect(() => {
    if (!userInfo?.gameId) {
      const stored = sessionStorage.getItem("wizardUserInfo");
      if (stored) { setUserInfo(JSON.parse(stored)); }
      else { navigate('/'); }
    }
  }, [userInfo, navigate, setUserInfo]);

  // ✅ Initial data fetch
  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  // ✅ Click handlers
  const handleStageClick = async (Stage) => {
    await updatePlay(Stage.stageNo, progressData?.Current_Period_No ?? 1);
  };

  const handleOpenReport = (stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerOpen(true);
  };

  const handleNextMonth = () => setNextMonthAck(true);

  // ✅ Full page loader
  if (loading && !progressData) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}><CircularProgress /></Box>
  );

  return (
    <Box sx={{ maxWidth: 650, margin: "0 auto", p: 3 }}>
      
      {/* ✅ Sticky header with global progress */}
      <Box sx={{ 
        position: "sticky", top: 64, zIndex: 1100, bgcolor: "white",
        pt: 1, pb: 1.5, mb: 2, borderBottom: "1px solid #e2e8f0",
        boxShadow: "0 10px 15px -10px rgba(0,0,0,0.1)"
      }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="900">{UI_STRINGS.TITLE}</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="subtitle1" color="primary" fontWeight="900">
              {UI_STRINGS.PERIOD_DISPLAY(progressData?.Current_Period_No, progressData?.Total_Period)}
            </Typography>
            <Tooltip title={UI_STRINGS.EXIT_TOOLTIP} arrow>
              <IconButton onClick={handleExit} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: '#ef5350', width: 28, height: 28, cursor: 'pointer', '&:hover': { bgcolor: '#d32f2f' } }}>
                  <ExitToApp sx={{ fontSize: 16, color: '#fff' }} />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <LinearProgress variant="determinate" value={progressData?.Progress_Percent ?? 0} sx={{ height: 8, borderRadius: 4, mb: 1.5, bgcolor: "#e2e8f0" }} />

        {/* ✅ Team identity banner */}
        <Paper elevation={0} sx={{ p: 1.5, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #cbd5e1" }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6" fontWeight="700" color="primary.dark" sx={{ whiteSpace: 'nowrap' }}>
              {UI_STRINGS.TEAM_PREFIX(userInfo?.gameTeam || "")}
            </Typography>
            <Typography variant="h6" fontWeight="700" color="primary.dark" sx={{ textAlign: 'right' }}>
              {progressData?.Is_Simulation_End
                ? UI_STRINGS.SIM_COMPLETED
                : `${formatDate(progressData?.Current_Period)} ${progressData?.Current_Progress_Stage || ""}`
              }
            </Typography>
          </Stack>
        </Paper>
      </Box>

      {/* ✅ List of interactive stages */}
      <StageList
        stageUI={stageUI}
        actionLoading={actionLoading}
        effectiveHalt={effectiveHalt}
        isSimulationEnd={progressData?.Is_Simulation_End ?? false}
        haltStageNo={haltStageNo}
        handleStageClick={handleStageClick}
        handleOpenReport={handleOpenReport}
        handleNextMonth={handleNextMonth}
      />

      {/* ✅ Side-panel reports */}
      <ReportDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        stageNo={activeStageNo}
        completedPeriod={progressData?.Completed_Period}
        completedPeriodNo={progressData?.Completed_Period_No}
        stageTitle={STAGE_TITLE_MAP[activeStageNo] || ""}
      />

      {/* ✅ Toast notifications */}
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
        onClose={() => setAlertData({ ...alertData, isVisible: false })}
      />
    </Box>
  );
}