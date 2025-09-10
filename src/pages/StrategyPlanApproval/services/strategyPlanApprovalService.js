import api from "../../../core/interceptor/api-interceptor";

/*
export function getStrategyPlan(queryParams) {
  return api.get("/api/getStrategyPlan", { params: { ...queryParams } });
}
*/
export function getStrategyPlan(queryParams) {
  return api.get("/api/getStrategyPlan", {
    params: {
      ...queryParams,
      cmdLine: 'Get_Strategy_Plan'
    },
  });
}
export function updateStrategyPlan(payload) {
  return api.post("/api/updateStrategyPlan", payload);
}
