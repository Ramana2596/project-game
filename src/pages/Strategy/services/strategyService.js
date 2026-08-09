/**
 * Component Name : strategyService
 * Module         : Strategy
 * Purpose        : Data-access layer for the Strategy Plan page.
 *                   Calls the OpsMgt API via the shared api-interceptor,
 *                   isolating hooks/UI from endpoint and transport detail.
 * Author/Version : OpsMgt UX Lab / v1.0
 * AI Tags        : strategy, service, data-access, api
 */

import api from "../../../core/interceptor/api-interceptor";

// --------------------------------------------------------------
// fetchStrategyPlan
// Retrieves the strategy roster for the current team/game session.
// queryParams e.g. { gameId, teamId } — passed through as query string.
// --------------------------------------------------------------
export function fetchStrategyPlan(queryParams) {
  return api.get("/api/getStrategyPlan", {
    params: { ...queryParams },
  });
}

// --------------------------------------------------------------
// saveStrategyDecisions
// Persists the team's YES/NO implement decisions.
// decisions: { [strategyId]: "YES" | "NO" }
// --------------------------------------------------------------
export function saveStrategyDecisions(decisions, queryParams) {
  return api.post(
    "/api/saveStrategyDecisions",
    { decisions },
    { params: { ...queryParams } }
  );
}