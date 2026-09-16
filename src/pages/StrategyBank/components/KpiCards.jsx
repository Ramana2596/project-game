
// ============================================================
// Component: KpiCards
// Module: StrategyBank
// Purpose: Display key Strategy Bank performance indicators
// AI Tags: strategy-bank, kpi, statistics, rich-ux
// ============================================================
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import TrackChangesRoundedIcon from "@mui/icons-material/TrackChangesRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import { cardStyle, colors, masterTypo } from "../../../ux/styles";
import { formatMoney } from "../utils/strategyBankUtils";

function safeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function formatPercent(value) {
  return `${safeNumber(value).toFixed(1)}%`;
}

function StatCard({ icon, accentColor, label, value, sub }) {
  // Render one compact KPI card.
  return (
    <Box sx={{ ...cardStyle.statCard, py: 1, px: 1.25, gap: 1 }}>
      <Box
        sx={{
          ...cardStyle.statIconCircle(accentColor),
          width: 32,
          height: 32,
          minWidth: 32,
        }}
      >
        {React.cloneElement(icon, {
          sx: {
            fontSize: 18,
            color: accentColor,
            display: "block",
          },
        })}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            ...masterTypo.caption,
            color: colors.subtitle,
            lineHeight: 1,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            ...masterTypo.h5,
            color: colors.title,
            lineHeight: 1.1,
          }}
        >
          {value}
        </Typography>
        <Typography
          sx={{
            ...masterTypo.caption,
            color: colors.subtitle,
            lineHeight: 1,
          }}
        >
          {sub}
        </Typography>
      </Box>
    </Box>
  );
}

export default function KpiCards({ kpis }) {
  // Guard KPI values before formatting.
  const totalStrategies = safeNumber(kpis?.totalStrategies);
  const totalInvestment = safeNumber(kpis?.totalInvestment);
  const avgGain = safeNumber(kpis?.avgGain);
  const totalGain = safeNumber(kpis?.totalGain);
  const avgDuration = safeNumber(kpis?.avgDuration);
  const investmentUOM = kpis?.investmentUOM || "—";

  // Render the compact Strategy Bank KPI summary.
  return (
    <Grid container spacing={1} sx={{ mb: 1.5 }}>
      <Grid item xs={12} sm={6} md={2.4}>
        <StatCard
          icon={<LayersRoundedIcon />}
          accentColor={colors.primary}
          label="Strategies"
          value={totalStrategies}
          sub="Total initiatives"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <StatCard
          icon={<AttachMoneyRoundedIcon />}
          accentColor={colors.primary}
          label={`Investment (${investmentUOM})`}
          value={formatMoney(totalInvestment)}
          sub="Fixed Cost Budget"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <StatCard
          icon={<TrackChangesRoundedIcon />}
          accentColor={colors.success}
          label="Average Gain"
          value={formatPercent(avgGain)}
          sub="Expected gain"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <StatCard
          icon={<ShieldRoundedIcon />}
          accentColor={colors.info}
          label="Total Gain"
          value={formatPercent(totalGain)}
          sub="Combined gain"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2.4}>
        <StatCard
          icon={<ScheduleRoundedIcon />}
          accentColor={colors.warning}
          label="Avg Duration"
          value={`${avgDuration} Mo.`}
          sub="Strategy duration"
        />
      </Grid>
    </Grid>
  );
}