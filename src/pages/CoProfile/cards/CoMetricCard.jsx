// ============================================================
// Component: CoMetricCard
// Module: Company Profile
// Purpose: Display a company overview metric
// AI Tags: company-profile, metric-card, overview, uxlab
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
  semanticTypo,
} from "../../../ux/styles";

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
  // Resolve metric color
  // ----------------------------------------------------------
  const metricColor = color || "#7B1FA2";

  // ----------------------------------------------------------
  // Render metric card
  // ----------------------------------------------------------
  return (
    <Card
      elevation={0}
      sx={{
        ...cardStyle.card,
        height: "100%",
        borderRadius: 2.5,
        backgroundColor: "#FFFFFF",
        border: "1px solid #E8E5EF",
        boxShadow:
          "0 2px 6px rgba(40, 30, 70, 0.08)",
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

          {/* Metric Icon */}
          <Box
            sx={{
              width: 46,
              height: 46,
              minWidth: 46,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: `${metricColor}16`,
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

          {/* Metric Information */}
          <Box
            sx={{
              minWidth: 0,
              flex: 1,
            }}
          >
            {/* Metric Label */}
            <Typography
              sx={{
                ...semanticTypo.caption,
                color: "#475569",
                fontSize: "0.82rem",
                lineHeight: 1.2,
              }}
            >
              {label}
            </Typography>

            {/* Metric Value */}
            <Typography
              sx={{
                ...semanticTypo.pageH3,
                mt: 0.25,
                color: "#172B4D",
                fontSize: {
                  xs: "1.55rem",
                  md: "1.7rem",
                },
                fontWeight: 800,
                lineHeight: 1.15,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {value ?? "-"}
            </Typography>

            {/* Metric Subtitle */}
            {subtitle && (
              <Typography
                sx={{
                  ...semanticTypo.caption,
                  mt: 0.3,
                  color: "#64748B",
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