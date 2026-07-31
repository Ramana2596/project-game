// src/pages/DemoVirtual/hooks/useHubProgress.js
// State engine for HubNew: API (get + update), progress, HALT / Play
// Return shape matches useSimProgress.js for drop-in compatibility

import { useState, useCallback, useEffect } from "react";
import confetti from "canvas-confetti";
import { getTeamProgressStatus, updateSimulationPlay } from "../services/hubService";
import { UI_STRINGS } from "../constants/labels";

export function useHubProgress(userInfo) {
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

  // GET: fetch progress status (signature kept compatible with DemoVirtual call sites;
  // completedPeriod/completedStageNo are accepted but unused by this endpoint)
  const fetchProgress = useCallback(async (gId, gBatch, gTeam) => {
    if (!progressData) {
      setLoading(true);
    } else {
      setActionLoading(true);
    }

    try {
      const response = await getTeamProgressStatus({
        gameId: gId,
        gameBatch: gBatch,
        gameTeam: gTeam,
      });

      // getTeamProgressStatus returns { success, code, message, data }
      const success = response?.data?.success;
      const d = response?.data?.data;

      if (success && d) {
        setProgressData(d);
        setNextMonthAck(false);
      } else {
        setAlertData({
          severity: "error",
          message: response?.data?.message || UI_STRINGS.ERROR_FETCH,
          isVisible: true,
        });
      }
    } catch {
      setAlertData({
        severity: "error",
        message: UI_STRINGS.ERROR_FETCH,
        isVisible: true,
      });
    } finally {
      setLoading(false);
      setActionLoading(false);
    }
  }, [progressData]);

  // UPDATE: advance stage, then refresh progress
  const setStage = useCallback(async (gId, gBatch, gTeam) => {
    setActionLoading(true);
    try {
      const response = await updateSimulationPlay({
        gameId: gId,
        gameBatch: gBatch,
        gameTeam: gTeam,
      });

      // This endpoint returns { returnValue, message, data } — no `success` field.
      const returnValue = response?.data?.returnValue;

      if (returnValue !== 0) {
        setAlertData({
          severity: "error",
          message: response?.data?.message || UI_STRINGS.ERROR_UPDATE,
          isVisible: true,
        });
        return response;
      }

      // Refresh progress after successful update
      await fetchProgress(gId, gBatch, gTeam);
      return response;
    } catch {
      setAlertData({
        severity: "error",
        message: UI_STRINGS.ERROR_UPDATE,
        isVisible: true,
      });
      throw new Error("Stage update failed");
    } finally {
      setActionLoading(false);
    }
  }, [fetchProgress]);

  // Celebration effect; Completion of final stage of the final period
  useEffect(() => {
    const isSimulationEnd = progressData?.Is_Simulation_End ?? false;

    if (isSimulationEnd && !celebrated) {
      confetti({ particleCount: 200, spread: 180 });
      setCelebrated(true);
    }
  }, [progressData, celebrated]);

  return {
    progressData, loading, actionLoading, alertData,
    setAlertData, fetchProgress, setStage,
    effectiveHalt, haltStageNo, nextMonthAck, setNextMonthAck,
  };
}
