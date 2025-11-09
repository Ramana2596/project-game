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

export function addOperationalPlanInfo(getFramedPayload) {
  let payload = {
    ...getFramedPayload,
    cmdLine: "Add_Operation_Plan",
  };
  return api.post("/api/updateOperationalDecisionInput", payload);
}

export function updateOperationalPlanInfoInput(getFramedPayload) {
  let payload = {
    ...getFramedPayload,
    cmdLine: "Update_Operation_Plan",
  };
  return api.post("/api/updateOperationalDecisionInput", payload);
}

export function deleteOperationalPlanInfo(getFramedPayload) {
  let payload = {
    ...getFramedPayload,
    cmdLine: "Delete_Operation_Plan",
  };
  return api.post("/api/updateOperationalDecisionInput", payload);
}