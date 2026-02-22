// src/pages/DemoVirtual/constants/labels.js
// Centralised UI labels and templates of SimulationSuite

export const UI_STRINGS = {
  // Main Page & Header
  TITLE: "OMG Simulation",
  EXIT_TOOLTIP: "Leave Simulation",
  PERIOD_DISPLAY: (curr, total) => `Period ${curr} / ${total}`,
  TEAM_PREFIX: (team) => `Team ${team} :`,
  SIM_COMPLETED: "🏆 Simulation Completed! 🏆",

  // Stage Buttons & Actions
  WAITING: "Wait...",
  NEXT_MONTH_TOOLTIP: "Proceed to next month",
  NO_REPORTS: "No reports",

  // Report Drawer
  REPORT_HEADER: (title) => `Reports: ${title}`,
  // Report Drawer
  REPORT_DESC: (stageNo, pNo, pDate) => `Reports for Stage ${stageNo}, Period ${pNo} (${pDate}).`,
  REPORT_PLACEHOLDER: "Report content goes here...",

  // Notifications & Errors
  ERROR_FETCH: "Failed to fetch progress",
  ERROR_UPDATE: "Unable to update stage",
  ERROR_STATUS: "Error updating status"
};

export default UI_STRINGS;

/*
// Strings used by components
export const UI_STRINGS = {
  SIMULATION_PROGRESS: "Simulation Progress",
  LEAVE_SIMULATION: "Leave Simulation",
  NO_REPORTS: "No reports available",
  SIMULATION_COMPLETED: "🏆 Simulation Completed! 🏆",
  CLICK_TO_PROCEED: "Click to proceed",
  REFRESH: "Refresh",
  OPEN_REPORTS_ARIA: (stageNo) => `Open reports for stage ${stageNo}`
};

// Stage-related headings
export const STAGE_TEMPLATES = {
  TITLE: (stageNo, label) => `${stageNo}: ${label}`,
  REPORTS_HEADER: (stageNo) => `${stageNo} Reports`,
};

*/