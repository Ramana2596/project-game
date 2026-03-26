// src/pages/SimulationSuite/hooks/useProgress.js
// Hook: Provides Simulation Progress Status
import { useState, useCallback, useEffect } from "react";
import confetti from "canvas-confetti";
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
  const [celebrated, setCelebrated] = useState(false);
  const [nextMonthAck, setNextMonthAck] = useState(false);

  // ✔ Added: API message state for toast notifications
  const [apiMessage, setApiMessage] = useState({ isVisible: false, message: "", severity: "info" });

  // Computes logic for HALT and simulation status for UI rendering
  const isSimulationEnd = progress?.Is_Simulation_End ?? false;
  const isPeriodClosed = progress?.Is_Period_Closed ?? false;
  const haltStageNo = progress?.Review_Stage_No ?? 8;
  const effectiveHalt = (isPeriodClosed && !nextMonthAck) || isSimulationEnd;

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

      const d = response?.data?.data;
      if (d) {
        setProgress(d);
        setNextMonthAck(false);
      }

      // ✔ API message template
      if (response?.data?.returnValue !== undefined) {
        setApiMessage(getApiMessage(response.data.returnValue, response.data.message));
      }
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

  // Next Month button
  const handleNextMonth = () => {
    setNextMonthAck(true);
  };

  // Celebration effect; Trigger confetti when simulation is truly complete
  useEffect(() => {
    if (isSimulationEnd && !celebrated) {
      confetti({ particleCount: 200, spread: 180 });
      setCelebrated(true);
    }
  }, [isSimulationEnd, celebrated]);

  // Auto-fetch on mount / when userInfo changes
  useEffect(() => {
    fetch();
  }, [fetch]);

  // Return state and actions
  return {
    progress, loading, actionLoading, apiMessage, setApiMessage, fetch, setStage,
    effectiveHalt, haltStageNo, handleNextMonth, isSimulationEnd
  };
}

export default useProgress;
