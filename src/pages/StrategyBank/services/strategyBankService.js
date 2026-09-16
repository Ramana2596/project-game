// ============================================================
// Module: StrategyBank Service
// Purpose: Retrieve Strategy Bank benefit data from the API
// AI Tags: strategy-bank, service, api, strategy-benefit
// ============================================================

import api from "../../../core/interceptor/api-interceptor";

// Fetch Strategy Bank strategy-benefit reference data.
export function getStrategyBenefit(queryParams) {
  return api.post("/api/getStrategyBenefit", {
    params: { ...queryParams },
  });
}