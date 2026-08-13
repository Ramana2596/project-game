// ============================================================
// OpsMgt UXLab V3
// File    : layoutStyle.js
// Purpose : Standard Layout Styles — Purple Theme
//
// STANDARD TOKENS
// ------------------------------------------------------------
// root
// content
// section
// sectionHeader
// grid
// panel
// compactPanel
// flexRow
// flexColumn
// flexCenter
// flexRight
// toolbar
// pageContainer
// pageHeader
// pageHeaderDatePill
// tabBar
// sidebar
// sidebarItem
// sidebarItemActive
//
// DESIGN RULE
// ------------------------------------------------------------
// Layout controls structure, spacing and positioning.
// Colors are sourced from colorPalette.
// Active states reuse the canonical selected state.
// ============================================================

import {
  brand,
  gradients,
  surface,
  border,
  text,
  state,
} from "./colorPalette";


export const layoutStyle = {

  // ==========================================================
  // PAGE STRUCTURE
  // ==========================================================

  root: {
    minHeight: "100vh",
    background: gradients.page,
    px: { xs: 2, sm: 3, md: 4 },
    py: 3,
  },

  content: {
    mt: 4,
  },

  section: {
    mb: 4,
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    gap: 2,
  },

  grid: {
    mt: 1,
  },


  // ==========================================================
  // PANELS
  // ==========================================================

  panel: {
    p: 3,
    borderRadius: 4,

    background: surface.paper,
    border: `1px solid ${border.default}`,
    boxShadow: `0 4px 16px ${brand.primary}14`,
  },

  compactPanel: {
    p: 2,
    borderRadius: 3,

    background: surface.paper,
    border: `1px solid ${border.default}`,
  },


  // ==========================================================
  // FLEX LAYOUT
  // ==========================================================

  flexRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
  },

  flexColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },

  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  flexRight: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },


  // ==========================================================
  // TOOLBAR
  // ==========================================================

  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    mb: 2,
  },


  // ==========================================================
  // PAGE CONTAINER
  // ==========================================================

  pageContainer: {
    width: "100%",
    maxWidth: "1600px",
    mx: "auto",
  },


  // ==========================================================
  // PAGE HEADER
  // ==========================================================

  pageHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 0.5,
    mb: 3,
    position: "relative",
  },

  pageHeaderDatePill: {
    position: "absolute",
    top: 0,
    right: 0,

    display: "inline-flex",
    alignItems: "center",
    gap: 1,

    px: 1.5,
    py: 0.75,

    borderRadius: "999px",

    background: surface.paper,
    border: `1px solid ${border.default}`,

    color: brand.primary,
    fontWeight: 600,
  },


  // ==========================================================
  // TAB BAR
  //
  // Container for buttonStyle.tab / tabActive.
  // ==========================================================

  tabBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,

    p: 0.75,

    borderRadius: "999px",

    background: surface.paper,
    border: `1px solid ${border.default}`,

    mb: 3,
  },


  // ==========================================================
  // SIDEBAR
  // ==========================================================

  sidebar: {
    width: 72,
    minHeight: "100vh",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    gap: 1,
    py: 3,

    background: surface.paper,
    borderRight: `1px solid ${border.default}`,
  },

  sidebarItem: {
    width: 44,
    height: 44,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: 2,

    color: text.muted,

    transition: "all .2s ease",

    "&:hover": {
      background: brand.primarySoft,
      color: brand.primary,
    },
  },


  // ==========================================================
  // SIDEBAR ACTIVE
  //
  // Reuses the canonical selected state.
  // No independent color definition.
  // ==========================================================

  sidebarItemActive: {
    background: state.selected.background,
    color: state.selected.text,
  },
};


export default layoutStyle;