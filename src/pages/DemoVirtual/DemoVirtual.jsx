// Component: DemoVirtual | Module: OMTP Simulation | Purpose: Enterprise orchestration page for Demo Virtual
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


import { useSimProgress } from "./hooks/useSimProgress";
import { useSimUi } from "./hooks/useSimUi";
import StageProp from "./components/StageProp";
import ReportDrawer from "./components/ReportDrawer";

import SimHeader from "./components/SimHeader";
import SimProgressPanel from "./components/SimProgressPanel";
import SimContent from "./components/SimContent";
import SimSidebar from "./components/SimSidebar";
import SimFooter from "./components/SimFooter";
import TeamBadge from "./cards/TeamBadge";
import { StagesMaster } from "./stagesMaster";
import { STAGE_TITLE_MAP, } from "./stagesMaster";

import LeapCenter from "../Leap/components/LeapCenter";


export default function DemoVirtual() {

  // ----------------------------------------------------------
  // 1. Navigation & User Context
  // ----------------------------------------------------------
  const navigate = useNavigate();
  const { userInfo, login, setUserInfo, userAccessiblePageIds } = useUser();


  // ----------------------------------------------------------
  // 2. Business Data & Simulation Hooks
  // ----------------------------------------------------------
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
  } = useSimProgress(userInfo);

  const stageUI = useSimUi(
    progressData,
    userAccessiblePageIds,
    effectiveHalt,
    progressData?.Is_Period_Closed ?? false,
    progressData?.Is_Simulation_End ?? false
  );

  // ----------------------------------------------------------
  // 3. Page Initialization
  // ----------------------------------------------------------

  // Restore user session on page refresh.
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

  // Load simulation progress.
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
  },
    [
      fetchProgress,
      userInfo,
      progressData,
    ]
  );


  // ----------------------------------------------------------
  // 4. Local UI State
  // ----------------------------------------------------------
  const [checklistOpen, setChecklistOpen] = useState(false);
  const [rulesOpen, setRulesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);
  const [loadingStageNo, setLoadingStageNo] = useState(null);
  const [drawerMode, setDrawerMode] = useState("REPORT");

  useEffect(() => {
    if (!alertData.isVisible) return;

    const timer = setTimeout(() => {
      setAlertData((prev) => ({
        ...prev,
        isVisible: false,
      }));
    }, 5000);

    return () => clearTimeout(timer);
  }, [alertData.isVisible, setAlertData]);

  // ----------------------------------------------------------
  // 5. Derived View Model
  // ----------------------------------------------------------
  const teamInitial = userInfo?.gameTeam
    ? userInfo.gameTeam.charAt(0).toUpperCase()
    : "G";

  const progressPercent =
    progressData?.Progress_Percent ??
    progressData?.Progress_Pct ??
    0;

  const activeStage = Array.isArray(stageUI)
    ? stageUI.find((s) => s.status === "ACTIVE")
    : null;

  const currentStageNumber = effectiveHalt
    ? haltStageNo
    : activeStage?.stageNo ?? progressData?.Current_Stage_No ?? haltStageNo;

  const currentStageName = STAGE_TITLE_MAP[currentStageNumber]
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
      s => s.stageNo === currentStageNumber
    );


  // ----------------------------------------------------------
  // 6. Event Handlers
  // ----------------------------------------------------------

  // Handle Open Report
  const handleOpenReport = useCallback((stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerMode("REPORT");
    setDrawerOpen(true);
  }, []);

  // Handle Decide Plan
  const handleDecidePlan = useCallback((stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerMode("DECIDE_PLAN");
    setDrawerOpen(true);
  }, []);

  // Handle stage selection.
  const handleStageClick = useCallback(
    async (stage) => {
      setLoadingStageNo(stage.stageNo);
      try {
        await fetchProgress(
          userInfo.gameId,
          userInfo.gameBatch,
          userInfo.gameTeam,
          progressData?.Current_Period,
          stage.stageNo
        );
      }
      finally {
        setLoadingStageNo(null);
      }
    },
    [
      fetchProgress,
      userInfo,
      progressData,
    ]
  );

  // handle Next Month Looping
  const handleNextMonth = () => {
    setNextMonthAck(true);
  };

  // Handle Exit Demo page
  const handleExit = () => {
    sessionStorage.removeItem("wizardUserInfo");
    login(null);
    setUserInfo(null);
    navigate("/");
  };

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

  // ----------------------------------------------------------
  // 7. Render Page
  // ----------------------------------------------------------
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
              isSimulationEnd={progressData?.Is_Simulation_End ?? false}
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
              status={progressData?.Is_Simulation_End ? "Finished" : "In Progress"}
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
      {/* Dialogs */}

      {/* Notification Messages */}
      <ToastMessage
        open={alertData.isVisible}
        message={alertData.message}
        severity={alertData.severity}
      />

      {/* Report Drawer */}

      <ReportDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        stageNo={activeStageNo}
        mode={drawerMode}
        completedPeriod={progressData?.Completed_Period}
        completedStageNo={progressData?.Completed_Stage_No}
        stageTitle={STAGE_TITLE_MAP[activeStageNo] || ""}
        gameTeam={userInfo?.gameTeam}
        userAccessiblePageIds={userAccessiblePageIds}
      />

      {/* Footer */}
      <SimFooter />


    </Box>
  );
}