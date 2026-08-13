// ============================================================
// Component: MfgProcess
// Module: Company Profile
// Purpose: Manufacturing Process workspace
// AI Tags: manufacturing-process, company-profile, uxlab
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

// ------------------------------------------------------------
// Manufacturing Process Page
// ------------------------------------------------------------
export default function MfgProcess() {
  const { userInfo } = useUser();

  const {
    productProcesses,
    loading,
    error,
  } = useMfgProcess(userInfo);

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
            color: "error.main",
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
      {/* Page Heading */}
      {/* ================================================== */}
      <Typography
        sx={{
          ...masterTypo.h3,
          mb: 1.5,
        }}
      >
        Manufacturing Process
      </Typography>

      {/* Page Subtitle */}
      <Typography
        sx={{
          ...masterTypo.body1,
          color: colors.subtitle || "text.secondary",
          mb: 2,
        }}
      >
        Product-wise manufacturing process standards
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
            key={product.productNo || index}
            product={{
              Part_No: product.productNo,
              Part_Description: product.product,
            }}
            processes={product.processes}
            index={index}
          />
        ))}
      </Box>

    </Box>
  );
}