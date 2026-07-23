// ============================================================
// DemoVirtual.jsx
// OpsMgt UXLab V2.0
// Part 1
// ============================================================

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";

import {
  ExitToApp,
  SmartToyRounded,
} from "@mui/icons-material";

import omgBg from "../../assets/navigation-menu/omgBgSrp.png";

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
  colors,
  pageStyle,
  cardStyle,
  semanticTypo,
} from "../../ux/styles";

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
    updatePlay,
    effectiveHalt,
    haltStageNo,
    nextMonthAck,
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
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleExit = () => {
    sessionStorage.removeItem("wizardUserInfo");
    login(null);
    setUserInfo(null);
    navigate("/");
  };

  useEffect(() => {
    if (userInfo?.gameId) {
      sessionStorage.setItem(
        "wizardUserInfo",
        JSON.stringify(userInfo)
      );
    }
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo?.gameId) {
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

  }, [
    fetchProgress,
    userInfo,
    progressData,
  ]);

  const [loadingStageNo, setLoadingStageNo] = useState(null);

  const handleStageClick = async (Stage) => {

    setLoadingStageNo(Stage.stageNo);

    setTimeout(async () => {

      await fetchProgress(
        userInfo.gameId,
        userInfo.gameBatch,
        userInfo.gameTeam,
        progressData?.Current_Period,
        Stage.stageNo
      );

      setLoadingStageNo(null);

    }, 500);

  };

  const handleOpenReport = (stageNo) => {

    setActiveStageNo(Number(stageNo));
    setDrawerOpen(true);

  };

  const handleNextMonth = () => {

    setNextMonthAck(true);

  };

  if (loading && !progressData) {

    return (

      <Box sx={pageStyle.center} minHeight="100vh">

        <CircularProgress size={52} />

      </Box>

    );

  }

  return (

    <Box
      sx={{
        ...pageStyle.root,

        backgroundImage: `
        linear-gradient(rgba(248,245,255,.92),
        rgba(248,245,255,.88)),
        url(${omgBg})
      `,

        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >

      <Box
        sx={{
          width: "100%",
          maxWidth: 920,
          mx: "auto",
        }}
      >

        {/* ==========================================
            HERO
        ========================================== */}

        <Paper
          elevation={0}
          sx={{
            borderRadius: 5,
            overflow: "hidden",
            mb: 4,

            background: colors.heroGradient,

            color: colors.white,

            boxShadow: `0 16px 36px ${colors.primary}40`,
          }}
        >

          <Stack
            direction="row"
            spacing={3}
            alignItems="center"
            sx={{ p: 4 }}
          >

            <Avatar
              sx={{
                width: 74,
                height: 74,
                background: "rgba(255,255,255,.18)",

                backdropFilter: "blur(10px)",

                "& svg": {
                  fontSize: 42,
                },
              }}
            >
              <SmartToyRounded />
            </Avatar>

            <Box flex={1}>

              <Typography
                sx={{
                  ...semanticTypo.heroH2,
                  color: colors.white,
                }}
              >
                {UI_STRINGS.TITLE}
              </Typography>

              <Typography
                sx={{
                  ...semanticTypo.bodyB1,
                  color: "rgba(255,255,255,.90)",
                  mt: .5,
                }}
              >
                Operations Management Simulation Control Centre
              </Typography>

            </Box>

            <Tooltip title={UI_STRINGS.EXIT_TOOLTIP}>

              <IconButton
                onClick={handleExit}
                sx={{
                  bgcolor: "rgba(255,255,255,.18)",

                  color: colors.white,

                  "&:hover": {

                    bgcolor: "rgba(255,255,255,.30)",

                  },
                }}
              >
                <ExitToApp />

              </IconButton>

            </Tooltip>

          </Stack>

        </Paper>

        {/* ==========================================
            Progress Card
        ========================================== */}

        <Paper
          elevation={0}
          sx={{
            ...cardStyle.primary,
            p: 3,
            mb: 4,
          }}
        >

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >

            <Typography sx={semanticTypo.pageH4}>

              {UI_STRINGS.PERIOD_DISPLAY(
                progressData?.Current_Period_No,
                progressData?.Total_Period
              )}

            </Typography>

            <Typography
              sx={{
                ...semanticTypo.bodyB1,
                fontWeight: 600,
              }}
            >

              {progressData?.Progress_Percent ?? 0}%

            </Typography>

          </Stack>

          <LinearProgress
            variant="determinate"
            value={progressData?.Progress_Percent ?? 0}
            sx={{
              height: 12,
              borderRadius: 6,

              bgcolor: colors.panel,

              "& .MuiLinearProgress-bar": {

                borderRadius: 6,

                background: colors.heroGradient,

              },
            }}
          />

          <Paper
            elevation={0}
            sx={{
              mt: 3,

              p: 2.5,

              borderRadius: 3,

              bgcolor: colors.panel,

              border: `1px solid ${colors.border}`,
            }}
          >

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >

              <Box>

                <Typography sx={semanticTypo.pageH4}>

                  {userInfo?.gameTeam}

                </Typography>

                <Typography
                  sx={{
                    ...semanticTypo.bodyB2,
                    mt: .5,
                  }}
                >

                  Virtual Enterprise Simulation

                </Typography>

              </Box>

              <Typography
                sx={{
                  ...semanticTypo.pageH4,

                  color: progressData?.Is_Simulation_End
                    ? colors.success
                    : colors.primary,
                }}
              >

                {progressData?.Is_Simulation_End
                  ? UI_STRINGS.SIM_COMPLETED
                  : formatDate(progressData?.Current_Period)}

              </Typography>

            </Stack>

          </Paper>
           </Paper>     {/* closes Progress Card */}
        {/* ==========================================
            Stage Flow
        ========================================== */}

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

        {/* ==========================================
            Reports Drawer
        ========================================== */}

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

        {/* ==========================================
            Toast Messages
        ========================================== */}

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

    </Box>

  );
}
