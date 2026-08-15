// ============================================================
// Component: CoProfile
// Module: Company Profile
// Purpose: Enterprise orchestration page for Company Profile
// AI Tags: company-profile, orchestration, workspace, navigation
// UXLab V1.0 — Standardized to Company Profile Reference
// ============================================================

import React from "react";
import {
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";

import { useUser } from "../../core/access/userContext.jsx";
import { colors, layoutStyle } from "../../ux/styles";

import { useCoProfile } from "./hooks/useCoProfile";

import CoHeader from "./components/CoHeader";
import CoOverview from "./components/CoOverview";
import CoNavigation from "./components/CoNavigation";
import CoWorkspace from "./components/CoWorkspace";

// ------------------------------------------------------------
// Company Profile Page
// ------------------------------------------------------------
export default function CoProfile({
  productionMonth = null,
}) {

  // ----------------------------------------------------------
  // Load authenticated user information
  // ----------------------------------------------------------
  const { userInfo } = useUser();

  // ----------------------------------------------------------
  // Load Company Profile data and UI state
  // ----------------------------------------------------------
  const {
    products,
    loading,
    activeTab,
    setActiveTab,
  } = useCoProfile(userInfo);

  // ----------------------------------------------------------
  // Display loading state
  // ----------------------------------------------------------
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          sx={{
            color: colors.primary,
          }}
        />
      </Box>
    );
  }

  // ----------------------------------------------------------
  // Render Company Profile workspace — layoutStyle.root token
  // (gradient page background + standard responsive padding)
  // ----------------------------------------------------------
  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        <Stack
          spacing={{
            xs: 2,
            md: 2.5,
          }}
        >

          {/* Company Profile Header */}
          <CoHeader
            productionMonth={productionMonth}
          />

        {/* Company Overview Metrics */}
          <CoOverview
            products={products}
          />
          
          {/* Company Profile Domain Navigation — precedes stat cards, per reference */}
          <CoNavigation
            activeTab={activeTab}
            onChange={setActiveTab}
          />

  

          {/* Active Company Domain */}
          <CoWorkspace
            activeTab={activeTab}
            products={products}
          />

        </Stack>
      </Box>
    </Box>
  );
}