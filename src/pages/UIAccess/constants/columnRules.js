// File: src/pages/UiAccess/constants/columnRules.js
// Purpose: editability rules for UiAccess table columns

export const UI_ACCESS_COLUMN_RULES = {


  // Only editable field 
  Assigned: true,

  /* ---------------- DISPLAY ONLY ---------------- */
  Role: false,
  Domain: false,
  Module_Name: false,
  Screen_Name: false,
  Short_Name: false,
  UI_Type_Name: false,

  /* ---------------- FUTURE PERMISSION (LOCKED FOR NOW) ---------------- */
  Permission_Enabled: false,
  Can_View: false,
  Can_Create: false,
  Can_Edit: false,
  Can_Delete: false,
  Can_Approve: false,
  Can_Execute: false,
};