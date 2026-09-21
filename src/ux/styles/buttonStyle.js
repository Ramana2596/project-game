// OpsMgt UXLab V3: buttonStyle.js - Standard Interactive Styles (Purple Brand)

import { brand, state, disabled } from "./colorPalette";

export const buttonStyle = {
  // Primary CTA button styles
  primary: {
    height: 40,
    borderRadius: "999px",
    px: 3,
    fontWeight: 600,
    textTransform: "none",
    background: state.default.background,
    color: state.default.text,
    boxShadow: `0 6px 16px ${brand.primary}33`,
    transition: "all .25s ease",
    cursor: "pointer",
    "&:hover": {
      background: state.hover.background,
      color: state.hover.text,
      transform: "translateY(-2px)",
      boxShadow: `0 10px 22px ${brand.primary}47`,
    },
    "&:active, &.Mui-selected, &[aria-pressed='true']": {
      background: state.active.background,
      color: state.active.text,
    },
    "&:disabled": {
      background: state.disabled.background,
      color: state.disabled.text,
      boxShadow: "none",
      transform: "none",
      cursor: "not-allowed",
    },
  },

  // Secondary outline navigation and utility styles
  secondary: {
    height: 40,
    borderRadius: "999px",
    px: 3,
    fontWeight: 600,
    textTransform: "none",
    background: "#FFFFFF",
    color: brand.primary,
    border: `2px solid ${brand.primary}`,
    transition: "all .25s ease",
    cursor: "pointer",
    "&:hover": {
      background: brand.primarySoft,
      borderColor: brand.primaryDark,
      color: brand.primaryDark,
    },
    "&:disabled": {
      background: "transparent",
      color: disabled.text,
      borderColor: disabled.background,
      cursor: "not-allowed",
    },
  },

  // Subtle lower-emphasis filled action styles
  subtle: {
    height: 40,
    width: "100%",
    borderRadius: "999px",
    px: 3,
    fontWeight: 600,
    fontSize: "0.9rem",
    textTransform: "none",
    background: brand.primarySoft,
    color: brand.onPrimarySoft,
    border: "none",
    transition: "all .2s ease",
    cursor: "pointer",
    "&:hover": {
      background: state.selected.background,
      color: state.selected.text,
    },
    "&:disabled": {
      background: state.disabled.background,
      color: state.disabled.text,
      cursor: "not-allowed",
    },
  },

  // Text-only action styles
  text: {
    textTransform: "none",
    fontWeight: 600,
    color: brand.primary,
    cursor: "pointer",
    "&:hover": {
      background: "transparent",
      color: brand.primaryDark,
    },
    "&:disabled": {
      color: disabled.text,
      cursor: "not-allowed",
    },
  },

  // Inactive tab styles
  tab: {
    height: 44,
    borderRadius: "999px",
    px: 2.5,
    fontWeight: 600,
    textTransform: "none",
    background: "transparent",
    color: brand.primaryDark,
    transition: "all .2s ease",
    cursor: "pointer",
    "&:hover": {
      background: brand.primarySoft,
    },
  },

  // Active tab styles
  tabActive: {
    background: state.default.background,
    color: state.default.text,
    boxShadow: `0 4px 12px ${brand.primary}33`,
  },

  // Icon button styles
  icon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
    width: 40,
    height: 40,
    borderRadius: "50%",
    color: brand.primary,
    transition: "all .20s ease",
    "&:hover": {
      background: brand.primarySoft,
    },
    "&.Mui-selected": {
      background: state.selected.background,
      color: state.selected.text,
    },
  },

  // Compact size modifier styles
  compact: {
    height: 32,
    px: 2,
    fontSize: "0.85rem",
    minWidth: "auto",
  },
};

export default buttonStyle;