// ============================================================
// OpsMgt UX Lab
// File : ColorPalette.js
// Professional Central Color Palette (Nested Theme)
// ============================================================

export const ColorPalette = {
  // 1. Core Brand & Interactive Palette
  brand: {
    primary: "#7B1FA2",
    primaryLight: "#9C27B0",
    primaryDark: "#512DA8",
    secondary: "#673AB7",
    accent: "#7E57C2",
    hover: "#F3EDFF",
    selected: "#EDE7F6",
  },

  // 2. High-Energy Gradients
  gradients: {
    pageGradient: "linear-gradient(135deg,#F5F3FF 0%,#FAF7FF 50%,#F0ECFF 100%)", 
    heroGradient: "linear-gradient(135deg,#7B1FA2 0%,#512DA8 100%)",
    panelGradient: "linear-gradient(180deg,#FFFFFF 0%,#FBFAFF 100%)",
    iconGradient: "linear-gradient(135deg,#7B1FA2,#512DA8)",
  },

  // 3. Structural Layout Backgrounds & Surfaces
  background: {
    default: "#FAF7FF",     // Maps to your original 'page'
    paper: "#FFFFFF",
    card: "#FFFFFF",
    panel: "#F8F5FF",
  },

  // 4. Semantic Typography Hierarchy
  text: {
    primary: "#1F2D3D",     // Maps to your original 'title'
    heading: "#32475B",
    body: "#546E7A",
    subtitle: "#6B6488",
    muted: "#90A4AE",
    white: "#FFFFFF",
  },

  // 5. App Borders & Visual Accents
  borders: {
    border: "#E6E0F4",
    divider: "#ECE7F7",
    shadowColor: "rgba(103,58,183,0.15)",
  },

  // 6. Real-time Operational Status Alerts
  status: {
    success: "#2E7D32",
    warning: "#ED6C02",
    error: "#D32F2F",
    info: "#0288D1",
  },

  // 7. Disabled Form States
  disabled: {
    bg: "#EAE6F2",
    text: "#A39EB2",
  }
};



// Compatibility Layer: Maps old flat tokens to prevent crashes

export const colors = {
  primary: ColorPalette.brand.primary,
  primaryLight: ColorPalette.brand.primaryLight,
  primaryDark: ColorPalette.brand.primaryDark,
  secondary: ColorPalette.brand.secondary,
  accent: ColorPalette.brand.accent,
  
  pageGradient: ColorPalette.gradients.pageGradient,
  heroGradient: ColorPalette.gradients.heroGradient,
  panelGradient: ColorPalette.gradients.panelGradient,
  iconGradient: ColorPalette.gradients.iconGradient,

  page: ColorPalette.background.default,
  background: ColorPalette.background,
  paper: ColorPalette.background.paper,
  card: ColorPalette.background.card,
  panel: ColorPalette.background.panel,

  title: ColorPalette.text.primary,
  heading: ColorPalette.text.heading,
  body: ColorPalette.text.body,
  subtitle: ColorPalette.text.subtitle,
  muted: ColorPalette.text.muted,
  white: ColorPalette.text.white,
  text: ColorPalette.text,

  border: ColorPalette.borders.border,
  divider: ColorPalette.borders.divider,
  shadowColor: ColorPalette.borders.shadowColor,

  success: ColorPalette.status.success,
  warning: ColorPalette.status.warning,
  error: ColorPalette.status.error,
  info: ColorPalette.status.info,

  hover: ColorPalette.brand.hover,
  selected: ColorPalette.brand.selected,

  disabledBackground: ColorPalette.disabled.bg,
  disabledText: ColorPalette.disabled.text,

};