
/**
 * Component Name: FinBSKpis
 * Module: Finance / FinBS
 * Purpose: Row of compact KPI cards: total assets, equity and liabilities, cash, current ratio and balance check.
 * Author/Version: UXLab / v1.0
 * AI Tags: kpi, stat cards, balance check, current ratio, summary
 */

import React from "react";
import { Box, Typography } from "@mui/material";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import SpeedRoundedIcon from "@mui/icons-material/SpeedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import { cardStyle, masterTypo } from "../../../ux/styles";
import { accent, status, text } from "../../../ux/styles/colorPalette";
import { formatAmount, formatPeriodLabel, formatRatio } from "../utils/formatters";

// Card definitions: label, value, caption and icon per figure
const buildCards = (summary) => {
  const period = formatPeriodLabel(summary.period);
  const balanceColor = summary.isBalanced === false ? status.error : status.success;
  const balanceValue =
    summary.isBalanced === null ? "–" : summary.isBalanced ? "Balanced" : `Off by ${formatAmount(Math.abs(summary.difference))}`;

  return [
    { key: "assets", label: "Total assets", value: formatAmount(summary.totalAssets), caption: `As at ${period}`, Icon: AccountBalanceRoundedIcon, color: accent.purple },
    { key: "liability", label: "Equity and liabilities", value: formatAmount(summary.totalLiability), caption: `As at ${period}`, Icon: ReceiptLongRoundedIcon, color: accent.blue },
    { key: "cash", label: "Cash balance", value: formatAmount(summary.cash), caption: "Funds in hand", Icon: PaymentsRoundedIcon, color: accent.teal },
    { key: "ratio", label: "Current ratio", value: formatRatio(summary.currentRatio), caption: "Current asset ÷ liability", Icon: SpeedRoundedIcon, color: accent.orange },
    {
      key: "check",
      label: "Balance check",
      value: balanceValue,
      caption: "Assets vs equity and liabilities",
      Icon: summary.isBalanced === false ? ErrorRoundedIcon : CheckCircleRoundedIcon,
      color: balanceColor,
    },
  ];
};

export default function FinBSKpis({ summary, isRefreshing }) {
  // Nothing to show until a statement is loaded
  if (!summary) return null;

  // Derived values
  const cards = buildCards(summary);

  // Render
  return (
    <Box
      sx={{
        display: "grid",
        gap: 1,
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        opacity: isRefreshing ? 0.6 : 1,
        transition: "opacity .2s ease",
      }}
    >
      {cards.map(({ key, label, value, caption, Icon, color }) => (
        <Box
          key={key}
          sx={{
            ...cardStyle.statCard,
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
              }}
            >
              {value}
            </Typography>

            <Typography
              sx={{
                ...masterTypo.caption,
                color: text.subtitle,
                lineHeight: 1.15,
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