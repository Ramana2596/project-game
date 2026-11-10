
// src/pages/TeamPlan/constants/columnRules.js
// Purpose: editability rules per operations input (OI) for TeamPlan table columns
// Format: [columnKey][OI_code] = (true = editable, false = read-only)
// OI 001 = Product, OI 002 = Material, OI 003 = Machinery.
// Keys aligned with API/DB field names.

export const COLUMN_RULES = {
  // Info quantity: shown for reference on every tab.
  Info_Qty: {
    "OI 001": false, // Product  : read-only
    "OI 002": false, // Material : read-only
    "OI 003": false, // Machinery: read-only
  },

  // Price source: fixed on Product, chosen from the price list (LOV) on Material and Machinery.
  Info_Price: {
    "OI 001": false, // Product  : read-only (from the API)
    "OI 002": true,  // Material : editable (LOV)
    "OI 003": true,  // Machinery: editable (LOV)
  },

  // Quantity the user wants to order (0 = not ordering now).
  Required_Quantity: {
    "OI 001": true,  // Product  : editable
    "OI 002": true,  // Material : editable (user input)
    "OI 003": true,  // Machinery: editable (user input)
  },

  // Plan quantity: typed on Product, calculated from the selected price on Material and Machinery.
  Quantity: {
    "OI 001": true,  // Product  : editable (Production / Sales plan quantity)
    "OI 002": false, // Material : read-only (order quantity from the price)
    "OI 003": false, // Machinery: read-only (order quantity from the price)
  },

  // Unit price: always system-generated.
  Unit_Price: {
    "OI 001": false, // Product  : read-only
    "OI 002": false, // Material : read-only
    "OI 003": false, // Machinery: read-only
  },
};