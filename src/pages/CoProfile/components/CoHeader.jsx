// ============================================================
// Component: CoHeader
// Module: Company Profile
// Purpose: Display Company Profile page heading and period
// AI Tags: company-profile, header, overview
// ============================================================

import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import {
  colors,
  semanticTypo,
} from "../../../ux/styles";

// ------------------------------------------------------------
// Company Profile Header
// ------------------------------------------------------------
export default function CoHeader() {
  // ----------------------------------------------------------
  // Render page header
  // ----------------------------------------------------------
  return (
    <Box
      sx={{
        textAlign: "center",
        position: "relative",
        pb: 0.5,
      }}
    >
      {/* Page Title */}
      <Typography
        sx={{
          ...semanticTypo.heroH1,
          color: colors.primary,
          fontWeight: 700,
          lineHeight: 1.1,
        }}
      >
        Company Profile
      </Typography>

      {/* Page Description */}
      <Typography
        sx={{
          ...semanticTypo.body,
          mt: 0.75,
          color: colors.textSecondary,
        }}
      >
        A quick overview of our products, performance and key
        highlights.
      </Typography>

      {/* Current Period */}
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
        <CalendarMonthOutlinedIcon sx={{ fontSize: 20 }} />

        <Typography
          sx={{
            ...semanticTypo.caption,
            fontWeight: 700,
            color: colors.primary,
          }}
        >
          Current Period
        </Typography>
      </Box>
    </Box>
  );
}