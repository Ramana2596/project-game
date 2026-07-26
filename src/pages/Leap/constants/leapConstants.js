// ============================================================
// LEAP V1.0
// File : leapConstants.js
// Purpose : Central constants for Learn & Help
// ============================================================

// ------------------------------------------------------------
// Information Types
// ------------------------------------------------------------
export const LEAP_INFO_TYPE = {
  INFO: "INFO",
  CHECKLIST: "CHECKLIST",
  LEARNING_OBJECTIVE: "LEARNING_OBJECTIVE",
  BUSINESS_RULE: "BUSINESS_RULE",
  HINT: "HINT",
  FAQ: "FAQ",
  REFERENCE: "REFERENCE",
  VIDEO: "VIDEO",
};

// ------------------------------------------------------------
// Display Order
// ------------------------------------------------------------
export const LEAP_SECTION_ORDER = [
  LEAP_INFO_TYPE.INFO,
  LEAP_INFO_TYPE.CHECKLIST,
  LEAP_INFO_TYPE.LEARNING_OBJECTIVE,
  LEAP_INFO_TYPE.BUSINESS_RULE,
  LEAP_INFO_TYPE.HINT,
  LEAP_INFO_TYPE.FAQ,
  LEAP_INFO_TYPE.REFERENCE,
  LEAP_INFO_TYPE.VIDEO,
];

// ------------------------------------------------------------
// Section Titles
// ------------------------------------------------------------
export const LEAP_SECTION_TITLE = {
  INFO: "Overview",
  CHECKLIST: "Checklist",
  LEARNING_OBJECTIVE: "Learning Objectives",
  BUSINESS_RULE: "Business Rules",
  HINT: "Hints",
  FAQ: "Frequently Asked Questions",
  REFERENCE: "References",
  VIDEO: "Learning Videos",
};

// ------------------------------------------------------------
// Help Centre Views
// ------------------------------------------------------------
export const LEAP_VIEW = {
  HELP: "HELP",
  CHECKLIST: "CHECKLIST",
  RULES: "RULES",
  LEARNING: "LEARNING",
  FAQ: "FAQ",
};

// ------------------------------------------------------------
// Sections in each View
// ------------------------------------------------------------
export const LEAP_VIEW_SECTIONS = {

  HELP: [
    LEAP_INFO_TYPE.INFO,
    LEAP_INFO_TYPE.HINT,
    LEAP_INFO_TYPE.REFERENCE,
    LEAP_INFO_TYPE.VIDEO,
  ],

  CHECKLIST: [
    LEAP_INFO_TYPE.CHECKLIST,
  ],

  RULES: [
    LEAP_INFO_TYPE.BUSINESS_RULE,
  ],

  LEARNING: [
    LEAP_INFO_TYPE.LEARNING_OBJECTIVE,
  ],

  FAQ: [
    LEAP_INFO_TYPE.FAQ,
  ],
};