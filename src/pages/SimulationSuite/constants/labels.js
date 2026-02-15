// src/pages/SimulationSuite/constants/labels.js
// Shared UI labels and templates of SimulationSuite


export const MODE_LABELS = {
  DEMO: "Demo",
  CLASS: "Classroom",
  ONLINE: "Online",
  HYBRID: "Hybrid"
};

// Presentation strings used by components
export const UI_STRINGS = {
  SIMULATION_PROGRESS: "Simulation Progress",
  LEAVE_SIMULATION: "Leave Simulation",
  NO_REPORTS: "No reports available",
  SIMULATION_COMPLETED: "🏆 Simulation Completed! 🏆",
  CLICK_TO_PROCEED: "Click to proceed",
  REFRESH: "Refresh",
  OPEN_REPORTS_ARIA: (stageNo) => `Open reports for stage ${stageNo}`
};

// Template: Stage-related headings
export const STAGE_TEMPLATES = {
  TITLE: (stageNo, label) => `${stageNo}: ${label}`,
  REPORTS_HEADER: (stageNo) => `${stageNo} Reports`,
};

export default {
  MODE_LABELS,
  UI_STRINGS,
  STAGE_TEMPLATES
};
