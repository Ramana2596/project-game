// ============================================================
// Component: ReportHeader
// Module: DemoVirtual / ReportWriter
// Purpose: Reusable Rich UX report/stage header
// AI Tags: report-writer, report-header, rich-ux, stage-header
// UXLab V3 — Standardized Stage Report Header
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
// Report Header
// ------------------------------------------------------------
export default function ReportHeader({
  reportContext = {},
}) {

  const {
    stageTitle,
    reportInfo,
    productionMonth,
  } = reportContext;


  // ----------------------------------------------------------
  // Format Simulation Period
  // ----------------------------------------------------------
  const formattedPeriod = productionMonth
    ? new Date(productionMonth).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";


  return (
    <Box sx={layoutStyle.pageHeader}>

      {/* ================================================== */}
      {/* Stage Name                                         */}
      {/* ================================================== */}

      <Typography
        sx={{
          ...masterTypo.h2,
          color: colors.title,
        }}
      >
        {stageTitle}
      </Typography>


      {/* ================================================== */}
      {/* Report Information                                 */}
      {/* ================================================== */}

      {reportInfo && (
        <Typography
          sx={{
            ...masterTypo.body1,
            color: colors.body,
          }}
        >
          {reportInfo}
        </Typography>
      )}


      {/* ================================================== */}
      {/* Current Simulation Period                          */}
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

        {/* ------------------------------------------------ */}
        {/* Simulation Period                                */}
        {/* ------------------------------------------------ */}

        <Typography
          sx={{
            ...masterTypo.body1,
            fontWeight: 600,
            color: colors.primary,
          }}
        >
          {formattedPeriod}
        </Typography>


        {/* ------------------------------------------------ */}
        {/* Calendar Icon                                    */}
        {/* ------------------------------------------------ */}

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