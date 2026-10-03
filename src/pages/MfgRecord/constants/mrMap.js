// constants/mrMap.js – SP column names -> readable names (used once, in useMfgRecord)

// UI_Production_Record_Info
export const MR_PROD_MAP = {
  Period:              "period",
  Product:             "product",
  UOM:                 "uom",
  Production_Plan_Qty: "planQty",
  Shop_Order_Qty:      "orderQty",
  Fab_OK_Qty:          "fabQty",
  Assembly_OK_Qty:     "assyQty",
  Testing_OK_Qty:      "testQty",
  System_OK_Qty:       "sysQty",
  Stocked_Qty:         "stockQty",
  Prod_Pct:            "prodPct",
  Yield_Pct:           "yieldPct",
  Prod_Level:          "prodLevel",
};

// UI_Sales_Record_Info
export const MR_SALES_MAP = {
  Period:             "period",
  Product:            "product",
  UOM:                "uom",
  Forecast:           "forecastQty",
  Market_Demand:      "marketDemand",
  Addl_Demand:        "addlDemand",
  Total_Demand:       "totalDemand",
  Sales_Target:       "salesTarget",
  Actual_Demand:      "actualDemand",
  Sold_Quantity:      "soldQty",
  Customer_Returns:   "returnQty",
  Currency:           "currency",
  Std_Unit_Price:     "unitPrice",
  Sales_Value:        "salesValue",
  Sales_Pct:          "salesPct",
  Sales_Level:        "salesLevel",
  Sales_Target_Value: "salesTargetValue",
  Value_Gap:          "valueGap",
  Share_Pct:          "sharePct",
};

// Rename one SP row using a map above
export const mrMapRow = (row, map) =>
  Object.fromEntries(Object.entries(map).map(([sp, name]) => [name, row[sp] ?? null]));