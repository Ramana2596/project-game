// ============================================================
// OpsMgt UXLab V3
// File    : masterTypo.js
// Purpose : SaaS Typography Standard
// ------------------------------------------------------------

// ============================================================
// STANDARD TYPOGRAPHY
// ------------------------------------------------------------
// Use directly through MUI:
//
// <Typography variant="h1">
// <Typography variant="h2">
// ...
//
// Font size, weight, line-height and spacing are controlled here.
// ============================================================

export const masterTypo = {

  // ----------------------------------------------------------
  // Headings
  // ----------------------------------------------------------

  h1: {
    fontSize: { xs: "2.25rem", md: "3rem" },
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },

  h2: {
    fontSize: { xs: "2rem", md: "2.5rem" },
    fontWeight: 600,
    lineHeight: 1.2,
  },

  h3: {
    fontSize: { xs: "1.625rem", md: "2rem" },
    fontWeight: 600,
    lineHeight: 1.25,
  },

  h4: {
    fontSize: { xs: "1.375rem", md: "1.6rem" },
    fontWeight: 600,
    lineHeight: 1.3,
  },

  h5: {
    fontSize: "1.15rem",
    fontWeight: 600,
    lineHeight: 1.35,
  },

  h6: {
    fontSize: "1rem",
    fontWeight: 600,
    lineHeight: 1.4,
  },


  // ----------------------------------------------------------
  // Body
  // ----------------------------------------------------------

  body1: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.6,
  },

  body2: {
    fontSize: "0.92rem",
    fontWeight: 400,
    lineHeight: 1.6,
  },


  // ----------------------------------------------------------
  // Supporting text
  // ----------------------------------------------------------

  caption: {
    fontSize: "0.82rem",
    fontWeight: 500,
    lineHeight: 1.4,
  },


  // ----------------------------------------------------------
  // Buttons
  // ----------------------------------------------------------

  button: {
    fontSize: "0.875rem",
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: "0.01em",
    textTransform: "none",
  },
};

export default masterTypo;