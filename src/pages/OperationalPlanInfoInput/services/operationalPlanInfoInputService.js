import api from "../../../core/interceptor/api-interceptor";

export function getOperationalPlanInfoTableData(queryParams) {
  return api.get("/api/getOperationalPlanInfoInput", {
    params: { ...queryParams },
  });
}

export function getParamValues(queryParams) {
  return api.get("/api/getOperationalPlanInfoInput", {
    params: {
      ...queryParams,
      cmdLine: "Get_Param_Value",
    },
  });
}

export function addOperationalPlanInfo(marketFactorInfoInputPayload) {
  let payload = {
    ...marketFactorInfoInputPayload,
    cmdLine: "Add_Operation_Plan",
  };
  return api.post("/api/updateOperationalDecisionInput", payload);
}

export function updateOperationalPlanInfoInput(marketFactorInfoInputPayload) {
  let payload = {
    ...marketFactorInfoInputPayload,
    cmdLine: "Update_Operation_Plan",
  };
  return api.post("/api/updateOperationalDecisionInput", payload);
}

export function deleteOperationalPlanInfo(marketFactorInfoInputPayload) {
  let payload = {
    ...marketFactorInfoInputPayload,
    cmdLine: "Delete_Operation_Plan",
  };
  return api.post("/api/updateOperationalDecisionInput", payload);
}
