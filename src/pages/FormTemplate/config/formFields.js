// src/pages/BatchMasterNew/form/formFields.js
// Purpose: Single source of truth for BatchMasterNew (config + validation-ready for DataForm)
// Design: Simple, section-based, compact-friendly, no over-engineering


// ========================
// Sections (User-defined for grouping)
// ========================
export const formSections = {
  basic: "Basic Information",
  centre: "Centre",
  admin: "Admin",
  schedule: "Schedule"
};


// ========================
// Fields (DB + UI merged, DataForm ready)
// ========================
export const formFields = [

  // ========================
  // Basic Information (read-only)
  // ========================

  {
    columnName: "Game_Id",
    label: "Learn Platform",
    section: "basic",
    editable: false,
    visible: true
  },
  {
    columnName: "Game_Batch",
    label: "Batch",
    section: "basic",
    editable: false,
    visible: true,
    type: "number"
  },
  {
    columnName: "Learn_Mode",
    label: "Learning Mode",
    section: "basic",
    editable: false,
    visible: true
  },
  {
    columnName: "Batch_Size",
    label: "Strength",
    section: "basic",
    editable: false,
    visible: true,
    type: "number"
  },
  {
    columnName: "Team_Theme",
    label: "Team Theme",
    section: "basic",
    editable: false,
    visible: true
  },


  // ========================
  // Centre
  // ========================

  {
    columnName: "Centre_Id",
    label: "Centre *",                // Mandatory
    section: "centre",
    editable: true,
    visible: true,
    required: true,
    type: "number",
    ui: { control: "select" }
  },
  {
    columnName: "Venue",
    label: "Venue",
    section: "centre",
    editable: true,
    visible: true
  },


  // ========================
  // Admin
  // ========================

  {
    columnName: "Faculty",
    label: "Faculty *",               // Mandatory
    section: "admin",
    editable: true,
    visible: true,
    required: true,
    type: "number",
    ui: { control: "select" }
  },
  {
    columnName: "Facilitator",
    label: "Facilitator",
    section: "admin",
    editable: true,
    visible: true,
    type: "number",
    ui: { control: "select" }
  },


  // ========================
  // Schedule
  // ========================

  {
    columnName: "Duration",
    label: "Duration",
    section: "schedule",
    editable: true,
    visible: true,
    type: "number"
  },
  {
    columnName: "UOM",
    label: "Unit",
    section: "schedule",
    editable: true,
    visible: true,
    ui: { control: "select" }
  },
  {
    columnName: "Start_Date",
    label: "Start Date *",            // Mandatory
    section: "schedule",
    editable: true,
    visible: true,
    required: true,
    type: "date"
  },
  {
    columnName: "Close_Date",
    label: "Close Date",
    section: "schedule",
    editable: true,
    visible: true,
    type: "date"
  },
  {
    columnName: "Batch_Status",
    label: "Batch Status *",          // Mandatory
    section: "schedule",
    editable: true,
    visible: true,
    required: true,
    ui: { control: "select" }
  },
  {
    columnName: "Batch_Open_Date",
    label: "Batch Open Date",
    section: "schedule",
    editable: true,
    visible: true,
    type: "date"
  }
];


// ========================
// Validation (Simple + Clear)
// ========================
export function validateField(field, value) {

  // Mandatory check
  if (field.required && (value === "" || value === null || value === undefined)) {
    return "Required";
  }

  // Number validation
  if (field.type === "number" && value !== "" && isNaN(value)) {
    return "Must be a number";
  }

  // Date validation
  if (field.type === "date" && value) {
    const isValidDate = !isNaN(new Date(value).getTime());
    if (!isValidDate) {
      return "Invalid date";
    }
  }

  return "";
}


// ========================
// Final Config for DataForm
// ========================
export function getFormConfig() {
  return {
    sections: formSections,
    fields: formFields.filter(f => f.visible !== false)
  };
}