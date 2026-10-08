
/**
 * Constants: arRatioConstants
 * Module: AnnualReport
 * Purpose: Define financial ratios used by Annual Report Analytics.
 * Author/Version: OpsMgt UX Lab / v1.0
 * AI Tags: financial-ratios, profitability, returns, liquidity, leverage, cash-flow
 */

// Ratio categories
export const AR_RATIO_CATEGORIES = {
  GROWTH: "growth",
  PROFITABILITY: "profitability",
  RETURNS: "returns",
  LIQUIDITY: "liquidity",
  LEVERAGE: "leverage",
  EFFICIENCY: "efficiency",
  CASH_FLOW: "cashFlow",
};

// Core Annual Report ratios
export const AR_CORE_RATIOS = [
  {
    id: "revenueGrowth",
    label: "Revenue Growth",
    category: AR_RATIO_CATEGORIES.GROWTH,
    unit: "%",
    source: "FinIS",
    priority: "core",
  },
  {
    id: "grossMargin",
    label: "Gross Margin",
    category: AR_RATIO_CATEGORIES.PROFITABILITY,
    unit: "%",
    source: "FinIS",
    priority: "core",
  },
  {
    id: "ebitMargin",
    label: "EBIT Margin",
    category: AR_RATIO_CATEGORIES.PROFITABILITY,
    unit: "%",
    source: "FinIS",
    priority: "core",
  },
  {
    id: "netMargin",
    label: "Net Profit Margin",
    category: AR_RATIO_CATEGORIES.PROFITABILITY,
    unit: "%",
    source: "FinIS",
    priority: "core",
  },
  {
    id: "roe",
    label: "ROE",
    category: AR_RATIO_CATEGORIES.RETURNS,
    unit: "%",
    source: "FinBS+FinIS",
    priority: "core",
  },
  {
    id: "currentRatio",
    label: "Current Ratio",
    category: AR_RATIO_CATEGORIES.LIQUIDITY,
    unit: "x",
    source: "FinBS",
    priority: "core",
  },
  {
    id: "debtEquity",
    label: "Debt / Equity",
    category: AR_RATIO_CATEGORIES.LEVERAGE,
    unit: "x",
    source: "FinBS",
    priority: "core",
  },
  {
    id: "cashConversionCycle",
    label: "Cash Conversion Cycle",
    category: AR_RATIO_CATEGORIES.EFFICIENCY,
    unit: "days",
    source: "FinBS+FinIS",
    priority: "core",
  },
];

// Supporting ratios
export const AR_SUPPORTING_RATIOS = [
  {
    id: "profitGrowth",
    label: "Profit Growth",
    category: AR_RATIO_CATEGORIES.GROWTH,
    unit: "%",
    source: "FinIS",
  },
  {
    id: "roa",
    label: "ROA",
    category: AR_RATIO_CATEGORIES.RETURNS,
    unit: "%",
    source: "FinBS+FinIS",
  },
  {
    id: "assetTurnover",
    label: "Asset Turnover",
    category: AR_RATIO_CATEGORIES.EFFICIENCY,
    unit: "x",
    source: "FinBS+FinIS",
  },
  {
    id: "receivableDays",
    label: "Receivable Days",
    category: AR_RATIO_CATEGORIES.EFFICIENCY,
    unit: "days",
    source: "FinBS+FinIS",
  },
  {
    id: "inventoryDays",
    label: "Inventory Days",
    category: AR_RATIO_CATEGORIES.EFFICIENCY,
    unit: "days",
    source: "FinBS+FinIS",
  },
  {
    id: "payableDays",
    label: "Payable Days",
    category: AR_RATIO_CATEGORIES.EFFICIENCY,
    unit: "days",
    source: "FinBS+FinIS",
  },
  {
    id: "interestCoverage",
    label: "Interest Coverage",
    category: AR_RATIO_CATEGORIES.LEVERAGE,
    unit: "x",
    source: "FinIS",
  },
];

// Cash-flow ratios
export const AR_CASH_FLOW_RATIOS = [
  {
    id: "operatingCashFlow",
    label: "Operating Cash Flow",
    category: AR_RATIO_CATEGORIES.CASH_FLOW,
    unit: "value",
    source: "FinCF",
  },
  {
    id: "freeCashFlow",
    label: "Free Cash Flow",
    category: AR_RATIO_CATEGORIES.CASH_FLOW,
    unit: "value",
    source: "FinCF",
  },
  {
    id: "cashFlowMargin",
    label: "Cash Flow Margin",
    category: AR_RATIO_CATEGORIES.CASH_FLOW,
    unit: "%",
    source: "FinCF+FinIS",
  },
  {
    id: "ocfPat",
    label: "OCF / PAT",
    category: AR_RATIO_CATEGORIES.CASH_FLOW,
    unit: "x",
    source: "FinCF+FinIS",
  },
  {
    id: "fcfMargin",
    label: "Free Cash Flow Margin",
    category: AR_RATIO_CATEGORIES.CASH_FLOW,
    unit: "%",
    source: "FinCF+FinIS",
  },
];

// All supported ratios
export const AR_ALL_RATIOS = [
  ...AR_CORE_RATIOS,
  ...AR_SUPPORTING_RATIOS,
  ...AR_CASH_FLOW_RATIOS,
];

// Ratio lookup helper
export const AR_RATIO_MAP = AR_ALL_RATIOS.reduce(
  (map, ratio) => ({
    ...map,
    [ratio.id]: ratio,
  }),
  {}
);
