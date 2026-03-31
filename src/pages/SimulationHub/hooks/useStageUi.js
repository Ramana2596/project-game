// src/pages/SimulationSuite/hooks/useStageUi.js
// Build Stage UI model (status, styles, tooltips) from progress and access list

import { useMemo } from "react";
import { STAGES } from "../stageConstants.js";
import { REPORT_REGISTRY } from "../wizardreports/reportRegistry.js";
import { UI_STRINGS } from "../constants/labels.js";

export function useStageUi({
  progress,
  userAccessiblePageIds,
  isPeriodClosed,
  effectiveHalt,
  isSimulationEnd
} = {}) {

  // Derived values from progress payload
  const currentStage = progress?.Current_Stage_No ?? 1;
  const completedStage = progress?.Completed_Stage_No ?? 0;
  const completedPeriodNo = progress?.Completed_Period_No ?? 0;
  const totalPeriod = progress?.Total_Period ?? 1;

  const FINAL = STAGES.length
    ? Math.max(...STAGES.map(stage => stage.stageNo))
    : 0;

  const isFinished =
    completedPeriodNo === totalPeriod &&
    completedStage >= FINAL;

  // lookup Report map (UiId Vs Short Name))
  const reportNameMap = useMemo(() => {
    const map = new Map();
    userAccessiblePageIds?.forEach(p => map.set(p.uiId, p.shortName));
    return map;
  }, [userAccessiblePageIds]);

  // Build memoized stages UI array
  return useMemo(() => {

    return STAGES.map((stage) => {

      // Determine stage status
      const status =
        stage.stageNo === FINAL && isFinished
          ? "FINISHED"
          : stage.stageNo === currentStage
            ? "ACTIVE"
            : stage.stageNo < currentStage
              ? "COMPLETED"
              : "LOCKED";

      const reports = REPORT_REGISTRY[stage.stageNo] || [];

      // Get report name for uiId
      const names = reports
        .map(uiId => reportNameMap.get(uiId))
        .filter(Boolean);

      const tooltipReports =
        !names.length
          ? UI_STRINGS.NO_REPORTS
          : names.length > 3
            ? names.slice(0, 3).join(", ") + " ⋯"
            : names.join(", ");

      const buttonSx = {
        justifyContent: "space-between",
        py: 2,
        px: 2.5,
        backgroundColor:
          status === "ACTIVE"
            ? stage.color
            : status === "LOCKED"
              ? "#e8edf3"
              : "#edf7ed",
        color: status === "ACTIVE" ? "#fff" : "#334155",
        borderRadius: "14px",
        boxShadow:
          status === "ACTIVE"
            ? "0 6px 18px rgba(0,0,0,0.18)"
            : "0 2px 6px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.08)",
        transition: "all 0.25s ease",
        "&:hover": {
          boxShadow: "0 8px 22px rgba(0,0,0,0.22)",
          transform: "translateY(-2px)"
        },
        "&:active": {
          transform: "translateY(0px)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.18)"
        },
        opacity: status === "LOCKED" ? 0.75 : 1
      };

      return {
        ...stage,
        status,

        // ActiveStage logic:
        isActive:
          status === "ACTIVE" &&
          !effectiveHalt &&
          !isSimulationEnd,

        // canViewReports logic:
        canViewReports:
          (status === "COMPLETED" ||
            status === "FINISHED" ||
            isPeriodClosed) &&
          status !== "ACTIVE",
/*
        canViewReports:
          (status === "COMPLETED" ||
            status === "FINISHED" ||
            isPeriodClosed) &&
          status !== "ACTIVE" &&
          status !== "LOCKED",
*/
        tooltipReports,
        buttonSx
      };
    });

  }, [
    currentStage,
    isFinished,
    reportNameMap,

    // Dependencies
    isPeriodClosed,
    effectiveHalt,
    isSimulationEnd
  ]);
}

export default useStageUi;