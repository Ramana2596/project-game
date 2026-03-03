export const pageConstants = {
  // TableHeadings are dynamic rendered, See BanceSheetInfo.jsx
  // Fallback used only if data hasn't loaded yet
  fallbackHeadings: [
    "Line_No",
    "Details"
  ],
  // ❌ Removed Period_1 through Period_12 as they are now dynamic
  highlightColumns: [

  ],
  hiddenColumns: [
    "Game_Id",
    "Game_Batch",
    "Game_Team",
  ],
  vitalRows: [
    "Equity",
    "Reserve & Surplus",
    "Secured Loan",
    "Unscured Loan",
    "Current Liability",
    "Total Liability",
    "Fixed Assets",
    "Cash Balance",
    "Total Inventory",
    "Ac Receivable",
    "Current Asset",
    "Total Assets"
  ],
};