// File: src/pages/TeamPlan/services/guideService.js
// Purpose: API call for the Guide card - stored procedure UI_Ops_Business_Plan_Guide.
// Recommended response: one call, NAMED lists (the names are free, lists are recognised by their columns):
//   { demand: [...], fgStock: [...], rmStock: [...], bom: [...], plant: [...], machines: [...] }
// `machines` is optional (per-machine capacity and load). The route name is a placeholder: match your backend.

import api from "../../../core/interceptor/api-interceptor";

export function getOpsPlanGuide(queryParams) {
  return api.post("/api/getOpsPlanGuide", {
    params: { ...queryParams },
  });
}