// ============================================================
// Component : SimSidebar
// Module    : OMTP Simulation
// Purpose   : Right-side workspace - a contextual list simulation aids
// ============================================================
// Like (LEAP, Market Glance, Perf.Insights, 
// Quick Actions, Simulation Alerts, AI Coach, CEO Checklist).

import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";

// ============================================================

export default function SimSidebar({
  simulationStatus,
  helpCenter,
  stageLegend,
  helpBanner,
  learningCenter,
  marketGlance,
  insights,
  quickActions,
  alerts,
}) {
  return (
    <Stack
      spacing={2.5}
      sx={{
        height: "100%",
      }}
    >
      {simulationStatus}
      {helpCenter}
      {stageLegend}
      {helpBanner}
      {learningCenter}
      {marketGlance}
      {insights}
      {quickActions}
      {alerts}
    </Stack>
  );
}

// ============================================================

SimSidebar.propTypes = {
  learningCenter: PropTypes.node,
  marketGlance: PropTypes.node,
  insights: PropTypes.node,
  quickActions: PropTypes.node,
  alerts: PropTypes.node,
};