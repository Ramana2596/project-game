import api from "../../../core/interceptor/api-interceptor";

export function getUserDetails(queryParams) {
  return api.get("/api/getUserDetails", { params: { ...queryParams } });
}

// NOT Required since Initialisation is part of Simulation
/*
export function intiateTeamPlay(queryParams) {
  return api.post("/api/intiateTeamPlay", { ...queryParams });
}
*/