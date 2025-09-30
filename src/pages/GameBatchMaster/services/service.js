import api from "../../../core/interceptor/api-interceptor";

// Update batch data using UI_Batch_Mgt_Trans
export function updateGameBatch(payload) {
  // payload should include all fields and CMD_Line: 'Update'
  return api.post("/api/UpdateBatchTrans", payload);
}
