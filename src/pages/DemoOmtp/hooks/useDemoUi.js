// src/pages/DemoOmg/hooks/useDemoUi.js
// Transform Progress data into Stage visuals (icons, colors, styles)
import { useMemo } from "react";
import { StagesMaster, FINAL_STAGE_NO } from "../stagesMaster";
import { REPORT_REGISTRY } from "../wizardreports/reportRegistry"; 
import { UI_STRINGS } from "../constants/labels";

export function useDemoUi(progressData, userAccessiblePageIds, effectiveHalt, isPeriodClosed, isSimulationEnd) {
  // get Team Progress data
  const currentStage = progressData?.Current_Stage_No ?? 1;
  const completedStage = progressData?.Completed_Stage_No ?? 0;
  const isFinished = (progressData?.Completed_Period_No ?? 0) === (progressData?.Total_Period ?? 1)
                     && completedStage >= FINAL_STAGE_NO;

  return useMemo(() => {
    return StagesMaster.map((s) => {
      // Determine stage status
      const status = s.stageNo === FINAL_STAGE_NO && isFinished ? "FINISHED"
                   : s.stageNo === currentStage ? "ACTIVE"
                   : s.stageNo < currentStage ? "COMPLETED" : "LOCKED";

      // Map reports to specific stages
      const reports = REPORT_REGISTRY[s.stageNo] || [];
      const names = reports.map(uiId => userAccessiblePageIds?.find(p => p.uiId === uiId)?.shortName).filter(Boolean);
      const tooltipReports = !names.length ? (UI_STRINGS.NO_REPORTS || "No reports") : names.length > 3 ? names.slice(0, 3).join(", ") + " ⋯" : names.join(", ");

      // Compute styles and interactive metadata for StageItem
      return {
        ...s, 
        status,
        isActive: status === "ACTIVE" && !effectiveHalt && !isSimulationEnd,
        canViewReports: (status === "COMPLETED" || status === "FINISHED" || isPeriodClosed) && status !== "ACTIVE",
        tooltipReports,
        
        // Status button style 
        buttonSx: {
          justifyContent: "space-between", 
          py: 2, 
          px: 2.5,
          backgroundColor: status === "ACTIVE" ? s.color : status === "LOCKED" ? "#f8fafc" : "#e8f5e9",
          color: status === "ACTIVE" ? "#fff" : status === "COMPLETED" ? "#2e7d32" : "#64748b",
          borderRadius: "14px",
          boxShadow: status === "ACTIVE" ? "0 6px 18px rgba(0,0,0,0.18)" : "none",
          border: status === "LOCKED" ? "1px solid #e2e8f0" : status === "ACTIVE" ? "1px solid transparent" : "1px solid #c8e6c9",
          transition: "all 0.25s ease",
          transform: status === "ACTIVE" ? "scale(1.02)" : "none",
          "&:hover": { 
             boxShadow: status === "LOCKED" ? "none" : "0 8px 22px rgba(0,0,0,0.12)", 
             transform: status === "LOCKED" ? "none" : status === "ACTIVE" ? "scale(1.03)" : "translateY(-1px)" 
          },
          opacity: status === "LOCKED" ? 0.8 : 1
        },
      };
    });
  }, [currentStage, isFinished, userAccessiblePageIds, effectiveHalt, isPeriodClosed, isSimulationEnd]);
}