// src/pages/SimulationSuiteNew/hooks/useProgress.js
// ✅ Encapsulates API calls, HALT logic, and progress state.

import { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { getTeamProgressStatus, updateSimulationPlay } from "../services/service";
import { API_STATUS } from "../../../utils/statusCodes";
import { UI_STRINGS } from "../constants/labels"; // ✅ Added labels

export function useProgress(userInfo) {
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [alertData, setAlertData] = useState({ severity: "info", message: "", isVisible: false });
  const [celebrated, setCelebrated] = useState(false);
  const [nextMonthAck, setNextMonthAck] = useState(false);

  // ✅ Logic for HALT and simulation status
  const isSimulationEnd = progressData?.Is_Simulation_End ?? false;
  const isPeriodClosed = progressData?.Is_Period_Closed ?? false;
  const haltStageNo = progressData?.Review_Stage_No ?? 8; // ✅ Defaults to 8
  const effectiveHalt = (isPeriodClosed && !nextMonthAck) || isSimulationEnd;

  // ✅ Fetch progress from API
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
      setAlertData({ severity: "error", message: UI_STRINGS.FETCH_ERROR, isVisible: true }); // ✅ Labels
    } finally { setLoading(false); }
  }, [userInfo]);

  // ✅ Update simulation stage play
  const updatePlay = async (stageNo, periodNo) => {
    if (effectiveHalt) return;
    setActionLoading(true);
    try {
      const response = await updateSimulationPlay({
        gameId: userInfo.gameId, gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam, currentStage: stageNo, currentPeriod: periodNo,
      });
      if (response?.data?.returnValue === API_STATUS.SUCCESS) { await fetchProgress(true); }
      else { setAlertData({ severity: "error", message: UI_STRINGS.UPDATE_ERROR, isVisible: true }); } // ✅ Labels
    } catch {
      setAlertData({ severity: "error", message: UI_STRINGS.STATUS_ERROR, isVisible: true }); // ✅ Labels
    } finally { setActionLoading(false); }
  };

  // ✅ Celebration effect on completion
  useEffect(() => {
    const completedPeriodNo = progressData?.Completed_Period_No ?? 0;
    const totalPeriod = progressData?.Total_Period ?? 1;
    const completedStage = progressData?.Completed_Stage_No ?? 0;
    const finalStage = 8; // ✅ Stage 9 withdrawn
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