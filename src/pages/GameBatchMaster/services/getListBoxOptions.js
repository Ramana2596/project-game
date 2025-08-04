import api from "../../../core/interceptor/api-interceptor";

export function fetchFacultyList() {
  return api.get("/api/UI_Batch_Query", { params: { CMD_Line: "Faculty" } });
}
export function fetchFacilitatorList() {
  return api.get("/api/UI_Batch_Query", { params: { CMD_Line: "Facilitator" } });
}
export function fetchUOMList() {
  return api.get("/api/UI_Batch_Query", { params: { CMD_Line: "UOM" } });
}
export function fetchBatchStatusList() {
  return api.get("/api/UI_Batch_Query", { params: { CMD_Line: "Batch_Status" } });
}
export function fetchCentreList() {
  return api.get("/api/UI_Batch_Query", { params: { CMD_Line: "Admin_Centre" } });
}
