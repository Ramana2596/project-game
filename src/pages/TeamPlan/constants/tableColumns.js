// File: src/pages/TeamPlan/constants/tableColumns.js
// Purpose: Define table columns aligned with API response fields

// Product tab columns
export const PRODUCT_COLUMNS = [
  { key: "Description", label: "Description" },
  { key: "Info_Qty", label: "Operation Plan Info" },   // fixed, non-editable (Quantity_Id Description)
  { key: "UOM", label: "UOM" },
  { key: "Quantity", label: "Quantity" },        // numeric value keyed-in
  { key: "Currency", label: "Currency" },
  { key: "Unit_Price", label: "Unit Price" },
  { key: "Info_Price", label: "Buy Info" },    // Price_Id Description,)
];

// Other tabs (Material, Capital, etc.)
export const OTHER_COLUMNS = [
  { key: "Description", label: "Description" },
  { key: "Info_Qty", label: "Operation Plan Info" },   // fixed, non-editable   (Quantity_Id Description)
  { key: "UOM", label: "UOM" },
  { key: "Required_Quantity", label: "Required Quantity" }, // user editable
   { key: "Info_Price", label: "Buy Info" },  // LOV field (dropdown by description, Price_Id)
  { key: "Quantity", label: "Order_Quantity" },        // read-only effective value (DB key)
  { key: "Currency", label: "Currency" },
  { key: "Unit_Price", label: "Unit Price" },
];
