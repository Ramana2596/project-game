// Service: srService
// Module: StrategyResults
// Purpose: API calls for strategy plan and result data

import api from "../../../core/interceptor/api-interceptor";

export function getStrategyPlanTeam(queryParams) {
  return api.get("/api/getStrategyPlanTeam", {
    params: { ...queryParams },
  });
}

export function getStrategyBudgetInfo(queryParams) {
  return api.get("/api/getStrategyBudgetInfo", {
    params: { ...queryParams },
  });
}

export function getOpsDemandCreationInfo(queryParams) {
  return api.get("/api/getOpsDemandCreationInfo", {
    params: { ...queryParams },
  });
}

export function getOpsDiscountOfferInfo(queryParams) {
  return api.get("/api/getOpsDiscountOfferInfo", {
    params: { ...queryParams },
  });
}

export function getOpsSavingsPlanInfo(queryParams) {
  return api.get("/api/getOpsSavingsPlanInfo", {
    params: { ...queryParams },
  });
}