import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Button, Typography, CircularProgress, Box, Stack,
  LinearProgress, Paper, Tooltip, Drawer, IconButton, Divider
} from "@mui/material";
import { 
  EmojiPeople, RocketLaunch, Assignment, Insights, Settings, 
  PlayCircle, AccountBalance, EventAvailable, SportsScore, CheckCircle, Lock, Close
} from "@mui/icons-material";
import confetti from "canvas-confetti";
import { useUser } from "../../core/access/userContext";
import { updateSimulationPlay, getTeamProgressStatus } from "./services/service";
import ToastMessage from "../../components/ToastMessage";
import { API_STATUS } from "../../utils/statusCodes";

// Finalized Steps Configuration with Developer Hints
const stepsMaster = [
  { stageNo: 1, label: "Initialization", viewLabel: "None", icon: <EmojiPeople />, color: "#6A1B9A", isLoop: false },
  { stageNo: 2, label: "Launch Strategy", viewLabel: "Draft of Strategy Proposed", icon: <RocketLaunch />, color: "#C62828", isLoop: false },
  { stageNo: 3, label: "Strategy Plan", viewLabel: "Your Strategy Plan Decision", icon: <Assignment />, color: "#AD1457", isLoop: false },
  { stageNo: 4, label: "Market Input", viewLabel: "Market Input for the Current Period", icon: <Insights />, color: "#0288D1", isLoop: true },
  { stageNo: 5, label: "Operation Decision", viewLabel: "Operation Decision for Current Period", icon: <Settings />, color: "#1565C0", isLoop: true },
  { stageNo: 6, label: "Simulation of Operations", viewLabel: "None: (Operations Completed)", icon: <PlayCircle />, color: "#00897B", isLoop: true },
  { stageNo: 7, label: "Financial Statement", viewLabel: "None: (reports compiled)", icon: <AccountBalance />, color: "#F9A825", isLoop: true },
  { stageNo: 8, label: "Period Closure", viewLabel: "Financial Statement for Current Period", icon: <EventAvailable />, color: "#EF6C00", isLoop: true },
  { stageNo: 9, label: "Simulation Completion", viewLabel: "Consolidated Financial Statement", icon: <SportsScore />, color: "#2E7D32", isLoop: false },
];

export default function DemoWizard() {
  const { userInfo } = useUser();
  
  // Simulation State
  const [currentStage, setCurrentStage] = useState(1);
  const [currentProgressStage, setCurrentProgressStage] = useState(""); 
  const [currentPeriodDate, setCurrentPeriodDate] = useState(null);
  const [completedStage, setCompletedStage] = useState(0);
  const [currentPeriodNo, setCurrentPeriodNo] = useState(1);
  const [completedPeriodNo, setCompletedPeriodNo] = useState(0);
  const [totalPeriod, setTotalPeriod] = useState(1);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "info", message: "", isVisible: false });

  // Drawer States
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(null);

  const FINAL_STAGE_NO = useMemo(() => Math.max(...stepsMaster.map(s => s.stageNo)), []);

  const simpleProgress = useMemo(() => {
    if (currentStage >= FINAL_STAGE_NO) return 100;
    return ((currentPeriodNo - 1) / totalPeriod) * 100;
  }, [currentPeriodNo, totalPeriod, currentStage, FINAL_STAGE_NO]);

  const fetchProgress = useCallback(async () => {
    if (!userInfo?.gameId) return;
    try {
      const response = await getTeamProgressStatus({
        gameId: userInfo.gameId, gameBatch: userInfo.gameBatch, gameTeam: userInfo.gameTeam
      });
      if (response?.data?.data) {
        const d = response.data.data;
        setCurrentStage(d.Current_Stage_No);
        setCurrentProgressStage(d.Current_Progress_Stage || ""); 
        setCurrentPeriodDate(d.Current_Period);
        setCompletedStage(d.Completed_Stage_No);
        setCurrentPeriodNo(d.Current_Period_No);
        setCompletedPeriodNo(d.Completed_Period_No);
        setTotalPeriod(d.Total_Period);
      }
    } catch (error) { console.error("Database sync failed", error); } 
    finally { setLoading(false); }
  }, [userInfo]);

  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  // Celebration Logic
  useEffect(() => {
    if (currentStage >= FINAL_STAGE_NO) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };
      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [currentStage, FINAL_STAGE_NO]);

  const formatDateLabel = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const getStageStatus = (step) => {
    if (currentStage >= FINAL_STAGE_NO) return "FINISHED";
    if (currentStage === step.stageNo) return "ACTIVE";
    const isDoneGlobally = completedStage >= step.stageNo;
    return step.isLoop ? (isDoneGlobally && (currentPeriodNo === completedPeriodNo) ? "COMPLETED" : "LOCKED") : (isDoneGlobally ? "COMPLETED" : "LOCKED");
  };

  const handleStepClick = async (step) => {
    setActiveStep(step);
    setDrawerOpen(true); // Open Drawer with Step context

    setActionLoading(true);
    try {
      const response = await updateSimulationPlay({
        gameId: userInfo.gameId, gameBatch: userInfo.gameBatch, gameTeam: userInfo.gameTeam,
        currentStage: step.stageNo, currentPeriod: currentPeriodNo,
      });
      if (response?.data?.returnValue === API_STATUS.SUCCESS) {
        await fetchProgress();
      }
    } catch (error) { 
        setAlertData({ severity: "error", message: "Error updating status", isVisible: true }); 
    } finally { 
        setActionLoading(false); 
    }
  };

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress /></Box>;

  return (
    <Box sx={{ maxWidth: 520, margin: "0 auto", p: 3 }}>
      
      {/* Header & Progress */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="900">Simulation Progress</Typography>
          <Typography variant="subtitle1" color="primary" fontWeight="900">
            Period {currentPeriodNo} / {totalPeriod}
          </Typography>
        </Stack>
        <LinearProgress variant="determinate" value={simpleProgress} sx={{ height: 12, borderRadius: 6, mb: 3, bgcolor: "#e2e8f0" }} />

        <Paper elevation={0} sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #cbd5e1" }}>
          <Typography variant="h6" fontWeight="700" color="primary.dark" textAlign="center">
            {currentStage >= FINAL_STAGE_NO 
              ? "🏆 Simulation Completed! 🏆" 
              : `Team-Progress: ${formatDateLabel(currentPeriodDate)} ${currentProgressStage}`}
          </Typography>
        </Paper>
      </Box>

      {/* Interactive Step Buttons */}
      <Stack spacing={1.5}>
        {stepsMaster.map((step) => {
          const status = getStageStatus(step);
          const isActive = status === "ACTIVE";
          const isDone = status === "COMPLETED" || status === "FINISHED";
          
          // Tooltip shows the action or the view content
          const tooltipTitle = isActive 
            ? `Current Action: ${step.label}` 
            : isDone 
            ? (step.viewLabel === "None" ? "Step Completed" : `View: ${step.viewLabel}`)
            : "Locked: Complete previous steps";

          return (
            <Tooltip key={step.stageNo} title={tooltipTitle} arrow placement="right">
              <span style={{ width: '100%' }}>
                <Button
                  fullWidth
                  disabled={!isActive || actionLoading}
                  onClick={() => handleStepClick(step)}
                  sx={{
                    justifyContent: "space-between", py: 2, px: 3, borderRadius: "12px", textTransform: "none",
                    backgroundColor: isActive ? step.color : isDone ? "#f0fdf4" : "#f8fafc",
                    color: isActive ? "#fff" : isDone ? "#16a34a" : "#475569",
                    opacity: !isActive && !isDone ? 0.6 : 1,
                    boxShadow: isActive ? `0 6px 15px ${step.color}66` : "none",
                    transition: "all 0.3s ease",
                    "&.Mui-disabled": { 
                      backgroundColor: isActive ? step.color : isDone ? "#f0fdf4" : "#f8fafc", 
                      color: isActive ? "#fff" : isDone ? "#16a34a" : "#475569" 
                    }
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    {actionLoading && isActive ? <CircularProgress size={18} color="inherit" /> : step.icon}
                    <Typography variant="body1" fontWeight={isActive ? "bold" : "500"}>
                      {`Step ${step.stageNo}: ${step.label}`}
                    </Typography>
                  </Stack>
                  <Box>{isDone ? <CheckCircle /> : !isActive ? <Lock fontSize="small" /> : null}</Box>
                </Button>
              </span>
            </Tooltip>
          );
        })}
      </Stack>

      {/* WORKSPACE DRAWER: Displays info based on finalized viewLabels */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: { xs: '100%', sm: '650px' }, p: 3 } }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Box>
            <Typography variant="h5" fontWeight="900">{activeStep?.label}</Typography>
            <Typography variant="caption" color="text.secondary">Stage ID: {activeStep?.stageNo}</Typography>
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)}><Close /></IconButton>
        </Stack>
        <Divider sx={{ mb: 3 }} />

        <Paper variant="outlined" sx={{ p: 4, bgcolor: "#f8fafc", borderStyle: 'dashed', textAlign: 'center', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box>
            {activeStep?.viewLabel === "None" || activeStep?.viewLabel.includes("None") ? (
                <Typography color="text.secondary">
                    Processing complete. No specific data records to display for this stage.
                </Typography>
            ) : (
                <>
                    <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                        {activeStep?.viewLabel}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2, fontStyle: 'italic', color: 'text.secondary' }}>
                        [Developer Placeholder]: Map the API data for Period {currentPeriodNo} here.
                    </Typography>
                </>
            )}
          </Box>
        </Paper>
      </Drawer>

      <ToastMessage open={alertData.isVisible} severity={alertData.severity} message={alertData.message} onClose={() => setAlertData({ ...alertData, isVisible: false })} />
    </Box>
  );
}