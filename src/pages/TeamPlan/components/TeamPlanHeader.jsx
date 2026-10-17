// ============================================================
// Component: TeamPlanHeader
// Module: TeamPlan
// Purpose: Page heading for the Operations Business Plan
// AI Tags: team-plan, page-header, rich-ux, report-header-pattern
// UXLab V3 — ReportHeader pattern: centred title and info line,
//            Team (left) and Production period (right) as plain
//            value + icon tile
// ============================================================

import React from "react";
import { Box, Typography } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { colors, layoutStyle, masterTypo } from "../../../ux/styles";

// ------------------------------------------------------------
// Styles composed from ux/styles tokens
// ------------------------------------------------------------

// Side values: absolute at the sides from md, stacked under the info line below.
const CHIP_SX = {
  ...layoutStyle.pageHeaderDatePill,
  position: { xs: "static", md: "absolute" },
  mt: { xs: 1.5, md: 0 },
  background: "transparent",
  border: "none",
  px: 0,
  py: 0,
};
const TEAM_CHIP_SX = { ...CHIP_SX, right: "auto", left: 0 };
const VALUE_SX = { ...masterTypo.body1, fontWeight: 600, color: colors.primary };
const ICON_TILE_SX = {
  width: 32,
  height: 32,
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 2,
  background: colors.panelAlt,
};

// Format a date-like value as "Apr 2026" without timezone shifts.
const formatMonthLabel = (value) => {
  const match = String(value ?? "").match(/^(\d{4})-(\d{2})/);
  if (!match) return "";
  return new Date(Number(match[1]), Number(match[2]) - 1, 1).toLocaleDateString(
    "en-US",
    { month: "short", year: "numeric" }
  );
};

// ------------------------------------------------------------
// Header
// ------------------------------------------------------------
export default function TeamPlanHeader({
  title = "Operations Business Plan",
  info = "Production quantities, material purchases and machinery",
  team,
  productionMonth,
  headingId = "team-plan-heading",
}) {
  return (
    <Box sx={layoutStyle.pageHeader}>
      {/* Page title */}
      <Typography
        id={headingId}
        component="h1"
        sx={{ ...masterTypo.h4, color: colors.title }}
      >
        {title}
      </Typography>

      {/* Page information */}
      {info && (
        <Typography sx={{ ...masterTypo.body1, color: colors.body }}>
          {info}
        </Typography>
      )}

      {/* Team (left) */}
      <Box sx={TEAM_CHIP_SX} title="Team">
        <Box sx={ICON_TILE_SX}>
          <GroupsOutlinedIcon aria-hidden sx={{ fontSize: 18, color: colors.primary }} />
        </Box>
        <Box component="span" sx={visuallyHidden}>Team: </Box>
        <Typography noWrap sx={{ ...VALUE_SX, maxWidth: 160 }}>
          {team || "—"}
        </Typography>
      </Box>

      {/* Production period (right) */}
      <Box sx={CHIP_SX} title="Production period">
        <Box component="span" sx={visuallyHidden}>Production period: </Box>
        <Typography sx={VALUE_SX}>
          {formatMonthLabel(productionMonth) || "—"}
        </Typography>
        <Box sx={ICON_TILE_SX}>
          <CalendarMonthOutlinedIcon aria-hidden sx={{ fontSize: 18, color: colors.primary }} />
        </Box>
      </Box>
    </Box>
  );
}