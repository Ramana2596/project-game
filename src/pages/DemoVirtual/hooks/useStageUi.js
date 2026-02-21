// src/pages/DemoVirtual/hooks/useStageUi.js
// ✅ Encapsulates orchestrated stage UI computation (status, styles, and report availability).

import { useMemo } from "react";
import { StagesMaster, FINAL_STAGE_NO } from "../simconstants";
import { REPORT_REGISTRY } from "../wizardreports/reportRegistry"; 
import { UI_STRINGS } from "../constants/labels";

export function useStageUi(progressData, userAccessiblePageIds, effectiveHalt, isPeriodClosed) {
  // ✅ Derived state from virtual orchestration data
  const currentStage = progressData?.Current_Stage_No ?? 1;
  const completedStage = progressData?.Completed_Stage_No ?? 0;
  const isFinished = (progressData?.Completed_Period_No ?? 0) === (progressData?.Total_Period ?? 1)
                     && completedStage >= FINAL_STAGE_NO;

  return useMemo(() => {
    return StagesMaster.map((s) => {
      // ✅ Determine stage status based on virtual progress markers
      const status = s.stageNo === FINAL_STAGE_NO && isFinished ? "FINISHED"
                   : s.stageNo === currentStage ? "ACTIVE"
                   : s.stageNo < currentStage ? "COMPLETED" : "LOCKED";

      // ✅ Map orchestrated reports to specific stages
      const reports = REPORT_REGISTRY[s.stageNo] || [];
      const names = reports.map(uiId => userAccessiblePageIds?.find(p => p.uiId === uiId)?.shortName).filter(Boolean);
      const tooltipReports = !names.length ? UI_STRINGS.NO_REPORTS : names.length > 3 ? names.slice(0, 3).join(", ") + " ⋯" : names.join(", ");

      // ✅ Compute styles and interactive metadata for StageItem
      return {
        ...s, 
        status,
        isActive: status === "ACTIVE" && !effectiveHalt,
        // ✅ canViewReports: true if stage is finished or period is closed (historical view)
        canViewReports: (status === "COMPLETED" || status === "FINISHED" || isPeriodClosed) && status !== "ACTIVE",
        tooltipReports,
        buttonSx: {
          justifyContent: "space-between", 
          py: 2, 
          px: 2.5,
          backgroundColor: status === "ACTIVE" ? s.color : status === "LOCKED" ? "#f1f5f9" : "#edf7ed",
          color: status === "ACTIVE" ? "#fff" : "#334155",
          borderRadius: "14px",
          boxShadow: status === "ACTIVE" ? "0 6px 18px rgba(0,0,0,0.18)" : "0 2px 6px rgba(0,0,0,0.06)",
          border: status === "LOCKED" ? "1px solid #cbd5e1" : "1px solid rgba(0,0,0,0.08)",
          transition: "all 0.25s ease",
          "&:hover": { 
             boxShadow: status === "LOCKED" ? "0 2px 6px rgba(0,0,0,0.06)" : "0 8px 22px rgba(0,0,0,0.22)", 
             transform: status === "LOCKED" ? "none" : "translateY(-2px)" 
          },
          opacity: status === "LOCKED" ? 0.95 : 1
        },
      };
    });
  }, [currentStage, isFinished, userAccessiblePageIds, effectiveHalt, isPeriodClosed]);
}