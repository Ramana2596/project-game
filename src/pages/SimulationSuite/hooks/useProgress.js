// src/pages/SimulationSuite/hooks/useProgress.js
// Hook: Provides progress info (minimal client: do not send variantKey/learnMode)
import { useState, useCallback, useEffect } from "react";
import { getTeamProgressStatus, updateSimulationPlay } from "../services/service.js";
import { useUser } from "../../../core/access/userContext.jsx";

export function useProgress() {
  // User context: provides game identifiers
  const { userInfo } = useUser();

  // State: progress payload and loading flags
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch progress from backend
  const fetch = useCallback(async () => {
    if (!userInfo?.gameId) return;
    setLoading(true);
    try {
      const resp = await getTeamProgressStatus({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam
      });
      setProgress(resp?.data?.data ?? null);
    } catch (err) {
      console.error("fetch progress error", err);
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  // Update stage and refresh progress
  const setStage = useCallback(async (stageNo, currentPeriod) => {
    if (!userInfo?.gameId) return null;
    setActionLoading(true);
    try {
      const resp = await updateSimulationPlay({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam,
        currentStage: stageNo,
        currentPeriod
      });
      if (resp?.data?.returnValue === 0) await fetch();
      return resp;
    } catch (err) {
      console.error("setStage error", err);
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [userInfo, fetch]);

  // Auto-fetch on mount / when userInfo changes
  useEffect(() => {
    fetch();
  }, [fetch]);

  // Return state and actions
  return { progress, loading, actionLoading, fetch, setStage };
}

export default useProgress;
