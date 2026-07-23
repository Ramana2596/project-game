// ============================================================
// DemoVirtual.jsx
// ============================================================

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Grid,
  Stack,
  Typography,
  LinearProgress,
  Paper,
  Avatar,
  CircularProgress,
  Button,
  Divider,
  Menu,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import {
  CalendarToday,
  Refresh,
  KeyboardArrowDown,
  PlayArrowRounded,
  CheckCircleRounded,
  LockRounded,
  LightbulbOutlined,
  AssessmentOutlined,
  DoubleArrowRounded, // 💡 Better animated icon for Next Month transition
  CheckCircleOutline,
  InfoOutlined,
  HelpCenterOutlined,
} from "@mui/icons-material";

import { useUser } from "../../core/access/userContext";
import { formatDate } from "../../utils/formatDate";

import { useDemoProgress } from "./hooks/useDemoProgress";
import { useDemoUi } from "./hooks/useDemoUi";

import StageProp from "./components/StageProp";
import ReportDrawer from "./wizardreports/ReportDrawer";
import ToastMessage from "../../components/ToastMessage";

import { STAGE_TITLE_MAP } from "./stagesMaster";
import { UI_STRINGS } from "./constants/labels";
import {
  getHelpCenterActions,
  HELP_ACTION_KEYS,
} from "./constants/helpCenterActions";

import { buttonStyle, cardStyle, colors, layoutStyle } from "../../ux/styles";

export default function DemoVirtual() {
  const { userInfo, login, setUserInfo, userAccessiblePageIds } = useUser();
  const navigate = useNavigate();

  const {
    progressData,
    loading,
    actionLoading,
    alertData,
    setAlertData,
    fetchProgress,
    effectiveHalt,
    haltStageNo,
    setNextMonthAck,
  } = useDemoProgress(userInfo);

  const stageUI = useDemoUi(
    progressData,
    userAccessiblePageIds,
    effectiveHalt,
    progressData?.Is_Period_Closed ?? false,
    progressData?.Is_Simulation_End ?? false
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);
  const [loadingStageNo, setLoadingStageNo] = useState(null);

  // Help Center Modals State
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);

  // User Dropdown State
  const [anchorEl, setAnchorEl] = useState(null);
  const userMenuOpen = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    if (userInfo?.gameId) {
      sessionStorage.setItem("wizardUserInfo", JSON.stringify(userInfo));
    } else {
      const stored = sessionStorage.getItem("wizardUserInfo");
      if (stored) {
        setUserInfo(JSON.parse(stored));
      } else {
        navigate("/");
      }
    }
  }, [userInfo, navigate, setUserInfo]);

  useEffect(() => {
    if (userInfo?.gameId && !progressData) {
      fetchProgress(
        userInfo.gameId,
        userInfo.gameBatch,
        userInfo.gameTeam,
        null,
        null
      );
    }
  }, [fetchProgress, userInfo, progressData]);

  const handleExit = () => {
    handleMenuClose();
    sessionStorage.removeItem("wizardUserInfo");
    login(null);
    setUserInfo(null);
    navigate("/");
  };

  const handleStageClick = useCallback(
    async (Stage) => {
      setLoadingStageNo(Stage.stageNo);
      try {
        await fetchProgress(
          userInfo.gameId,
          userInfo.gameBatch,
          userInfo.gameTeam,
          progressData?.Current_Period,
          Stage.stageNo
        );
      } finally {
        setLoadingStageNo(null);
      }
    },
    [fetchProgress, userInfo, progressData]
  );

  const handleOpenReport = (stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerOpen(true);
  };

  const handleNextMonth = () => {
    setNextMonthAck(true);
  };

  if (loading && !progressData) {
    return (
      <Box
        sx={{
          ...layoutStyle.flexCenter,
          minHeight: "100vh",
          bgcolor: colors.page,
        }}
      >
        <CircularProgress size={52} sx={{ color: colors.primary }} />
      </Box>
    );
  }

  const teamInitial = userInfo?.gameTeam
    ? userInfo.gameTeam.charAt(0).toUpperCase()
    : "G";
  const progressPercent =
    progressData?.Progress_Percent ?? progressData?.Progress_Pct ?? 0;

  const activeStage = Array.isArray(stageUI)
    ? stageUI.find((s) => s.isActive || s.isCurrent) ||
      stageUI.find((s) => !s.isCompleted)
    : null;

  const currentStageNumber =
    activeStage?.stageNo || progressData?.Current_Stage_No || haltStageNo;
  const currentStageName = STAGE_TITLE_MAP[currentStageNumber]
    ? `Stage ${currentStageNumber} (${STAGE_TITLE_MAP[currentStageNumber]})`
    : currentStageNumber
    ? `Stage ${currentStageNumber}`
    : null;

  const nextActionMessage = progressData?.Is_Simulation_End
    ? "All stages finished. Review final reports."
    : currentStageName
    ? `Complete ${currentStageName} to proceed`
    : "Proceed to the next simulation period";

  // Dynamic Help Center Actions
  const helpCenterActions = getHelpCenterActions({
    isSimulationEnd: progressData?.Is_Simulation_End ?? false,
    currentStageNo: currentStageNumber,
  });

  const handleHelpActionClick = (key) => {
    switch (key) {
      case HELP_ACTION_KEYS.CHECKLIST:
        setChecklistOpen(true);
        break;
      case HELP_ACTION_KEYS.RULES:
        setRulesOpen(true);
        break;
      case HELP_ACTION_KEYS.REPORT_GUIDE:
        break;
      case HELP_ACTION_KEYS.HELPLINE_CONTACT:
        break;
      case HELP_ACTION_KEYS.GENERAL_HELP:
        break;
      default:
        break;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: colors.page, pb: 4 }}>
      {/* 1. STICKY HEADER & TOP NAV BAR */}
      <Paper
        square
        elevation={0}
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          background: colors.heroGradient,
          color: colors.white,
          px: { xs: 2.5, md: 4 },
          py: 1.5,
          mb: 2.5,
          boxShadow: `0 4px 16px ${colors.shadowColor}`,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center" spacing={2.5}>
            <Box
              sx={{
                bgcolor: colors.white,
                color: colors.primary,
                px: 1.5,
                py: 0.5,
                borderRadius: 1.5,
                fontWeight: 800,
                fontSize: "1.25rem",
                letterSpacing: 0.5,
              }}
            >
              OMTP
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: "rgba(255,255,255,0.3)", my: 0.5 }}
            />
            <Typography
              sx={{ fontSize: "1.15rem", fontWeight: 700, color: colors.white }}
            >
              Team: {userInfo?.gameBatch} – {userInfo?.gameTeam} | Business
              Simulation Control Centre
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              onClick={handleMenuClick}
              endIcon={<KeyboardArrowDown sx={{ color: colors.white }} />}
              sx={{
                textTransform: "none",
                color: colors.white,
                textAlign: "right",
                px: 1.5,
                py: 0.5,
                borderRadius: 2,
                "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
              }}
            >
              <Box sx={{ mr: 1, textAlign: "right" }}>
                <Typography
                  sx={{ fontSize: "0.90rem", fontWeight: 700, lineHeight: 1.2 }}
                >
                  {userInfo?.gameBatch || "Sample"}
                </Typography>
                <Typography
                  sx={{ fontSize: "0.80rem", opacity: 0.85, lineHeight: 1.2 }}
                >
                  {userInfo?.gameTeam || "Team 1"}
                </Typography>
              </Box>
            </Button>

            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: colors.white,
                color: colors.primary,
                fontWeight: 800,
                fontSize: "1rem",
              }}
            >
              {teamInitial}
            </Avatar>

            <Menu
              anchorEl={anchorEl}
              open={userMenuOpen}
              onClose={handleMenuClose}
              PaperProps={{ sx: { borderRadius: 2, mt: 1, minWidth: 180 } }}
            >
              <MenuItem
                onClick={handleExit}
                sx={{ color: colors.error, fontWeight: 700, py: 1.25 }}
              >
                Exit Control Centre
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Paper>

      {/* MAIN BODY LAYOUT */}
      <Box sx={layoutStyle.pageContainer}>
        <Grid container spacing={3} alignItems="flex-start">
          {/* LEFT MAIN COLUMN */}
          <Grid item xs={12} lg={8.5}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                height: "auto",
                flex: "none",
                borderRadius: 2.5,
                bgcolor: colors.white,
                border: `1px solid ${colors.border || "#e0e0e0"}`,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={1.25}
              >
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      color: colors.primaryDark,
                      fontWeight: 800,
                    }}
                  >
                    {UI_STRINGS.PERIOD_DISPLAY(
                      progressData?.Current_Period_No,
                      progressData?.Total_Period
                    )}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "0.90rem", color: colors.muted }}
                  >
                    •
                  </Typography>
                  <Stack direction="row" spacing={0.75} alignItems="center">
                    <CalendarToday
                      sx={{ fontSize: 16, color: colors.primary }}
                    />
                    <Typography
                      sx={{
                        fontSize: "2.0rem",
                        color: colors.title,
                        fontWeight: 700,
                      }}
                    >
                      {progressData?.Is_Simulation_End
                        ? UI_STRINGS.SIM_COMPLETED
                        : formatDate(progressData?.Current_Period)}
                    </Typography>
                  </Stack>
                </Stack>

                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    color: colors.primary,
                    fontWeight: 800,
                  }}
                >
                  {progressPercent}% Complete
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={progressPercent}
                sx={{
                  height: 6,
                  borderRadius: "999px",
                  bgcolor: colors.selected || "#f0f0f0",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: "999px",
                    background: colors.heroGradient,
                  },
                }}
              />
            </Paper>

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
          </Grid>

          {/* RIGHT SIDEBAR COLUMN */}
          <Grid item xs={12} lg={3.5}>
            <Stack spacing={2.5}>
              {/* Status Badge Card */}
              <Paper
                elevation={0}
                sx={{ ...cardStyle.primary, p: 2.5, height: "auto" }}
              >
                <Typography
                  sx={{
                    fontSize: "0.80rem",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    color: colors.subtitle,
                    mb: 1.5,
                    textTransform: "uppercase",
                  }}
                >
                  Simulation Status
                </Typography>

                <Chip
                  icon={
                    progressData?.Is_Simulation_End ? null : (
                      <Refresh
                        sx={{
                          color: "#fff !important",
                          fontSize: "18px !important",
                        }}
                      />
                    )
                  }
                  label={
                    progressData?.Is_Simulation_End
                      ? "COMPLETED"
                      : "IN PROGRESS"
                  }
                  sx={{
                    width: "100%",
                    height: 38,
                    borderRadius: "8px",
                    mb: 2,
                    fontSize: "0.90rem",
                    fontWeight: 800,
                    color: colors.white,
                    bgcolor: progressData?.Is_Simulation_End
                      ? colors.success
                      : colors.primary,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: colors.title,
                    mb: 0.5,
                  }}
                >
                  Next Action
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: colors.body,
                    lineHeight: 1.4,
                  }}
                >
                  {nextActionMessage}
                </Typography>
              </Paper>

              {/* Help Center & Stage Legend Container */}
              <Paper
                elevation={0}
                sx={{ ...cardStyle.primary, p: 2.5, height: "auto" }}
              >
                {/* HELP CENTER */}
                <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                  <HelpCenterOutlined
                    sx={{ fontSize: 18, color: colors.subtitle }}
                  />
                  <Typography
                    sx={{
                      fontSize: "0.80rem",
                      fontWeight: 800,
                      letterSpacing: "0.05em",
                      color: colors.subtitle,
                      textTransform: "uppercase",
                    }}
                  >
                    Help Center
                  </Typography>
                </Stack>

                <Stack spacing={1.25} mb={2.5}>
                  {helpCenterActions.map((action) => {
                    const IconComp = action.icon;
                    return (
                      <Button
                        key={action.key}
                        fullWidth
                        startIcon={<IconComp sx={{ fontSize: 18 }} />}
                        onClick={() => handleHelpActionClick(action.key)}
                        sx={{
                          ...buttonStyle.secondary,
                          justifyContent: "flex-start",
                          borderRadius: 2,
                          height: 38,
                          px: 2,
                          fontSize: "0.85rem",
                          fontWeight: 700,
                        }}
                      >
                        {action.label}
                      </Button>
                    );
                  })}
                </Stack>

                <Divider sx={{ my: 2, borderColor: colors.border }} />

                {/* STAGE LEGEND */}
                <Typography
                  sx={{
                    fontSize: "0.80rem",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    color: colors.subtitle,
                    mb: 2,
                    textTransform: "uppercase",
                  }}
                >
                  Stage Legend
                </Typography>

                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: colors.primary,
                        color: colors.white,
                      }}
                    >
                      <PlayArrowRounded sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.90rem",
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        Active Stage
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.80rem", color: colors.subtitle }}
                      >
                        Current stage in progress
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: colors.success,
                        color: colors.white,
                      }}
                    >
                      <CheckCircleRounded sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.90rem",
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        Completed Stage
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.80rem", color: colors.subtitle }}
                      >
                        Successfully completed
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: colors.info || "#0288d1",
                        color: colors.white,
                      }}
                    >
                      <AssessmentOutlined sx={{ fontSize: 18 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.90rem",
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        View Reports
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.80rem", color: colors.subtitle }}
                      >
                        Open reports & analytics
                      </Typography>
                    </Box>
                  </Stack>

                  {/* 2 & 3: NEXT MONTH LEGEND ITEM (YELLOW + ANIMATED ICON) */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: "#f57c00", // Yellow / Amber accent color
                        color: colors.white,
                        boxShadow: "0 0 8px rgba(245, 124, 0, 0.4)",
                      }}
                    >
                      <DoubleArrowRounded
                        sx={{
                          fontSize: 18,
                          animation: "pulseShift 1.5s infinite ease-in-out",
                          "@keyframes pulseShift": {
                            "0%, 100%": { transform: "translateX(0)" },
                            "50%": { transform: "translateX(3px)" },
                          },
                        }}
                      />
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.90rem",
                          fontWeight: 700,
                          lineHeight: 1.2,
                          color: "#e65100",
                        }}
                      >
                        Next Month
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.80rem", color: colors.subtitle }}
                      >
                        Advance / loop to Stage 4
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        bgcolor: colors.disabledText,
                        color: colors.white,
                      }}
                    >
                      <LockRounded sx={{ fontSize: 16 }} />
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: "0.90rem",
                          fontWeight: 700,
                          lineHeight: 1.2,
                        }}
                      >
                        Locked Stage
                      </Typography>
                      <Typography
                        sx={{ fontSize: "0.80rem", color: colors.subtitle }}
                      >
                        Not yet available
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>

              {/* Help Banner */}
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: colors.selected,
                  border: `1px solid ${colors.primaryLight}`,
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "transparent",
                      color: colors.primary,
                      border: `2px solid ${colors.primary}`,
                    }}
                  >
                    <LightbulbOutlined sx={{ fontSize: 20 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: "0.80rem",
                        fontWeight: 800,
                        color: colors.primary,
                        mb: 0.25,
                        letterSpacing: "0.02em",
                      }}
                    >
                      NEED HELP?
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.82rem",
                        color: colors.body,
                        lineHeight: 1.3,
                        display: "block",
                      }}
                    >
                      Click the Help button in any stage for detailed guidance.
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      {/* Footer */}
      <Typography
        sx={{
          fontSize: "0.85rem",
          fontWeight: 600,
          textAlign: "center",
          color: colors.muted,
          mt: 4,
        }}
      >
        © 2026 OMTP – Simulation Control Panel
      </Typography>

      {/* MODALS */}
      <Dialog
        open={checklistOpen}
        onClose={() => setChecklistOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle
          sx={{ fontWeight: 800, fontSize: "1.1rem", color: colors.primary }}
        >
          Pre-Submission Checklist
        </DialogTitle>
        <DialogContent dividers>
          <List disablePadding>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutline
                  sx={{ color: colors.success, fontSize: 20 }}
                />
              </ListItemIcon>
              <ListItemText primary="Verify production volume target matches forecast." />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutline
                  sx={{ color: colors.success, fontSize: 20 }}
                />
              </ListItemIcon>
              <ListItemText primary="Confirm unit selling price is set within allowed range." />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutline
                  sx={{ color: colors.success, fontSize: 20 }}
                />
              </ListItemIcon>
              <ListItemText primary="Check raw material inventory buffer levels." />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemIcon sx={{ minWidth: 32 }}>
                <CheckCircleOutline
                  sx={{ color: colors.success, fontSize: 20 }}
                />
              </ListItemIcon>
              <ListItemText primary="Ensure team consensus on submitted values." />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setChecklistOpen(false)}
            variant="contained"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Got It
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle
          sx={{ fontWeight: 800, fontSize: "1.1rem", color: colors.primary }}
        >
          {currentStageName ? `${currentStageName} Rules` : "Stage Rules & Limits"}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              <InfoOutlined
                sx={{ color: colors.primary, fontSize: 20, mt: 0.2 }}
              />
              <Typography sx={{ fontSize: "0.88rem", color: colors.body }}>
                Maximum budget allocation cannot exceed current available cash
                reserves.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              <InfoOutlined
                sx={{ color: colors.primary, fontSize: 20, mt: 0.2 }}
              />
              <Typography sx={{ fontSize: "0.88rem", color: colors.body }}>
                Decisions are final once submitted and cannot be reversed after
                period advancement.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
              <InfoOutlined
                sx={{ color: colors.primary, fontSize: 20, mt: 0.2 }}
              />
              <Typography sx={{ fontSize: "0.88rem", color: colors.body }}>
                All required input fields must be populated to mark the stage
                complete.
              </Typography>
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={() => setRulesOpen(false)}
            variant="contained"
            sx={{ textTransform: "none", borderRadius: 2 }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ReportDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        stageNo={activeStageNo}
        completedPeriod={progressData?.Completed_Period}
        completedStageNo={progressData?.Completed_Stage_No}
        stageTitle={STAGE_TITLE_MAP[activeStageNo] || ""}
        userAccessiblePageIds={userAccessiblePageIds}
        gameTeam={userInfo?.gameTeam}
      />

      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
        onClose={() =>
          setAlertData({
            ...alertData,
            isVisible: false,
          })
        }
      />
    </Box>
  );
}