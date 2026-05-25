// src/pages/BatchMasterNew/services/getBatchQuery.js
// Service functions to fetch data for Batch Master details page.

import api from "../../../core/interceptor/api-interceptor";

// Generic POST handler for all API Calls (SP + cmdLine driven)
function fetchBatchQuery(queryParams, cmdLine) {
  return api.post("/api/getBatchMstQuery", {
    ...queryParams,
    cmdLine
  });
}

export function getBatch(queryParams) {
  return fetchBatchQuery(queryParams, "Game_Batch");
}

export function getBatchDetails(queryParams) {
  return fetchBatchQuery(queryParams, "Batch_Details");
}

export function getAdminCentre(queryParams) {
  return fetchBatchQuery(queryParams, "Admin_Centre");
}

export function getBatchStatus(queryParams) {
  return fetchBatchQuery(queryParams, "Batch_Status");
}

export function getFacilitator(queryParams) {
  return fetchBatchQuery(queryParams, "Facilitator");
}

export function getFaculty(queryParams) {
  return fetchBatchQuery(queryParams, "Faculty");
}

export function getUOM(queryParams) {
  return fetchBatchQuery(queryParams, "UOM");
}