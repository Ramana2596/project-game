// Strategy constants — simple, meaningful names

// Business Enabler → icon/color mapping
export const BUSINESS_ENABLER = {
  Leadership: { colorToken: "primary", icon: "FlagOutlined" },
  Processes: { colorToken: "info", icon: "SettingsOutlined" },
  People: { colorToken: "success", icon: "GroupsOutlined" },
  Strategy: { colorToken: "accent", icon: "InsightsOutlined" },
  Partnership: { colorToken: "warning", icon: "HandshakeOutlined" },
  Resource: { colorToken: "secondary", icon: "LayersOutlined" },
};

// Default fallback for unmapped Business Enabler
export const BUSINESS_ENABLER_DEFAULT = {
  colorToken: "primary",
  icon: "FlagOutlined",
};

// Mutual Exclusion Group label generator
export const MUTUAL_GROUP_LABEL = (groupLetter) => `Choose one — Group ${groupLetter}`;

// Currency fallback
export const CURRENCY_CODE = "USD";
