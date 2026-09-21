/**
 * Component Name: finBSMock
 * Module: Finance / FinBS
 * Purpose: Sample response shaped like dbo.UI_CF_Statement_Dynamic, for development without an API.
 * Author/Version: UXLab / v1.0
 * AI Tags: mock data, sample, balance sheet, development
 */

// Sample lines: [Line_No, Details, PrvYear_End] (copied from the SP sample output)
const SAMPLE_LINES = [
  [1, "Equity", 134000.0],
  [2, "Pref.Share", 0.0],
  [3, "Share Capital", 134000.0],
  [4, "Retained Earning", 22358.0],
  [5, "Profit After Tax", 4848.03],
  [6, "Reserve & Surplus", 27206.03],
  [7, "Long Term Loan", 0.0],
  [8, "Short Term Loan", 0.0],
  [9, "Secured Loan", 0.0],
  [10, "Bank Credit", 0.0],
  [11, "Deposit", 0.0],
  [12, "Unsecured Loan", 0.0],
  [13, "Ac_Payable", 1800.0],
  [14, "Credit Purchase", 0.0],
  [15, "Provision - Adv Receipt", 0.0],
  [16, "Current Liability", 1800.0],
  [17, "Total Liability", 163006.03],
  [18, "Gross Block", 134000.0],
  [19, "Less: Acc Depreciation", 4480.0],
  [20, "Fixed Assets", 129520.0],
  [21, "Cash Balance", 3060.03],
  [22, "Raw Material Inventory", 1800.0],
  [23, "Work In Progress", 0.0],
  [24, "Finished Goods Inventory", 1473.0],
  [25, "Total Inventory", 3273.0],
  [26, "Credit Sales", 27000.0],
  [27, "Less: Bad Debt Provision", 0.0],
  [28, "Ac Receivable", 27000.0],
  [29, "Prepaid Expense", 0.0],
  [30, "Deferred Tax", 0.0],
  [31, "Provision - Bad debt etc,", 0.0],
  [32, "Current Asset", 33333.03],
  [33, "Advances Made", 0.0],
  [34, "Accrued Income & Loss", 0.0],
  [35, "Suspense Account", 153.0],
  [36, "Total Assets", 163006.03],
];

// Period columns as they appear in the sample (Period_1 .. Period_12 are empty until closed)
const PERIOD_KEYS = Array.from({ length: 12 }, (_, i) => `Period_${i + 1}`);

// Raw recordset rows, same shape the API returns from the stored procedure
export const MOCK_ROWS = SAMPLE_LINES.map(([lineNo, details, prevYearEnd]) => ({
  Line_no: lineNo,
  Details: details,
  PrvYear_End: prevYearEnd,
  ...Object.fromEntries(PERIOD_KEYS.map((key) => [key, null])),
}));

// Full mock response envelope
export const MOCK_RESPONSE = {
  returnCode: 0,
  message: "Balance Sheet is generated !",
  rows: MOCK_ROWS,
};
