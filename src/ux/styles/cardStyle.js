// ============================================================
// OpsMgt UXLab V3
// File    : cardStyle.js
// Purpose : Standard Surface Styles (Purple Theme)
// ------------------------------------------------------------

import {
  colors,
  brand,
  accent,
  surface,
  text,
  border,
  status,
} from "./colorPalette";

import { masterTypo } from "./masterTypo";


export const cardStyle = {

  // ==========================================================
  // STANDARD CARD SURFACE
  // ==========================================================

  primary: {
    height: "100%",
    borderRadius: 3,
    overflow: "hidden",

    background: surface.card,
    border: `1px solid ${border.default}`,

    boxShadow: `0 2px 10px ${brand.primary}0F`,
    transition: "all .25s ease",

    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: `0 12px 24px ${brand.primary}26`,
      borderColor: brand.primary,
    },
  },


  // ==========================================================
  // CARD CONTENT
  // ==========================================================

  content: {
    p: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 3,
  },


  // ==========================================================
  // ICON BOX
  // ==========================================================

  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 3,
    flexShrink: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    background: colors.iconGradient,

    "& svg": {
      fontSize: 38,
      color: text.white,
    },
  },


  // Circular variant of iconBox
  iconBoxCircle: {
    borderRadius: "50%",
  },


  // ==========================================================
  // CARD TYPOGRAPHY
  // ==========================================================

  title: {
    ...masterTypo.h4,
  },

  subtitle: {
    ...masterTypo.h5,
    mt: 0.75,
  },


  // ==========================================================
  // CARD FOOTER
  // ==========================================================

  footer: {
    px: 3,
    py: 2,

    borderTop: `1px solid ${border.divider}`,
    background: surface.panelAlt,
  },


  // ==========================================================
  // KPI / STAT CARD
  // ==========================================================

  statCard: {
    background: surface.paper,

    borderRadius: 3,
    p: 2.5,

    display: "flex",
    alignItems: "center",
    gap: 2,

    boxShadow: `0 1px 6px ${brand.primary}0D`,
    border: `1px solid ${border.default}`,
  },


  // KPI icon
  statIconCircle: (accentColor = accent.purple) => ({
    width: 56,
    height: 56,
    minWidth: 56,

    borderRadius: "50%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    background: accentColor,

    "& svg": {
      fontSize: 26,
      color: text.white,
    },
  }),


  // ==========================================================
  // INSIGHT / CALLOUT BANNER
  // ==========================================================

  banner: {
    borderRadius: 3,
    p: 3,

    display: "flex",
    alignItems: "center",
    gap: 3,
    flexWrap: "wrap",

    background: `${status.success}0D`,
    border: `1px solid ${status.success}33`,
  },


  // Banner icon
  bannerIconCircle: {
    width: 56,
    height: 56,
    minWidth: 56,

    borderRadius: "50%",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    background: `${status.success}1A`,

    "& svg": {
      fontSize: 26,
      color: status.success,
    },
  },


  // Banner chip / inline status element
  bannerChip: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },


  // ==========================================================
  // STATUS / TAG PILL
  // ==========================================================

  badge: (accentColor = brand.primary) => ({
    display: "inline-flex",
    alignItems: "center",

    borderRadius: "999px",

    px: 1.5,
    py: 0.5,

    fontSize: "0.78rem",
    fontWeight: 700,
    lineHeight: 1.4,

    background: `${accentColor}1A`,
    color: accentColor,
  }),
};


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default cardStyle;