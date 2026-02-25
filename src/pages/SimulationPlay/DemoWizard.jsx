// src/pages/SimulationPlay/DemoWizard.jsx

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button, Typography, CircularProgress, Box, Stack, LinearProgress,
  Paper, Tooltip, Avatar, IconButton
} from "@mui/material";
import {
  EmojiPeople, RocketLaunch, Assignment, Insights, Settings,
  PlayCircle, AccountBalance, EventAvailable, SportsScore,
  CheckCircle, Lock, Visibility, ExitToApp, SkipNext
} from "@mui/icons-material";

import omgBg from "../../assets/navigation-menu/omgBgSrp.png";
import confetti from "canvas-confetti";
import { useUser } from "../../core/access/userContext";
import { formatDate } from "../../utils/formatDate";
import { updateSimulationPlay, getTeamProgressStatus } from "./services/service";
import ToastMessage from "../../components/ToastMessage";
import { API_STATUS } from "../../utils/statusCodes";
import ReportDrawer from "../../wizardReports/ReportDrawer";
import { REPORT_REGISTRY } from "../../wizardReports/reportRegistry";

// Configuration: Simulation stages
const StagesMaster = [
  { stageNo: 1, label: "Company Profile", icon: <EmojiPeople />, color: "#6A1B9A", isLoop: false },
  { stageNo: 2, label: "Strategy Draft", icon: <RocketLaunch />, color: "#C62828", isLoop: false },
  { stageNo: 3, label: "Strategic Plan", icon: <Assignment />, color: "#AD1457", isLoop: false },
  { stageNo: 4, label: "Market Intelligence", icon: <Insights />, color: "#0288D1", isLoop: true },
  { stageNo: 5, label: "Operations Plan", icon: <Settings />, color: "#1565C0", isLoop: true },
  { stageNo: 6, label: "Simulation - Business Cycles", icon: <PlayCircle />, color: "#00897B", isLoop: true },
  { stageNo: 7, label: "Financial Outcomes", icon: <AccountBalance />, color: "#F9A825", isLoop: true },
  { stageNo: 8, label: "Key Results & Financial Ratio", icon: <SportsScore />, color: "#2E7D32", isLoop: false },
];

// Map Stage Vs Titles loookup
const STAGE_TITLE_MAP = StagesMaster.reduce((acc, s) => {
  acc[s.stageNo] = `${s.stageNo} – ${s.label}`;
  return acc;
}, {});

// Final simulation step calculation
const FINAL_STAGE_NO = Math.max(...StagesMaster.map(s => s.stageNo));

export default function DemoWizard() {
  const { userInfo, userAccessiblePageIds, login, setUserInfo } = useUser();
  const navigate = useNavigate();

  // State for progress data and UI status management
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "info", message: "", isVisible: false });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);
  const [celebrated, setCelebrated] = useState(false);
  const [nextMonthAck, setNextMonthAck] = useState(false);

  // Derived variables for team progress status
  const currentStage = progressData?.Current_Stage_No ?? 1;
  const completedStage = progressData?.Completed_Stage_No ?? 0;
  const currentPeriodNo = progressData?.Current_Period_No ?? 1;
  const completedPeriodNo = progressData?.Completed_Period_No ?? 0;
  const totalPeriod = progressData?.Total_Period ?? 1;
  const currentPeriodDate = progressData?.Current_Period ?? null;
  const progressPercent = progressData?.Progress_Percent ?? 0;
  const isSimulationEnd = progressData?.Is_Simulation_End ?? false;
  const isPeriodClosed = progressData?.Is_Period_Closed ?? false;
  const haltStageNo = progressData?.Review_Stage_No ?? 8;
  const effectiveHalt = (isPeriodClosed && !nextMonthAck) || isSimulationEnd;
  const isFinished = completedPeriodNo === totalPeriod && completedStage >= FINAL_STAGE_NO;

  // Fetch current team progress
  const fetchProgress = useCallback(async (isUpdate = false) => {
    if (!userInfo?.gameId) return;
    if (!isUpdate) setLoading(true);
    try {
      const response = await getTeamProgressStatus({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam
      });
      const d = response?.data?.data;
      if (d) { setProgressData(d); setNextMonthAck(false); }
    } catch (err) {
      setAlertData({ severity: "error", message: "Failed to fetch progress", isVisible: true });
    } finally { setLoading(false); }
  }, [userInfo]);

  // Handle user session exit and cleanup
  const handleExit = () => {
    sessionStorage.removeItem("wizardUserInfo");
    login(null); setUserInfo(null); navigate('/');
  };

  // Persist user info to session storage for refresh persistence
  useEffect(() => {
    if (userInfo && userInfo.gameId) {
      sessionStorage.setItem("wizardUserInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  // Rehydrate session info on browser refresh
  useEffect(() => {
    if (!userInfo || !userInfo.gameId) {
      const stored = sessionStorage.getItem("wizardUserInfo");
      if (stored) { setUserInfo(JSON.parse(stored)); }
      else { navigate('/'); }
    }
  }, [userInfo, navigate, setUserInfo]);

  // Load team progress data
  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  // Trigger confetti celebration upon simulation completion
  useEffect(() => {
    if (isFinished && !celebrated) {
      confetti({ particleCount: 200, spread: 180 });
      setCelebrated(true);
    }
  }, [isFinished, celebrated]);

  // Update simulation progress
  const handleStageClick = async (Stage) => {
    if (effectiveHalt || isSimulationEnd) return;
    setActionLoading(true);
    try {
      const response = await updateSimulationPlay({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam,
        currentStage: Stage.stageNo,
        currentPeriod: currentPeriodNo,
      });
      if (response?.data?.returnValue === API_STATUS.SUCCESS) { await fetchProgress(true); }
      else { setAlertData({ severity: "error", message: "Unable to update stage", isVisible: true }); }
    } catch {
      setAlertData({ severity: "error", message: "Error updating status", isVisible: true });
    } finally { setActionLoading(false); }
  };

  // Open report drawer for selected stage
  const handleOpenReport = (stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerOpen(true);
  };

  // Acknowledge transition to the next month/period
  const handleNextMonth = () => setNextMonthAck(true);

  // Compile UI properties and styles for each stage button
  const stageUI = useMemo(() => {
    return StagesMaster.map((s) => {
      const status = s.stageNo === FINAL_STAGE_NO && isFinished ? "FINISHED"
        : s.stageNo === currentStage ? "ACTIVE"
          : s.stageNo < currentStage ? "COMPLETED" : "LOCKED";
      const reports = REPORT_REGISTRY[s.stageNo] || [];
      const names = reports.map(uiId => userAccessiblePageIds?.find(p => p.uiId === uiId)?.shortName).filter(Boolean);
      const tooltipReports = !names.length ? "No reports" : names.length > 3 ? names.slice(0, 3).join(", ") + " ⋯" : names.join(", ");

      return {
        ...s, status,
        isActive: status === "ACTIVE" && !effectiveHalt && !isSimulationEnd,
        canViewReports:
          (status === "COMPLETED" || status === "FINISHED" || isPeriodClosed) && status !== "ACTIVE",
        tooltipReports,
        buttonSx: {
          justifyContent: "space-between", py: 2, px: 2.5,
          backgroundColor: status === "ACTIVE" ? s.color : status === "LOCKED" ? "#f8fafc" : "#e8f5e9", // ✅ LIGHT GREEN BG FOR COMPLETED
          color: status === "ACTIVE" ? "#fff" : status === "COMPLETED" ? "#2e7d32" : "#64748b", // ✅ HIGH CONTRAST FOR COMPLETED
          borderRadius: "14px",
          boxShadow: status === "ACTIVE" ? "0 6px 18px rgba(0,0,0,0.18)" : "none",
          border: status === "LOCKED" ? "1px solid #e2e8f0" : status === "ACTIVE" ? "1px solid transparent" : "1px solid #c8e6c9",
          transition: "all 0.25s ease",
          transform: status === "ACTIVE" ? "scale(1.02)" : "none", // ✅ SUBTLE SCALE FOR ACTIVE UX
          "&:hover": {
            boxShadow: status === "LOCKED" ? "none" : "0 8px 22px rgba(0,0,0,0.12)",
            transform: status === "LOCKED" ? "none" : status === "ACTIVE" ? "scale(1.03)" : "translateY(-1px)"
          },
          opacity: status === "LOCKED" ? 0.8 : 1
        },
      };
    });
  }, [currentStage, isFinished, userAccessiblePageIds, effectiveHalt, isPeriodClosed, isSimulationEnd]);

  // Loading state placeholder
  if (loading && !progressData) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}><CircularProgress /></Box>
  );

  return (
    // FULL-SCREEN Background wrapper with imagery
    <Box sx={{
      minHeight: "100vh",
      backgroundImage:
        `linear-gradient(rgba(255, 255, 255, 0.75),
       rgba(255, 255, 255, 0.40)),
       url(${omgBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      py: 6, px: 2
    }}>
      {/* High-Contrast White Content Card for premium look */}
      <Box sx={{
        maxWidth: 700, margin: "0 auto", p: 4,
        bgcolor: "#ffffff", 
        borderRadius: 8, 
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)", 
        border: "1px solid #e2e8f0" 
      }}>

        {/* STICKY Heading for progress tracking */}
        <Box sx={{
          position: "sticky",
          top: 64,
          zIndex: 1100,
          bgcolor: "#ffffff", // MATCHES PANEL
          pt: 1,
          pb: 2,
          mb: 3,
          borderBottom: "1px solid #f1f5f9", 
        }}>
          {/* Progress header details and exit action */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Typography variant="h5" fontWeight="900" color="text.primary">Simulation Progress</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="subtitle1" color="primary" fontWeight="800">Period {currentPeriodNo} / {totalPeriod}</Typography>
              <Tooltip title="Leave Simulation" arrow>
                <IconButton onClick={handleExit} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: '#fee2e2', width: 32, height: 32, cursor: 'pointer', '&:hover': { bgcolor: '#fecaca' } }}>
                    <ExitToApp sx={{ fontSize: 18, color: '#ef4444' }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Simulation overall progress bar */}
          <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 10, borderRadius: 5, mb: 2, bgcolor: "#f1f5f9" }} />

          {/* TEAM BANNER: Celebrating or showing status */}
          <Paper elevation={0} sx={{ 
            p: 2, 
            bgcolor: isFinished ? "#fff9c4" : "#f8fafc", 
            borderRadius: 4, 
            border: isFinished ? "1px solid #fbc02d" : "1px solid #e2e8f0" 
          }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="800" color={isFinished ? "#af8500" : "primary.dark"}>
                Team {userInfo?.gameTeam || ""} :
              </Typography>
              <Typography variant="h6" fontWeight="800" color={isFinished ? "#af8500" : "primary.dark"} sx={{ textAlign: 'right' }}>
                {isFinished
                  ? "🏆 Simulation Completed! 🏆"
                  : `${formatDate(currentPeriodDate)} ${progressData?.Current_Progress_Stage || ""}`
                }
              </Typography>
            </Stack>
          </Paper>
        </Box>

        {/* List of Simulation stages */}
        <Stack spacing={2}>
          {stageUI.map(Stage => {
            const isButtonLoading = actionLoading && Stage.status === "ACTIVE";
            return (
              <Stack key={Stage.stageNo} direction="row" spacing={1} alignItems="center">

                {/* Interactive button for stage activation */}
                <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '14px' }}>
                  {isButtonLoading && (
                    <Box sx={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      zIndex: 2, bgcolor: 'rgba(255, 255, 255, 0.7)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backdropFilter: 'blur(2px)'
                    }}>
                      <CircularProgress size={24} sx={{ mr: 1.5 }} />
                      <Typography variant="body2" fontWeight="700" color="primary.main">Updating...</Typography>
                    </Box>
                  )}

                  <Button
                    fullWidth disabled={!Stage.isActive || actionLoading || effectiveHalt}
                    onClick={() => handleStageClick(Stage)} sx={Stage.buttonSx}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      {Stage.icon}
                      <Typography fontWeight="700">{`${Stage.stageNo}: ${Stage.label}`}</Typography>
                    </Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {Stage.status === "ACTIVE" && <PlayCircle fontSize="small" />}
                      {Stage.status === "COMPLETED" && <CheckCircle fontSize="small" sx={{ color: "#4caf50" }} />}
                      {Stage.status === "LOCKED" && <Lock fontSize="small" sx={{ color: "#94a3b8" }} />}
                      {Stage.status === "FINISHED" && <CheckCircle fontSize="small" sx={{ color: "#2e7d32" }} />}
                    </Box>
                  </Button>
                </Box>

                {/* Sidebar actions for viewing reports */}
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ width: 90, justifyContent: "flex-end" }}>
                  <Tooltip title={Stage.tooltipReports || "No reports"} arrow>
                    <span>
                      <IconButton
                        onClick={() => handleOpenReport(Stage.stageNo)}
                        disabled={!((Stage.canViewReports) || (isPeriodClosed && Stage.stageNo === 8))}
                        color="primary" size="small"
                        sx={{ bgcolor: Stage.canViewReports ? '#f1f5f9' : 'transparent' }}
                      >
                        <Visibility />
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Box sx={{ width: 34 }}>
                    {Stage.stageNo === haltStageNo && effectiveHalt && !isSimulationEnd && (
                      <Tooltip title="Proceed to next month" arrow>
                        <span>
                          <IconButton
                            onClick={handleNextMonth} size="small"
                            sx={{
                              bgcolor: "#ff9800", color: "#fff", border: "2px solid #fff",
                              boxShadow: "0 0 0 1px #ff9800, 0 2px 6px rgba(0,0,0,0.15)",
                              animation: 'pulse 2s infinite',
                              '@keyframes pulse': {
                                '0%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0px rgba(255, 152, 0, 0.7)' },
                                '70%': { transform: 'scale(1.1)', boxShadow: '0 0 0 15px rgba(255, 152, 0, 0)' },
                                '100%': { transform: 'scale(0.95)', boxShadow: '0 0 0 0px rgba(255, 152, 0, 0)' },
                              },
                              "&:hover": { bgcolor: "#fb8c00", animation: 'none', transform: "scale(1.1)" }
                            }}
                          >
                            <SkipNext fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                    )}
                  </Box>
                </Stack>
              </Stack>
            );
          })}
        </Stack>

        {/* Detailed report drawer component */}
        <ReportDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          stageNo={activeStageNo}
          completedPeriod={progressData?.Completed_Period}
          completedPeriodNo={progressData?.Completed_Period_No}
          stageTitle={STAGE_TITLE_MAP[activeStageNo] || ""}
        />

        {/* Global toast notification system */}
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