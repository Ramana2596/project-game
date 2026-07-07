// ============================================================
// OpsMgt UX Lab
// File : ButtonStyle.js
// Purpose : Standard button styles (Purple Theme)
// ============================================================

import { colors } from "./colorPalette";

export const buttonStyle = {

  // ==========================================================
  // Primary Button (Main Call to Action)
  // ==========================================================
  primary: {
    borderRadius: 3,
    px: 3,
    py: 1,
    fontWeight: 600,
    textTransform: "none",
    background: colors.heroGradient,
    color: colors.white,
    boxShadow: `0 6px 16px ${colors.primary}33`, // Dynamic 20% opacity alpha hex
    transition: "all .25s ease",
    cursor: "pointer",
    "&:hover": {
      background: colors.primaryDark,
      transform: "translateY(-2px)",
      boxShadow: `0 10px 22px ${colors.primary}47`, // Dynamic 28% opacity alpha hex
    },
    "&:disabled": {
      background: colors.disabledBackground || "#e0e0e0",
      color: colors.disabledText || "#9e9e9e",
      boxShadow: "none",
      transform: "none",
      cursor: "not-allowed",
    },
  },

  // ==========================================================
  // Secondary Button (Outline / Alternative Action)
  // ==========================================================
  secondary: {
    borderRadius: 3,
    px: 3,
    py: 1,
    fontWeight: 600,
    textTransform: "none",
    background: colors.paper || "#ffffff",
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
    transition: "all .25s ease",
    cursor: "pointer",
    "&:hover": {
      background: colors.hover || "rgba(103,58,183,0.04)",
      borderColor: colors.primaryDark,
    },
    "&:disabled": {
      background: "transparent",
      color: colors.disabledText || "#9e9e9e",
      borderColor: colors.disabledBackground || "#e0e0e0",
      cursor: "not-allowed",
    },
  },

  // ==========================================================
  // Text Button (Low emphasis / Links)
  // ==========================================================
  text: {
    textTransform: "none",
    fontWeight: 600,
    color: colors.primary,
    cursor: "pointer",
    "&:hover": {
      background: "transparent",
      color: colors.primaryDark,
    },
    "&:disabled": {
      color: colors.disabledText || "#9e9e9e",
      cursor: "not-allowed",
    },
  },

  // ==========================================================
  // Small Action Button (Standalone Solid Purple - e.g., Sign In)
  // ==========================================================
  small: {
    borderRadius: 2,
    px: 2,
    py: 0.5,
    fontSize: "0.85rem",
    textTransform: "none",
    fontWeight: 600,
    background: colors.primary,
    color: colors.white || "#ffffff",
    transition: "all .25s ease",
    cursor: "pointer",
    "&:hover": {
      background: colors.primaryDark,
    },
    "&:disabled": {
      background: colors.disabledBackground || "#e0e0e0",
      color: colors.disabledText || "#9e9e9e",
      cursor: "not-allowed",
    },
  },

  // ==========================================================
  // Compact Layout Modifier (Pure Size Override - e.g., Table View)
  // ==========================================================
  compact: {
    borderRadius: 2,
    px: 2,
    py: 0.5,
    fontSize: "0.85rem",
    minWidth: "auto",
  }
};