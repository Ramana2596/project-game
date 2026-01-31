// src/pages/SimulationPlay/DemoWizard.jsx

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Button, Typography, CircularProgress, Box, Stack, LinearProgress,
  Paper, Tooltip, IconButton
} from "@mui/material";
import {
  EmojiPeople, RocketLaunch, Assignment, Insights, Settings,
  PlayCircle, AccountBalance, EventAvailable, SportsScore,
  CheckCircle, Lock, Visibility
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
  { stageNo: 3, label: "Strategic Plan - Input Your Decision", icon: <Assignment />, color: "#AD1457", isLoop: false },
  { stageNo: 4, label: "Market Intelligence", icon: <Insights />, color: "#0288D1", isLoop: true },
  { stageNo: 5, label: "Operations Plan - Input Your Decision", icon: <Settings />, color: "#1565C0", isLoop: true },
  { stageNo: 6, label: "Simulation - Business Cycles", icon: <PlayCircle />, color: "#00897B", isLoop: true },
  { stageNo: 7, label: "Financial Outcomes", icon: <AccountBalance />, color: "#F9A825", isLoop: true },
  { stageNo: 8, label: "Manufacturing Performance Review", icon: <EventAvailable />, color: "#EF6C00", isLoop: true },
  { stageNo: 9, label: "KPI & Team Results", icon: <SportsScore />, color: "#2E7D32", isLoop: false },
];

export default function DemoWizard() {
  // ===== User context
  const { userInfo, userAccessiblePageIds } = useUser();

  // Map uiId → shortName for tooltips
  const screenMap = useMemo(() => {
    const map = {};
    (userAccessiblePageIds || []).forEach(s => {
      map[s.uiId] = s.shortName;
    });
    return map;
  }, [userAccessiblePageIds]);

  // Tooltip for Reports
  const getReportTooltip = (stageNo) => {
    const reports = REPORT_REGISTRY[stageNo] || [];
    const names = reports.map(uiId => screenMap[uiId]).filter(Boolean);
    if (!names.length) return "No reports";
    return names.length > 3 ? names.slice(0, 3).join(", ") + " ⋯" : names.join(", ");
  };

  // ===== Simulation progress state
  const [currentStage, setCurrentStage] = useState(1);
  const [currentProgressStage, setCurrentProgressStage] = useState("");
  const [currentPeriodDate, setCurrentPeriodDate] = useState(null);
  const [completedStage, setCompletedStage] = useState(0);
  const [currentPeriodNo, setCurrentPeriodNo] = useState(1);
  const [completedPeriodNo, setCompletedPeriodNo] = useState(0);
  const [totalPeriod, setTotalPeriod] = useState(1);

  // ===== UI state
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "info", message: "", isVisible: false });

  // ===== Report drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);

  // ===== Derived constants
  const FINAL_STAGE_NO = useMemo(() => Math.max(...StagesMaster.map(s => s.stageNo)), []);
  
  // Flag for entire simulation completion
  const isFinished = completedPeriodNo === totalPeriod && completedStage >= FINAL_STAGE_NO;

  // ===== Fetch progress from API
  const fetchProgress = useCallback(async () => {
    if (!userInfo?.gameId) return;
    try {
      const response = await getTeamProgressStatus({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam
      });
      const d = response?.data?.data;
      if (d) {
        setCurrentStage(d.Current_Stage_No);
        setCurrentProgressStage(d.Current_Progress_Stage || "");
        setCurrentPeriodDate(d.Current_Period);
        setCompletedStage(d.Completed_Stage_No);
        setCurrentPeriodNo(d.Current_Period_No);
        setCompletedPeriodNo(d.Completed_Period_No);
        setTotalPeriod(d.Total_Period);
      }
    } catch (err) {
      console.error("Progress fetch failed", err);
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  useEffect(() => { fetchProgress(); }, [fetchProgress]);

  // ===== Confetti celebration triggers once per game completion
  const [celebrated, setCelebrated] = useState(false);
  useEffect(() => {
    if (isFinished && !celebrated) {
      confetti({ particleCount: 200, spread: 180 });
      setCelebrated(true);
    }
  }, [isFinished, celebrated]);

  // ===== Handle Stage button click
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
      }
    } catch {
      setAlertData({ severity: "error", message: "Error updating status", isVisible: true });
    } finally {
      setActionLoading(false);
    }
  };

  // ===== Open report drawer
  const handleOpenReport = (stageNo) => {
    setActiveStageNo(stageNo);
    setDrawerOpen(true);
  };

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 600, margin: "0 auto", p: 3 }}>

      {/* ===== Header & Progress ===== */}
      <Box sx={{ mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h5" fontWeight="900">Simulation Progress</Typography>
          <Typography variant="subtitle1" color="primary" fontWeight="900">
            Period {currentPeriodNo} / {totalPeriod}
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            Stage {currentStage} of {FINAL_STAGE_NO}
          </Typography>
        </Box>

        <LinearProgress
          variant="determinate"
          value={(completedPeriodNo / totalPeriod) * 100}
          sx={{ height: 12, borderRadius: 6, mb: 3, bgcolor: "#e2e8f0" }}
        />

        <Paper elevation={0} sx={{ p: 2, bgcolor: "#f8fafc", borderRadius: 2, border: "1px solid #cbd5e1" }}>
          <Typography variant="h6" fontWeight="700" color="primary.dark" textAlign="center">
            {isFinished
              ? "🏆 Simulation Completed! 🏆"
              : `Team Progress:  ${formatDate(currentPeriodDate)} ${currentProgressStage}`}
          </Typography>
        </Paper>
      </Box>

      {/* ===== Stage buttons with tooltips ===== */}
      <Stack spacing={2}>
        {StagesMaster.map(Stage => {
          // Determine status per stage: ACTIVE, COMPLETED, LOCKED, FINISHED
          const status = Stage.stageNo === FINAL_STAGE_NO && isFinished
            ? "FINISHED"
            : Stage.stageNo === currentStage
              ? "ACTIVE"
              : Stage.stageNo < currentStage
                ? "COMPLETED"
                : "LOCKED";

          const isActive = status === "ACTIVE";
          const canViewReports = status === "COMPLETED" || status === "FINISHED";

          return (
            <Stack key={Stage.stageNo} direction="row" spacing={1.5} alignItems="center">

              {/* Stage Button */}
              <Tooltip title="Click to proceed" arrow>
                <span style={{ flex: 1 }}>
                  <Button
                    fullWidth
                    disabled={!isActive || actionLoading}
                    onClick={() => handleStageClick(Stage)}
                    sx={{
                      justifyContent: "space-between",
                      py: 2, px: 2.5,
                      backgroundColor: isActive ? Stage.color : status === "LOCKED" ? "#e8edf3" : "#edf7ed",
                      color: isActive ? "#fff" : "#334155",
                      borderRadius: "14px",
                      boxShadow: isActive ? "0 6px 18px rgba(0,0,0,0.18)" : "0 2px 6px rgba(0,0,0,0.06)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      transition: "all 0.25s ease",
                      "&:hover": { boxShadow: "0 8px 22px rgba(0,0,0,0.22)", transform: "translateY(-2px)" },
                      "&:active": { transform: "translateY(0px)", boxShadow: "0 4px 10px rgba(0,0,0,0.18)" },
                      opacity: status === "LOCKED" ? 0.75 : 1
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      {actionLoading && isActive
                        ? <CircularProgress size={18} color="inherit" />
                        : Stage.icon}
                      <Typography>{`Stage ${Stage.stageNo}: ${Stage.label}`}</Typography>
                    </Stack>
                    <Box>
                      {status === "ACTIVE" && <PlayCircle fontSize="small" />}
                      {status === "COMPLETED" && <CheckCircle fontSize="small" />}
                      {status === "LOCKED" && <Lock fontSize="small" />}
                      {status === "FINISHED" && <CheckCircle fontSize="small" color="success" />}
                    </Box>
                  </Button>
                </span>
              </Tooltip>

              {/* Reports Button */}
              <Tooltip title={getReportTooltip(Stage.stageNo)} arrow>
                <span>
                  <IconButton
                    onClick={() => handleOpenReport(Stage.stageNo)}
                    disabled={!canViewReports}
                    color="primary"
                  >
                    <Visibility />
                  </IconButton>
                </span>
              </Tooltip>

            </Stack>
          );
        })}
      </Stack>

      {/* ===== Report Drawer ===== */}
      <ReportDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        stageNo={activeStageNo}
        periodNo={currentPeriodNo}
      />

      {/* ===== Toast messages ===== */}
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
        onClose={() => setAlertData({ ...alertData, isVisible: false })}
      />
    </Box>
  );
}
