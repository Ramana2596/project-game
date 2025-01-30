import api from "../../../core/interceptor/api-interceptor";

export function getDashboardData() {
  return api.get("/api/getDashBoardData");
}
