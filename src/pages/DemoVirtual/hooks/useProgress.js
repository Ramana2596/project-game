// src/pages/DemoVirtual/hooks/useProgress.js
// ✅ Encapsulates Virtual API calls, HALT logic, and progress state orchestration.

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
// ✅ Switched to Virtual Progress API / ❌ updateSimulationPlay removed
import { getTeamProgressVirtual } from "../services/service"; 
import { UI_STRINGS } from "../constants/labels";

export function useProgress(userInfo) {
  // ✅ State initialization for progress tracking and UI feedback
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "info", message: "", isVisible: false });
  const [celebrated, setCelebrated] = useState(false);
  const [nextMonthAck, setNextMonthAck] = useState(false);

  // ✅ Computes logic for HALT and simulation status for UI rendering
  const isSimulationEnd = progressData?.Is_Simulation_End ?? false;
  const isPeriodClosed = progressData?.Is_Period_Closed ?? false;
  const haltStageNo = progressData?.Review_Stage_No ?? 8; 
  const effectiveHalt = (isPeriodClosed && !nextMonthAck) || isSimulationEnd;

  // ✅ Orchestrates state transition by calling Virtual API with 5 parameters
  const fetchProgress = useCallback(async (gId, gBatch, gTeam, compPeriod, compStage) => {
    // ❌ if (!isUpdate) setLoading(true); 
    setLoading(true); // ✅ Always set loading to ensure UI sync during orchestration
    try {
      // ✅ Passing 5 parameters: Id, Batch, Team, Completed Period, Completed Stage
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

  // ✅ Update simulation stage play (Maintained as shell for compatibility)
  const updatePlay = async (stageNo, periodNo) => {
    // ❌ Business logic removed: Orchestrated Demo does not require active play calls
    return; 
  };

  // ✅ Celebration effect on completion using exact business rules
  useEffect(() => {
    const completedPeriodNo = progressData?.Completed_Period_No ?? 0;
    const totalPeriod = progressData?.Total_Period ?? 1;
    const completedStage = progressData?.Completed_Stage_No ?? 0;
    const finalStage = 8; // ✅ Stage 9 withdrawn
    
    // ✅ Logic: Triggers only when the final stage of the final period is reached
    if (completedPeriodNo === totalPeriod && completedStage >= finalStage && !celebrated) {
      confetti({ particleCount: 200, spread: 180 });
      setCelebrated(true);
    }
  }, [progressData, celebrated]);

  return {
    progressData, loading, actionLoading, alertData,
    setAlertData, fetchProgress, updatePlay,
    effectiveHalt, haltStageNo, nextMonthAck, setNextMonthAck
  };
}