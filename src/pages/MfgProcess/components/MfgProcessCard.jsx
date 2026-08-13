// ============================================================
// Component: MfgProcessCard
// Module: MfgProcess
// Purpose: Display one product's manufacturing process
// AI Tags: manufacturing-process, product-card, process-flow, uxlab
//
// UXLab V1.0:
// - Product card typography follows Company Profile ProductCard
// - Product accent color is used for product identity
// - Process identity uses process-specific icon + color
// - Layout remains independent per Product-Process card
// - All surfaces/shadows/borders sourced from colors + cardStyle tokens
// ============================================================

import React from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import {
  MFG_PROCESS_LABELS,
  PROCESS_VISUALS,
} from "../constants/pageConstants";

import {
  colors,
  cardStyle,
  masterTypo,
} from "../../../ux/styles";

// ------------------------------------------------------------
// Product Accent
// Temporary visual mapping
// TODO: Later use the same product visual metadata as ProductCard
// ------------------------------------------------------------
const PRODUCT_ACCENTS = [
  colors.success, // Product A
  colors.info,    // Product B
  colors.warning, // Product C
];

// ------------------------------------------------------------
// Manufacturing Process Product Card
// ------------------------------------------------------------
export default function MfgProcessCard({
  product,
  processes = [],
  index = 0,
}) {
  // ----------------------------------------------------------
  // Product
  // ----------------------------------------------------------
  const productName = product?.Part_Description || "Product";

  const productColor = PRODUCT_ACCENTS[index] || colors.primary;

  // ----------------------------------------------------------
  // Process visual
  // ----------------------------------------------------------
  const getProcessVisual = (processName) =>
    PROCESS_VISUALS[processName] || PROCESS_VISUALS.default;

  // ----------------------------------------------------------
  // Format time
  // ----------------------------------------------------------
  const formatTime = (value) => {
    const time = Number(value);
    if (!Number.isFinite(time)) return "-";
    return `${time % 1 === 0 ? time : time.toFixed(2)} min`;
  };

  // ----------------------------------------------------------
  // Render
  // ----------------------------------------------------------
  return (
    <Box
      sx={{
        ...cardStyle.primary,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >

      {/* ================================================== */}
      {/* Product Header */}
      {/* ================================================== */}
      <Box
        sx={{
          px: 2,
          pt: 1.75,
          pb: 1.5,

          background: `linear-gradient(135deg, ${colors.primary}0B, ${colors.primary}03)`,

          borderBottom: "1px solid",
          borderColor: colors.divider,
        }}
      >

        {/* Product Name */}
        <Typography
          sx={{
            ...masterTypo.h4,
            color: productColor,
            mb: 0.65,
          }}
        >
          {productName}
        </Typography>

        {/* Product Master Information */}
        <Typography
          sx={{
            ...masterTypo.caption,
            color: colors.subtitle,
          }}
        >
          <Box component="span" sx={{ fontWeight: 700, color: colors.body }}>
            Material:
          </Box>{" "}
          xxxx

          <Box component="span" sx={{ mx: 1, color: colors.border }}>
            |
          </Box>

          <Box component="span" sx={{ fontWeight: 700, color: colors.body }}>
            Opening Stock:
          </Box>{" "}
          yyyy

          <Box component="span" sx={{ mx: 1, color: colors.border }}>
            |
          </Box>

          <Box component="span" sx={{ fontWeight: 700, color: colors.body }}>
            Per Set:
          </Box>{" "}
          nn.nn
        </Typography>
      </Box>

      {/* ================================================== */}
      {/* Process Column Header */}
      {/* ================================================== */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 64px 76px 52px",
          alignItems: "center",

          px: 2,
          py: 0.75,

          borderBottom: "1px solid",
          borderColor: colors.divider,
        }}
      >
        <Typography sx={{ ...masterTypo.caption, fontWeight: 700, color: colors.subtitle }}>
          {MFG_PROCESS_LABELS.operation}
        </Typography>

        <Typography align="right" sx={{ ...masterTypo.caption, fontWeight: 700, color: colors.subtitle }}>
          {MFG_PROCESS_LABELS.setupTime}
        </Typography>

        <Typography align="right" sx={{ ...masterTypo.caption, fontWeight: 700, color: colors.subtitle }}>
          {MFG_PROCESS_LABELS.standardTime}
        </Typography>

        <Typography align="right" sx={{ ...masterTypo.caption, fontWeight: 700, color: colors.subtitle }}>
          {MFG_PROCESS_LABELS.batchQuantity}
        </Typography>
      </Box>

      {/* ================================================== */}
      {/* Process Rows */}
      {/* ================================================== */}
      <Box sx={{ px: 1.25, py: 0.35, flexGrow: 1 }}>
        {processes.map((process, rowIndex) => {
          const processName = process?.Work_Centre_Description || "Process";
          const visual = getProcessVisual(processName);
          const ProcessIcon = visual.icon;

          return (
            <Box
              key={`${process?.Part_No}-${process?.Mfg_Seq_No}-${rowIndex}`}
              sx={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) 64px 76px 52px",
                alignItems: "center",

                minHeight: 58,
                px: 0.5,

                borderBottom:
                  rowIndex < processes.length - 1
                    ? "1px solid"
                    : "none",
                borderColor: colors.divider,

                borderRadius: 1.5,
                transition: "background-color .2s ease",

                "&:hover": {
                  backgroundColor: colors.hover,
                },
              }}
            >

              {/* ---------------------------------------- */}
              {/* Process */}
              {/* ---------------------------------------- */}
              <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>

                {/* Sequence */}
                <Typography
                  sx={{
                    width: 28,
                    flexShrink: 0,
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: visual.color,
                  }}
                >
                  {String(process?.Mfg_Seq_No ?? rowIndex + 1).padStart(2, "0")}
                </Typography>

                {/* Process Icon */}
                <Box
                  sx={{
                    ...cardStyle.iconBox,
                    ...cardStyle.iconBoxCircle,
                    width: 32,
                    height: 32,
                    minWidth: 32,
                    flexShrink: 0,
                    mr: 1,
                    background: visual.softColor,
                    color: visual.color,
                    "& svg": {
                      fontSize: 18,
                      color: visual.color,
                    },
                  }}
                >
                  <ProcessIcon sx={{ fontSize: 18 }} />
                </Box>

                {/* Process Name */}
                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    noWrap
                    sx={{
                      ...masterTypo.body1,
                      fontSize: "0.88rem",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      color: colors.title,
                    }}
                  >
                    {processName}
                  </Typography>

                  <Typography
                    noWrap
                    sx={{
                      ...masterTypo.caption,
                      lineHeight: 1.2,
                      color: colors.subtitle,
                    }}
                  >
                    {process?.Facility_Description || ""}
                  </Typography>
                </Box>
              </Box>

              {/* ---------------------------------------- */}
              {/* Setup */}
              {/* ---------------------------------------- */}
              <Typography align="right" sx={{ ...masterTypo.caption, fontWeight: 600, color: colors.body }}>
                {formatTime(process?.SetUp_Time)}
              </Typography>

              {/* ---------------------------------------- */}
              {/* Standard Time */}
              {/* ---------------------------------------- */}
              <Typography align="right" sx={{ ...masterTypo.caption, fontWeight: 700, color: colors.primary }}>
                {formatTime(process?.Std_Time)}
              </Typography>

              {/* ---------------------------------------- */}
              {/* Batch */}
              {/* ---------------------------------------- */}
              <Typography align="right" sx={{ ...masterTypo.caption, fontWeight: 600, color: colors.body }}>
                {process?.Batch_Qty ?? "-"}
              </Typography>

            </Box>
          );
        })}
      </Box>
    </Box>
  );
}