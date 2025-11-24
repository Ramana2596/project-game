import api from "../../../core/interceptor/api-interceptor";

export function getOpsPlanId(queryParams) {
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

export function addOpsPlanInput(getFramedPayload) {
  let payload = {
    ...getFramedPayload,
    cmdLine: "Add_Operation_Plan",
  };
  return api.post("/api/updateOpsPlanInput", payload);
}

export function updateOpsPlanInput(getFramedPayload) {
  let payload = {
    ...getFramedPayload,
    cmdLine: "Update_Operation_Plan",
  };
  return api.post("/api/updateOpsPlanInput", payload);
}

export function deleteOpsPlanInput(getFramedPayload) {
  let payload = {
    ...getFramedPayload,
    cmdLine: "Delete_Operation_Plan",
  };
  return api.post("/api/updateOpsPlanInput", payload);
}