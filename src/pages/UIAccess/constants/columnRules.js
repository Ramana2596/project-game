// File: src/pages/UiAccess/constants/columnRules.js
// Purpose: Editability rules for UiAccess table columns

export const UI_ACCESS_COLUMN_RULES = {

  /* ---------------- Editable Column ---------------- */
  Assigned: true, 

  /* ---------------- Display Only Columns ---------------- */
  Role: false,
  Domain: false,
  Module_Name: false,
  Screen_Name: false,
  Short_Name: false,
  UI_Type_Name: false,

  /* ---------------- Future Permission Columns (Locked for Now) ---------------- */
  Permission_Enabled: false,
  Can_View: false,
  Can_Create: false,
  Can_Edit: false,
  Can_Delete: false,
  Can_Approve: false,
  Can_Execute: false,
};
