// ============================================================
// Component: mfgProcessService
// Module: MfgProcess
// Purpose: Manufacturing Process data access service
// AI Tags: manufacturing-process, routing, api, service
// ============================================================

import api from "../../../core/interceptor/api-interceptor";

// ------------------------------------------------------------
// Get Manufacturing Process / Routing information
// ------------------------------------------------------------
export function getMfgProcess(queryParams) {
  return api.get("/api/getMfgRoutingInfo", {
    params: { ...queryParams },
  });
}