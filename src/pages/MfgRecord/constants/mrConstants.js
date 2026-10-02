// constants/mrConstants.js – MfgRecord tabs, filters, stages, levels

export const MR_TABS = [
  { id: "overview",   label: "Overview" },
  { id: "production", label: "Production Record" },
  { id: "sales",      label: "Sales Record" },
];

// Product filter (switched off for now). Products other than ALL can be built from the loaded rows.
export const MR_FILTERS = [
  { value: "ALL", label: "All Products" },
];

// Production stages in flow order; key = readable name from mrMap
export const MR_STAGES = [
  { key: "planQty",  label: "Plan" },
  { key: "orderQty", label: "Shop Order" },
  { key: "fabQty",   label: "Fabrication" },
  { key: "assyQty",  label: "Assembly" },
  { key: "testQty",  label: "Testing" },
  { key: "sysQty",   label: "System" },
  { key: "stockQty", label: "Stocked" },
];

// Generic judgement used for both groups: actual vs reference
//   Production: OK (stocked) vs Plan      Sales: Sold vs Target
// pct = actual / reference x 100. Within +/- MR_TOL_PCT of 100 is "On target".
export const MR_TOL_PCT = 2;
export const MR_LEVELS = [
  { value: "BELOW", label: "Below target", color: "warning" },
  { value: "ON",    label: "On target",    color: "success" },
  { value: "ABOVE", label: "Above target", color: "info" },
];

export const MR_EMPTY = "–";   // shown for NULL values