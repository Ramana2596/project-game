import api from "../../../core/interceptor/api-interceptor";

// Update Batch Master
export function updateBatchMst(payload) {
  // payload should include all fields with CMD_Line: 'Update'
  return api.post("/api/updateBatchMst", payload);
}