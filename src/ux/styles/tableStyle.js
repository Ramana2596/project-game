// ============================================================
// OpsMgt UX Lab
// File : tableStyle.js
// Purpose : Enterprise Tabular Report Styles (Purple Theme)
// ============================================================

import { colors } from "./colorPalette";
import { semanticTypo } from "./masterTypo";

export const tableStyle = {
  container: {
    borderRadius: 3,
    overflow: "hidden",
    border: `1px solid ${colors.border}`,
    background: colors.card,
    boxShadow: `0 4px 16px ${colors.primary}14`,
    borderTop: `3px solid ${colors.primary}`,
  },

  tableTitle: {
    ...semanticTypo.tableTitle,
    color: colors.title,
    px: 2,
    pt: 2,
    pb: 0.75,
  },

  tableParameters: {
    ...semanticTypo.tableParameter,
    color: colors.subtitle,
    px: 2,
    pb: 1.5,
  },

  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    mb: 2,
  },

  columnHeader: {
    background: colors.heroGradient,
    "& .MuiTableCell-root": {
      ...semanticTypo.columnHeader,
      color: colors.white,
      borderBottom: "none",
      py: 1.5,
    },
  },

  row: {
    "&:nth-of-type(even)": { backgroundColor: colors.panel },
    "&:hover": { backgroundColor: colors.hover },
    transition: "background-color .25s ease",
  },

  cell: {
    ...semanticTypo.bodyB1,
    color: colors.body,
    borderBottom: `1px solid ${colors.divider}`,
    py: 1.5,
  },

  numeric: {
    textAlign: "right",
    fontVariantNumeric: "tabular-nums",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 2,
    py: 1.5,
    borderTop: `1px solid ${colors.divider}`,
    background: colors.panel,
  },

  compact: {
    "& .MuiTableCell-root": {
      py: 0.75,
      fontSize: "0.90rem",
    },
  },
};
