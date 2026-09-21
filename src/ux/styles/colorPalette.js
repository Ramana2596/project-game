// OpsMgt UXLab V3: colorPalette.js - Central Color Palette (Purple Brand)

// Brand color tokens including primary shades and contrast text options
export const brand = {
  primary: "#7B1FA2",
  primaryLight: "#9C27B0",
  primaryDark: "#512DA8",
  primarySoft: "#F3EDFF",
  primarySelected: "#EDE7F6",
  onPrimary: "#FFFFFF",
  onPrimarySoft: "#512DA8",
};

// Gradient styles for hero sections, pages, panels, and icons
export const gradients = {
  hero: "linear-gradient(135deg, #7B1FA2 0%, #512DA8 100%)",
  page: "linear-gradient(135deg, #F5F3FF 0%, #FAF7FF 50%, #F0ECFF 100%)",
  panel: "linear-gradient(180deg, #FFFFFF 0%, #FBFAFF 100%)",
  icon: "linear-gradient(135deg, #7B1FA2, #512DA8)",
};

// Genuine data and category accent colors
export const accent = {
  blue: "#1E4FD8",
  teal: "#00897B",
  purple: "#8E24AA",
  indigo: "#3F51B5",
  orange: "#EF6C00",
  rose: "#E91E63",
};

// Background surface colors for pages, cards, and panels
export const surface = {
  page: "#FAF7FF",
  paper: "#FFFFFF",
  card: "#FFFFFF",
  panel: "#F8F5FF",
  panelAlt: "#F5F5F5",
};

// Typography color tokens for headings, body text, and subtitles
export const text = {
  title: "#1F2D3D",
  heading: "#32475B",
  body: "#546E7A",
  subtitle: "#6B6488",
  muted: "#90A4AE",
  white: "#FFFFFF",
};

// Border, divider, and shadow color tokens
export const border = {
  default: "#E6E0F4",
  divider: "#ECE7F7",
  shadowColor: "rgba(103, 58, 183, 0.15)",
};

// Status notification and feedback colors
export const status = {
  success: "#2E7D32",
  warning: "#ED6C02",
  error: "#D32F2F",
  info: "#0288D1",
};

// Disabled element background and text colors
export const disabled = {
  background: "#EAE6F2",
  text: "#A39EB2",
};

// Interactive state combinations defining background and text colors
export const state = {
  default: {
    background: gradients.hero,
    text: brand.onPrimary,
  },
  hover: {
    background: brand.primaryDark,
    text: brand.onPrimary,
  },
  active: {
    background: brand.primaryDark,
    text: brand.onPrimary,
  },
  selected: {
    background: brand.primarySelected,
    text: brand.onPrimarySoft,
  },
  disabled: {
    background: disabled.background,
    text: disabled.text,
  },
};

// Flat color mapping providing convenient access to all tokens
export const colors = {
  primary: brand.primary,
  primaryLight: brand.primaryLight,
  primaryDark: brand.primaryDark,
  primarySoft: brand.primarySoft,
  primarySelected: brand.primarySelected,
  onPrimary: brand.onPrimary,
  onPrimarySoft: brand.onPrimarySoft,
  heroGradient: gradients.hero,
  pageGradient: gradients.page,
  panelGradient: gradients.panel,
  iconGradient: gradients.icon,
  accentBlue: accent.blue,
  accentTeal: accent.teal,
  accentPurple: accent.purple,
  accentIndigo: accent.indigo,
  accentOrange: accent.orange,
  accentRose: accent.rose,
  page: surface.page,
  paper: surface.paper,
  card: surface.card,
  panel: surface.panel,
  panelAlt: surface.panelAlt,
  title: text.title,
  heading: text.heading,
  body: text.body,
  subtitle: text.subtitle,
  muted: text.muted,
  white: text.white,
  border: border.default,
  divider: border.divider,
  shadowColor: border.shadowColor,
  success: status.success,
  warning: status.warning,
  error: status.error,
  info: status.info,
  disabledBackground: disabled.background,
  disabledText: disabled.text,
};

export default colors;