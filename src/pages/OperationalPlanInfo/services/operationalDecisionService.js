import api from "../../../core/interceptor/api-interceptor";

export function getDashboardData() {
  return api.get("/api/data");
}

export function getOperationalDecisionData(queryParams) {
  return api.get("/api/getOperationalPlanInfo", { params: { ...queryParams } });
}
