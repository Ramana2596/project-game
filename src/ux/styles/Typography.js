// ============================================================
// OpsMgt UX Lab
// File : Typography.js (Simplified)
// User-friendly Typography Mapping for UX
// ============================================================

import { colors } from "./ColorPalette";

//  1. GLOBAL SCALE (Base sizes & weights)

const globalScale = {
  h1: { fontSize: "2.25rem", fontWeight: 700, lineHeight: 1.15 }, // Page Hero
  h2: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.2 },  // Section Hero
  h3: { fontSize: "1.35rem", fontWeight: 600, lineHeight: 1.3 },  // Section Title
  h4: { fontSize: "1.20rem", fontWeight: 500, lineHeight: 1.35 }, // Subsection Title
  h5: { fontSize: "1.10rem", fontWeight: 500, lineHeight: 1.4 },  // Card Title
  body1: { fontSize: "0.95rem", fontWeight: 400, lineHeight: 1.5 }, // Main Body
  body2: { fontSize: "0.92rem", fontWeight: 400, lineHeight: 1.6 }, // Secondary Body
  caption: { fontSize: "0.82rem", fontWeight: 500, lineHeight: 1.4 }, // Micro text
};

//  2. SEMANTIC TOKENS (Friendly names)

export const typography = {
  pageTitle: {
    ...globalScale.h1,
    fontSize: { xs: "1.75rem", sm: "2.25rem" },
    color: colors.title,
    letterSpacing: "-0.02em",
  },
  pageSubtitle: {
    ...globalScale.body1,
    fontSize: "1.00rem",
    color: colors.subtitle,
    mt: 0.5,
  },
  sectionTitle: {
    ...globalScale.h2,
    color: colors.title,
  },
  sectionSubtitle: {
    ...globalScale.body1,
    color: colors.subtitle,
  },
  cardTitle: {
    ...globalScale.h5,
    color: colors.title,
  },
  cardSubtitle: {
    ...globalScale.body2,
    color: colors.subtitle,
  },
  body: globalScale.body1,
  caption: {
    ...globalScale.caption,
    color: colors.muted,
  },
};

//  3. MUI Variant Mapping

export const muiTypographyVariants = {
  h1: typography.pageTitle,
  h2: typography.sectionTitle,
  h3: typography.sectionTitle,
  h4: globalScale.h4,
  h5: typography.cardTitle,
  body1: typography.body,
  body2: typography.cardSubtitle,
  caption: typography.caption,
};
