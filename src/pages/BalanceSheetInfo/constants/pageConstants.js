export const pageConstants = {
  // TableHeadings are rendered dynamically, See BalanceSheetInfo.jsx
  // Fallback used only if data hasn't loaded yet
  fallbackHeadings: [
    "Line_No",
    "Details"
  ],
  
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
    "Unsecured Loan",
    "Current Liability",
    "Total Liability",
    "Fixed Assets",
    "Cash Balance",
    "Total Inventory",
    "Ac Receivable",
    "Current Asset",
    "Total Assets"
  ],

   // Concise Balance Sheet: only these rows are shown, in this exact order
  conciseBS: [
    "Equity",
    "Reserve & Surplus",
    "Secured Loan",
    "Unsecured Loan",
    "Current Liability",
    "Total Liability",
    "Fixed Assets",
    "Cash Balance",
    "Total Inventory",
    "Ac Receivable",
    "Current Asset",
    "Advances Made",
    "Accrued Income & Loss",
    "Suspence Account",
    "Total Assets"
  ],
  // Rows (must be a subset of conciseBS) rendered in bold
  boldRows: [
    "Total Liability",
    "Total Assets",
  ],
};