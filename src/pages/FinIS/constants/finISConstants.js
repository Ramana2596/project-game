// Component Name : finISConstants
// Module         : FinIS (Income Statement)
// Purpose        : Static config - line groupings, subtotal styling, KPI card definitions
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, finance, constants, line-grouping, kpi

// Fixed (non-period) columns returned by UI_Income_Statement_Dynamic
export const FIXED_COLUMNS = ["Game_Id", "Game_Batch", "Game_Team", "Line_No", "Details"];

// Logical grouping of Line_No ranges - drives the FinISToolbar filter chips
export const LINE_GROUPS = [
    { key: "revenue", label: "Revenue & COGS", start: 1, end: 3 },
    { key: "opEx", label: "Operating Expenses", start: 4, end: 14 },
    { key: "adminEx", label: "Admin & Selling Expenses", start: 15, end: 25 },
    { key: "belowLine", label: "Interest, Tax & Below the Line", start: 26, end: 30 },
];

// Line numbers rendered as bold subtotal / result rows in FinISTable
export const SUBTOTAL_LINES = new Set([3, 14, 25, 27, 29]);

// Line numbers rendered as a ratio (percentage) rather than a currency amount
export const RATIO_LINES = new Set([30]);

// KPI stat cards shown by FinISKpis, resolved against the latest period
export const KPI_CARDS = [
    { key: "revenue", label: "Total revenue", lineNo: 1, icon: "revenue", accent: "accentBlue" },
    { key: "grossMargin", label: "Gross margin", lineNo: 3, icon: "grossMargin", accent: "accentTeal" },
    { key: "operatingProfit", label: "Operating profit", lineNo: 14, icon: "operatingProfit", accent: "accentOrange" },
    { key: "profitAfterTax", label: "Profit after tax", lineNo: 29, icon: "profitAfterTax", accent: "accentPurple" },
    { key: "profitPct", label: "Profit %", lineNo: 30, icon: "profitPct", accent: "success", isRatio: true },
];

// Default table density
export const DEFAULT_DENSITY = "compact";

// Toggle: use finISMock instead of finISService (local/dev only)
export const USE_MOCK_DATA = false;

export default {
    FIXED_COLUMNS,
    LINE_GROUPS,
    SUBTOTAL_LINES,
    RATIO_LINES,
    KPI_CARDS,
    DEFAULT_DENSITY,
    USE_MOCK_DATA,
};
