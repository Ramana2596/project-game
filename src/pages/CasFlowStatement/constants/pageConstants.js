export const pageConstants = {
  //TableHeadings: Dynamic Column Heading, removed Period_1.._12. See CashFlowStatement.jsx
  
  // gameBatch: "Batch",
  // gameTeam: "Team",
  // Fallback used only if data has not loaded
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
    "Net Cash Flow from Operation",
    "Net Cash Inflow from Investing Activities",
    "Net Cash Inflow from Financing Activities",
    "Net Cash Flow from Operation,Investing & Financing",
    "Cash Balance at the beginning of the period",
    "Cash Balance at the End of the period",
  ],
};
