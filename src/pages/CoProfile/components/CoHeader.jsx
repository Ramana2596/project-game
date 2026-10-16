
/**
 * Component: CoHeader
 * Module: Company Profile
 * Purpose: Display Company Profile heading and Production Month
 * AI Tags: company-profile, header, overview, uxlab
 * UXLab V1.0 — Aligned with ReportHeader Typography
 */

import React from "react";
import { Box, Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";

import {
  colors,
  layoutStyle,
  masterTypo,
} from "../../../ux/styles";

// Company Profile Header
export default function CoHeader({
  productionMonth = null,
}) {
  // Format the production month safely for display.
  const parsedMonth = productionMonth
    ? new Date(productionMonth)
    : null;

  const formattedPeriod =
    parsedMonth && !Number.isNaN(parsedMonth.getTime())
      ? parsedMonth.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "—";

  return (
    <Box sx={layoutStyle.pageHeader}>
      {/* Display the page title at the same scale as ReportHeader. */}
      <Typography
        sx={{
          ...masterTypo.h4,
          color: colors.title,
        }}
      >
        Company Profile
      </Typography>

      {/* Keep supporting text visually subordinate to the heading. */}
      <Typography
        sx={{
          ...masterTypo.body2,
          color: colors.body,
        }}
      >
        A quick overview of our products, performance and key highlights.
      </Typography>

      {/* Display the production period using the shared header token. */}
      <Box sx={layoutStyle.pageHeaderDatePill}>
        <Typography
          sx={{
            ...masterTypo.body2,
            color: colors.primary,
          }}
        >
          {formattedPeriod}
        </Typography>

        <CalendarMonthOutlinedIcon
          sx={{
            color: colors.primary,
          }}
        />
      </Box>
    </Box>
  );
}
