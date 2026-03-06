// src/pages/SimulationSuite/hooks/useProgress.js
// Hook: Provides Simulation Progress Status

import { useState, useCallback, useEffect } from "react";           // React state
import {
    getTeamProgressStatus,
    updateSimulationPlay
} from "../services/service.js";                                    // API services
import { useUser } from "../../../core/access/userContext.jsx";     // User context
import { handleMessage } from "../../../utils/handleMessage.js";    // Unified API/HTTP/Nw message handler

export function useProgress() {
  // User context: Game identifiers
  const { userInfo } = useUser();

  // State: progress payload and loading flags
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // State: alert messages for API/HTTP/Nw
  const [alertData, setAlertData] = useState({ severity: "", message: "", isVisible: false });

  // Fetch Progress Status from backend
  const fetch = useCallback(async () => {
    if (!userInfo?.gameId) return;
    setLoading(true);
    try {
      const resp = await getTeamProgressStatus({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam,
      });
      setProgress(resp?.data?.data ?? null);               // Update progress
      setAlertData(handleMessage(resp));                   // API/HTTP Message
    } catch (err) {
      console.error("fetch progress error", err);
      setAlertData(handleMessage(null, err));              // Network error
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
        currentPeriod,
      });
      // If success, get updated progress data
      if (resp?.data?.returnValue === 0) await fetch(); 
      setAlertData(handleMessage(resp));                   // API/HTTP Message
      return resp;
    } catch (err) {
      console.error("setStage error", err);
      setAlertData(handleMessage(null, err));              // Network error
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
  return { progress, loading, actionLoading, alertData, fetch, setStage };
}

export default useProgress;
