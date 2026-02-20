// src/pages/SimulationSuiteNew/hooks/useProgress.js
// ✅ Encapsulates API calls, HALT logic, and progress state.

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { getTeamProgressStatus, updateSimulationPlay } from "../services/service"; // ✅ relative path
import { API_STATUS } from "../../../utils/statusCodes"; // ✅ relative path

// ✅ Custom hook for simulation progress.
export function useProgress(userInfo) {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "info", message: "", isVisible: false });
  const [celebrated, setCelebrated] = useState(false);
  const [nextMonthAck, setNextMonthAck] = useState(false);

  // ✅ Derived flags from backend data.
  const isSimulationEnd = progressData?.Is_Simulation_End ?? false;
  const isPeriodClosed = progressData?.Is_Period_Closed ?? false;
  const haltStageNo = progressData?.Review_Stage_No ?? 8; // ✅ dynamic halt stage
  const effectiveHalt = (isPeriodClosed && !nextMonthAck) || isSimulationEnd; // ✅ refined HALT

  // ✅ Fetch progress from API.
  const fetchProgress = useCallback(async (isUpdate = false) => {
    if (!userInfo?.gameId) return;
    if (!isUpdate) setLoading(true);
    try {
      const response = await getTeamProgressStatus({
        gameId: userInfo.gameId, gameBatch: userInfo.gameBatch, gameTeam: userInfo.gameTeam
      });
      const d = response?.data?.data;
      if (d) { setProgressData(d); setNextMonthAck(false); }
    } catch {
      setAlertData({ severity: "error", message: "Failed to fetch progress", isVisible: true });
    } finally { setLoading(false); }
  }, [userInfo]);

  // ✅ Update simulation play.
  const updatePlay = async (stageNo, periodNo) => {
    if (effectiveHalt) return;
    setActionLoading(true);
    try {
      const response = await updateSimulationPlay({
        gameId: userInfo.gameId, gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam, currentStage: stageNo, currentPeriod: periodNo,
      });
      if (response?.data?.returnValue === API_STATUS.SUCCESS) { await fetchProgress(true); }
      else { setAlertData({ severity: "error", message: "Unable to update stage", isVisible: true }); }
    } catch {
      setAlertData({ severity: "error", message: "Error updating status", isVisible: true });
    } finally { setActionLoading(false); }
  };

  // ✅ Celebration trigger.
  useEffect(() => {
    const completedPeriodNo = progressData?.Completed_Period_No ?? 0;
    const totalPeriod = progressData?.Total_Period ?? 1;
    const completedStage = progressData?.Completed_Stage_No ?? 0;
    if (completedPeriodNo === totalPeriod && completedStage >= (progressData?.Final_Stage_No ?? 9) && !celebrated) {
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
