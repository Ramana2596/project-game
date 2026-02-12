// Path: src/pages/TeamPlan/constants/validationRules.js
// Purpose: Minimal, category-agnostic validation — every numeric field must be >= 0

// Return true if value is a finite number and >= 0
export function validateNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0;
}

// Row Validation (all numeric fields >= 0), else return { ok:false, field, message }
export function validateRow(row = {}) {
  for (const [key, val] of Object.entries(row)) {
    if (val === null || val === undefined || val === "") continue; // skip empty fields
    if (typeof val === "boolean") continue; // skip booleans
    const coerced = Number(val);
    if (Number.isFinite(coerced)) {
      if (coerced < 0) {
        return { ok: false, field: key, message: `${key} must be a number >= 0` };
      }
    }
  }
  return { ok: true };
}
