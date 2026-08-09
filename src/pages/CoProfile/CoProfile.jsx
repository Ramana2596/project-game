// ============================================================
// Component: CoProfile
// Module: Company Profile
// Purpose: Enterprise orchestration page for Company Profile
// AI Tags: company-profile, orchestration, workspace, navigation
// ============================================================

import React from "react";
import {
  Box,
  CircularProgress,
  Stack,
} from "@mui/material";

import { useUser } from "../../core/access/userContext.jsx";
import { colors } from "../../ux/styles";

import { useCoProfile } from "./hooks/useCoProfile";

import CoHeader from "./components/CoHeader";
import CoOverview from "./components/CoOverview";
import CoNavigation from "./components/CoNavigation";
import CoWorkspace from "./components/CoWorkspace";

// ------------------------------------------------------------
// Company Profile Page
// ------------------------------------------------------------
export default function CoProfile() {

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
  // Render Company Profile workspace
  // ----------------------------------------------------------
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: colors.page,
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
      }}
    >
      <Stack
        spacing={{
          xs: 2,
          md: 2.5,
        }}
      >

        {/* Company Profile Header */}
        <CoHeader />

        {/* Company Overview Metrics */}
        <CoOverview
          products={products}
        />

        {/* Company Profile Domain Navigation */}
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
  );
}