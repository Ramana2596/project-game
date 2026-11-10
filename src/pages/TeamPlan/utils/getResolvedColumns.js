// File: src/pages/TeamPlan/utils/getResolvedColumns.js
// Purpose: the table columns for a tab, each marked editable or read-only from COLUMN_RULES.

// Column lists: Product tab and the other tabs.
import { PRODUCT_COLUMNS, OTHER_COLUMNS } from "../constants/tableColumns.js";

// Editable rules per column and tab.
import { COLUMN_RULES } from "../constants/columnRules.js";

// True for the Product tab (OI 001); Material and Machinery use the other column list.
const isProductTab = (operationsInputId) => operationsInputId === "OI 001";

// Return the columns of a tab with an `editable` flag on each.
export function getResolvedColumns(operationsInputId) {
  // Pick the base column list for the tab.
  const baseColumns = isProductTab(operationsInputId)
    ? PRODUCT_COLUMNS
    : OTHER_COLUMNS;

  // Add the editable flag from COLUMN_RULES; a column with no rule is read-only.
  return baseColumns.map((col) => ({
    ...col,
    editable: COLUMN_RULES?.[col.key]?.[operationsInputId] ?? false,
  }));
}