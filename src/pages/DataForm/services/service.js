// Purpose: Generic API service for DataForm (fetch + dropdown + save)

import api from "../../../core/interceptor/api-interceptor";

// Generic POST wrapper (reusable)
function fetchQuery(queryParams, cmdLine) {
  return api.post("/api/getBatchQuery", {
    ...queryParams,
    cmdLine
  });
}

// Fetch main form data
export function fetchDataForm(queryParams) {
  return fetchQuery(queryParams, "Batch_Details");
}

// Fetch dropdowns (extend as needed)
export function fetchDropdowns(queryParams) {
  return fetchQuery(queryParams, "Dropdowns");
}

// Save form data
export function saveDataForm(payload) {
  return api.post("/api/updateBatchMst", payload);
}