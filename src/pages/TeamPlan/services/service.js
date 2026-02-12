// Path: src/pages/TeamPlan/services/service.js
// API calls for Ops Business Plan

import api from "../../../core/interceptor/api-interceptor";

// GET with query parameters (frontend uses camelCase)
export function getOpsPlanQuery(queryParams) {
  return api.get("/api/getOpsPlanQuery", { params: queryParams });
}

// Bulk update API call, accepts array of rows from in-memory table (TVP)
export function updateOpsPlanBulk(rows, userRole) {
  return api.post("/api/updateOpsPlanBulk", {
    rows,
    userRole,
  });
}


