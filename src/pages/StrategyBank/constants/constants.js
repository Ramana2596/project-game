// ============================================================
// Module: StrategyBank Constants
// Purpose: Define Strategy Bank table, outcome and filter metadata
// AI Tags: strategy-bank, constants, table, outcome, filter, sort
// ============================================================

import { colors } from "../../../ux/styles";

// Define compact Strategy Bank table columns and display headings.
export const TABLE_COLUMNS = [
  { key: "S_No", label: "#" },
  { key: "Strategy", label: "Strategy" },
  { key: "Category_Name", label: "Enabler" },
  { key: "Benefit", label: "Benefit" },
  { key: "Mutual_X_Group", label: "Choice" },
  { key: "Cost_Type", label: "Cost Type" },
  { key: "UOM", label: "UOM" },
  { key: "Implied_Cost", label: "Budget", numeric: true },
  { key: "Milestone_Month", label: "Milestone Month" },
  { key: "Resultant", label: "Outcome" },
  { key: "From_Month_No", label: "From Month No" },
  { key: "Duration_Month", label: "Duration", numeric: true },
  { key: "Gain_Norm", label: "Gain %", numeric: true },
  { key: "Loss_Norm", label: "Loss %", numeric: true },
  { key: "impact", label: "Impact %", numeric: true },
];

// Map known outcomes to optional UX colors.
// The actual Resultant value from the database is always displayed.
export const OUTCOME_META = {
  "Demand - Add / New": {
    color: colors.primary,
  },
  "Redn in Labour Rate": {
    color: colors.warning,
  },
  "Redn in RM Cost": {
    color: colors.secondary,
  },
  "Higher Market Share": {
    color: colors.primary,
  },
};

// Map mutual-exclusion choice groups to badge colors.
export const CHOICE_GROUP_COLORS = {
  A: colors.primary,
  B: colors.warning,
  C: colors.secondary,
};

// Define available Strategy Bank sorting options.
export const SORT_OPTIONS = [
  { value: "default", label: "Sort: Sequence" },
  { value: "impact-desc", label: "Impact ↓" },
  { value: "impact-asc", label: "Impact ↑" },
  { value: "budget-desc", label: "Budget ↓" },
  { value: "budget-asc", label: "Budget ↑" },
  { value: "duration-desc", label: "Duration ↓" },
];
