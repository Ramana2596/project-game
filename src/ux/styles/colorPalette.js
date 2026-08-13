// ============================================================
// OpsMgt UXLab V3
// File    : colorPalette.js
// Purpose : Central Color Palette — Purple Brand
//
// DESIGN PRINCIPLE
// ------------------------------------------------------------
// One meaning = one standard token.
//
// Developers should be naturally guided to the obvious choice:
//   status.success  -> success
//   status.warning  -> warning
//   status.error    -> error
//   brand.primary   -> brand purple
//
// Accent is reserved for genuine data/category colors.
// ============================================================


// ============================================================
// 1. BRAND
// ============================================================

export const brand = {
  primary: "#7B1FA2",
  primaryLight: "#9C27B0",
  primaryDark: "#512DA8",

  primarySoft: "#F3EDFF",
  primarySelected: "#EDE7F6",

  onPrimary: "#FFFFFF",
  onPrimarySoft: "#512DA8",
};


// ============================================================
// 2. GRADIENTS
// ============================================================

export const gradients = {
  hero:
    "linear-gradient(135deg, #7B1FA2 0%, #512DA8 100%)",

  page:
    "linear-gradient(135deg, #F5F3FF 0%, #FAF7FF 50%, #F0ECFF 100%)",

  panel:
    "linear-gradient(180deg, #FFFFFF 0%, #FBFAFF 100%)",

  icon:
    "linear-gradient(135deg, #7B1FA2, #512DA8)",
};


// ============================================================
// 3. ACCENT
//
// ONLY genuine data/category colors belong here.
// ============================================================

export const accent = {
  blue: "#1E4FD8",
  teal: "#00897B",
};


// ============================================================
// 4. SURFACES
// ============================================================

export const surface = {
  page: "#FAF7FF",
  paper: "#FFFFFF",
  card: "#FFFFFF",
  panel: "#F8F5FF",
  panelAlt: "#F5F5F5",
};


// ============================================================
// 5. TEXT
// ============================================================

export const text = {
  title: "#1F2D3D",
  heading: "#32475B",
  body: "#546E7A",
  subtitle: "#6B6488",
  muted: "#90A4AE",
  white: "#FFFFFF",
};


// ============================================================
// 6. BORDERS / DIVIDERS
// ============================================================

export const border = {
  default: "#E6E0F4",
  divider: "#ECE7F7",
  shadowColor: "rgba(103, 58, 183, 0.15)",
};


// ============================================================
// 7. STATUS
// ============================================================

export const status = {
  success: "#2E7D32",
  warning: "#ED6C02",
  error: "#D32F2F",
  info: "#0288D1",
};


// ============================================================
// 8. DISABLED
// ============================================================

export const disabled = {
  background: "#EAE6F2",
  text: "#A39EB2",
};


// ============================================================
// 9. INTERACTIVE STATES
//
// Every state contains BOTH background and text.
// ============================================================

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


// ============================================================
// 10. STANDARD FLAT COLORS
//
// Convenience surface for existing/new code that uses colors.*
// ============================================================

export const colors = {
  // Brand
  primary: brand.primary,
  primaryLight: brand.primaryLight,
  primaryDark: brand.primaryDark,
  primarySoft: brand.primarySoft,
  primarySelected: brand.primarySelected,
  onPrimary: brand.onPrimary,
  onPrimarySoft: brand.onPrimarySoft,

  // Gradients
  heroGradient: gradients.hero,
  pageGradient: gradients.page,
  panelGradient: gradients.panel,
  iconGradient: gradients.icon,

  // Accent
  accentBlue: accent.blue,
  accentTeal: accent.teal,

  // Surface
  page: surface.page,
  paper: surface.paper,
  card: surface.card,
  panel: surface.panel,
  panelAlt: surface.panelAlt,

  // Text
  title: text.title,
  heading: text.heading,
  body: text.body,
  subtitle: text.subtitle,
  muted: text.muted,
  white: text.white,

  // Border
  border: border.default,
  divider: border.divider,
  shadowColor: border.shadowColor,

  // Status
  success: status.success,
  warning: status.warning,
  error: status.error,
  info: status.info,

  // Disabled
  disabledBackground: disabled.background,
  disabledText: disabled.text,
};


// ============================================================
// DEFAULT EXPORT
// ============================================================

export default colors;