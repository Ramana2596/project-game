
// File: cashFlowStatementService.js
// Module: FinCF
// Purpose: Retrieve the cash flow statement from the OpsMgt API.

import api from "../../../core/interceptor/api-interceptor";

// Fetch the cash flow statement for the requested game, team and reporting period.
export function getCashFlowStatement(queryParams) {
    return api.post("/api/getCashFlowStatement", {
        params: { ...queryParams },
    });
}
