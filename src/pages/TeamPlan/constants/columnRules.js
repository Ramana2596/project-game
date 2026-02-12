
// src/pages/TeamPlan/constants/columnRules.js
// Purpose: editability rules per operations input (OI) for TeamPlan table columns
// Format: [columnKey][OI_code] = (true = editable, false = read-only)

// Keys aligned with API/DB field names.
export const COLUMN_RULES = {

  Info_Qty: {
    "OI 001": false, // Product  : Fixed (read-only)
    "OI 002": false, // Material : Fixed (read-only)
    "OI 003": false, // Machinery: Fixed (read-only)
  },

  Info_Price: {
    "OI 001": false, // Product  : Fixed (API-driven)
    "OI 002": true,  // Material : Editable (LOV)
    "OI 003": true,  // Machinery: Editable (LOV)
  },

  Required_Quantity: {
    "OI 001": true,  // Product  : Editable (user input)
    "OI 002": true,  // Material : Editable (user input)
    "OI 003": true,  // Machinery: Editable (user input)
  },

  Quantity: {
    "OI 001": true, // Product  : Read-only (Order_Quantity shown)
    "OI 002": false, // Material : Read-only (Order_Quantity shown)
    "OI 003": false, // Machinery: Read-only (Order_Quantity shown)
  },

  Unit_Price: {
    "OI 001": false, // Product  : Read-only
    "OI 002": false, // Material : Read-only
    "OI 003": false, // Machinery: Read-only
  },
};
