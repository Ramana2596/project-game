// ============================================================
// Component: ReportNavigation
// Module: DemoVirtual / ReportWriter
// Purpose: Reusable Rich UX report/stage navigation
// AI Tags: report-writer, report-navigation, rich-ux, navigation
// UXLab V3 — Standardized to Company Profile CoNavigation
// ============================================================

import React from "react";

import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";

import {
  colors,
  layoutStyle,
  masterTypo,
} from "../../../ux/styles";


// ------------------------------------------------------------
// Report Navigation
// ------------------------------------------------------------
export default function ReportNavigation({
  reportContext = {},
  activeIndex,
  onChange,
}) {

  // ----------------------------------------------------------
  // Navigation items supplied by ReportDrawer / ReportWriter
  //
  // {
  //   uiId: "UI 01 010",
  //   shortName: "Overview"
  // }
  // ----------------------------------------------------------
  const navigation =
    reportContext.navigation || [];


  // ----------------------------------------------------------
  // Nothing to render when navigation is not available
  // ----------------------------------------------------------
  if (
    !Array.isArray(navigation) ||
    navigation.length === 0
  ) {
    return null;
  }


  // ----------------------------------------------------------
  // Handle tab selection
  // ----------------------------------------------------------
  const handleChange = (_event, value) => {
    onChange(value);
  };


  // ----------------------------------------------------------
  // Render navigation
  //
  // UX styling reproduced directly from CoNavigation.
  // ----------------------------------------------------------
  return (
    <Box sx={layoutStyle.tabBar}>

      <Tabs
        value={activeIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          minHeight: 50,
          width: "100%",

          // --------------------------------------------------
          // Remove default indicator
          // --------------------------------------------------
          "& .MuiTabs-indicator": {
            display: "none",
          },

          // --------------------------------------------------
          // Tab base
          // --------------------------------------------------
          "& .MuiTab-root": {
            minHeight: 50,
            minWidth: 135,

            px: 2.25,
            gap: 0.75,

            borderRadius: 2.5,

            textTransform: "none",

            ...masterTypo.body1,

            fontWeight: 650,

            color: colors.subtitle,

            border: "1px solid transparent",

            backgroundColor: "transparent",

            transition:
              "background-color 0.2s ease, " +
              "color 0.2s ease, " +
              "border-color 0.2s ease",

            // ------------------------------------------------
            // Hover - neutral outlined treatment
            // ------------------------------------------------
            "&:hover": {
              color: colors.primary,
              backgroundColor: colors.primarySoft,
              borderColor: colors.border,
            },
          },

          // --------------------------------------------------
          // Selected - contained treatment
          // --------------------------------------------------
          "& .MuiTab-root.Mui-selected": {
            color: colors.white,
            backgroundColor: colors.accentBlue,
            borderColor: colors.accentBlue,
            boxShadow: `0 2px 5px ${colors.accentBlue}33`,
          },

          // --------------------------------------------------
          // Selected hover
          // --------------------------------------------------
          "& .MuiTab-root.Mui-selected:hover": {
            color: colors.white,
            backgroundColor: colors.accentBlue,
            borderColor: colors.accentBlue,
          },

          // --------------------------------------------------
          // Icons
          //
          // Retained from CoNavigation so stage-specific
          // icons can be added later without changing the
          // navigation styling.
          // --------------------------------------------------
          "& .MuiTab-iconWrapper": {
            marginBottom: 0,
          },

          "& .MuiTab-root .MuiSvgIcon-root": {
            fontSize: 21,
          },
        }}
      >

        {navigation.map((item, index) => {

          const Icon = item.icon;

          return (
            <Tab
              key={item.uiId}
              value={index}
              icon={
                Icon ? (
                  <Icon />
                ) : undefined
              }
              iconPosition="start"
              label={item.shortName}
            />
          );
        })}

      </Tabs>

    </Box>
  );
}