// File: src/pages/UiAccess/services/service.js
// Purpose: API calls for UI Access Management

import api from "../../../core/interceptor/api-interceptor";

// Generic POST handler for all UI Access APIs (SP / cmdLine driven)
function fetchUiAccess(queryParams, cmdLine) {

  return api.post("/api/getUiAccessQuery", {
    ...queryParams,
    CMD_Line: cmdLine   // SP vs API parameter name
  });
}

// -- ROLE LOOKUP
export function getRole(queryParams) {
  return fetchUiAccess(queryParams, "Role");
}

// -- PRODUCT AREA LOOKUP
export function getProductArea(queryParams) {
  return fetchUiAccess(queryParams, "Product_Area");
}

// -- MODULE LOOKUP
export function getModule(queryParams) {
  return fetchUiAccess(queryParams, "Module");
}

// -- UI TYPE LOOKUP
export function getUiType(queryParams) {
  return fetchUiAccess(queryParams, "UI_Type");
}

// -- ACCESS BY ROLE (main data query)
export function getAccessByRole(queryParams) {
  return fetchUiAccess(queryParams, "Access_By_Role");
}

// Bulk update API call, accepts array of rows from in-memory table
export function updateUiAccessBulk(payload) {
  return api.post("/api/updateUiAccessBulk", payload);
}