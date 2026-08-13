// ============================================================
// OpsMgt UXLab V3
// File    : tableStyle.js
// Purpose : SaaS Enterprise Table / Report Standards
//
// Design Principle
// ------------------------------------------------------------
// 1. Standard tokens are the ONLY distinct table styles.
// 2. Purple = brand / hero / primary interaction.
// 3. Enterprise Blue = information / table identity.
// 4. Column headers use white text for contrast.
// 5. Numeric data is right-aligned.
// 6. Compact is a density modifier, not a separate theme.
// 7. Alternate table headers use approved accent colors only.
// ============================================================

import {
  colors,
  accent,
  text,
  surface,
  border,
} from "./colorPalette";

import { masterTypo } from "./masterTypo";


// ============================================================
// STANDARD TOKENS
// ============================================================

export const tableStyle = {

  // ----------------------------------------------------------
  // 01. CONTAINER
  // ----------------------------------------------------------
  container: {
    borderRadius: 3,
    overflow: "hidden",
    border: `1px solid ${border.default}`,
    borderTop: `3px solid ${accent.blue}`,
    background: surface.card,
    boxShadow: `0 4px 16px ${accent.blue}14`,
  },


  // ----------------------------------------------------------
  // 02. TITLE
  // ----------------------------------------------------------
  title: {
    ...masterTypo.tableTitle,
    color: text.title,
    px: 2,
    pt: 2,
    pb: 0.75,
  },


  // ----------------------------------------------------------
  // 03. PARAMETERS
  // ----------------------------------------------------------
  parameters: {
    ...masterTypo.tableParameter,
    color: text.subtitle,
    px: 2,
    pb: 1.5,
  },


  // ----------------------------------------------------------
  // 04. TOOLBAR
  // ----------------------------------------------------------
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    mb: 2,
  },


  // ----------------------------------------------------------
  // 05. COLUMN HEADER
  // ----------------------------------------------------------
  columnHeader: {
    backgroundColor: accent.blue,
    color: colors.white,

    "& .MuiTableCell-root": {
      ...masterTypo.columnHeader,
      backgroundColor: accent.blue,
      color: colors.white,
      borderBottom: "none",
      py: 1.5,
    },

    "& .MuiTableCell-head": {
      backgroundColor: accent.blue,
      color: colors.white,
    },
  },


  // ----------------------------------------------------------
  // 06. ALTERNATE COLUMN HEADER
  // ----------------------------------------------------------
  columnHeaderAccent: (accentColor = accent.blue) => ({
    backgroundColor: accentColor,
    color: colors.white,

    "& .MuiTableCell-root": {
      ...masterTypo.columnHeader,
      backgroundColor: accentColor,
      color: colors.white,
      borderBottom: "none",
      py: 1.5,
    },

    "& .MuiTableCell-head": {
      backgroundColor: accentColor,
      color: colors.white,
    },
  }),


  // ----------------------------------------------------------
  // 07. ROW
  // ----------------------------------------------------------
  row: {
    "&:nth-of-type(even)": {
      backgroundColor: surface.panel,
    },

    "&:hover": {
      backgroundColor: `${accent.blue}0A`,
    },

    transition: "background-color .25s ease",
  },


  // ----------------------------------------------------------
  // 08. CELL
  // ----------------------------------------------------------
  cell: {
    ...masterTypo.body1,
    color: text.body,
    borderBottom: `1px solid ${border.divider}`,
    py: 1.5,
  },


  // ----------------------------------------------------------
  // 09. NUMERIC
  // ----------------------------------------------------------
  numeric: {
    textAlign: "right",
    fontVariantNumeric: "tabular-nums",
  },


  // ----------------------------------------------------------
  // 10. FOOTER
  // ----------------------------------------------------------
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 2,
    py: 1.5,
    borderTop: `1px solid ${border.divider}`,
    background: surface.panel,
  },


  // ----------------------------------------------------------
  // 11. COMPACT
  // ----------------------------------------------------------
  compact: {
    "& .MuiTableCell-root": {
      py: 0.75,
      fontSize: "0.90rem",
    },
  },
};


export default tableStyle;