// constants/mrCols.js – table columns. type: text | qty | price | money (MrTable formats by type)

export const MR_PROD_COLS = [
  { key: "product",  label: "Product",     type: "text" },
  { key: "planQty",  label: "Plan",        type: "qty" },
  { key: "orderQty", label: "Shop Order",  type: "qty" },
  { key: "fabQty",   label: "Fab OK",      type: "qty" },
  { key: "assyQty",  label: "Assembly OK", type: "qty" },
  { key: "testQty",  label: "Testing OK",  type: "qty" },
  { key: "sysQty",   label: "System OK",   type: "qty" },
  { key: "stockQty", label: "Stocked",     type: "qty" },
];

export const MR_SALES_COLS = [
  { key: "product",      label: "Product",       type: "text" },
  { key: "forecastQty",  label: "Forecast",      type: "qty" },
  { key: "marketDemand", label: "Market Demand", type: "qty" },
  { key: "addlDemand",   label: "Addl Demand",   type: "qty" },
  { key: "totalDemand",  label: "Total Demand",  type: "qty" },
  { key: "salesTarget",  label: "Sales Target",  type: "qty" },
  { key: "actualDemand", label: "Actual Demand", type: "qty" },
  { key: "soldQty",      label: "Sold",          type: "qty" },
  { key: "returnQty",    label: "Returns",       type: "qty" },
  { key: "unitPrice",    label: "Unit Price",    type: "price" },
  { key: "salesValue",   label: "Sales Value",   type: "money" },
];