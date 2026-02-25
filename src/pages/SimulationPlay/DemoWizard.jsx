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

import heroBg from "../../assets/navigation-menu/heroOpsMgtUniversal.png";
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
  //  { stageNo: 8, label: "Manufacturing Performance Review", icon: <EventAvailable />, color: "#EF6C00", isLoop: true },
  { stageNo: 8, label: "Key Results & Financial Ratio", icon: <SportsScore />, color: "#2E7D32", isLoop: false },
];

// Map Stage Titlesto  display.
const STAGE_TITLE_MAP = StagesMaster.reduce((acc, s) => {
  acc[s.stageNo] = `${s.stageNo} – ${s.label}`;
  return acc;
}, {});

// Final simulation step.
const FINAL_STAGE_NO = Math.max(...StagesMaster.map(s => s.stageNo));

export default function DemoWizard() {
  const { userInfo, userAccessiblePageIds, login, setUserInfo } = useUser();
  const navigate = useNavigate();

  // State for progress data and UI status.
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "info", message: "", isVisible: false });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);
  const [celebrated, setCelebrated] = useState(false);
  const [nextMonthAck, setNextMonthAck] = useState(false);

  // Team Progress Data.
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

  // Fetch current team progress from API.
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

  // Handle user session exit.
  const handleExit = () => {
    sessionStorage.removeItem("wizardUserInfo");
    login(null); setUserInfo(null); navigate('/');
  };

  // Persist user info to session storage.
  useEffect(() => {
    if (userInfo && userInfo.gameId) {
      sessionStorage.setItem("wizardUserInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  // Rehydrate session info on refresh.
  useEffect(() => {
    if (!userInfo || !userInfo.gameId) {
      const stored = sessionStorage.getItem("wizardUserInfo");
      if (stored) { setUserInfo(JSON.parse(stored)); }
      else { navigate('/'); }
    }
  }, [userInfo, navigate, setUserInfo]);

  // Team Progressdata load on mount / user login.s
  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  // Trigger Celebration on simulation completion.
  useEffect(() => {
    if (isFinished && !celebrated) {
      confetti({ particleCount: 200, spread: 180 });
      setCelebrated(true);
    }
  }, [isFinished, celebrated]);

  // Update simulation progress.
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

  // Open report drawer for a specific stage.
  const handleOpenReport = (stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerOpen(true);
  };

  // Acknowledge transition to the next period.
  const handleNextMonth = () => setNextMonthAck(true);

  // Compile UI properties for each stage button.
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
          backgroundColor: status === "ACTIVE" ? s.color : status === "LOCKED" ? "#f1f5f9" : "#edf7ed",
          color: status === "ACTIVE" ? "#fff" : "#1a237e",
          borderRadius: "14px",
          boxShadow: status === "ACTIVE" ? "0 6px 18px rgba(0,0,0,0.18)" : "0 2px 6px rgba(0,0,0,0.06)",
          border: status === "LOCKED" ? "1px solid #cbd5e1" : "1px solid rgba(0,0,0,0.08)",
          transition: "all 0.25s ease",
          "&:hover": {
            boxShadow: status === "LOCKED" ? "0 2px 6px rgba(0,0,0,0.06)" : "0 8px 22px rgba(0,0,0,0.22)",
            transform: status === "LOCKED" ? "none" : "translateY(-2px)"
          },
          opacity: status === "LOCKED" ? 0.95 : 1
        },
      };
    });
  }, [currentStage, isFinished, userAccessiblePageIds, effectiveHalt, isPeriodClosed, isSimulationEnd]);

  // Loading state.
  if (loading && !progressData) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}><CircularProgress /></Box>
  );

  return (
    // FULL-SCREEN Background wrapper with the picture
    <Box sx={{
      minHeight: "100vh",
      backgroundImage:
        `linear-gradient(rgba(255, 255, 255, 0.80),
       rgba(255, 255, 255, 0.30)),
        url(${omgBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      py: 6, px: 2
    }}>
      {/* High-Contrast Content Card for Bright Visibility */}
      <Box sx={{
        maxWidth: 700, margin: "0 auto", p: 4,
        bgcolor: "#ffffff", // Pure white
        borderRadius: 6,
        // Using a more neutral, professional shadow
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e2e8f0"
      }}>

        {/* STICKY Heading:  */}
        <Box sx={{
          position: "sticky",
          top: 64,
          zIndex: 1100,
          bgcolor: "#ffffff",
          pt: 2,
          px: 3, 
          pb: 1.5,
          mb: 3,
          borderRadius: 4, 
          border: "1px solid #dee2e6",
          boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
        }}>
          {/* Progress header and exit action. */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
            <Typography variant="h5" fontWeight="900">Simulation Progress</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="subtitle1" color="primary" fontWeight="900">Period {currentPeriodNo} / {totalPeriod}</Typography>
              <Tooltip title="Leave Simulation" arrow>
                <IconButton onClick={handleExit} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: '#ef5350', width: 28, height: 28, cursor: 'pointer', '&:hover': { bgcolor: '#d32f2f' } }}>
                    <ExitToApp sx={{ fontSize: 16, color: '#fff' }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Simulation progress bar. */}
          <LinearProgress variant="determinate" value={progressPercent} sx={{ height: 8, borderRadius: 4, mb: 1.5, bgcolor: "#e2e8f0" }} />

          {/* TEAM BANNER: */}
          <Paper elevation={0} sx={{ p: 1.5, bgcolor: "#f8fafc", borderRadius: 4, border: "1px solid #cbd5e1" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="700" color="primary.dark" sx={{ whiteSpace: 'nowrap' }}>
                Team {userInfo?.gameTeam || ""} :
              </Typography>
              <Typography variant="h6" fontWeight="700" color="primary.dark" sx={{ textAlign: 'right' }}>
                {isFinished
                  ? "🏆 Simulation Completed! 🏆"
                  : `${formatDate(currentPeriodDate)} ${progressData?.Current_Progress_Stage || ""}`
                }
              </Typography>
            </Stack>
          </Paper>
        </Box>

        {/* Simulation stages. */}
        <Stack spacing={2}>
          {stageUI.map(Stage => {
            const isButtonLoading = actionLoading && Stage.status === "ACTIVE";
            return (
              <Stack key={Stage.stageNo} direction="row" spacing={1} alignItems="center">

                {/* Stage interactive button and status indicators. */}
                <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '14px' }}>
                  {isButtonLoading && (
                    <Box sx={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      zIndex: 2, bgcolor: 'rgba(255, 255, 255, 0.7)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backdropFilter: 'blur(2px)'
                    }}>
                      <CircularProgress size={24} sx={{ mr: 1.5 }} />
                      <Typography variant="body2" fontWeight="700" color="primary.main">Wait...</Typography>
                    </Box>
                  )}

                  <Button
                    fullWidth disabled={!Stage.isActive || actionLoading || effectiveHalt}
                    onClick={() => handleStageClick(Stage)} sx={Stage.buttonSx}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      {Stage.icon}
                      <Typography fontWeight="500">{`${Stage.stageNo}: ${Stage.label}`}</Typography>
                    </Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {Stage.status === "ACTIVE" && <PlayCircle fontSize="small" />}
                      {Stage.status === "COMPLETED" && <CheckCircle fontSize="small" />}
                      {Stage.status === "LOCKED" && <Lock fontSize="small" sx={{ color: "#94a3b8" }} />}
                      {Stage.status === "FINISHED" && <CheckCircle fontSize="small" color="success" />}
                    </Box>
                  </Button>
                </Box>

                {/* Sidebar actions: View Reports  */}
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ width: 90, justifyContent: "flex-end" }}>
                  <Tooltip title={Stage.tooltipReports || "No reports"} arrow>
                    <span>
                      <IconButton
                        onClick={() => handleOpenReport(Stage.stageNo)}
                        disabled={!((Stage.canViewReports) || (isPeriodClosed && Stage.stageNo === 8))}
                        color="primary" size="small"
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

        {/* Drawer overlay for reports. */}
        <ReportDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          stageNo={activeStageNo}
          completedPeriod={progressData?.Completed_Period}
          completedPeriodNo={progressData?.Completed_Period_No}
          stageTitle={STAGE_TITLE_MAP[activeStageNo] || ""}
        />

        {/* Alert toast Message System. */}
        <ToastMessage
          open={alertData.isVisible}
          severity={alertData.severity}
          message={alertData.message}
          onClose={() => setAlertData({ ...alertData, isVisible: false })}
        />
      </Box> {/* Closes Content Container Card */}
    </Box> // Closes Background Wrapper 
  );
}