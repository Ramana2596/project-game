// ============================================================
// Component: MfgProcess
// Module: Company Profile
// Purpose: Manufacturing Process workspace
// AI Tags: manufacturing-process, company-profile, uxlab
// UXLab V1.0 — Standardized
// ============================================================

import React from "react";

import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useUser } from "../../core/access/userContext.jsx";
import { colors, masterTypo } from "../../ux/styles";

import { useMfgProcess } from "./hooks/useMfgProcess";
import MfgProcessCard from "./components/MfgProcessCard";
import { MFG_PROCESS_LABELS } from "./constants/pageConstants";

// ------------------------------------------------------------
// Manufacturing Process Page
// ------------------------------------------------------------
export default function MfgProcess({ productionMonth }) {
  const { userInfo } = useUser();

  const {
    productProcesses,
    loading,
    error,
  } = useMfgProcess(userInfo, productionMonth);

  // ----------------------------------------------------------
  // Loading
  // ----------------------------------------------------------
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 240,
        }}
      >
        <CircularProgress
          size={30}
          sx={{
            color: colors.primary,
          }}
        />
      </Box>
    );
  }

  // ----------------------------------------------------------
  // Error
  // ----------------------------------------------------------
  if (error) {
    return (
      <Box sx={{ py: 3 }}>
        <Typography
          sx={{
            ...masterTypo.body1,
            color: colors.error,
          }}
        >
          Unable to load manufacturing process information.
        </Typography>
      </Box>
    );
  }

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------
  return (
    <Box sx={{ width: "100%" }}>

      {/* ================================================== */}
      {/* Page Heading — single source of truth via MFG_PROCESS_LABELS */}
      {/* ================================================== */}
      <Typography
        sx={{
          ...masterTypo.h3,
          color: colors.title,
          mb: 1.5,
        }}
      >
        {MFG_PROCESS_LABELS.title}
      </Typography>

      {/* Page Subtitle */}
      <Typography
        sx={{
          ...masterTypo.body1,
          color: colors.subtitle,
          mb: 2,
        }}
      >
        {MFG_PROCESS_LABELS.subtitle}
      </Typography>

      {/* ================================================== */}
      {/* Product Process Cards */}
      {/* ================================================== */}
      <Box
        sx={{
          display: "grid",

          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },

          gap: 2,
          alignItems: "stretch",
        }}
      >
        {productProcesses.map((product, index) => (
          <MfgProcessCard
            key={product.productNo}
            product={{
              Part_No: product.productNo,
              Part_Description: product.product,
              PLM_Stage: product.plmStage,
              materials: product.materials,
            }}
            processes={product.processes}
            index={index}
          />
        ))}
      </Box>

    </Box>
  );
}