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
  CheckCircle, Lock, Visibility, Logout, Close, ExitToApp
} from "@mui/icons-material";

import confetti from "canvas-confetti";
import { useUser } from "../../core/access/userContext";
import { formatDate } from "../../utils/formatDate";
import { updateSimulationPlay, getTeamProgressStatus } from "./services/service";
import ToastMessage from "../../components/ToastMessage";
import { API_STATUS } from "../../utils/statusCodes";
import ReportDrawer from "../../wizardReports/ReportDrawer";
import { REPORT_REGISTRY } from "../../wizardReports/reportRegistry";

// ===== Master definition of stages (UI only)
const StagesMaster = [
  { stageNo: 1, label: "Company Profile", icon: <EmojiPeople />, color: "#6A1B9A", isLoop: false },
  { stageNo: 2, label: "Strategy Draft", icon: <RocketLaunch />, color: "#C62828", isLoop: false },
  { stageNo: 3, label: "Strategic Plan", icon: <Assignment />, color: "#AD1457", isLoop: false },
  { stageNo: 4, label: "Market Intelligence", icon: <Insights />, color: "#0288D1", isLoop: true },
  { stageNo: 5, label: "Operations Plan", icon: <Settings />, color: "#1565C0", isLoop: true },
  { stageNo: 6, label: "Simulation - Business Cycles", icon: <PlayCircle />, color: "#00897B", isLoop: true },
  { stageNo: 7, label: "Financial Outcomes", icon: <AccountBalance />, color: "#F9A825", isLoop: true },
  { stageNo: 8, label: "Manufacturing Performance Review", icon: <EventAvailable />, color: "#EF6C00", isLoop: true },
  { stageNo: 9, label: "KPI & Team Results", icon: <SportsScore />, color: "#2E7D32", isLoop: false },
];

// ===== Stage title map
const STAGE_TITLE_MAP = StagesMaster.reduce((acc, s) => {
  acc[s.stageNo] = `Stage ${s.stageNo} – ${s.label}`;
  return acc;
}, {});

// Max stage number
const FINAL_STAGE_NO = Math.max(...StagesMaster.map(s => s.stageNo));

export default function DemoWizard() {
  const { userInfo, userAccessiblePageIds, login, setUserInfo } = useUser();

  const handleExit = () => {
    sessionStorage.removeItem("wizardUserInfo"); // Clear storage on logout
    login(null);
    setUserInfo(null);
    navigate('/');
  };

  // ===== simulation progress data (single source of truth)
  const [progressData, setProgressData] = useState(null);

  // ===== UI state
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "info", message: "", isVisible: false });

  // ===== Report drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);

  // ===== Confetti
  const [celebrated, setCelebrated] = useState(false);

  // ===== Derived values from progressData
  const currentStage = progressData?.Current_Stage_No ?? 1;
  const completedStage = progressData?.Completed_Stage_No ?? 0;
  const currentPeriodNo = progressData?.Current_Period_No ?? 1;
  const completedPeriodNo = progressData?.Completed_Period_No ?? 0;
  const totalPeriod = progressData?.Total_Period ?? 1;
  const currentPeriodDate = progressData?.Current_Period ?? null;
  const progressPercent = progressData?.Progress_Percent ?? 0;

  const isFinished =
    completedPeriodNo === totalPeriod &&
    completedStage >= FINAL_STAGE_NO;

  const navigate = useNavigate();

  // ===== Fetch progress (single API call, store whole payload)
  const fetchProgress = useCallback(async () => {
    if (!userInfo?.gameId) return;
    setLoading(true);
    try {
      const response = await getTeamProgressStatus({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam
      });
      const d = response?.data?.data;
      if (d) {
        setProgressData(d);
      }
    } catch (err) {
      setAlertData({ severity: "error", message: "Failed to fetch progress", isVisible: true });
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  // 1. Save userInfo to session storage whenever it changes (and is valid)
  useEffect(() => {
    if (userInfo && userInfo.gameId) {
      sessionStorage.setItem("wizardUserInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  // 2. On load/refresh: Try to restore data from storage. Only kick out if storage is empty.
  useEffect(() => {
    if (!userInfo || !userInfo.gameId) {
      const stored = sessionStorage.getItem("wizardUserInfo");
      if (stored) {
        // Restore data
        setUserInfo(JSON.parse(stored));
      } else {
        // No memory, no storage -> Kick to home
        navigate('/');
      }
    }
  }, [userInfo, navigate, setUserInfo]);

  // Get progress info
  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  // ===== Confetti effect when finished
  useEffect(() => {
    if (isFinished && !celebrated) {
      confetti({ particleCount: 200, spread: 180 });
      setCelebrated(true);
    }
  }, [isFinished, celebrated]);

  // ===== Handle stage click (uses API to update then refetch)
  const handleStageClick = async (Stage) => {
    setActionLoading(true);
    try {
      const response = await updateSimulationPlay({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam,
        currentStage: Stage.stageNo,
        currentPeriod: currentPeriodNo,
      });
      if (response?.data?.returnValue === API_STATUS.SUCCESS) {
        await fetchProgress();
      } else {
        setAlertData({ severity: "error", message: "Unable to update stage", isVisible: true });
      }
    } catch {
      setAlertData({ severity: "error", message: "Error updating status", isVisible: true });
    } finally {
      setActionLoading(false);
    }
  };

  // ===== Open report drawer; drawer fetches its own data
  const handleOpenReport = (stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerOpen(true);
  };

  // ===== Stage UI Model: Status, tips, Report Access etc
  const stageUI = useMemo(() => {
    return StagesMaster.map((s) => {
      const status =
        s.stageNo === FINAL_STAGE_NO && isFinished
          ? "FINISHED"
          : s.stageNo === currentStage
            ? "ACTIVE"
            : s.stageNo < currentStage
              ? "COMPLETED"
              : "LOCKED";

      const reports = REPORT_REGISTRY[s.stageNo] || [];

      // get report names
      const names = reports
        .map(uiId =>
          userAccessiblePageIds?.find(p => p.uiId === uiId)?.shortName
        )
        .filter(Boolean);

      const tooltipReports =
        !names.length
          ? "No reports"
          : names.length > 3
            ? names.slice(0, 3).join(", ") + " ⋯"
            : names.join(", ");

      return {
        ...s,
        status,
        isActive: status === "ACTIVE",
        canViewReports: status === "COMPLETED" || status === "FINISHED",
        tooltipReports,
        buttonSx: {
          justifyContent: "space-between",
          py: 2,
          px: 2.5,
          backgroundColor:
            status === "ACTIVE"
              ? s.color
              : status === "LOCKED"
                ? "#e8edf3"
                : "#edf7ed",
          color: status === "ACTIVE" ? "#fff" : "#334155",
          borderRadius: "14px",
          boxShadow:
            status === "ACTIVE"
              ? "0 6px 18px rgba(0,0,0,0.18)"
              : "0 2px 6px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.08)",
          transition: "all 0.25s ease",
          "&:hover": { boxShadow: "0 8px 22px rgba(0,0,0,0.22)", transform: "translateY(-2px)" },
          "&:active": { transform: "translateY(0px)", boxShadow: "0 4px 10px rgba(0,0,0,0.18)" },
          opacity: status === "LOCKED" ? 0.75 : 1
        },
      };
    });
  }, [currentStage, isFinished, userAccessiblePageIds]);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", p: 3 }}>

      {/* ===== Header & Progress ===== */}
      <Box sx={{ mb: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="h5" fontWeight="900">Simulation Progress</Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            {/* Period Display */}
            <Typography variant="subtitle1" color="primary" fontWeight="900">
              Period {currentPeriodNo} / {totalPeriod}
            </Typography>

            {/* Red Exit Icon - ExitToApp represents leaving the simulation */}
            <Tooltip title="Leave Simulation" arrow>
              <IconButton onClick={handleExit} sx={{ p: 0 }}>
                <Avatar sx={{
                  bgcolor: '#ef5350', // A slightly softer, modern red
                  width: 32,
                  height: 32,
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#d32f2f', transform: 'scale(1.1)' },
                  transition: 'all 0.2s'
                }}>
                  <ExitToApp sx={{ fontSize: 18, color: '#fff' }} />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{ height: 12, borderRadius: 6, mb: 3, bgcolor: "#e2e8f0" }}
        />

        <Paper elevation={0} sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #cbd5e1" }}>
          <Typography variant="h6" fontWeight="700" color="primary.dark" textAlign="center">
            {isFinished
              ? "🏆 Simulation Completed! 🏆"
              : `Team Progress:  ${formatDate(currentPeriodDate)} ${progressData?.Current_Progress_Stage || ""}`}
          </Typography>
        </Paper>
      </Box>

      {/* ===== Stage buttons ===== */}
      <Stack spacing={2}>
        {stageUI.map(Stage => (
          <Stack key={Stage.stageNo} direction="row" spacing={1.5} alignItems="center">

            <Tooltip title="Click to proceed" arrow>
              <span style={{ flex: 1 }}>
                <Button
                  fullWidth
                  disabled={!Stage.isActive || actionLoading}
                  onClick={() => handleStageClick(Stage)}
                  sx={Stage.buttonSx}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    {actionLoading && Stage.isActive
                      ? <CircularProgress size={18} color="inherit" />
                      : Stage.icon}
                    <Typography>{`Stage ${Stage.stageNo}: ${Stage.label}`}</Typography>
                  </Stack>
                  <Box>
                    {Stage.status === "ACTIVE" && <PlayCircle fontSize="small" />}
                    {Stage.status === "COMPLETED" && <CheckCircle fontSize="small" />}
                    {Stage.status === "LOCKED" && <Lock fontSize="small" />}
                    {Stage.status === "FINISHED" && <CheckCircle fontSize="small" color="success" />}
                  </Box>
                </Button>
              </span>
            </Tooltip>

            <Tooltip title={Stage.tooltipReports} arrow>
              <span>
                <IconButton
                  onClick={() => handleOpenReport(Stage.stageNo)}
                  disabled={!Stage.canViewReports}
                  color="primary"
                >
                  <Visibility />
                </IconButton>
              </span>
            </Tooltip>

          </Stack>
        ))}
      </Stack>

      <ReportDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        stageNo={activeStageNo}
        completedPeriod={progressData?.Completed_Period}    // Pass the Date object
        completedPeriodNo={progressData?.Completed_Period_No} // Pass the Int
        stageTitle={STAGE_TITLE_MAP[activeStageNo] || ""}
      />

      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
        onClose={() => setAlertData({ ...alertData, isVisible: false })}
      />
    </Box>
  );
}
