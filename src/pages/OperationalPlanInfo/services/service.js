import api from "../../../core/interceptor/api-interceptor";

export function getDashboardData() {
  return api.get("/api/data");
}

export function getOpsPlanData(queryParams) {
  return api.post("/api/getOperationalPlanInfo",
    {
      params: {
        ...queryParams, cmdLine: "Operation_Plan"
      }
    })
}
