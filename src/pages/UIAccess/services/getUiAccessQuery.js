// src/pages/UiAccess/services/getUiAccessQuery.js
// Purpose: API service layer for UI Access related lookup data (cmdLine-driven)

import api from "../../../core/interceptor/api-interceptor";

// Generic POST handler for all UI Access APIs (SP / cmdLine driven)
function fetchUiAccess(queryParams, cmdLine) {

  return api.post("/api/getUiAccessQuery", {
    ...queryParams,
    cmdLine,
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

// -- UI screen master LOOKUP
export function getUiScreen(queryParams) {
  return fetchUiAccess(queryParams, "UI_Screen");
}

// -- ACCESS BY ROLE (main data query)
export function getAccessByRole(queryParams) {
  return fetchUiAccess(queryParams, "Access_By_Role");
}