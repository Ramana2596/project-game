// ============================================================
// Component: LegendPanel
// Module: StrategyBank
// Purpose: Explain strategy groups, outcomes, gains and risks
// AI Tags: strategy-bank, legend, guidance, rich-ux
// ============================================================

import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { cardStyle, colors, masterTypo } from "../../../ux/styles";

function LegendCard({ icon, color, title, children }) {
  // Render one strategy legend item with equal-height card behavior.
  return (
    <Box
      sx={{
        ...cardStyle.primary,
        display: "flex",
        gap: 1.5,
        alignItems: "flex-start",
        p: 2,
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <Box sx={cardStyle.statIconCircle(color)}>{icon}</Box>
      <Box>
        <Typography sx={{ ...masterTypo.cardH5, color: colors.title, mb: 0.5 }}>
          {title}
        </Typography>
        <Typography sx={{ ...masterTypo.bodyB1, color: colors.subtitle }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}

export default function LegendPanel() {
  // Render the Strategy Bank interpretation guide.
  return (
    <Grid container spacing={2} alignItems="stretch">
      {/* Explain mutually exclusive strategy groups. */}
      <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
        <LegendCard
          icon={<GroupsRoundedIcon />}
          color={colors.primary}
          title="Choice groups"
        >
          Strategies sharing a group letter are alternatives.
        </LegendCard>
      </Grid>

      {/* Explain the strategy outcome categories. */}
      <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
        <LegendCard
          icon={<DashboardRoundedIcon />}
          color={colors.secondary}
          title="Outcome types"
        >
          Initiatives drive Product demand; reduce Labour Rate and RM Cost
        </LegendCard>
      </Grid>

      {/* Explain positive strategy impact. */}
      <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
        <LegendCard
          icon={<TrendingUpRoundedIcon />}
          color={colors.success}
          title="Positive impact (gain %)"
        >
          The expected benefit if strategy is implemented
        </LegendCard>
      </Grid>

      {/* Explain potential strategy downside. */}
      <Grid item xs={12} sm={6} md={3} sx={{ display: "flex" }}>
        <LegendCard
          icon={<WarningAmberRoundedIcon />}
          color={colors.error}
          title="Risk impact (loss %)"
        >
          Potential downside / risk exposure if strategy is not implemented.
        </LegendCard>
      </Grid>
    </Grid>
  );
}