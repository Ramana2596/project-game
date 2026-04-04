// src/pages/BatchMaster/constants/pageConstants.js
// Purpose: Centralized constants for Batch Master page (DB-first + UI derived configuration)

export const pageConstants = {
  contentSection: {
    // Button labels
    modifyBtnLabel: "Edit",
    saveBtnLabel: "Save Changes",
    cancelBtnLabel: "Discard",

    // Section definitions for grouped UI rendering
    sections: {
      basic: "Basic Information",
      assignment: "Assignment",
      schedule: "Schedule",
      config: "Configuration"
    },

    // Field configuration (DB is source of truth, UI derived later)
    fields: [

      // ========================
      // Basic Information (read-only)
      // ========================

      {
        columnName: "Game_Id",
        label: "Game",
        db: { type: "nvarchar", length: 20 },        // ✅ Added DB definition
        section: "basic",
        editable: false,
        visible: true
      },

      {
        columnName: "Game_Batch",
        label: "Batch",
        db: { type: "int" },                         // ✅ Added DB definition
        section: "basic",
        editable: false,
        visible: true
      },

      {
        columnName: "Learn_Mode",
        label: "Learning Mode",
        db: { type: "nvarchar", length: 20 },        // ✅ Added DB definition
        section: "basic",
        editable: false,
        visible: true
      },

      {
        columnName: "Batch_Size",
        label: "Batch Size",
        db: { type: "tinyint" },                     // ✅ Added DB definition
        section: "basic",
        editable: false,
        visible: true
      },

      {
        columnName: "Team_Theme",
        label: "Team Theme",
        db: { type: "nvarchar", length: 20 },        // ✅ Added DB definition
        section: "basic",
        editable: false,
        visible: true
      },

      // ========================
      // Assignment
      // ========================

      {
        columnName: "Centre_Id",
        label: "Centre",
        db: { type: "int" },                         // ✅ Added DB definition
        section: "assignment",
        editable: true,
        visible: true,
        ui: { control: "select" }                    // ✅ Only where override needed ✔
      },

      {
        columnName: "Faculty",
        label: "Faculty",
        db: { type: "int" },
        section: "assignment",
        editable: true,
        visible: true,
        ui: { control: "select" }                    // ✅ Override ✔
      },

      {
        columnName: "Facilitator",
        label: "Facilitator",
        db: { type: "int" },
        section: "assignment",
        editable: true,
        visible: true,
        ui: { control: "select" }                    // ✅ Override ✔
      },

      // ========================
      // Schedule
      // ========================

      {
        columnName: "Start_Date",
        label: "Start Date",
        db: { type: "date" },                        // ✅ Added DB definition
        section: "schedule",
        editable: true,
        visible: true
      },

      {
        columnName: "Close_Date",
        label: "Close Date",
        db: { type: "date" },
        section: "schedule",
        editable: true,
        visible: true
      },

      {
        columnName: "Batch_Open_Date",
        label: "Batch Open Date",
        db: { type: "date" },
        section: "schedule",
        editable: true,
        visible: true
      },

      {
        columnName: "Duration",
        label: "Duration",
        db: { type: "tinyint" },                     // ✅ Added DB definition
        section: "schedule",
        editable: true,
        visible: true
      },

      // ========================
      // Configuration
      // ========================

      {
        columnName: "UOM",
        label: "Unit of Measure",
        db: { type: "nvarchar", length: 10 },
        section: "config",
        editable: true,
        visible: true,
        ui: { control: "select" }                    // ✅ Override ✔
      },

      {
        columnName: "Batch_Status",
        label: "Batch Status",
        db: { type: "nvarchar", length: 20 },
        section: "config",
        editable: true,
        visible: true,
        ui: { control: "select" }                    // ✅ Override ✔
      },

      {
        columnName: "Venue",
        label: "Venue",
        db: { type: "nvarchar", length: 100 },       // ✅ Drives span later
        section: "config",
        editable: true,
        visible: true
      },

      // ========================
      // System Fields (hidden in UI, used in backend)
      // ========================

      {
        columnName: "Created_By",
        label: "Created By",
        db: { type: "nvarchar", length: 50 },
        section: "system",
        editable: false,
        visible: false
      },

      {
        columnName: "Created_On",
        label: "Created On",
        db: { type: "date" },
        section: "system",
        editable: false,
        visible: false
      },

      {
        columnName: "Modified_By",
        label: "Modified By",
        db: { type: "nvarchar", length: 50 },
        section: "system",
        editable: false,
        visible: false
      },

      {
        columnName: "Modified_On",
        label: "Modified On",
        db: { type: "date" },
        section: "system",
        editable: false,
        visible: false
      }

    ]
  }
};