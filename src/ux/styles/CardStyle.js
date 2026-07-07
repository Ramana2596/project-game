// ============================================================
// OpsMgt UX Lab
// File : CardStyle.js
// Purpose : Standard card styles for the application (Purple Theme)
// ============================================================

import { colors } from "./colorPalette";
import { muiTypo, semanticTypo } from "./masterTypo";

export const cardStyle = {

  // ==========================================================
  // Standard Page Card
  // ==========================================================
  primary: {
    height: "100%",
    borderRadius: 5,
    overflow: "hidden",
    background: colors.card || "#ffffff",
    border: `1px solid ${colors.border || "#e0e0e0"}`,
    boxShadow: `0 4px 16px ${colors.primary}14`, // Dynamic 8% opacity alpha hex
    transition: "all .30s ease",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: `0 16px 32px ${colors.primary}2E`, // Dynamic 18% opacity alpha hex
      borderColor: colors.primary,
    },
  },

  // ==========================================================
  // Card Content
  // ==========================================================
  content: {
    p: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", // Core fix for text layout alignment
    gap: 3,
  },

 // ==========================================================
  // Icon Container (Default Rounded Square - as in original)
  // ==========================================================
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 3, // <--- This stays a rounded square
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: colors.iconGradient,
    "& svg": {
      fontSize: 38,
      color: colors.white || "#ffffff",
    },
  },

  // ==========================================================
  // Circle Icon Variant (New Additive Style)
  // ==========================================================
  iconBoxCircle: {
    borderRadius: "50%", // <--- This overrides to a perfect circle
  },
  
  // ==========================================================
  // Card Title
  // ==========================================================
  title: {
  ...semanticTypo.cardH4,

},


  // ==========================================================
  // Card Subtitle
  // ==========================================================
  subtitle: {
  ...semanticTypo.cardH5,
  mt: 0.75,
},
};