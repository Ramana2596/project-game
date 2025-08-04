import api from "../../../core/interceptor/api-interceptor";

// Get batch data or list box values using UI_Batch_Mgt_Query
export function getBatchMaster(params) {
  // params: { CMD_Line: 'Batch_Info' | 'Faculty' | 'Facilitator' | 'UOM' | 'Batch_Status' | 'Admin_Centre' | ... }
  return api.get("/api/UI_Batch_Mgt_Query", { params });
}

// Update batch data using UI_Batch_Mgt_Trans
export function updateGameBatch(payload) {
  // payload should include all fields and CMD_Line: 'Update'
  return api.post("/api/UI_Batch_Mgt_Trans", payload);
}
