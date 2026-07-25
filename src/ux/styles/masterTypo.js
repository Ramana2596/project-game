// ============================================================
// OpsMgt UX Lab V2.0
// File    : masterTypo.js
// Purpose : Enterprise Typography System
//
// Design Principles
// ------------------------------------------------------------
// 1. muiTypo defines the visual scale.
// 2. semanticTypo is used by application pages.
// 3. Typography controls ONLY text appearance.
// 4. HTML heading (component="h1") is decided in JSX.
// ============================================================

import { colors } from "./colorPalette";

// ============================================================
// MUI TYPOGRAPHY SCALE
// ============================================================

export const muiTypo = {

  // Hero
  h1: {
    fontSize: { xs: "2.75rem", md: "3.00rem" },
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: colors.title,
  },

  // Page
  h2: {
    fontSize: { xs: "2.25rem", md: "2.50rem" },
    fontWeight: 600,
    lineHeight: 1.20,
    color: colors.title,
  },

  // Section
  h3: {
    fontSize: { xs: "1.75rem", md: "2.00rem" },
    fontWeight: 600,
    lineHeight: 1.25,
    color: colors.title,
  },

  // Sub-section
  h4: {
    fontSize: { xs: "1.45rem", md: "1.60rem" },
    fontWeight: 600,
    lineHeight: 1.30,
    color: colors.title,
  },

  // Card / Report Title
  h5: {
    fontSize: "1.15rem",
    fontWeight: 600,
    lineHeight: 1.35,
    color: colors.title,
  },

  // Small Heading / Table Header
  h6: {
    fontSize: "1.00rem",
    fontWeight: 600,
    lineHeight: 1.40,
    color: colors.title,
  },

  // Body
  b1: {
    fontSize: "1.00rem",
    fontWeight: 400,
    lineHeight: 1.60,
    color: colors.body,
  },

  // Secondary Body
  b2: {
    fontSize: "0.92rem",
    fontWeight: 400,
    lineHeight: 1.60,
    color: colors.subtitle,
  },

  // Caption
  caption: {
    fontSize: "0.82rem",
    fontWeight: 500,
    lineHeight: 1.40,
    color: colors.muted,
  },

};


// ============================================================
// SEMANTIC TYPOGRAPHY
//
// Use these in application pages.
//
// Examples:
//
// <Typography sx={semanticTypo.heroH1}>
// <Typography sx={semanticTypo.pageH3}>
// <Typography sx={semanticTypo.cardH5}>
// <Typography sx={semanticTypo.tableTitle}>
// ============================================================

export const semanticTypo = {

  // ==========================================================
  // Hero
  // ==========================================================
  heroH1: muiTypo.h1,
  heroH2: muiTypo.h2,


  // ==========================================================
  // Page
  // ==========================================================
  pageH3: muiTypo.h3,
  pageH4: muiTypo.h4,


  // ==========================================================
  // Cards
  // ==========================================================
  cardH5: muiTypo.h5,


  // ==========================================================
  // Enterprise Reports
  // ==========================================================
  tableTitle: muiTypo.h5,
  tableParameter: muiTypo.b2,
  columnHeader: muiTypo.h6,


  // ==========================================================
  // Tables
  // ==========================================================
  tableH6: muiTypo.h6,


  // ==========================================================
  // Body
  // ==========================================================
  bodyB1: muiTypo.b1,
  bodyB2: muiTypo.b2,


  // ==========================================================
  // Caption
  // ==========================================================
  caption: muiTypo.caption,

};
