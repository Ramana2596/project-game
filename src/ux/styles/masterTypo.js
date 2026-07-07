// ============================================================
// OpsMgt UX Lab V1.0
// File    : masterTypo.js
// Purpose : Master Typography System
//
// Contains:
// 1. muiTypo      - Master visual scales (H1...H6, B1, B2)
// 2. semanticTypo - UI semantic mappings (Hero, Page, Section, Card)
// ============================================================

import { colors } from "./colorPalette";

// ============================================================
// MASTER TYPOGRAPHY SCALE
// ------------------------------------------------------------
// Edit ONLY here if the application font hierarchy changes.
// ============================================================

export const muiTypo = {

  // H1 : Largest display text (Hero Titles)
  h1: {
    fontSize: { xs: "2.50rem", md: "3.25rem" },
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
    color: colors.title,
  },

  // H2 : Large page titles
  h2: {
    fontSize: { xs: "2.10rem", md: "2.70rem" },
    fontWeight: 700,
    lineHeight: 1.20,
    color: colors.title,
  },

  // H3 : Section titles
  h3: {
    fontSize: { xs: "1.75rem", md: "2.20rem" },
    fontWeight: 600,
    lineHeight: 1.25,
    color: colors.title,
  },

  // H4 : Small section headings
  h4: {
    fontSize: { xs: "1.45rem", md: "1.80rem" },
    fontWeight: 600,
    lineHeight: 1.30,
    color: colors.title,
  },

  // H5 : Card titles
  h5: {
    fontSize: "1.15rem",
    fontWeight: 600,
    lineHeight: 1.35,
    color: colors.title,
  },

  // H6 : Small headings / Table headings
  h6: {
    fontSize: "1.00rem",
    fontWeight: 600,
    lineHeight: 1.40,
    color: colors.title,
  },

  // B1 : Standard body text
  b1: {
    fontSize: "1.00rem",
    fontWeight: 400,
    lineHeight: 1.60,
    color: colors.body,
  },

  // B2 : Secondary body text
  b2: {
    fontSize: "0.92rem",
    fontWeight: 400,
    lineHeight: 1.60,
    color: colors.subtitle,
  },

  // Caption : Small helper text
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

  heroH1: muiTypo.h1,
  heroH2: muiTypo.h2,
  heroB1: muiTypo.b1,

  // PAGE
  pageH1: muiTypo.h1,
  pageH2: muiTypo.h2,
  pageH3: muiTypo.h3,
  pageB1: muiTypo.b1,

  // SECTION

  sectionH2: muiTypo.h2,
  sectionH3: muiTypo.h3,
  sectionH4: muiTypo.h4,
  sectionB1: muiTypo.b1,

  // CARD
 
  cardH4: muiTypo.h4,
  cardH5: muiTypo.h5,
  cardH6: muiTypo.h6,
  cardB1: muiTypo.b1,
  cardB2: muiTypo.b2,

  // TABLE

  tableH6: muiTypo.h6,
  tableB2: muiTypo.b2,

  // GENERIC
 

  // Standard body text
  bodyB1: muiTypo.b1,

  // Secondary body text
  bodyB2: muiTypo.b2,

  // Caption / Helper text
  caption: muiTypo.caption,
};