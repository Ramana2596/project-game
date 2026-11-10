// File: src/pages/TeamPlan/hooks/useTeamPlanGuide.js
// Purpose: fetch the Guide figures once per game, team and month, and resolve them for the active part.
// The user's own Production / Sales entries are read in TeamPlanInfoStrip (Review card).

import { useState, useEffect, useMemo } from "react";
import { getOpsPlanGuide } from "../services/service.js";
import { toSets, buildModel, partInfo } from "../utils/guideModel.js";

export const useTeamPlanGuide = (userInfo, productionMonth, partNo) => {
  // Game context, the month as YYYY-MM-DD, and a numeric batch.
  const { gameId, gameBatch, gameTeam } = userInfo || {};
  const month = productionMonth ? String(productionMonth).split("T")[0] : "";
  const batch = Number(gameBatch);

  // Fetch only when game, team, month and a numeric batch are all known.
  const ready = Boolean(gameId && gameTeam && month) && Number.isInteger(batch);

  // Whole-game lookup built from the API response (undefined = not loaded yet), and a load error.
  const [model, setModel] = useState(undefined);
  const [error, setError] = useState("");

  // Load the guide; refetch only when game, team or period changes.
  useEffect(() => {
    let active = true; // set false on cleanup so a late response is ignored

    // Start clean for the new game, team or period.
    setModel(undefined);
    setError("");

    // Nothing to fetch yet.
    if (!ready) {
      return () => {
        active = false;
      };
    }

    const fetchGuide = async () => {
      try {
        const resp = await getOpsPlanGuide({
          gameId,
          gameBatch: batch,
          gameTeam,
          productionMonth: month,
        });
        if (!active) return;

        // Treat success:false as a failure and surface the server message.
        if (!resp?.data?.success) {
          throw new Error(resp?.data?.message || "Invalid guide response.");
        }

        // Normalise the result lists, then index them by Part_No.
        setModel(buildModel(toSets(resp.data)));
      } catch (err) {
        if (!active) return;
        console.error("[TeamPlan] Guide failed:", err);
        setError(err?.response?.data?.message || "Unable to load the guide figures.");
      }
    };

    fetchGuide();

    return () => {
      active = false;
    };
  }, [ready, gameId, batch, gameTeam, month]);

  // Figures for the selected part; undefined until the model is loaded.
  const info = useMemo(
    () => (!partNo || model === undefined ? undefined : partInfo(model, partNo)),
    [model, partNo]
  );

  return {
    info,
    // Loading only while a request is actually possible and unresolved.
    loading: ready && model === undefined && !error,
    error,
  };
};