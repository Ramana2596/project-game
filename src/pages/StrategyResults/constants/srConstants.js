// Constants: StrategyResults
// Module: StrategyResults
// Purpose: define page labels, result views and user messages.
// Author/Version: OpsMgt UX Lab / v3.0
// AI Tags: strategy-results, constants, navigation, business-results

import { colors } from "../../../ux/styles";
import { SR_VIEW } from "./srConfig";

export const SR_TITLE = "Strategy Results";

export const SR_SUBTITLE =
  "Review commitments and outcome from the strategies your team selected.";

export const SR_TAB = SR_VIEW;

export const SR_TABS = [
  {
    id: SR_VIEW.strategy,
    label: "Strategy",
  },
  {
    id: SR_VIEW.commitment,
    label: "Commitment",
  },
  {
    id: SR_VIEW.demand,
    label: "Demand",
  },
  {
    id: SR_VIEW.savings,
    label: "Savings",
  },
];

export const BUSINESS_ENABLER = {
  Leadership: {
    colorToken: "primary",
    icon: "FlagOutlined",
  },
  People: {
    colorToken: "success",
    icon: "GroupsOutlined",
  },
  Processes: {
    colorToken: "info",
    icon: "SettingsOutlined",
  },
  Partnerships: {
    colorToken: "warning",
    icon: "HandshakeOutlined",
  },
  Products: {
    colorToken: "secondary",
    icon: "LayersOutlined",
  },
};

export const BUSINESS_ENABLER_DEFAULT = {
  colorToken: "primary",
  icon: "FlagOutlined",
};

export const SR_ACCENT = {
  strategy: colors.primary,
  commitment: colors.accentIndigo,
  demand: colors.accentBlue,
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