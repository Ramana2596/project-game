// ============================================================
// Component: CoHeader
// Module: Company Profile
// Purpose: Display Company Profile page heading and simulation period
// AI Tags: company-profile, header, overview, uxlab
//
// UXLab V1.0:
// - Typography -> masterTypo
// - Colors     -> colors
// - Layout     -> component-level positioning only
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
  masterTypo,
} from "../../../ux/styles";

// ------------------------------------------------------------
// Company Profile Header
// ------------------------------------------------------------
export default function CoHeader({
  simulationPeriod = null,
}) {
  return (
    <Box
      sx={{
        position: "relative",
        textAlign: "center",
        pb: 0.75,
      }}
    >
      {/* ================================================== */}
      {/* Page Title */}
      {/* ================================================== */}
      <Typography
        sx={{
          ...masterTypo.h2,
          color: colors.primary,
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
          mt: 0.75,
          color: colors.textSecondary,
        }}
      >
        A quick overview of our products, performance and key
        highlights.
      </Typography>

      {/* ================================================== */}
      {/* Current Simulation Period */}
      {/* ================================================== */}
      <Box
        sx={{
          position: {
            xs: "static",
            md: "absolute",
          },

          right: 0,

          top: {
            xs: "auto",
            md: 4,
          },

          mt: {
            xs: 1.5,
            md: 0,
          },

          display: "inline-flex",
          alignItems: "center",
          gap: 0.75,

          color: colors.primary,
        }}
      >
        <CalendarMonthOutlinedIcon
          sx={{
            fontSize: 20,
            color: colors.primary,
          }}
        />

        <Box>
          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.primary,
              fontWeight: 700,
            }}
          >
            Current Period
          </Typography>

          <Typography
            sx={{
              ...masterTypo.caption,
              mt: 0.25,
              color: colors.textSecondary,
            }}
          >
            {simulationPeriod || "—"}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}