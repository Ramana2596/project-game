// ============================================================
// Component: CoHeader
// Module: Company Profile
// Purpose: Display Company Profile page heading and Production Month
// AI Tags: company-profile, header, overview, uxlab
// UXLab V1.0 — Standardized to Company Profile Reference
// ============================================================

import React from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import CalendarMonthOutlinedIcon from
  "@mui/icons-material/CalendarMonthOutlined";

import {
  colors,
  layoutStyle,
  masterTypo,
} from "../../../ux/styles";

// ------------------------------------------------------------
// Company Profile Header
// ------------------------------------------------------------
export default function CoHeader({
  productionMonth = null,
}) {
  const formattedPeriod = productionMonth
    ? new Date(productionMonth).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <Box sx={layoutStyle.pageHeader}>

      {/* ================================================== */}
      {/* Page Title */}
      {/* ================================================== */}
      <Typography
        sx={{
          ...masterTypo.h2,
          color: colors.title,
        }}
      >
        Company Profile
      </Typography>

      {/* ================================================== */}
      {/* Page Description */}
      {/* ================================================== */}
      <Typography
        sx={{
          ...masterTypo.body1,
          color: colors.body,
        }}
      >
        A quick overview of our products, performance and key
        highlights.
      </Typography>

      {/* ================================================== */}
      {/* Current Production Month */}
      {/* ================================================== */}
      <Box
        sx={{
          ...layoutStyle.pageHeaderDatePill,

          position: {
            xs: "static",
            md: "absolute",
          },

          mt: {
            xs: 1.5,
            md: 0,
          },

          background: "transparent",
          border: "none",
          px: 0,
          py: 0,
        }}
      >
        <Typography
          sx={{
            ...masterTypo.body1,
            fontWeight: 600,
            color: colors.primary,
          }}
        >
          {formattedPeriod}
        </Typography>

        <Box
          sx={{
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 2,
            background: colors.panelAlt,
          }}
        >
          <CalendarMonthOutlinedIcon
            sx={{
              fontSize: 18,
              color: colors.primary,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}