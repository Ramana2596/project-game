// File: src/pages/TeamPlan/utils/planRules.js
// Purpose: Business rules, validation and number formatting for the Operations
//          Business Plan. Typing (TeamPlanItem) and saving (useTeamPlan) use the
//          same rules from here.
//
// Rules
//   Quantity          numeric(8,0): whole number, 0 or more, up to 99,999,999
//   Required_Quantity typed like Quantity; 0 means "not ordering now"
//   Unit_Price        numeric(8,2): system-generated, shown with 2 decimals
//   Numbers are never negative.

/* ---------------- Limits ---------------- */

export const MAX_QUANTITY = 99999999; // Quantity: numeric(8,0), whole numbers
export const MAX_AMOUNT = 999999.99; // Unit price: numeric(8,2)

// Columns shown right-aligned with equal-width digits.
export const NUMERIC_KEYS = ["Quantity", "Unit_Price", "Required_Quantity"];

/* ---------------- Small helpers ---------------- */

export const isBlank = (v) => v === "" || v == null;

// 0 (or "0", "0.") typed in Required_Quantity means: not ordering now.
export const isZero = (v) =>
  !isBlank(v) && Number.isFinite(Number(v)) && Number(v) === 0;

// Unique row key inside a tab: Part_No + Quantity_Id.
export const getRowKey = (r) => `${r?.Part_No ?? ""}|${r?.Quantity_Id ?? ""}`;

// Replace changed rows with the same key, then append the new ones.
export const mergeChanged = (list = [], rows) => {
  const keys = new Set(rows.map(getRowKey));
  return [...list.filter((r) => !keys.has(getRowKey(r))), ...rows];
};

/* ---------------- Typing rules (while the user types) ---------------- */

// Typed quantities are whole numbers: digits only. A minus sign or a decimal
// point is never accepted, so numbers cannot be negative or fractional.
const NUMBER_PATTERN = /^\d*$/;
const HINT_NUMBERS = "Whole numbers only, 0 or more";
const HINT_MAX = `Maximum is ${MAX_QUANTITY.toLocaleString("en-US")}`;

// Returns the reason a typed value is refused, or "" when it is accepted.
export const checkTypedQuantity = (value) => {
  if (!NUMBER_PATTERN.test(value)) return HINT_NUMBERS;
  if (Number(value) > MAX_QUANTITY) return HINT_MAX;
  return "";
};

/* ---------------- Save rules (before the API call) ---------------- */

// Typed Quantity (Product tab): whole number, 0 or more. Returns "" when valid.
const checkQuantity = (value) => {
  if (isBlank(value)) return "Quantity is required";
  const text = String(value).trim();
  if (!/^\d+$/.test(text)) return "Quantity must be a whole number, 0 or more";
  if (Number(text) > MAX_QUANTITY) {
    return `Quantity must be ${MAX_QUANTITY.toLocaleString("en-US")} or less`;
  }
  return "";
};

// System-generated value (price list, price): only guard against values the
// database cannot hold. The user cannot edit these, so decimals are not blamed.
const checkSystemValue = (label, value, max) => {
  if (isBlank(value)) return `${label} is missing`;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return `${label} is not valid`;
  if (n > max) return `${label} is too large (maximum ${max.toLocaleString("en-US")})`;
  return "";
};

// Validate changed rows. Returns { rowKey: message } for rows with a problem.
export const validateRows = (rows, tab) => {
  const errors = {};
  rows.forEach((r) => {
    const message =
      (tab === "OI 001"
        ? checkQuantity(r.Quantity)
        : checkSystemValue("Order quantity", r.Quantity, MAX_QUANTITY)) ||
      (isBlank(r.Unit_Price)
        ? ""
        : checkSystemValue("Unit price", r.Unit_Price, MAX_AMOUNT)) ||
      // Nothing ordered (Quantity 0) needs no price source.
      (tab !== "OI 001" && isBlank(r.Price_Id) && Number(r.Quantity) !== 0
        ? "Select a price"
        : "");
    if (message) errors[getRowKey(r)] = message;
  });
  return errors;
};

/* ---------------- Display formatting ---------------- */

// Quantity: whole numbers as "1,124". A system value with decimals still shows them.
export const formatQuantity = (value) => {
  if (isBlank(value)) return "";
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};

// Price: two decimals, e.g. 28.4 -> "28.40", 873852 -> "873,852.00".
export const formatPrice = (value) => {
  if (isBlank(value)) return "";
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};