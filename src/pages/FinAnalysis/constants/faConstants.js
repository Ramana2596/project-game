
// Constants: faConstants
// Module: FinAnalysis
// Purpose: Page-level constants for Financial Analysis
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: financial-analysis, analytics, tabs, charts, kpis, filters

export const FA_TABS = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "profitability",
    label: "Profitability",
  },
  {
    id: "returns",
    label: "Returns",
  },
  {
    id: "financialHealth",
    label: "Financial Health",
  },
];

export const FA_DEFAULT_FILTERS = {
  period: "ALL",
  product: "ALL",
  team: "CURRENT",
};

export const FA_KPIS = [
  {
    id: "revenueGrowth",
    label: "Revenue Growth",
    category: "growth",
    unit: "%",
  },
  {
    id: "grossMargin",
    label: "Gross Margin",
    category: "profitability",
    unit: "%",
  },
  {
    id: "ebitMargin",
    label: "EBIT Margin",
    category: "profitability",
    unit: "%",
  },
  {
    id: "netMargin",
    label: "Net Margin",
    category: "profitability",
    unit: "%",
  },
  {
    id: "roe",
    label: "ROE",
    category: "returns",
    unit: "%",
  },
  {
    id: "debtEquity",
    label: "Debt / Equity",
    category: "financialHealth",
    unit: "x",
  },
];

export const FA_CHART_GROUPS = {
  profitability: [
    "revenueProfitTrend",
    "marginTrend",
  ],
  returns: [
    "returnTrend",
    "assetTurnover",
  ],
  financialHealth: [
    "liquidityTrend",
    "leverageTrend",
    "workingCapitalTrend",
  ],
  cashFlow: [
    "cashFlowTrend",
    "cashConversionTrend",
  ],
};

export const FA_CHARTS = [
  {
    id: "revenueProfitTrend",
    title: "Revenue & Profit Trend",
    category: "profitability",
  },
  {
    id: "marginTrend",
    title: "Margin Trend",
    category: "profitability",
  },
  {
    id: "returnTrend",
    title: "Return Trend",
    category: "returns",
  },
  {
    id: "assetTurnover",
    title: "Asset Turnover",
    category: "returns",
  },
  {
    id: "liquidityTrend",
    title: "Liquidity Trend",
    category: "financialHealth",
  },
  {
    id: "leverageTrend",
    title: "Leverage Trend",
    category: "financialHealth",
  },
  {
    id: "workingCapitalTrend",
    title: "Working Capital Trend",
    category: "financialHealth",
  },
  {
    id: "cashFlowTrend",
    title: "Cash Flow Trend",
    category: "cashFlow",
  },
  {
    id: "cashConversionTrend",
    title: "Cash Conversion Trend",
    category: "cashFlow",
  },
];

export const FA_DATA_STREAMS = {
  BS: "FinBS",
  IS: "FinIS",
  CF: "FinCF",
};

export const FA_CF_LINES = {
  operatingCashFlow: "Operating Cash Flow",
  investingCashFlow: "Investing Cash Flow",
  financingCashFlow: "Financing Cash Flow",
  netChangeInCash: "Net Change in Cash",
  openingCashBalance: "Opening Cash Balance",
  closingCashBalance: "Closing Cash Balance",
};

export const FA_COMPARISON = {
  enabled: true,
  defaultMode: "none",
  modes: [
    {
      id: "none",
      label: "No comparison",
    },
    {
      id: "team",
      label: "Compare Teams",
    },
  ],
};

export const FA_LABELS = {
  allPeriods: "All periods",
  currentTeam: "Current team",
  allProducts: "All products",
  noData: "No data available",
  loading: "Loading...",
};
