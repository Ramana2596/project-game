// File: src/pages/UiAccess/services/service.js
// Purpose: API calls for UI Access Management

import api from "../../../core/interceptor/api-interceptor";

// GET with query parameters (frontend uses camelCase)
export function getUiAccessQuery(queryParams) {
  return api.post("/api/getUiAccessQuery", queryParams );
}

// Bulk update API call, accepts array of rows from in-memory table
export function updateUiAccessBulk(rows) {
  return api.post("/api/updateUiAccessBulk", { rows });
}
