// src/pages/DemoOmg/hooks/useDemoProgress.js
// State engine: API, progress and manages Simualtion - HALT / Play

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { getTeamProgressVirtual } from "../services/service"; 
import { UI_STRINGS } from "../constants/labels";

export function useDemoProgress(userInfo) {
  // State initialization for progress tracking and UI feedback
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "info", message: "", isVisible: false });
  const [celebrated, setCelebrated] = useState(false);
  const [nextMonthAck, setNextMonthAck] = useState(false);

  // Computes logic for HALT and simulation status for UI rendering
  const isSimulationEnd = progressData?.Is_Simulation_End ?? false;
  const isPeriodClosed = progressData?.Is_Period_Closed ?? false;
  const haltStageNo = progressData?.Review_Stage_No ?? 8; 
  const effectiveHalt = (isPeriodClosed && !nextMonthAck) || isSimulationEnd;

  // Orchestrates state transition
  const fetchProgress = useCallback(async (gId, gBatch, gTeam, compPeriod, compStage) => {
    setLoading(true);
    try {
      const response = await getTeamProgressVirtual({
        gameId: gId, 
        gameBatch: gBatch, 
        gameTeam: gTeam,
        completedPeriod: compPeriod,
        completedStageNo: compStage
      });
      const d = response?.data?.data;
      if (d) { 
        setProgressData(d); 
        setNextMonthAck(false); 
      }
    } catch {
      setAlertData({ severity: "error", message: UI_STRINGS.FETCH_ERROR, isVisible: true });
    } finally { 
      setLoading(false); 
    }
  }, []);

  // Celebration effect; Completion of final stage of the final period
 useEffect(() => {
  const isSimulationEnd = progressData?.Is_Simulation_End ?? false;

  // Trigger confetti when simulation is truly complete
  if (isSimulationEnd && !celebrated) {
    confetti({ particleCount: 200, spread: 180 });
    setCelebrated(true);
  }
}, [progressData, celebrated]);


  return {
    progressData, loading, actionLoading, alertData,
    setAlertData, fetchProgress, 
    effectiveHalt, haltStageNo, nextMonthAck, setNextMonthAck
  };
}