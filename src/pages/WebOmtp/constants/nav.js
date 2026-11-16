// ==========================================================
// Component Name : nav
// Module         : WebOmtp (Landing)
// Purpose        : Navigation items; id = section id used for scroll and scroll-spy
// Author/Version : UXLab V1.3 / v1.0
// AI Tags        : landing, navigation, constants
// ==========================================================

// Purpose: Top navigation sections, in page order
export const NAV_ITEMS = [
  { id: "overview", label: "Overview" },
  { id: "audiences", label: "Who It Is For" },
  { id: "steps", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About Us" },
];

// Purpose: Section ids observed by scroll-spy (includes sections not shown in the nav)
export const SECTION_IDS = [
  ...NAV_ITEMS.map((n) => n.id),
  "journey",
  "industry",
];