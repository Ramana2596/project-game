/**
 * Component: MfgProcess
 * Module: Company Profile
 * Purpose: Manufacturing Process workspace for standalone and ReportDrawer deployment.
 * Author/Version: UXLab V1.1
 * AI Tags: manufacturing-process, company-profile, uxlab
 */

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

// Render the Manufacturing Process workspace in both deployment modes.
export default function MfgProcess({
  productionMonth,
  hideHeader = false,
}) {
  // Load the authenticated user and current learning session.
  const { userInfo } = useUser();

  // Load manufacturing process data for the active session and period.
  const {
    productProcesses,
    loading,
    error,
  } = useMfgProcess(userInfo, productionMonth);

  // Display loading feedback while the process data is retrieved.
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
          sx={{ color: colors.primary }}
        />
      </Box>
    );
  }

  // Display a concise error message if the process data cannot be loaded.
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

  return (
    <Box sx={{ width: "100%" }}>
      {/* Keep the module heading in standalone mode only. */}
      {!hideHeader && (
        <>
          <Typography
            component="h1"
            sx={{
              ...masterTypo.h3,
              color: colors.title,
              mb: 1.5,
            }}
          >
            {MFG_PROCESS_LABELS.title}
          </Typography>

          <Typography
            sx={{
              ...masterTypo.body1,
              color: colors.subtitle,
              mb: 2,
            }}
          >
            {MFG_PROCESS_LABELS.subtitle}
          </Typography>
        </>
      )}

      {/* Preserve the responsive manufacturing process card grid. */}
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
