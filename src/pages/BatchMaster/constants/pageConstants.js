// src/pages/BatchMaster/constants/pageConstants.js
// Centralized constants for Batch Master page

export const pageConstants = {
  contentSection: {
    // Button labels
    modifyBtnLabel: "Edit",
    saveBtnLabel: "Save Changes",
    cancelBtnLabel: "Discard",

    // Section definitions 
    sections: {
      basic: "Basic Information",
      centre: "Centre",
      admin: "Admin",
      schedule: "Schedule",
    },

    // Field configuration
    fields: [

      {
        columnName: "Game_Id",
        label: "Learn Platform",
        db: { type: "nvarchar", length: 20 },
        section: "basic",
        editable: false,
        visible: false
      },
      {
        columnName: "Game_Batch",
        label: "Batch",
        db: { type: "int" },
        section: "basic",
        editable: false,
        visible: false
      },
      {
        columnName: "Learn_Mode",
        label: "Learning Mode",
        db: { type: "nvarchar", length: 20 },
        section: "basic",
        editable: false,
        visible: true
      },
      {
        columnName: "Batch_Size",
        label: "Strength",
        db: { type: "tinyint" },
        section: "basic",
        editable: false,
        visible: true
      },
      {
        columnName: "Team_Theme",
        label: "Team Theme",
        db: { type: "nvarchar", length: 20 },
        section: "basic",
        editable: false,
        visible: true
      },

      // Centre
      {
        columnName: "Centre_Id",
        label: "Centre",
        db: { type: "int" },
        section: "centre",
        editable: true,
        visible: true,
        ui: { control: "select" }
      },
      {
        columnName: "Venue",
        label: "Venue",
        db: { type: "nvarchar", length: 100 },
        section: "centre",
        editable: true,
        visible: true
      },

      // Admin
      {
        columnName: "Faculty",
        label: "Faculty",
        db: { type: "int" },
        section: "admin",
        editable: true,
        visible: true,
        ui: { control: "select" }
      },
      {
        columnName: "Facilitator",
        label: "Facilitator",
        db: { type: "int" },
        section: "admin",
        editable: true,
        visible: true,
        ui: { control: "select" }
      },

      // Schedule

      {
        columnName: "Duration",
        label: "Duration",
        db: { type: "tinyint" },
        section: "schedule",
        editable: true,
        visible: true
      },
      {
        columnName: "UOM",
        label: "Unit",
        db: { type: "nvarchar", length: 10 },
        section: "schedule",
        editable: true,
        visible: true,
        ui: { control: "select" }
      },
      {
        columnName: "Start_Date",
        label: "Start Date",
        db: { type: "date" },
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
        columnName: "Batch_Status",
        label: "Batch Status",
        db: { type: "nvarchar", length: 20 },
        section: "admin",
        editable: true,
        visible: true,
        ui: { control: "select" }
      },
      {
        columnName: "Batch_Open_Date",
        label: "Batch Open Date",
        db: { type: "date" },
        section: "admin",
        editable: true,
        visible: true
      },

      // System Fields (hidden in UI, used in backend)

      {
        columnName: "Created_By",
        label: "Created By",
        db: { type: "int" },
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
        db: { type: "int" },
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