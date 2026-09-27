// Component Name : finISService
// Module         : FinIS (Income Statement)
// Purpose        : Standardized API call to the getIncomeStatementInfo route, which wraps
//                  [dbo].[UI_Income_Statement_Dynamic] on the server.
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, service, api, stored-procedure

import api from "../../../core/interceptor/api-interceptor";

// Get Income Statement information
export function getIncomeStatementInfo(queryParams) {
    return api.post("/api/getIncomeStatementInfo", {
        params: { ...queryParams },
    });
}

export default { getIncomeStatementInfo };