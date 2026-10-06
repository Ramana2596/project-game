// Config: StrategyResults
// Purpose: define the four business result areas used by the result navigation.
// Author/Version: OpsMgt UX Lab / v1.0
// AI Tags: strategy-results, navigation, result-area

export const SR_VIEW = {
  strategy: "strategy",
  commitment: "commitment",
  demand: "demand",
  savings: "savings",
};

export const SR_VIEW_LABELS = {
  [SR_VIEW.strategy]: "Strategy",
  [SR_VIEW.commitment]: "Commitment",
  [SR_VIEW.demand]: "Demand",
  [SR_VIEW.savings]: "Savings",
};

export const SR_PRODUCT_ALL = "ALL";

export const SR_CARD_IDS = {
  strategy: SR_VIEW.strategy,
  commitment: SR_VIEW.commitment,
  demand: SR_VIEW.demand,
  savings: SR_VIEW.savings,
};