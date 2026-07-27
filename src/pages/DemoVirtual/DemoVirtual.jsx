// Component: DemoVirtual | Module: OMTP Simulation | Purpose: Enterprise orchestration page for Demo Virtual
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  CircularProgress,
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
import SimContent from "./components/SimContent";
import SimSidebar from "./components/SimSidebar";
import SimFooter from "./components/SimFooter";
import SimulationStatusCard from "./cards/SimulationStatusCard";
import HelpCenterCard from "./cards/HelpCenterCard";
import StageLegendCard from "./cards/StageLegendCard";
import HelpBannerCard from "./cards/HelpBannerCard";
import ChecklistDialog from "./dialogs/ChecklistDialog";
import RulesDialog from "./dialogs/RulesDialog";
import LeapDialog from "../Leap/components/LeapDialog";

import {
  getHelpCenterActions,
  HELP_ACTION_KEYS,
} from "./constants/helpCenterActions";
import {
  STAGE_TITLE_MAP,
} from "./stagesMaster";


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
    [],
    false,
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
  const [leapOpen, setLeapOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeStageNo, setActiveStageNo] = useState(null);
  const [loadingStageNo, setLoadingStageNo] = useState(null);


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
    ? stageUI.find((s) => s.isActive || s.isCurrent) ||
    stageUI.find((s) => !s.isCompleted)
    : null;

  const currentStageNumber =
    activeStage?.stageNo ||
    progressData?.Current_Stage_No ||
    haltStageNo;

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

  const helpCenterActions = getHelpCenterActions({
    isSimulationEnd: progressData?.Is_Simulation_End ?? false,
    currentStageNo: currentStageNumber,
  });

  // ----------------------------------------------------------
  // 6. Event Handlers
  // ----------------------------------------------------------
  // Handle Help Action 
  const handleHelpActionClick = (key) => {
    switch (key) {
      case HELP_ACTION_KEYS.CHECKLIST:
        setChecklistOpen(true);
        break;
      case HELP_ACTION_KEYS.RULES:
        setRulesOpen(true);
        break;
      case HELP_ACTION_KEYS.REPORT_GUIDE:
        // TODO
        break;
      case HELP_ACTION_KEYS.HELPLINE_CONTACT:
        // TODO
        break;
      case HELP_ACTION_KEYS.GENERAL_HELP:
        handleLeapOpen();
        break;
      default:
        break;
    }
  };

  // Handle Open Report
  const handleOpenReport = (stageNo) => {
    setActiveStageNo(Number(stageNo));
    setDrawerOpen(true);
  };

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

  // handle LEAP Learn & Help

  const handleLeapOpen = () => {
    setLeapOpen(true);
  };


  const handleLeapClose = () => {
    setLeapOpen(false);
  };


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
        userInfo={userInfo}
        progressData={progressData}
        progressPercent={progressPercent}
        teamInitial={teamInitial}
        handleExit={handleExit}
      />

      {/* Main Simulation Workspace */}
      <SimContent
        leftContent={
          <StageProp
            stageUI={stageUI}
            loadingStageNo={loadingStageNo}
            actionLoading={actionLoading}
            effectiveHalt={effectiveHalt}
            isSimulationEnd={progressData?.Is_Simulation_End ?? false}
            haltStageNo={haltStageNo}
            handleStageClick={handleStageClick}
            handleOpenReport={handleOpenReport}
            handleNextMonth={handleNextMonth}
            nextActionMessage={nextActionMessage}
            progressData={progressData}
          />
        }
        rightContent={
          <SimSidebar
            simulationStatus={
              <SimulationStatusCard
                progressData={progressData}
                nextActionMessage={nextActionMessage}
              />
            }
            helpCenter={
              <HelpCenterCard
                helpCenterActions={helpCenterActions}
                onHelpActionClick={handleHelpActionClick}
              />
            }
            stageLegend={
              <StageLegendCard />
            }
            helpBanner={
              <HelpBannerCard />
            }
          />
        }
      />

      {/* Dialogs */}
      <ChecklistDialog
        open={checklistOpen}
        onClose={() => setChecklistOpen(false)}
      />

      <RulesDialog
        open={rulesOpen}
        onClose={() => setRulesOpen(false)}
        currentStageName={currentStageName}
      />

      <LeapDialog
        open={leapOpen}
        onClose={handleLeapClose}
        stageId={currentStageNumber}
        title="Learn & Help"
      />

      {/* Notification Messages */}
      <ToastMessage
        alertData={alertData}
        setAlertData={setAlertData}
      />

      {/* Report Drawer */}

      <ReportDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        stageNo={activeStageNo}
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