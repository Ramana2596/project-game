/**
 * Component Name: finBS.constants
 * Module: Finance / FinBS
 * Purpose: Central configuration for the FinBS (Balance Sheet) drawer: API, statement layout map, filters, formats.
 * Author/Version: UXLab / v1.3
 * AI Tags: finBS, balance sheet, constants, statement layout, line map, finance, OpsMgt
 */

// Data source switch: true = built-in sample data, false = live API (set false before release)
export const USE_MOCK_DATA = false;

// API endpoint that wraps stored procedure dbo.UI_CF_Statement_Dynamic
export const API_BASE_URL = "/api";

export const FINBS_ENDPOINT = `${API_BASE_URL}/getBalanceSheetInfo`;
// Stored procedure return codes (0 = generated, -1 = no data, other = SQL error number)
export const SP_RETURN = { OK: 0, NOT_FOUND: -1 };

// Screen load states
export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  EMPTY: "empty",
  ERROR: "error",
};

// Drawer size: full width on phones, four fifths of the screen on larger displays
export const DRAWER_WIDTH = { xs: "100%", md: "80%" };

// Tabs in the Finance drawer (add further statements here)
export const FINBS_TABS = [{ key: "balanceSheet", label: "Balance sheet" }];

// Statement group filter pills; keys other than "all" match STATEMENT_SECTIONS keys
export const GROUP_FILTERS = [
  { key: "all", label: "All lines" },
  { key: "liabilities", label: "Equity and liabilities" },
  { key: "assets", label: "Assets" },
];

// Period column views
export const PERIOD_VIEWS = [
  { key: "withData", label: "With data" },
  { key: "all", label: "All periods" },
];

// Number display format
export const NUMBER_LOCALE = "en-IN";
export const DECIMALS = 2;
export const EMPTY_CELL = "–";

// Columns returned by the SP that are keys, not period values (compared in lower case)
export const KEY_COLUMNS = ["game_id", "game_batch", "game_team", "line_no", "details"];

// Row types used for styling
export const ROW_TYPE = { LINE: "line", SUBTOTAL: "subtotal", TOTAL: "total" };

// Subtotal and grand-total lines, keyed by Line_No (adjust here if the statement layout changes)
export const LINE_TYPES = {
  3: ROW_TYPE.SUBTOTAL, // Share Capital (Equity + Pref.Share)
  6: ROW_TYPE.SUBTOTAL, // Reserve & Surplus
  9: ROW_TYPE.SUBTOTAL, // Secured Loan
  12: ROW_TYPE.SUBTOTAL, // Unsecured Loan
  16: ROW_TYPE.SUBTOTAL, // Current Liability
  17: ROW_TYPE.TOTAL, // Total Liability
  20: ROW_TYPE.SUBTOTAL, // Fixed Assets
  25: ROW_TYPE.SUBTOTAL, // Total Inventory
  28: ROW_TYPE.SUBTOTAL, // Ac Receivable
  34: ROW_TYPE.SUBTOTAL, // Current Asset
  36: ROW_TYPE.TOTAL, // Total Assets
};

// Statement sections shown as bands and used by the group filter, defined by Line_No range
export const STATEMENT_SECTIONS = [
  { key: "liabilities", title: "Equity and liabilities", fromLine: 1, toLine: 17 },
  { key: "assets", title: "Assets", fromLine: 18, toLine: 36 },
];

// Line numbers that feed the KPI cards and balance check (existing SP line numbers).
// Single numbers are one statement line; the *Lines arrays are plain sums of lines.
// Line 35 (Suspense Account) is in Total Assets; the balance check ignores it by design
// until the suspense balance is cleared to zero.
export const KPI_LINES = {
  totalLiability: 17, // Total Equity and Liabilities (balance-check side)
  totalAssets: 36,
  cash: 21,
  equityLines: [3, 6], // Share Capital + Reserve & Surplus
  liabilityLines: [9, 16], // Secured Loan + Current Liability (Unsecured Loan 12 sits inside 16)
  currentAssetLines: [34], // SP line 34 now holds the full current assets
  currentAssetDeduct: [],
  quickAssetLines: [21, 28, 33], // Cash + Ac Receivable + Accrued Income (no inventory, prepaid, advances)
  currentLiabilityLines: [16], // SP line 16 = Unsecured Loan + Ac_Payable + Credit Purchase + Provision - Adv Receipt
};

// Maximum difference (Assets - Liabilities) still treated as balanced
export const BALANCE_TOLERANCE = 0.01;

// Demo context used by the preview page (in the app these come from the simulation session)
export const DEMO_CONTEXT = {
  gameId: "OPS2026",
  gameBatch: 101,
  gameTeam: "T01",
  teamLabel: "Lotus",
  productionMonth: "2026-06",
};

// Line hierarchy for the Compact view and drill-down: parent line -> child lines, in display order.
// Each parent is the sum of its children (a "Less:" child is deducted); adjust here if the statement layout changes.
export const LINE_CHILDREN = {
  3: [1, 2], // Share Capital = Equity + Pref.Share
  6: [4, 5], // Reserve & Surplus = Retained Earning + Profit After Tax
  9: [7, 8], // Secured Loan = Long Term Loan + Short Term Loan
  12: [10, 11], // Unsecured Loan = Bank Credit + Deposit
  16: [12, 13, 14, 15], // Current Liability = Unsecured Loan + Ac_Payable + Credit Purchase + Provision - Adv Receipt
  20: [18, 19], // Fixed Assets = Gross Block - Acc Depreciation
  25: [22, 23, 24], // Total Inventory
  28: [26, 27], // Ac Receivable = Credit Sales - Bad Debt Provision
  34: [21, 25, 28, 29, 32, 33, 31], // Current Asset = Cash + Inventory + Receivable + Prepaid + Advances Made + Accrued Income - Provision
};

// Statement views: Compact (totals and subtotals with drill-down) or Detailed (every line)
export const VIEW_MODES = [
  { key: "compact", label: "Compact" },
  { key: "detailed", label: "Detailed" },
];
export const DEFAULT_VIEW = "compact";