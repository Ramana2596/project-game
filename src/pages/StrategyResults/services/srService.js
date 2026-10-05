// Service: srService
// Module: StrategyResults
// Purpose: API calls for strategy plan and result data
// Author/Version: OpsMgt UX Lab / v2.0
// AI Tags: strategy, results, service, api

import api from "../../../core/interceptor/api-interceptor";

export function getStrategyPlanTeam(queryParams) {
  return api.post("/api/getStrategyPlanTeam", {
    params: { ...queryParams },
  });
}

export function getStrategyBudgetInfo(queryParams) {
  return api.get("/api/getStrategyBudgetInfo", {
    params: { ...queryParams },
  });
}

export function getOpsDemandCreationInfo(queryParams) {
  return api.post("/api/getOpsDemandCreationInfo", {
    params: { ...queryParams },
  });
}

export function getOpsDiscountOfferInfo(queryParams) {
  return api.post("/api/getOpsDiscountOfferInfo", {
    params: { ...queryParams },
  });
}

export function getOpsSavingsPlanInfo(queryParams) {
  return api.post("/api/getOpsSavingsPlanInfo", {
    params: { ...queryParams },
  });
}