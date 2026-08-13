// ============================================================
// Component: CoNavigation
// Module: Company Profile
// Purpose: Navigate between Company Profile information domains
// AI Tags: company-profile, navigation, tabs, uxlab
//
// UX:
// - Selected tab   -> contained / filled
// - Unselected tab -> outlined / neutral
// ============================================================

import React from "react";

import {
  Box,
  Tab,
  Tabs,
} from "@mui/material";

import { PROFILE_TABS } from "../constants/constants";

import {
  colors,
  masterTypo,
} from "../../../ux/styles";

// ------------------------------------------------------------
// Company Profile Navigation
// ------------------------------------------------------------
export default function CoNavigation({
  activeTab,
  onChange,
}) {

  // ----------------------------------------------------------
  // Handle tab selection
  // ----------------------------------------------------------
  const handleChange = (_event, value) => {
    onChange(value);
  };

  // ----------------------------------------------------------
  // Render navigation
  // ----------------------------------------------------------
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#FFFFFF",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "#E6E0ED",
        p: 0.75,
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(55, 30, 80, 0.06)",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          minHeight: 50,

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

            color:
              colors.textSecondary || "#64748B",

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

              backgroundColor:
                "#F7F2FA",

              borderColor:
                "#E4D5ED",
            },
          },

          // --------------------------------------------------
          // Selected - contained treatment
          // --------------------------------------------------
          "& .MuiTab-root.Mui-selected": {
            color: "#FFFFFF",

            backgroundColor:
              colors.primary,

            borderColor:
              colors.primary,

            boxShadow:
              "0 2px 5px rgba(123, 31, 162, 0.20)",
          },

          // --------------------------------------------------
          // Selected hover
          // --------------------------------------------------
          "& .MuiTab-root.Mui-selected:hover": {
            color: "#FFFFFF",

            backgroundColor:
              colors.primary,

            borderColor:
              colors.primary,
          },

          // --------------------------------------------------
          // Icons
          // --------------------------------------------------
          "& .MuiTab-iconWrapper": {
            marginBottom: 0,
          },

          "& .MuiTab-root .MuiSvgIcon-root": {
            fontSize: 21,
          },
        }}
      >
        {PROFILE_TABS.map((tab) => {
          const Icon = tab.icon;

          return (
            <Tab
              key={tab.key}
              value={tab.key}
              icon={
                Icon ? (
                  <Icon />
                ) : undefined
              }
              iconPosition="start"
              label={tab.label}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}