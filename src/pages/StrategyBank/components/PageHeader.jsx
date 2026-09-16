
// ============================================================
// Component: PageHeader
// Module: StrategyBank
// Purpose: Display Strategy Bank title, description and period
// AI Tags: strategy-bank, page-header, rich-ux
// ============================================================

import React from "react";
import { Box, Typography } from "@mui/material";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { colors, layoutStyle, masterTypo } from "../../../ux/styles";

const monthYear = () =>
  new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" });

export default function PageHeader() {
  return (
    <Box sx={layoutStyle.pageHeader}>
      <Box sx={layoutStyle.pageHeaderDatePill}>
        <CalendarTodayRoundedIcon sx={{ fontSize: 15 }} />
        <Typography sx={{ ...masterTypo.caption, color: colors.primary }}>
          {monthYear()}
        </Typography>
      </Box>
      <Typography sx={{ ...masterTypo.h3, color: colors.title }}>
        Strategy Bank
      </Typography>
      <Typography sx={{ ...masterTypo.body1, color: colors.subtitle }}>
        Strategy vs. Benefit reference — every initiative, its cost, timing and expected impact.
      </Typography>
    </Box>
  );
}
