// Component: HubNew | Module: OMTP Simulation | Purpose: Standardized Simulation Panel
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../core/access/userContext";
import ToastMessage from "../../components/ToastMessage";
import { colors } from "../../ux/styles";
import { useHubProgress } from "./hooks/useHubProgress";
import { useSimUi } from "./hooks/useSimUi";
import StageProp from "./components/StageProp";
import ReportDrawer from "./components/ReportDrawer";
import SimHeader from "./components/SimHeader";
import SimProgressPanel from "./components/SimProgressPanel";
import SimContent from "./components/SimContent";
import SimSidebar from "./components/SimSidebar";
import SimFooter from "./components/SimFooter";
import TeamBadge from "./cards/TeamBadge";
import { StagesMaster, STAGE_TITLE_MAP } from "./stagesMaster";
import LeapCenter from "../Leap/components/LeapCenter";

export default function HubNew() {

  // Navigation and User Context
  const navigate = useNavigate();

  const {
    userInfo,
    login,
    setUserInfo,
    userAccessiblePageIds,
  } = useUser();


  // Business Data and Simulation Hooks
  const {
    progressData,
    loading,
    actionLoading,
    alertData,
    setAlertData,
    fetchProgress,
    setStage,
    effectiveHalt,
    haltStageNo,
    setNextMonthAck,
  } = useHubProgress(userInfo);


  const stageUI = useSimUi(
    progressData,
    userAccessiblePageIds,
    effectiveHalt,
    progressData?.Is_Period_Closed ?? false,
    progressData?.Is_Simulation_End ?? false
  );


  // Page Initialization
  useEffect(() => {
    if (userInfo?.gameId) {
      sessionStorage.setItem(
        "wizardUserInfo",
        JSON.stringify(userInfo)
      );
    } else {
      const stored =
        sessionStorage.getItem("wizardUserInfo");

      if (stored) {
        setUserInfo(JSON.parse(stored));
      } else {
        navigate("/");
      }
    }
  }, [
    userInfo,
    navigate,
    setUserInfo,
  ]);


  // Load Simulation Progress
  useEffect(() => {
    if (userInfo?.gameId && !progressData) {
      fetchProgress(
        userInfo.gameId,
        userInfo.gameBatch,
        userInfo.gameTeam
      );
    }
  }, [
    fetchProgress,
    userInfo,
    progressData,
  ]);


  // Local UI State
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);
  const [loadingStageNo, setLoadingStageNo] = useState(null);
  const [drawerMode, setDrawerMode] = useState("REPORT");


  // Auto-hide Notification
  useEffect(() => {
    if (!alertData.isVisible) return;

    const timer = setTimeout(() => {
      setAlertData((prev) => ({
        ...prev,
        isVisible: false,
      }));
    }, 5000);

    return () => clearTimeout(timer);
  }, [
    alertData.isVisible,
    setAlertData,
  ]);


  // Derived View Model
  const teamInitial = userInfo?.gameTeam
    ? userInfo.gameTeam.charAt(0).toUpperCase()
    : "G";

  const progressPercent =
    progressData?.Progress_Percent ??
    progressData?.Progress_Pct ??
    0;

  const activeStage = Array.isArray(stageUI)
    ? stageUI.find(
        (s) => s.status === "ACTIVE"
      )
    : null;

  const currentStageNumber = effectiveHalt
    ? haltStageNo
    : activeStage?.stageNo ??
      progressData?.Current_Stage_No ??
      haltStageNo;

  const currentStageName =
    STAGE_TITLE_MAP[currentStageNumber]
      ? `Stage ${currentStageNumber} (${STAGE_TITLE_MAP[currentStageNumber]})`
      : currentStageNumber
        ? `Stage ${currentStageNumber}`
        : null;

  const nextActionMessage =
    progressData?.Is_Simulation_End
      ? "All stages finished. Review final reports."
      : currentStageName
        ? `Complete ${currentStageName} to proceed`
        : "Proceed to the next simulation period";


  // LEAP Contents
  const stageInfo =
    StagesMaster.find(
      (s) => s.stageNo === currentStageNumber
    );


  // Open Reports
  const handleOpenReport = useCallback((stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerMode("REPORT");
    setDrawerOpen(true);
  }, []);


  // Open Decide Plan
  const handleDecidePlan = useCallback((stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerMode("DECIDE_PLAN");
    setDrawerOpen(true);
  }, []);


  // Handle Stage Selection
  const handleStageClick = useCallback(
    async (stage) => {
      setLoadingStageNo(stage.stageNo);

      try {
        await setStage(
          userInfo.gameId,
          userInfo.gameBatch,
          userInfo.gameTeam
        );
      } finally {
        setLoadingStageNo(null);
      }
    },
    [
      setStage,
      userInfo,
    ]
  );


  // Handle Next Month
  const handleNextMonth = useCallback(() => {
    setNextMonthAck(true);
  }, [setNextMonthAck]);


  // Handle Exit
  const handleExit = useCallback(() => {
    sessionStorage.removeItem("wizardUserInfo");
    login(null);
    setUserInfo(null);
    navigate("/");
  }, [
    login,
    setUserInfo,
    navigate,
  ]);


  // Loading Screen
  if (loading && !progressData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: colors.page,
        }}
      >
        <CircularProgress
          size={52}
          sx={{
            color: colors.primary,
          }}
        />
      </Box>
    );
  }


  // Render Page
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.page,
        pb: 4,
      }}
    >

      {/* Enterprise Header */}
      <SimHeader
        title="Business Simulation Control Centre"
        userInfo={userInfo}
        handleExit={handleExit}
      />


      {/* Main Simulation Workspace */}
      <SimContent
        leftContent={
          <>
            <SimProgressPanel
              progressData={progressData}
              progressPercent={progressPercent}
            />

            <StageProp
              stageUI={stageUI}
              loadingStageNo={loadingStageNo}
              actionLoading={actionLoading}
              effectiveHalt={effectiveHalt}
              isSimulationEnd={
                progressData?.Is_Simulation_End ?? false
              }
              haltStageNo={haltStageNo}
              handleStageClick={handleStageClick}
              handleOpenReport={handleOpenReport}
              handleDecidePlan={handleDecidePlan}
              handleNextMonth={handleNextMonth}
              nextActionMessage={nextActionMessage}
              progressData={progressData}
            />
          </>
        }

        rightContent={
          <Stack spacing={2.5}>

            <TeamBadge
              batch={userInfo?.gameBatch}
              team={userInfo?.gameTeam}
              status={
                progressData?.Is_Simulation_End
                  ? "Finished"
                  : "In Progress"
              }
            />

            <SimSidebar
              learningCenter={
                <LeapCenter
                  stageNo={currentStageNumber}
                  stageTitle={stageInfo?.label}
                  stagePurpose={stageInfo?.toDo}
                />
              }
            />

          </Stack>
        }
      />


      {/* Notification Messages */}
      <ToastMessage
        open={alertData.isVisible}
        message={alertData.message}
        severity={alertData.severity}
      />


      {/* Report and Decide Plan Drawer */}
      <ReportDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        stageNo={activeStageNo}
        mode={drawerMode}
        completedPeriod={progressData?.Completed_Period}
        stageTitle={
          STAGE_TITLE_MAP[activeStageNo] || ""
        }
        gameTeam={userInfo?.gameTeam}
        userAccessiblePageIds={userAccessiblePageIds}
      />


      {/* Footer */}
      <SimFooter />

    </Box>
  );
}