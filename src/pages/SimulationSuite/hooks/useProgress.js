// src/pages/SimulationSuite/hooks/useProgress.js
// Hook: Provides Simulation Progress Status
import { useState, useCallback, useEffect } from "react";
import { getTeamProgressStatus, updateSimulationPlay } from "../services/service.js";
import { useUser } from "../../../core/access/userContext.jsx";

// ✔ Added: API status utilities
import { getApiMessage } from "../../../utils/getApiMessage.js";
import { API_STATUS } from "../../../utils/statusCodes.js";

export function useProgress() {
  // User context: Game identifiers
  const { userInfo } = useUser();

  // State: progress payload and loading flags
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // ✔ Added: API message state for toast notifications
  const [apiMessage, setApiMessage] = useState({ isVisible: false, message: "", severity: "info" });

  // Fetch Progress Status from backend
  const fetch = useCallback(async () => {
    if (!userInfo?.gameId) return;
    setLoading(true);
    try {
      const response = await getTeamProgressStatus({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam
      });

      // ✔ API message template
      if (response?.data?.returnValue !== undefined) {
        setApiMessage(getApiMessage(response.data.returnValue, response.data.message));
      }

      // ✔ Progress payload extraction
      setProgress(response?.data?.data ?? null);
    } catch {
      // ✔ Plain error string (Option B)
      setApiMessage(getApiMessage(-99, "System error while fetching progress"));
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  // Update stage and refresh progress
  const setStage = useCallback(async (stageNo, currentPeriod) => {
    if (!userInfo?.gameId) return null;
    setActionLoading(true);
    try {
      const response = await updateSimulationPlay({
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam,
  //      currentStage: stageNo,
  //      currentPeriod
      });

      // ✔ API message template
      if (response?.data?.returnValue !== undefined) {
        setApiMessage(getApiMessage(response.data.returnValue, response.data.message));
      }

      // ✔ If success, refresh progress
      if (response?.data?.returnValue === API_STATUS.SUCCESS) {
        await fetch();
      }
      return response;
    } catch {
      // ✔ Plain error string (Option B)
      setApiMessage(getApiMessage(-99, "System error while updating stage"));
      throw new Error("Stage update failed");
    } finally {
      setActionLoading(false);
    }
  }, [userInfo, fetch]);

  // Auto-fetch on mount / when userInfo changes
  useEffect(() => {
    fetch();
  }, [fetch]);

  // Return state and actions
  return { progress, loading, actionLoading, fetch, setStage, apiMessage, setApiMessage };
}

export default useProgress;
