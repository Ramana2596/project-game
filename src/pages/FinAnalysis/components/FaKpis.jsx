// Component: FaKpis
// Module: FinAnalysis
// Purpose: Render the six executive financial KPIs
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: annual-report, kpis, profitability, returns, leverage, uxlab

import React from "react";
import { Box, Typography } from "@mui/material";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PercentOutlinedIcon from "@mui/icons-material/PercentOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { cardStyle, colors, masterTypo } from "../../../ux/styles";
import { FA_KPIS } from "../constants/faConstants";

// Define the visual treatment for each executive KPI.
const KPI_VISUALS = {
  revenueGrowth: {
    icon: TrendingUpOutlinedIcon,
    accent: colors.accentBlue,
  },
  grossMargin: {
    icon: ShowChartOutlinedIcon,
    accent: colors.accentTeal,
  },
  ebitMargin: {
    icon: AccountBalanceOutlinedIcon,
    accent: colors.accentPurple,
  },
  netMargin: {
    icon: PercentOutlinedIcon,
    accent: colors.accentIndigo,
  },
  roe: {
    icon: SavingsOutlinedIcon,
    accent: colors.accentOrange,
  },
  debtEquity: {
    icon: AccountBalanceWalletOutlinedIcon,
    accent: colors.accentRose,
  },
};

// Format KPI values according to their configured unit.
const formatValue = (value, unit) => {
  if (
    value === null ||
    value === undefined ||
    !Number.isFinite(Number(value))
  ) {
    return "—";
  }

  const number = Number(value);

  if (unit === "%") {
    return `${number.toFixed(1)}%`;
  }

  if (unit === "x") {
    return `${number.toFixed(2)}x`;
  }

  return number.toLocaleString();
};

const FaKpis = ({ ratios = {}, loading = false }) => {
  // Render six compact executive KPI cards in a single desktop row.
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(6, minmax(0, 1fr))",
        },
        gap: 1.25,
        px: 2,
        mb: 2,
      }}
    >
      {FA_KPIS.map((kpi) => {
        const visual = KPI_VISUALS[kpi.id];
        const Icon = visual?.icon || ShowChartOutlinedIcon;
        const accent = visual?.accent || colors.primary;
        const value = ratios?.[kpi.id];

        return (
          <Box
            key={kpi.id}
            sx={{
              ...cardStyle.statCard,
              minWidth: 0,
              px: 1.5,
              py: 1.25,
              opacity: loading ? 0.65 : 1,
              display: "flex",
              alignItems: "center",
              gap: 1.25,
            }}
          >
            <Box
              sx={{
                ...cardStyle.statIconCircle(accent),
                width: 38,
                height: 38,
                minWidth: 38,
                "& svg": {
                  fontSize: 20,
                  color: colors.onPrimary,
                },
              }}
            >
              <Icon />
            </Box>

            <Box
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                noWrap
                sx={{
                  ...masterTypo.caption,
                  color: colors.subtitle,
                  lineHeight: 1.2,
                }}
              >
                {kpi.label}
              </Typography>

              <Typography
                noWrap
                sx={{
                  ...masterTypo.h5,
                  color: colors.title,
                  mt: 0.25,
                  lineHeight: 1.15,
                }}
              >
                {loading
                  ? "Loading"
                  : formatValue(value, kpi.unit)}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default FaKpis;