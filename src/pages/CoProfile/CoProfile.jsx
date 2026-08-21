// ============================================================
// Component: CoProfile
// Module: Company Profile
// Purpose: Enterprise orchestration page for Company Profile
// AI Tags: company-profile, orchestration, workspace, navigation
// UXLab V3 — ReportWriter Rich UX
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
  hideHeader = false,
  hideNavigation = false,
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
  // Render Company Profile workspace
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

          {/* ================================================== */}
          {/* Existing Company Profile Header                   */}
          {/* Hidden when rendered through ReportWriter          */}
          {/* ================================================== */}

          {!hideHeader && (
            <CoHeader
              productionMonth={productionMonth}
            />
          )}

          {/* ================================================== */}
          {/* Existing Company Profile Navigation               */}
          {/* Hidden when rendered through ReportWriter          */}
          {/* ================================================== */}

          {!hideNavigation && (
            <CoNavigation
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          )}

          {/* ================================================== */}
          {/* Company Overview Metrics                           */}
          {/* ================================================== */}

          <CoOverview
            products={products}
          />

          {/* ================================================== */}
          {/* Active Company Domain                              */}
          {/* ================================================== */}

          <CoWorkspace
            activeTab={activeTab}
            products={products}
          />

        </Stack>
      </Box>
    </Box>
  );
}