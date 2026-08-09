// ============================================================
// Component: CoNavigation
// Module: Company Profile
// Purpose: Navigate between Company Profile information domains
// AI Tags: company-profile, navigation, tabs, uxlab
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
  semanticTypo,
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
  // Render navigation tabs
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
        boxShadow:
          "0 2px 8px rgba(55, 30, 80, 0.06)",
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
          // Active tab indicator
          // --------------------------------------------------
          "& .MuiTabs-indicator": {
            height: "100%",
            borderRadius: 2.5,
            backgroundColor: colors.primary,
            zIndex: 0,
          },

          // --------------------------------------------------
          // Tab base style
          // --------------------------------------------------
          "& .MuiTab-root": {
            minHeight: 50,
            minWidth: 135,
            px: 2.25,
            gap: 0.75,
            zIndex: 1,
            borderRadius: 2.5,
            textTransform: "none",
            ...semanticTypo.body,
            fontWeight: 650,
            color: "#64748B",
            transition:
              "color 0.2s ease, background-color 0.2s ease",

            "&:hover": {
              color: colors.primary,
              backgroundColor: "#F7F2FA",
            },
          },

          // --------------------------------------------------
          // Active tab
          // --------------------------------------------------
          "& .MuiTab-root.Mui-selected": {
            color: "#FFFFFF",
          },

          // --------------------------------------------------
          // Tab icon
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