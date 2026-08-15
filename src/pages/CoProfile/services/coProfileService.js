// ============================================================
// Component: coProfileService
// Module: Company Profile
// Purpose: Company Profile data access service
// ============================================================

import api from "../../../core/interceptor/api-interceptor";

// Get Product information
export function getProducts(queryParams) {
  return api.get("/api/getProductMstInfo", {
    params: { ...queryParams },
  });
}

