/**
 * Component Name: FinBSKpis
 * Module: Finance / FinBS
 * Purpose: Display six compact Balance Sheet KPI cards and the balance-check chip.
 * Author/Version: UXLab / v1.2
 * AI Tags: kpi, balance sheet, liquidity, leverage, cash
 */

import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import BalanceRoundedIcon from "@mui/icons-material/BalanceRounded";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { cardStyle, masterTypo } from "../../../ux/styles";
import { accent, status, text } from "../../../ux/styles/colorPalette";
import { EMPTY_CELL } from "../constants/finBS.constants";
import { formatAmount, formatPercent, formatRatio } from "../utils/formatters";

// Define the six Balance Sheet KPIs using existing UXLab tokens.
const buildCards = (summary) => {
  const negativeEquity =
    Number.isFinite(summary.totalEquity) && summary.totalEquity <= 0;

  return [
    {
      key: "currentRatio",
      label: "Current ratio",
      value: formatRatio(summary.currentRatio),
      caption: "Current assets ÷ current liabilities",
      Icon: SpeedRoundedIcon,
      color: accent.purple,
    },
    {
      key: "quickRatio",
      label: "Quick ratio",
      value: formatRatio(summary.quickRatio),
      caption: "Liquidity excl. inventory",
      Icon: BoltRoundedIcon,
      color: accent.blue,
    },
    {
      key: "workingCapital",
      label: "Working capital",
      value: formatAmount(summary.workingCapital),
      caption: "Operating cushion",
      Icon: PaymentsRoundedIcon,
      color: accent.teal,
    },
    {
      key: "debtToEquity",
      label: "Debt-to-equity",
      value: negativeEquity ? EMPTY_CELL : formatRatio(summary.debtToEquity),
      caption: negativeEquity ? "Negative equity" : "Leverage vs owners' funds",
      Icon: BalanceRoundedIcon,
      color: accent.orange,
    },
    {
      key: "debtRatio",
      label: "Debt ratio",
      value: formatPercent(summary.debtRatio),
      caption: "Share of assets funded by debt",
      Icon: DonutLargeRoundedIcon,
      color: accent.purple,
    },
    {
      key: "cash",
      label: "Cash balance",
      value: formatAmount(summary.cash),
      caption: "Funds in hand (for info)",
      Icon: AccountBalanceWalletRoundedIcon,
      color: accent.blue,
    },
  ];
};

// Display the balance-check result when available.
export function FinBSBalanceChip({ summary }) {
  if (
    !summary ||
    summary.isBalanced === null ||
    summary.isBalanced === undefined
  ) {
    return null;
  }

  const balanced = summary.isBalanced === true;
  const color = balanced ? status.success : status.error;
  const label = balanced
    ? "Balanced"
    : `Off by ${formatAmount(Math.abs(summary.difference))}`;

  return (
    <Chip
      size="small"
      label={label}
      icon={balanced ? <CheckCircleRoundedIcon /> : <ErrorRoundedIcon />}
      sx={{
        fontWeight: 600,
        color,
        bgcolor: "transparent",
        border: `1px solid ${color}`,
        "& .MuiChip-icon": { color },
      }}
    />
  );
}

// Render the six KPI cards responsively without changing their visual design.
export default function FinBSKpis({ summary, isRefreshing }) {
  if (!summary) return null;

  const cards = buildCards(summary);

  return (
    <Box
      sx={{
        display: "grid",
        gap: 1,
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(6, minmax(0, 1fr))",
        },
        opacity: isRefreshing ? 0.6 : 1,
        transition: "opacity .2s ease",
      }}
    >
      {cards.map(({ key, label, value, caption, Icon, color }) => (
        <Box
          key={key}
          sx={{
            ...cardStyle.statCard,
            minWidth: 0,
            p: 1,
            gap: 1,
            borderRadius: 2.5,
          }}
        >
          <Box
            sx={{
              ...cardStyle.statIconCircle(color),
              width: 32,
              height: 32,
              minWidth: 32,
              "& svg": {
                fontSize: 18,
                color: text.white,
              },
            }}
          >
            <Icon />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                ...masterTypo.caption,
                color: text.subtitle,
                lineHeight: 1.15,
                overflowWrap: "anywhere",
              }}
            >
              {label}
            </Typography>

            <Typography
              sx={{
                ...masterTypo.h6,
                color: text.title,
                lineHeight: 1.2,
                fontVariantNumeric: "tabular-nums",
                overflowWrap: "anywhere",
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                ...masterTypo.caption,
                color: text.subtitle,
                lineHeight: 1.15,
                overflowWrap: "anywhere",
              }}
            >
              {caption}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
