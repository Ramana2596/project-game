import { colors } from "../../../ux/styles";

export const SR_TITLE = "Strategy Results";

export const SR_SUBTITLE =
  "Review the outcomes and commitments from the strategies your team selected.";

export const SR_TAB = {
  overview: "overview",
  plan: "plan",
  budget: "budget",
  demand: "demand",
  discount: "discount",
  savings: "savings",
};

export const SR_TABS = [
  { id: SR_TAB.overview, label: "Overview" },
  { id: SR_TAB.plan, label: "Strategy Plan" },
  { id: SR_TAB.budget, label: "Budget Plan" },
  { id: SR_TAB.demand, label: "Acquired Demand" },
  { id: SR_TAB.discount, label: "Price Discount" },
  { id: SR_TAB.savings, label: "Savings" },
];

export const SR_ACCENT = {
  plan: colors.primary,
  budget: colors.accentIndigo,
  demand: colors.accentBlue,
  discount: colors.accentOrange,
  savings: colors.accentTeal,
};

export const SR_YES_VALUES = [
  "y",
  "yes",
  "1",
  "true",
  "selected",
  "implement",
  "implemented",
  "accept",
  "accepted",
];

export const SR_MSG_NO_SESSION =
  "Your batch and team are not set yet. Join a team session to see strategy results.";

export const SR_MSG_EMPTY =
  "No strategies are selected in this set yet.";

export const SR_MSG_LOAD_FAIL =
  "Could not load strategy results. Please try again.";