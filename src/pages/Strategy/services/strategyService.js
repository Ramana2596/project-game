// Service: strategyService — data access for Strategy page
// Purpose: fetch and save strategy plan data
// Author/Version: OpsMgt UX Lab / v1.0

import api from "../../../core/interceptor/api-interceptor";

// Fetch strategy plan (mocked for now)
export async function getStrategyPlan(queryParams) {
  //Uncomment below when backend is ready:
   return api.get("/api/getStrategyPlan", { params: { ...queryParams } });

  // Mock data — sample strategies
  return {
    strategies: [
      {
        strategyId: "S1",
        strategy: "Expand Market Reach",
        benefit: "New customers",
        businessEnabler: "Leadership",
        mutualGroup: null,
        uom: "USD",
        budgetAmount: 50000,
        implementDecision: "NO",
        fromMonthNo: 1,
        duration: 6,
        gainPct: 15,
        lossPct: 0,
        outcome: "Increased revenue",
        costType: "CapEx",
        investPeriod: "2026-04-01",
      },
      {
        strategyId: "S2",
        strategy: "Optimize Operations",
        benefit: "Lower costs",
        businessEnabler: "Efficiency",
        mutualGroup: "A",
        uom: "USD",
        budgetAmount: 30000,
        implementDecision: "NO",
        fromMonthNo: 2,
        duration: 12,
        gainPct: 10,
        lossPct: 2,
        outcome: "Improved margins",
        costType: "OpEx",
        investPeriod: "2026-05-01",
      },
      {
        strategyId: "S3",
        strategy: "Invest in R&D",
        benefit: "Innovation pipeline",
        businessEnabler: "Innovation",
        mutualGroup: "A",
        uom: "USD",
        budgetAmount: 40000,
        implementDecision: "NO",
        fromMonthNo: 3,
        duration: 18,
        gainPct: 20,
        lossPct: 5,
        outcome: "New product launches",
        costType: "CapEx",
        investPeriod: "2026-06-01",
      },
    ],
  };
}

export function  updateStrategyPlan(payload) {
  return api.post("/api/updateStrategyPlan", payload);
}
