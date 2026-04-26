// File: src/pages/UiAccess/services/service.js
// Purpose: API calls for UI Access Management

import api from "../../../core/interceptor/api-interceptor";

/* ---------------- Generic POST handler ---------------- */
function fetchUiAccess(queryParams, cmdLine) {
  return api.post("/api/getUiAccessQuery", {
    ...queryParams,
    cmdLine: cmdLine // API Parameter & value
  });
}

/* ---------------- Role Lookup ---------------- */
export function getRole(queryParams) {
  return fetchUiAccess(queryParams, "Role");
}

/* ---------------- Product Area Lookup ---------------- */
export function getProductArea(queryParams) {
  return fetchUiAccess(queryParams, "Product_Area");
}

/* ---------------- Module Lookup ---------------- */
export function getModule(queryParams) {
  return fetchUiAccess(queryParams, "Module");
}

/* ---------------- UI Type Lookup ---------------- */
export function getUiType(queryParams) {
  return fetchUiAccess(queryParams, "UI_Type");
}

/* ---------------- Access By Role (Main Data Query) ---------------- */
export function getAccessByRole(queryParams) {
  return fetchUiAccess(queryParams, "Access_By_Role");
}

/* ---------------- Bulk Update ---------------- */
export function updateUiAccessBulk(payload) {
  return api.post("/api/updateUiAccessBulk", payload);
}
