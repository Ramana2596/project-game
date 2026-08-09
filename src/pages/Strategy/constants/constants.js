/**
 * Component Name : constants
 * Module         : Strategy
 * Purpose        : UI-presentation-only mapping for the Strategy Plan
 *                   page — icon + accent color per Business Enabler
 *                   value. Holds NO report data, field labels, or
 *                   category text: those are report info and are
 *                   always sourced live from strategyService (API),
 *                   same as Strategy Benefits / Strategy Outcome.
 * Author/Version : OpsMgt UX Lab / v1.0
 * AI Tags        : strategy, constants, config, presentation-mapping
 */

// ==========================================================
// Business Enabler → Icon/Color Mapping
// Keyed EXACTLY to the Business_Enabler string returned by the API
// (Strategy Mst), e.g. "Leadership", "Processes", "People" — not a
// separate coded taxonomy. Purely a rendering choice (which icon,
// which accent token); the display label is always the API string
// itself, never duplicated here.
// ==========================================================
export const ENABLER_PRESENTATION = {
  Leadership: { colorToken: "primary", icon: "FlagOutlined" },
  Processes: { colorToken: "info", icon: "SettingsOutlined" },
  People: { colorToken: "success", icon: "GroupsOutlined" },
  Strategy: { colorToken: "accent", icon: "InsightsOutlined" },
  Partnership: { colorToken: "warning", icon: "HandshakeOutlined" },
  Resource: { colorToken: "secondary", icon: "LayersOutlined" },
};

// Fallback used when the API returns a Business_Enabler value not yet
// mapped above (e.g. a new category added server-side) — keeps the UI
// from breaking without requiring a frontend release.
export const DEFAULT_ENABLER_PRESENTATION = {
  colorToken: "primary",
  icon: "FlagOutlined",
};

// ==========================================================
// Mutual Exclusion Group Label
// Group letters (A, B, C, D, …) are report data from the API
// (Mutual_X_Group) and are open-ended, so the label is generated
// rather than looked up in a fixed, hardcoded map.
// ==========================================================
export const getMutualGroupLabel = (groupLetter) => `Choose one — Group ${groupLetter}`;

// ==========================================================
// Currency — UI fallback only.
// Prefer the currency value on the API row/session when present;
// this is used only if a row doesn't carry one.
// ==========================================================
export const DEFAULT_CURRENCY_CODE = "USD";