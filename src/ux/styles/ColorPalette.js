// ============================================================
// OpsMgt UX Lab
// File : ColorPalette.js
// Purpose : Professional Central Color Palette (Nested Theme)
// ============================================================

export const ColorPalette = {
  // 1. Core Brand & Interactive Palette
  brand: {
    primary: "#673AB7",
    primaryLight: "#9575CD",
    primaryDark: "#512DA8",
    secondary: "#5C6BC0",
    accent: "#7E57C2",
    hover: "#F3EDFF",
    selected: "#EDE7F6",
  },

  // 2. High-Energy Gradients
  gradients: {
    pageGradient: "linear-gradient(135deg,#FAF7FF 0%,#F3EDFF 45%,#FFFFFF 100%)",
    heroGradient: "linear-gradient(90deg,#5E35B1 0%,#7E57C2 50%,#9575CD 100%)",
    panelGradient: "linear-gradient(180deg,#FFFFFF 0%,#FBFAFF 100%)",
    iconGradient: "linear-gradient(135deg,#673AB7,#9575CD)",
  },

  // 3. Structural Layout Backgrounds & Surfaces
  background: {
    default: "#FAF7FF",     // Maps to your original 'page'
    paper: "#FFFFFF",
    card: "#FFFFFF",
    panel: "#F8F5FF",
  },

  // 4. Semantic Typography Hierarchy (Scores high on UX accessibility)
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

// ==========================================================
// Compatibility Layer: Maps old flat tokens to prevent crashes
// ==========================================================
// Add this directly to the bottom layer of your ColorPalette.js file
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

  // ==========================================================
  // UXLab V1.0 - Standardized Typographic Metrics Scale
  // ==========================================================
  typography: {
    display1: { xs: '2.25rem', md: '3.00rem' }, // Clean Hero Title Proportions
    h4: { xs: '1.50rem', md: '2.00rem' },       // Standard Section Headings (Added)
    body1: { xs: '0.935rem', md: '1.00rem' },   // Optimal readability across viewport screens
    fontWeightTitle: 800,
    fontWeightBody: 400,
    lineHeightTitle: 1.15,
    lineHeightBody: 1.6
  }
};