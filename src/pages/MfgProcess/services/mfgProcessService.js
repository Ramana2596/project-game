// ============================================================
// Component: mfgProcessService
// Module: MfgProcess
// Purpose: Manufacturing Process data access service
// AI Tags: manufacturing-process, routing, api, service
// ============================================================

import api from "../../../core/interceptor/api-interceptor";

// Get Manufacturing Process / Routing information
export function getMfgProcess(queryParams) {
  return api.get("/api/getMfgRoutingInfo", {
    params: { ...queryParams },
  });
}

// Get Product Master information
export function getRmStockInfo(queryParams) {
    return api.post('/api/getRmStockInfo',
        {
            params: { ...queryParams }
        });
}

// Get BOM information
export function getBomInfo(queryParams) {
    return api.get('/api/getBomInfo',
        {
            params: { ...queryParams }
        });
}