// ============================================================
// OpsMgt UX Lab
// File : PageStyle.js
// Purpose : Common page layout styles (Purple Theme)
// ============================================================

import { colors } from "./colorPalette";

export const pageStyle = {

  // ==========================================================
  // Root Container
  // ==========================================================
  root: {
    minHeight: "100vh",
    background: colors.pageGradient,
    // Applies the responsive layout spacing directly to your root wrapper
    px: {
      xs: 2,
      sm: 3,
      md: 4,
    },
    py: 3,
  },

  // ==========================================================
  // Main Content Area
  // ==========================================================
  content: {
    mt: 4,
  },

  // ==========================================================
  // Standard Section
  // ==========================================================
  section: {
    mb: 4,
  },

  // ==========================================================
  // Section Header
  // ==========================================================
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
    gap: 2, // Critical fix to stop elements colliding on small screens
  },

  // ==========================================================
  // Grid Container
  // ==========================================================
  grid: {
    mt: 1,
  },

  // ==========================================================
  // White Panel
  // ==========================================================
  panel: {
    p: 3,
    borderRadius: 4,
    background: colors.paper || "#ffffff",
    border: `1px solid ${colors.border || "#e0e0e0"}`,
    boxShadow: `0 4px 16px ${colors.primary}14`, // Dynamic purple shadow tint
  },

  // ==========================================================
  // Compact Panel
  // ==========================================================
  compactPanel: {
    p: 2,
    borderRadius: 3,
    background: colors.paper || "#ffffff",
    border: `1px solid ${colors.border || "#e0e0e0"}`,
  },

  // ==========================================================
  // Flex Row
  // ==========================================================
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2, // Added spacing protection for child elements
  },

  // ==========================================================
  // Flex Column
  // ==========================================================
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 1.5, // Added vertical rhythm spacing for text stacks
  },

  // ==========================================================
  // Center Content
  // ==========================================================
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  // ==========================================================
  // Right Align
  // ==========================================================
  right: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
};