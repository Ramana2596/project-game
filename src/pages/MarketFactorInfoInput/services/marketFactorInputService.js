import api from "../../../core/interceptor/api-interceptor";

export function getMarketFactorInfoTableData(queryParams) {
  return api.get("/api/getMarketFactorInfoInput", {
    params: { ...queryParams },
  });
}

export function getParamValues(queryParams) {
  return api.get("/api/getMarketFactorInfoInput", {
    params: {
      ...queryParams,
      cmdLine: "Get_Param_Value",
    },
  });
}

export function addMarketFactorInfoInput(marketFactorInfoInputPayload) {
  let payload = {
    ...marketFactorInfoInputPayload,
    cmdLine: "Add_Market_Factor",
  };
  return api.post("/api/updateMarketFactorInput", payload);
}

export function updateMarketFactorInfoInput(marketFactorInfoInputPayload) {
  let payload = {
    ...marketFactorInfoInputPayload,
    cmdLine: "Update_Market_Factor",
  };
  return api.post("/api/updateMarketFactorInput", payload);
}

export function deleteMarketFactorInfo(marketFactorInfoInputPayload) {
  let payload = {
    ...marketFactorInfoInputPayload,
    cmdLine: "Delete_Market_Factor",
  };
  return api.post("/api/updateMarketFactorInput", payload);
}
