// ============================================================
// LEAP V1.0
// File : leapService.js
// Purpose : LEAP data access service
// ============================================================

import api from "../../../core/interceptor/api-interceptor";

// ------------------------------------------------------------
// Get Simulation Stages
// ------------------------------------------------------------
export function getStages(queryParams = {}) {
    return api.get("/api/getLeap", {
        params: {
            ...queryParams,
            cmdLine: "Get_Stage",
        },
    });
}


// ------------------------------------------------------------
// Get LEAP Content
// ------------------------------------------------------------

export function getStageContent(queryParams) {
    return api.get("/api/getLeap", {
        params: {
            ...queryParams,
            cmdLine: "Get_Help",
        },
    });
}

