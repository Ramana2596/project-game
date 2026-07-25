// ============================================================
// OpsMgt UX Lab
// File : colorPalette.js
// Professional Central Color Palette (Flat & Nested Theme)
// ============================================================

// 1. Primary Flat Design System Tokens (colors)
export const colors = {
  // Brand & Interactive
  primary: "#7B1FA2",
  primaryLight: "#9C27B0",
  primaryDark: "#512DA8",
  secondary: "#673AB7",
  accent: "#7E57C2",
  hover: "#F3EDFF",
  selected: "#EDE7F6",

  // High-Energy Gradients
  pageGradient: "linear-gradient(135deg, #F5F3FF 0%, #FAF7FF 50%, #F0ECFF 100%)",
  heroGradient: "linear-gradient(135deg, #7B1FA2 0%, #512DA8 100%)",
  panelGradient: "linear-gradient(180deg, #FFFFFF 0%, #FBFAFF 100%)",
  iconGradient: "linear-gradient(135deg, #7B1FA2, #512DA8)",

  // Layout Backgrounds & Surfaces
  page: "#FAF7FF",
  paper: "#FFFFFF",
  card: "#FFFFFF",
  panel: "#F8F5FF",

  // Typography Scale
  title: "#1F2D3D",
  heading: "#32475B",
  body: "#546E7A",
  subtitle: "#6B6488",
  muted: "#90A4AE",
  white: "#FFFFFF",

  // Borders & Dividers
  border: "#E6E0F4",
  divider: "#ECE7F7",
  shadowColor: "rgba(103, 58, 183, 0.15)",

  // Operational Status Alerts
  success: "#2E7D32",
  warning: "#ED6C02",
  error: "#D32F2F",
  info: "#0288D1",

  // Disabled States
  disabledBackground: "#EAE6F2",
  disabledText: "#A39EB2",
};

// 2. Nested Theme Model (Derived to maintain compatibility)
export const colorPalette = {
  brand: {
    primary: colors.primary,
    primaryLight: colors.primaryLight,
    primaryDark: colors.primaryDark,
    secondary: colors.secondary,
    accent: colors.accent,
    hover: colors.hover,
    selected: colors.selected,
  },
  gradients: {
    pageGradient: colors.pageGradient,
    heroGradient: colors.heroGradient,
    panelGradient: colors.panelGradient,
    iconGradient: colors.iconGradient,
  },
  background: {
    default: colors.page,
    paper: colors.paper,
    card: colors.card,
    panel: colors.panel,
  },
  text: {
    primary: colors.title,
    heading: colors.heading,
    body: colors.body,
    subtitle: colors.subtitle,
    muted: colors.muted,
    white: colors.white,
  },
  borders: {
    border: colors.border,
    divider: colors.divider,
    shadowColor: colors.shadowColor,
  },
  status: {
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.info,
  },
  disabled: {
    bg: colors.disabledBackground,
    text: colors.disabledText,
  },
};

export default colors;