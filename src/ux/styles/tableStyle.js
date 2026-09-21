// OpsMgt UXLab V3: tableStyle.js

import { colors, accent, text, surface, border } from "./colorPalette";
import { masterTypo } from "./masterTypo";

export const tableStyle = {
  // Table container wrapper styles
  container: {
    borderRadius: 3,
    overflow: "hidden",
    border: `1px solid ${border.default}`,
    borderTop: `3px solid ${accent.blue}`,
    background: surface.card,
    boxShadow: `0 4px 16px ${accent.blue}14`,
  },

  // Table header title typography and spacing styles
  title: {
    ...masterTypo.tableTitle,
    color: text.title,
    px: 2,
    pt: 2,
    pb: 0.75,
  },

  // Table parameter description typography and spacing styles
  parameters: {
    ...masterTypo.tableParameter,
    color: text.subtitle,
    px: 2,
    pb: 1.5,
  },

  // Table action toolbar layout styles
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    mb: 2,
  },

  // Standard table column header styles
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

  // Alternate table column header custom accent styles
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

  // Table row striping and hover styles
  row: {
    "&:nth-of-type(even)": {
      backgroundColor: surface.panel,
    },
    "&:hover": {
      backgroundColor: `${accent.blue}0A`,
    },
    transition: "background-color .25s ease",
  },

  // Standard table data cell typography and border styles
  cell: {
    ...masterTypo.body1,
    color: text.body,
    borderBottom: `1px solid ${border.divider}`,
    py: 1.5,
  },

  // Right-aligned tabular numeric cell styles
  numeric: {
    textAlign: "right",
    fontVariantNumeric: "tabular-nums",
  },

  // Table footer summary layout styles
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: 2,
    py: 1.5,
    borderTop: `1px solid ${border.divider}`,
    background: surface.panel,
  },

  // Compact table density modifier styles
  compact: {
    "& .MuiTableCell-root": {
      py: 0.75,
      fontSize: "0.90rem",
    },
  },
};

export default tableStyle;