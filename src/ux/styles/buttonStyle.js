// ============================================================
// OpsMgt UX Lab
// File : buttonStyle.js
// Purpose : Standard Button Styles (Purple Theme)
// ============================================================

import { colors } from "./colorPalette";

export const buttonStyle = {

  // ==========================================================
  // Primary Button
  // Main Call-to-Action
  // Examples:
  // Save, Submit, Load Teams, Team Debrief
  // ==========================================================
  primary: {
    height: 40,
    borderRadius: "999px",
    px: 3,
    fontWeight: 600,
    textTransform: "none",

    background: colors.heroGradient,
    color: colors.white,

    boxShadow: `0 6px 16px ${colors.primary}33`,
    transition: "all .25s ease",
    cursor: "pointer",

    "&:hover": {
      background: colors.primaryDark,
      transform: "translateY(-2px)",
      boxShadow: `0 10px 22px ${colors.primary}47`,
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
  // Secondary Button
  // Outline Navigation / Utility Button
  // Examples:
  // Back, Previous, Top, Cancel
  // ==========================================================
  secondary: {
    height: 40,
    borderRadius: "999px",
    px: 3,
    fontWeight: 600,
    textTransform: "none",

    background: colors.paper || "#ffffff",
    color: colors.primary,

    border: `2px solid ${colors.primary}`,

    transition: "all .25s ease",
    cursor: "pointer",

    "&:hover": {
      background: colors.hover || "rgba(103,58,183,0.04)",
      borderColor: colors.primaryDark,
      color: colors.primaryDark,
    },

    "&:disabled": {
      background: "transparent",
      color: colors.disabledText || "#9e9e9e",
      borderColor: colors.disabledBackground || "#e0e0e0",
      cursor: "not-allowed",
    },
  },

  // ==========================================================
  // Text Button
  // Low Emphasis Action
  // Examples:
  // View, Help, Learn More
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
  // Small Button (Legacy)
  // Retained for backward compatibility.
  // New development should prefer:
  // primary + compact
  // ==========================================================
  small: {
    height: 32,
    borderRadius: "999px",
    px: 2,
    fontSize: "0.85rem",
    fontWeight: 600,
    textTransform: "none",

    background: colors.primary,
    color: colors.white,

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
  // Compact Modifier
  // Pure size override.
  // Use:
  // sx={{ ...buttonStyle.primary, ...buttonStyle.compact }}
  // ==========================================================
  compact: {
    height: 32,
    px: 2,
    fontSize: "0.85rem",
    minWidth: "auto",
  },
};