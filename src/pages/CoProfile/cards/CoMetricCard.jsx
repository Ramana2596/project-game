// ============================================================
// Component: CoMetricCard
// Module: Company Profile
// Purpose: Display a company overview metric
// AI Tags: company-profile, metric-card, overview, uxlab
//
// UXLab V1.0:
// - Typography     -> masterTypo
// - Colors         -> colors
// - Card structure -> cardStyle
// - Card owns metric-specific visual presentation
// ============================================================

import React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  cardStyle,
  colors,
  masterTypo,
} from "../../../ux/styles";

// ------------------------------------------------------------
// Format metric value
// ------------------------------------------------------------
function formatMetricValue(value) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  // ----------------------------------------------------------
  // Format date values as "MMM yyyy"
  // ----------------------------------------------------------
  if (
    value instanceof Date ||
    (
      typeof value === "string" &&
      !Number.isNaN(Date.parse(value)) &&
      /\d{4}[-/]\d{1,2}[-/]\d{1,2}/.test(value)
    )
  ) {
    const date = value instanceof Date
      ? value
      : new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    }
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
  const metricColor = color || colors.primary;

  const displayValue = formatMetricValue(value);

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------
  return (
    <Card
      elevation={0}
      sx={{
        ...cardStyle.card,

        height: "100%",

        backgroundColor:
          colors.card || "#FFFFFF",

        border: `1px solid ${
          colors.border || "#E8E5EF"
        }`,

        borderRadius: 2.5,

        boxShadow:
          "0 2px 7px rgba(40, 30, 70, 0.08)",

        transition:
          "transform 0.2s ease, box-shadow 0.2s ease",

        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 6px 16px rgba(40, 30, 70, 0.12)",
        },
      }}
    >
      <CardContent
        sx={{
          p: 2,

          "&:last-child": {
            pb: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minHeight: 74,
          }}
        >
          {/* ================================================= */}
          {/* Metric Icon */}
          {/* ================================================= */}
          <Box
            sx={{
              width: 46,
              height: 46,
              minWidth: 46,

              borderRadius: "50%",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              backgroundColor:
                `${metricColor}16`,

              color: metricColor,
            }}
          >
            {Icon && (
              <Icon
                sx={{
                  fontSize: 25,
                }}
              />
            )}
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
                ...masterTypo.caption,

                color:
                  colors.subtitle ||
                  "#475569",

                fontSize: "0.82rem",
                lineHeight: 1.2,
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

                mt: 0.25,

                color:
                  colors.title ||
                  "#172B4D",

                fontSize: {
                  xs: "1.55rem",
                  md: "1.7rem",
                },

                // Reduced from 800
                fontWeight: 700,

                lineHeight: 1.15,

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

                  mt: 0.3,

                  color:
                    colors.subtitle ||
                    "#64748B",

                  fontSize: "0.78rem",
                  lineHeight: 1.2,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}