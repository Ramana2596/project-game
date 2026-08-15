// ============================================================
// Component: CoMetricCard
// Module: Company Profile
// Purpose: Display a company overview metric (presentation only —
//          receives pre-formatted values; performs no data shaping)
// AI Tags: company-profile, metric-card, overview, uxlab
// UXLab V1.0 — Standardized to Company Profile Reference
// ============================================================

import React from "react";

import {
  Box,
  Card,
  Typography,
} from "@mui/material";

import {
  cardStyle,
  colors,
  masterTypo,
} from "../../../ux/styles";

// ------------------------------------------------------------
// Fallback only — no type-detection/reformatting here.
// This card is a generic display primitive; all value shaping
// (dates, percentages, currency, etc.) is the caller's (section's)
// responsibility, e.g. CoOverview's own formatDate().
// ------------------------------------------------------------
function formatMetricValue(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  return value;
}

// ------------------------------------------------------------
// Company Metric Card
// ------------------------------------------------------------
export default function CoMetricCard({
  label,
  value,
  subtitle,
  icon: Icon,
  color,
}) {
  // ----------------------------------------------------------
  // Metric accent
  // ----------------------------------------------------------
  const metricColor =
    color || colors.primary;

  const displayValue =
    formatMetricValue(value);

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------
  return (
    <Card
      elevation={0}
      sx={{
        ...cardStyle.statCard,
        height: "100%",
      }}
    >
      {/* ================================================= */}
      {/* Metric Icon — solid-fill circle, UXLab statIconCircle token */}
      {/* ================================================= */}
      <Box sx={cardStyle.statIconCircle(metricColor)}>
        {Icon && <Icon />}
      </Box>

      {/* ================================================= */}
      {/* Metric Information */}
      {/* ================================================= */}
      <Box
        sx={{
          minWidth: 0,
          flex: 1,
        }}
      >
        {/* ------------------------------------------------ */}
        {/* Label */}
        {/* ------------------------------------------------ */}
        <Typography
          sx={{
            ...masterTypo.h6,
            color: colors.title,
          }}
        >
          {label}
        </Typography>

        {/* ------------------------------------------------ */}
        {/* Value */}
        {/* ------------------------------------------------ */}
        <Typography
          sx={{
            ...masterTypo.h3,
            color: metricColor,
            mt: 0.15,

            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {displayValue}
        </Typography>

        {/* ------------------------------------------------ */}
        {/* Subtitle */}
        {/* ------------------------------------------------ */}
        {subtitle && (
          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.muted,
              mt: 0.15,

              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Card>
  );
}