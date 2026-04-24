// File: src/pages/UiAccess/constants/uiAccessColumns.js
// Purpose: Define table columns for UI Access

export const UI_ACCESS_COLUMNS = [

  /* ---------------- Editable Column ---------------- */
  { key: "Assigned", label: "Access", type: "checkbox" }, // Tick (Add) or X (Delete)

  /* ---------------- Display Only Columns ---------------- */
  { key: "Role", label: "Role" },
  { key: "Domain", label: "Domain" },
  { key: "Module_Name", label: "Module" },
  { key: "Screen_Name", label: "Screen Name" },
  { key: "Short_Name", label: "Short Name" },
  { key: "UI_Type_Name", label: "UI Type" },

  /* ---------------- Future Permission Columns (Display Only) ---------------- */
  { key: "Permission_Enabled", label: "Perm" },
  { key: "Can_View", label: "View" },
  { key: "Can_Create", label: "Create" },
  { key: "Can_Edit", label: "Edit" },
  { key: "Can_Delete", label: "Delete" },
  { key: "Can_Approve", label: "Approve" },
  { key: "Can_Execute", label: "Execute" },
];
