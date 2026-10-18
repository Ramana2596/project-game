// File: src/pages/TeamPlan/hooks/useTeamPlanGuide.js
// Purpose: Guide card data. ONE call to UI_Ops_Business_Plan_Guide per team and month returns every
// part, so the card is just a lookup by Part_No (unique across tabs). Fixed reference figures:
// loaded once, never recalculated while the user types.
//
// Result sets are recognised by their columns, not their position:
//   Total_Demand        -> likely demand per product
//   Qty_per_Set         -> BOM rows (a material can be used in several products)
//   Plant_Capacity_Hours-> overall plant capacity and load (not per machine)
//   CB_Qty              -> closing stock (FG and RM sets alike: Part_No is unique, so they merge)
//
// USE_STUB = true uses the sample rows in utils/guideModel.js (real SP output for team Lotus, Feb-2026)
// so the card can be seen working. Set it to false to call the API.

import { useState, useEffect, useMemo, useRef } from "react";
import { getOpsPlanGuide } from "../services/guideService.js";
import { SAMPLE_SETS, toSets, buildModel, partInfo } from "../utils/guideModel.js";

const USE_STUB = true;

export const useTeamPlanGuide = (userInfo, productionMonth, partNo) => {
  const { gameId, gameBatch, gameTeam } = userInfo || {};
  const ready = Boolean(gameId && gameTeam) && gameBatch != null && Boolean(productionMonth);

  const [model, setModel] = useState(undefined); // undefined = loading, object = loaded
  const [error, setError] = useState("");
  const sessionRef = useRef(0);

  useEffect(() => {
    const session = ++sessionRef.current;
    setModel(undefined);
    setError("");

    if (USE_STUB) {
      setModel(buildModel(SAMPLE_SETS));
      return undefined;
    }
    if (!ready) return undefined;

    getOpsPlanGuide({
      gameId, gameBatch, gameTeam,
      productionMonth: String(productionMonth).split("T")[0],
    })
      .then((resp) => {
        if (session === sessionRef.current) setModel(buildModel(toSets(resp.data)));
      })
      .catch((err) => {
        if (session !== sessionRef.current) return;
        console.error("[TeamPlan] Guide failed:", err);
        setError("Unable to load the guide figures.");
      });
    return undefined;
  }, [ready, gameId, gameBatch, gameTeam, productionMonth]);

  const info = useMemo(
    () => (!partNo || model === undefined ? undefined : partInfo(model, partNo)),
    [model, partNo]
  );

  return { info, loading: model === undefined && !error, error, isStub: USE_STUB };
};