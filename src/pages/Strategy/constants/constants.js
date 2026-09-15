// Strategy constants — simple, meaningful names

// Business Enabler → icon/color mapping
export const BUSINESS_ENABLER = {
  Leadership: { colorToken: "primary", icon: "FlagOutlined" },
  People: { colorToken: "success", icon: "GroupsOutlined" },
  Processes: { colorToken: "info", icon: "SettingsOutlined" },
  Partnerships: { colorToken: "warning", icon: "HandshakeOutlined" },
  Products: { colorToken: "secondary", icon: "LayersOutlined" },
};

// Default fallback for unmapped Business Enabler
export const BUSINESS_ENABLER_DEFAULT = {
  colorToken: "primary",
  icon: "FlagOutlined",
};

// Mutual Exclusion Group label generator
export const MUTUAL_GROUP_LABEL = (groupLetter) => `Choose one — Group ${groupLetter}`;

// Currency fallback — used only if DB field s.UOM is missing/null
export const CURRENCY_FALLBACK = "USD";