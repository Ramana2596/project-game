
// ============================================================
// Component: MfgProcess
// Module: MfgProcess
// Purpose: Render manufacturing process cards with FG stock
// AI Tags: manufacturing, process-routing, fg-stock, uxlab
// UXLab V1.1 — Responsive three-column card layout
// ============================================================

import React from "react";
import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useUser } from "../../core/access/userContext.jsx";
import { colors, masterTypo } from "../../ux/styles";
import MfgProcessCard from "./components/MfgProcessCard";
import { useMfgProcess } from "./hooks/useMfgProcess";

// Render the manufacturing process page for the current period.
export default function MfgProcess({
  productionMonth,
  hideHeader = false,
}) {
  // Obtain the current game and team context.
  const { userInfo } = useUser();

  // Load routing, BOM, raw-material stock and finished-goods stock.
  const {
    productProcesses,
    loading,
    error,
  } = useMfgProcess(userInfo, productionMonth);

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
        <CircularProgress />
      </Box>
    );
  }

  // Display retrieval errors if any.
  if (error) {
    return (
      <Typography
        sx={{
          ...masterTypo.body1,
          color: colors.error || colors.danger || colors.primary,
        }}
      >
        {error}
      </Typography>
    );
  }

  // Render the page heading and responsive product-card grid.
  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      {!hideHeader && (
        <Box sx={{ mb: 2 }}>
          <Typography sx={masterTypo.h3}>
            Manufacturing Process
          </Typography>
          <Typography
            sx={{
              ...masterTypo.body1,
              color: colors.subtitle,
            }}
          >
            Product routing, Raw Material availability and finished-goods stock
          </Typography>
        </Box>
      )}

      {/* Display three cards per row on desktop, two on tablets and one on mobile. */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "minmax(0, 1fr)",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(3, minmax(0, 1fr))",
          },
          gap: 2,
          alignItems: "stretch",
          width: "100%",
        }}
      >
        {productProcesses.map((product, index) => (
          <Box
            key={product.productNo}
            sx={{ minWidth: 0, width: "100%" }}
          >
            <MfgProcessCard
              product={{
                Part_No: product.productNo,
                Part_Description: product.product,
                PLM_Stage: product.plmStage,
                materials: product.materials,
                fgStock: product.fgStock,
              }}
              processes={product.processes}
              index={index}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}