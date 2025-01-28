import api from "../../../core/interceptor/api-interceptor";

export function getStrategyMasterData(queryParams) {
  return api.get("/api/getStrategyMasterData", {
    params: { ...queryParams },
  });
}

export function addStrategyMaster(marketFactorInfoInputPayload) {
  let payload = {
    ...marketFactorInfoInputPayload,
    cmdLine: "Add_Strategy",
  };
  return api.post("/api/updateStrategyMaster", payload);
}

export function updateStrategyMaster(marketFactorInfoInputPayload) {
  let payload = {
    ...marketFactorInfoInputPayload,
    cmdLine: "Update_Strategy",
  };
  return api.post("/api/updateStrategyMaster", payload);
}

export function deleteStrategyMaster(marketFactorInfoInputPayload) {
  let payload = {
    ...marketFactorInfoInputPayload,
    cmdLine: "Delete_Strategy",
  };
  return api.post("/api/updateStrategyMaster", payload);
}
