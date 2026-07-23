// ============================================================
// useDemoUi.js - OpsMgt UXLab V2.0
// Purpose: Transform Progress Data into Premium Stage UI
// ============================================================

import { useMemo } from "react";
import { FINAL_STAGE_NO, StagesMaster } from "../stagesMaster";
import { REPORT_REGISTRY } from "../wizardreports/reportRegistry";
import { UI_STRINGS } from "../constants/labels";
import { colors } from "../../../ux/styles";

export function useDemoUi(
  progressData,
  userAccessiblePageIds,
  effectiveHalt,
  isPeriodClosed,
  isSimulationEnd
) {
  const currentStage = progressData?.Current_Stage_No ?? 1;
  const completedStage = progressData?.Completed_Stage_No ?? 0;
  const isFinished =
    (progressData?.Completed_Period_No ?? 0) ===
      (progressData?.Total_Period ?? 1) &&
    completedStage >= FINAL_STAGE_NO;

  return useMemo(() => {
    return StagesMaster.map((s) => {
      // Stage Status
      const status =
        s.stageNo === FINAL_STAGE_NO && isFinished
          ? "FINISHED"
          : s.stageNo === currentStage
          ? "ACTIVE"
          : s.stageNo < currentStage
          ? "COMPLETED"
          : "LOCKED";

      // Reports
      const reports = REPORT_REGISTRY[s.stageNo] || [];
      const names = reports
        .map((uiId) =>
          userAccessiblePageIds?.find((p) => p.uiId === uiId)?.shortName
        )
        .filter(Boolean);
      const tooltipReports =
        !names.length
          ? UI_STRINGS.NO_REPORTS || "No Reports"
          : names.length > 3
          ? names.slice(0, 3).join(", ") + " ..."
          : names.join(", ");

      // Status Colours
      const statusColor =
        status === "ACTIVE"
          ? colors.primary
          : status === "COMPLETED"
          ? colors.success
          : status === "FINISHED"
          ? colors.success
          : "#B0BEC5";

      // Background
      const background =
        status === "ACTIVE"
          ? colors.heroGradient
          : status === "COMPLETED"
          ? "linear-gradient(180deg,#FFFFFF 0%,#F8FFF9 100%)"
          : status === "FINISHED"
          ? "linear-gradient(180deg,#FFFFFF 0%,#F4FFF4 100%)"
          : colors.paper;

      // Shadow
      const shadow =
        status === "ACTIVE"
          ? `0 16px 36px ${colors.primary}45`
          : status === "COMPLETED"
          ? "0 8px 22px rgba(46,125,50,.18)"
          : status === "FINISHED"
          ? "0 8px 22px rgba(46,125,50,.22)"
          : `0 4px 14px ${colors.primary}14`;

      // Border
      const borderColor =
        status === "ACTIVE"
          ? colors.primary
          : status === "COMPLETED"
          ? "#C8E6C9"
          : status === "FINISHED"
          ? "#A5D6A7"
          : colors.border;

      return {
        ...s,
        status,
        statusColor,
        background,
        shadow,
        borderColor,
        isActive: status === "ACTIVE" && !effectiveHalt && !isSimulationEnd,
        canViewReports:
          (status === "COMPLETED" || status === "FINISHED" || isPeriodClosed) &&
          status !== "ACTIVE",
        tooltipReports,
        // Stage Button
        buttonSx: {
          justifyContent: "space-between",
          py: 2.25,
          px: 2.5,
          borderRadius: 4,
          background,
          color: status === "ACTIVE" ? colors.white : colors.title,
          border: `1px solid ${borderColor}`,
          boxShadow: shadow,
          transition: "all .28s ease",
          transform: status === "ACTIVE" ? "scale(1.01)" : "scale(1)",
          "&:hover": {
            transform: status === "LOCKED" ? "none" : "translateY(-3px)",
            boxShadow:
              status === "LOCKED"
                ? shadow
                : `0 18px 40px ${colors.primary}30`,
          },
          "&.Mui-disabled": {
            opacity: 0.65,
            color: "#90A4AE",
          },
        },
      };
    });
  }, [
    currentStage,
    isFinished,
    userAccessiblePageIds,
    effectiveHalt,
    isPeriodClosed,
    isSimulationEnd,
  ]);
}
