// src/pages/TeamPlan/utils/getResolvedColumns.js
// Tab (Product or Others) Vs Respective Columns

import { PRODUCT_COLUMNS, OTHER_COLUMNS } from "../constants/tableColumns.js";
import { COLUMN_RULES } from "../constants/columnRules.js";

/* ---------------- Helper: Identify Product tab ---------------- */
// Product: Parameter - 'OI 001'
const isProductTab = (operationsInputId) => operationsInputId === "OI 001";

/* ---------------- Resolve Columns based on tab ---------------- */
export function getResolvedColumns(operationsInputId) {

  // Selection of base columns
  const baseColumns = isProductTab(operationsInputId)
    ? PRODUCT_COLUMNS
    : OTHER_COLUMNS;

  /* ---------------- Merge editable rules from COLUMN_RULES ---------------- */
  return baseColumns.map((col) => ({
    ...col,

    // Lookup tabs/columns (latest columns list)
    editable: COLUMN_RULES?.[col.key]?.[operationsInputId] ?? false,
  }));
}
