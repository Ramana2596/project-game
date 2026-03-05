// src/pages/SimulationSuite/hooks/useStageUi.js
// Build Stage UI model (status, styles, tooltips) from progress and access list

import { useMemo } from "react";
import { STAGES } from "../simconstants.js";
import { REPORT_REGISTRY } from "../wizardreports/reportRegistry.js";
import { UI_STRINGS } from "../constants/labels.js";

export function useStageUi({ progress, userAccessiblePageIds } = {}) {
  // Derived values from progress payload
  const currentStage = progress?.Current_Stage_No ?? 1;
  const completedStage = progress?.Completed_Stage_No ?? 0;
  const completedPeriodNo = progress?.Completed_Period_No ?? 0;
  const totalPeriod = progress?.Total_Period ?? 1;
  const FINAL = STAGES && STAGES.length ? Math.max(...STAGES.map(s => s.stageNo)) : 0;
  const isFinished = completedPeriodNo === totalPeriod && completedStage >= FINAL;

  // Build memoized Stage UI array
  return useMemo(() => {
    return STAGES.map((s) => {
      const status = s.stageNo === FINAL && isFinished ? "FINISHED"
        : s.stageNo === currentStage ? "ACTIVE"
        : s.stageNo < currentStage ? "COMPLETED" : "LOCKED";

      const reports = REPORT_REGISTRY[s.stageNo] || [];
      const names = reports.map(uiId =>
        userAccessiblePageIds?.find(p =>
          p.uiId === uiId)?.shortName).filter(Boolean);
      const tooltipReports = !names.length ? UI_STRINGS.NO_REPORTS : names.length > 3 ? names.slice(0,3).join(", ") + " ⋯" : names.join(", ");

      const buttonSx = {
        justifyContent: "space-between",
        py: 2,
        px: 2.5,
        backgroundColor: status === "ACTIVE" ? s.color : status === "LOCKED" ? "#e8edf3" : "#edf7ed",
        color: status === "ACTIVE" ? "#fff" : "#334155",
        borderRadius: "14px",
        boxShadow: status === "ACTIVE" ? "0 6px 18px rgba(0,0,0,0.18)" : "0 2px 6px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.08)",
        transition: "all 0.25s ease",
        "&:hover": { boxShadow: "0 8px 22px rgba(0,0,0,0.22)", transform: "translateY(-2px)" },
        "&:active": { transform: "translateY(0px)", boxShadow: "0 4px 10px rgba(0,0,0,0.18)" },
        opacity: status === "LOCKED" ? 0.75 : 1
      };

      return { ...s, status, isActive: status === "ACTIVE", canViewReports: status === "COMPLETED" || status === "FINISHED", tooltipReports, buttonSx };
    });
  }, [currentStage, isFinished, userAccessiblePageIds, STAGES, REPORT_REGISTRY]);
}

export default useStageUi;
