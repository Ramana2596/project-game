// Component Name : finISConstants
// Module         : FinIS (Income Statement)
// Purpose        : Static config - line groupings, display modes, subtotal styling and KPI definitions
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, finance, constants, line-grouping, kpi, drill-down

// Fixed (non-period) columns returned by UI_Income_Statement_Dynamic
export const FIXED_COLUMNS = ["Game_Id", "Game_Batch", "Game_Team", "Line_No", "Details"];

// Logical grouping of Line_No ranges - drives the FinISToolbar filter chips
export const LINE_GROUPS = [
    { key: "revenue", label: "Revenue", start: 1, end: 3 },
    { key: "opEx", label: "Direct Expense", start: 4, end: 13 },
    { key: "adminEx", label: "Indirect Expense", start: 15, end: 23 },
    { key: "capEx", label: "CapEx", start: 24, end: 24 },
    { key: "belowLine", label: "Profit", start: 25, end: 30 },
];

// Line numbers rendered as bold subtotal / result rows in FinISTable
export const SUBTOTAL_LINES = new Set([3, 13, 14, 23, 25, 27, 29]);

// Line numbers rendered as a ratio (percentage) rather than a currency amount
export const RATIO_LINES = new Set([30]);

// Compact mode: top-level lines displayed for each toolbar filter
export const COMPACT_LINES = {
    all: [1, 2, 3, 13, 14, 23, 24, 25, 26, 27, 28, 29, 30],
    revenue: [1, 2, 3],
    opEx: [13],
    adminEx: [23],
    capEx: [24],
    belowLine: [25, 26, 27, 28, 29, 30],
};

// Detailed mode: lines displayed for each toolbar filter
export const DETAILED_LINES = {
    all: Array.from({ length: 30 }, (_, index) => index + 1),
    revenue: [1, 2, 3],
    opEx: [13],
    adminEx: [23],
    capEx: [24],
    belowLine: [25, 26, 27, 28, 29, 30],
};

// Detailed mode drill-down relationships
export const LINE_CHILDREN = {
    13: [4, 5, 6, 7, 8, 9, 10, 11, 12],
    23: [15, 16, 17, 18, 19, 20, 21, 22],
};

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
    COMPACT_LINES,
    DETAILED_LINES,
    LINE_CHILDREN,
    KPI_CARDS,
    DEFAULT_DENSITY,
    USE_MOCK_DATA,
};