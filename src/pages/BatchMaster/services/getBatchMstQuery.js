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

// Fetch Game Batch No
export function getGameBatch(queryParams) {
  return fetchBatchQuery(queryParams, "Game_Batch");
}

// Fetch Game Batch Details
export function getGameBatchDetails(queryParams) {
  return fetchBatchQuery(queryParams, "Batch_Details");
}

// Fetch Admin Centre
export function getAdminCentre(queryParams) {
  return fetchBatchQuery(queryParams, "Admin_Centre");
}

// Fetch Batch Status
export function getBatchStatus(queryParams) {
  return fetchBatchQuery(queryParams, "Batch_Status");
}

// Fetch Facilitator
export function getFacilitator(queryParams) {
  return fetchBatchQuery(queryParams, "Facilitator");
}

// Fetch Faculty
export function getFaculty(queryParams) {
  return fetchBatchQuery(queryParams, "Faculty");
}

// Fetch UOM
export function getUOM(queryParams) {
  return fetchBatchQuery(queryParams, "UOM");
}