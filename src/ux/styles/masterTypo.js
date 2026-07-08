// ============================================================
// OpsMgt UX Lab V2.0
// File    : enterpriseTypo.js
// Purpose : Enterprise Typography System (SAP Fiori aligned)
// ============================================================

import { colors } from "./colorPalette";

// ============================================================
// ENTERPRISE TYPOGRAPHY SCALE (SAP Fiori / Font 72 aligned)
// ------------------------------------------------------------
// Compact, bold, accessible values tuned for enterprise dashboards.
// ============================================================

export const muiTypo = {

  // H1 : Hero Titles
  h1: {
    fontSize: { xs: "2.75rem", md: "3.00rem" },
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: colors.title,
  },

  // H2 : Page Titles
  h2: {
    fontSize: { xs: "2.25rem", md: "2.50rem" },
    fontWeight: 600,
    lineHeight: 1.20,
    color: colors.title,
  },

  // H3 : Section Titles
  h3: {
    fontSize: { xs: "1.75rem", md: "2.00rem" },
    fontWeight: 600,
    lineHeight: 1.25,
    color: colors.title,
  },

  // H4 : Sub‑section / Card Headers
  h4: {
    fontSize: { xs: "1.45rem", md: "1.60rem" },
    fontWeight: 600,
    lineHeight: 1.30,
    color: colors.title,
  },

  // H5 : Card Titles
  h5: {
    fontSize: "1.15rem",
    fontWeight: 600,
    lineHeight: 1.35,
    color: colors.title,
  },

  // H6 : Small Headings / Table Labels
  h6: {
    fontSize: "1.00rem",
    fontWeight: 600,
    lineHeight: 1.40,
    color: colors.title,
  },

  // Body1 : Standard body text
  b1: {
    fontSize: "1.00rem",
    fontWeight: 400,
    lineHeight: 1.60,
    color: colors.body,
  },

  // Body2 : Secondary body text
  b2: {
    fontSize: "0.92rem",
    fontWeight: 400,
    lineHeight: 1.60,
    color: colors.subtitle,
  },

  // Caption : Helper text
  caption: {
    fontSize: "0.82rem",
    fontWeight: 500,
    lineHeight: 1.40,
    color: colors.muted,
  },
};


// ============================================================
// SEMANTIC TYPOGRAPHY
// ------------------------------------------------------------
// Naming Convention:
//
// heroH1  -> Hero text using H1 visual scale
// pageH2  -> Page title using H2 visual scale
//
// NOTE:
// The suffix (H1/H2/B1...) indicates VISUAL SCALE ONLY.
// HTML heading (component="h1") is specified in JSX.
// ============================================================

export const semanticTypo = {

  // HERO AREA
  heroH1: muiTypo.h1,         // Use as Std  H1
  heroH2: muiTypo.h2,         // Use as Std  H2
  heroB1: muiTypo.b1,         // NOT to be used, Use Std bodyB1

  // PAGE (instead of Title)
  pageH1: muiTypo.h1,         // NOT to be used, Use Std heroH1
  pageH2: muiTypo.h2,         // NOT to be used, Use Std heroH2
  pageH3: muiTypo.h3,         // Use as Std  H3
  pageH4: muiTypo.h4,         // Use as Std  H4
  pageB1: muiTypo.b1,         // NOT to be used, Use Std bodyB1

  // SECTION
  sectionH2: muiTypo.h2,      // NOT to be used, Use Std heroH2
  sectionH3: muiTypo.h3,      // NOT to be used, Use Std pageH3
  sectionH4: muiTypo.h4,      // NOT to be used, Use Std pageH4
  sectionB1: muiTypo.b1,      // NOT to be used, Use Std bodyB1

  // CARD
  cardH4: muiTypo.h4,         // NOT to be used, Use Std pageH4
  cardH5: muiTypo.h5,         // Use as Std  H5
  cardH6: muiTypo.h6,         // Use as Std  H6 (small headings in card/table)
  cardB1: muiTypo.b1,         // NOT to be used, Use Std bodyB1
  cardB2: muiTypo.b2,         // NOT to be used, Use Std bodyB2

  // TABLE
  tableH6: muiTypo.h6,        // NOT to be used, Use Std bodyH6
  tableB2: muiTypo.b2,        // NOT to be used, Use Std bodyB2

  // GENERIC
  bodyB1: muiTypo.b1,         // Use as Std  Body
  bodyB2: muiTypo.b2,         // Use as Std  Body
  caption: muiTypo.caption,   // Use as Std  Caption
};
