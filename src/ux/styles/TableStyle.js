// ============================================================
// OpsMgt UX Lab
// File : TableStyle.js
// Purpose : Standard table styles (Purple Theme)
// ============================================================

import { colors } from "./colorPalette";
import { muiTypo, semanticTypo } from "./masterTypo";

export const tableStyle = {

  // ==========================================================
  // Table Container
  // ==========================================================
  container: {
    borderRadius: 4,
    overflow: "hidden",
    border: `1px solid ${colors.border || "#e0e0e0"}`,
    background: colors.card || "#ffffff",
    boxShadow: `0 4px 16px ${colors.primary}14`, // Dynamic purple shadow tint
  },

  // ==========================================================
  // Header Row
  // ==========================================================
  header: {
    background: colors.heroGradient,
    "& .MuiTableCell-root": {
      ...semanticTypo.cardH4,
      color: colors.white,
      borderBottom: "none",
    },
  },

  // ==========================================================
  // Body Row
  // ==========================================================
  row: {
    "&:nth-of-type(even)": {
      backgroundColor: colors.panel || "#FCFAFF", // Connected to central tokens
    },
    "&:hover": {
      backgroundColor: colors.hover || "rgba(103,58,183,0.04)",
    },
    transition: "background-color .25s ease",
  },

  // ==========================================================
  // Body Cell
  // ==========================================================
  cell: {
    ...semanticTypo.bodyB1,
    color: colors.body,
    borderBottom: `1px solid ${colors.divider}`,
    paddingTop: 12,
    paddingBottom: 12,
  },

  // ==========================================================
  // Numeric Cell (For metrics, scoring, and data sheets)
  // ==========================================================
  numeric: {
    textAlign: "right",
    justifyContent: "flex-end", // Layout safety fallback
    fontVariantNumeric: "tabular-nums",
  },
};