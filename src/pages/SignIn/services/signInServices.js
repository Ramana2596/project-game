import api from "../../../core/interceptor/api-interceptor";

export function getUserDetails(queryParams) {
  return api.get("/api/getUserDetails", { params: { ...queryParams } });
}

export function intiateTeamPlay(queryParams) {
  return api.post("/api/intiateTeamPlay", { ...queryParams });
}
