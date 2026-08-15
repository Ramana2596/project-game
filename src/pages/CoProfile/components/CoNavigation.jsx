// ============================================================
// Component: CoNavigation
// Module: Company Profile
// Purpose: Navigate between Company Profile information domains
// AI Tags: company-profile, navigation, tabs, uxlab
// UXLab V1.0 — Standardized to Company Profile Reference
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
  layoutStyle,
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
  // Render navigation — outer pill container is layoutStyle.tabBar,
  // individual tab shape/size preserved as-is (matches reference)
  // ----------------------------------------------------------
  return (
    <Box sx={layoutStyle.tabBar}>
      <Tabs
        value={activeTab}
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
          // Selected - contained treatment, accentBlue per reference
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