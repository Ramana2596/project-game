// File: src/pages/TeamPlan/utils/planRules.js
// Purpose: validation rules and number formatting for the TeamPlan screen.

// Rules: numbers are never negative.
//   Quantity          numeric(8,0): whole number, 0 or more, up to 99,999,999
//   Unit_Price        numeric(8,2): system-generated
//   Required_Quantity keyed-in value; 0 means "not ordering now"

/* ---------------- Limits ---------------- */

// Largest Quantity the database can hold (numeric(8,0)).
export const MAX_QUANTITY = 99999999;

// Largest unit price the database can hold (numeric(8,2)).
export const MAX_AMOUNT = 999999.99;

// Columns shown right-aligned with equal-width digits.
export const NUMERIC_KEYS = ["Quantity", "Unit_Price", "Required_Quantity"];

/* ---------------- Small helpers ---------------- */

// True for an empty string, null or undefined.
export const isBlank = (v) => v === "" || v == null;

// True for 0, "0" or "0." (typed in Required_Quantity it means: not ordering now).
export const isZero = (v) =>
  !isBlank(v) && Number.isFinite(Number(v)) && Number(v) === 0;

// Unique row key inside a tab: Part_No + Quantity_Id.
export const getRowKey = (r) => `${r?.Part_No ?? ""}|${r?.Quantity_Id ?? ""}`;

// Replace changed rows that have the same key, then append the new ones.
export const mergeChanged = (list = [], rows) => {
  const keys = new Set(rows.map(getRowKey));
  return [...list.filter((r) => !keys.has(getRowKey(r))), ...rows];
};

/* ---------------- Typing rules (while the user types) ---------------- */

// Digits only: a minus sign or decimal point is refused, so numbers stay whole and non-negative.
const NUMBER_PATTERN = /^\d*$/;

// Messages shown under the input when a key is refused.
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

// System-generated value (price list, price): only guard against values the database cannot hold.
// The user cannot edit these, so decimals are not blamed.
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
      // Quantity: typed on the Product tab, calculated on the others.
      (tab === "OI 001"
        ? checkQuantity(r.Quantity)
        : checkSystemValue("Order quantity", r.Quantity, MAX_QUANTITY)) ||
      // Unit price: only checked when present.
      (isBlank(r.Unit_Price)
        ? ""
        : checkSystemValue("Unit price", r.Unit_Price, MAX_AMOUNT)) ||
      // Material / Machine tabs: a price source is needed unless nothing is ordered (Quantity 0).
      (tab !== "OI 001" && isBlank(r.Price_Id) && Number(r.Quantity) !== 0
        ? "Select a price"
        : "");
    if (message) errors[getRowKey(r)] = message;
  });
  return errors;
};

/* ---------------- Display formatting ---------------- */

// Quantity: whole numbers as "1,124"; a system value with decimals still shows them (up to 2).
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