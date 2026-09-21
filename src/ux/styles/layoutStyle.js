// OpsMgt UXLab V3: layoutStyle.js - Standard Layout Styles (Purple Theme)

import { brand, gradients, surface, border, text, state } from "./colorPalette";

export const layoutStyle = {
  // Root application container layout styles
  root: {
    minHeight: "100vh",
    background: gradients.page,
    px: { xs: 2, sm: 3, md: 4 },
    py: 3,
  },

  // Main content wrapper styles
  content: {
    mt: 4,
  },

  // Content section container styles
  section: {
    mb: 4,
  },

  // Section header layout styles
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    gap: 2,
  },

  // Layout grid container styles
  grid: {
    mt: 1,
  },

  // Standard container panel styles
  panel: {
    p: 3,
    borderRadius: 4,
    background: surface.paper,
    border: `1px solid ${border.default}`,
    boxShadow: `0 4px 16px ${brand.primary}14`,
  },

  // Compact container panel styles
  compactPanel: {
    p: 2,
    borderRadius: 3,
    background: surface.paper,
    border: `1px solid ${border.default}`,
  },

  // Flex row layout styles
  flexRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
  },

  // Flex column layout styles
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },

  // Centered flex container styles
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // Right-aligned flex container styles
  flexRight: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  // Toolbar action container styles
  toolbar: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 2,
    mb: 2,
  },

  // Maximum width page container styles
  pageContainer: {
    width: "100%",
    maxWidth: "1600px",
    mx: "auto",
  },

  // Page header container styles
  pageHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    gap: 0.5,
    mb: 3,
    position: "relative",
  },

  // Floating page header date pill styles
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

  // Navigation tab bar container styles
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

  // Sidebar navigation container styles
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

  // Individual sidebar item styles
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

  // Active sidebar item styles
  sidebarItemActive: {
    background: state.selected.background,
    color: state.selected.text,
  },
};

export default layoutStyle;