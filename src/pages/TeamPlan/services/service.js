// File: src/pages/TeamPlan/services/service.js
// Purpose: API calls for Ops Business Plan

import api from "../../../core/interceptor/api-interceptor";

// POST with payload 
export function getOpsPlanQuery(payload) {
  return api.post("/api/getOpsPlanQuery", payload);
}

// Bulk update API call, accepts array of rows from in-memory table (TVP)
export function updateOpsPlanBulk(rows, userId) {
  return api.post("/api/updateOpsPlanBulk", {
    rows,
    userId,
  });
}

// GET guide data for the active game, team and production month.
export function getOpsPlanGuide(params) {
  return api.get("/api/getOpsPlanGuide", { params });
}
