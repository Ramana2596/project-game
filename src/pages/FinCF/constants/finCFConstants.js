// File: finCFConstants.js
// Module: FinCF
// Purpose: Centralize cash-flow sections, formulas, expansion hierarchy and display settings.

// Define fixed database columns.
export const FIXED_COLUMNS = [
    "Game_Id",
    "Game_Batch",
    "Game_Team",
    "Line_No",
    "Details",
];

// Define the 51-line cash-flow statement sections.
export const CASH_FLOW_SECTIONS = [
    {
        id: "operating",
        label: "Operating Activities",
        shortLabel: "Operating CF",
        startLine: 1,
        endLine: 33,
    },
    {
        id: "investing",
        label: "Investing Activities",
        shortLabel: "Investing CF",
        startLine: 34,
        endLine: 37,
    },
    {
        id: "financing",
        label: "Financing Activities",
        shortLabel: "Financing CF",
        startLine: 38,
        endLine: 48,
    },
    {
        id: "cash",
        label: "Cash Reconciliation",
        shortLabel: "Cash Balance",
        startLine: 49,
        endLine: 51,
    },
];

// Define parent-to-child relationships for level-by-level expansion.
// Lines 49 and 51 have no children here: they are shown as siblings of
// 33, 37, 48 and 50, so no line is ever rendered more than once.
export const CASH_FLOW_LINE_CHILDREN = {
    4: [2, 3],
    9: [5, 6, 7, 8],
    10: [1, 4, 9],
    19: [11, 12, 13, 14, 15, 16, 17, 18],
    28: [20, 21, 22, 23, 24, 25, 26, 27],
    29: [10, 19, 28],
    31: [29, 30],
    33: [31, 32],
    37: [34, 35, 36],
    41: [38, 39, 40],
    47: [42, 43, 44, 45, 46],
    48: [41, 47],
};

// Define the default top-level rows for the exploded view.
// Flat sequence of the statement's main totals, in statement order.
export const CASH_FLOW_ROOT_LINES = [33, 37, 48, 49, 50, 51];

// Nothing expanded on open; the user drills into 33, 37 or 48 as needed.
// Use [33, 37, 48] to open the three activity totals by default.
export const CASH_FLOW_DEFAULT_EXPANDED_LINES = [];

// Document verified calculation relationships; displayed values remain SP-driven.
export const CASH_FLOW_FORMULAS = {
    4: { add: [2, 3] },
    9: { add: [5, 6, 7, 8] },
    10: { add: [1, 4], subtract: [9] },
    19: { add: [11, 12, 13, 14, 15, 16, 17, 18] },
    28: { add: [20, 21, 22, 23, 24, 25, 26, 27] },
    29: { add: [10, 19], subtract: [28] },
    31: { add: [29], subtract: [30] },
    33: { add: [31], subtract: [32] },
    37: { add: [34, 35], subtract: [36] },
    41: { add: [38, 39, 40] },
    47: { add: [42, 43, 44, 45, 46] },
    48: { add: [41], subtract: [47] },
    49: { add: [33, 37, 48] },
    51: { add: [50, 49] },
};

// Preserve the existing export names used by current components.
export const CASH_FLOW_SUBTOTAL_LINES = new Set([
    4, 9, 10, 19, 28, 29, 31, 41, 47,
]);

export const CASH_FLOW_TOTAL_LINES = new Set([
    33, 37, 48, 49, 51,
]);

export const CASH_FLOW_RATIO_LINES = new Set();

// Define display density options.
export const DEFAULT_DENSITY = "compact";

export const DENSITY_OPTIONS = [
    { value: "compact", label: "Compact" },
    { value: "detailed", label: "Detailed" },
];

// Define section filtering options.
export const DEFAULT_SECTION = "all";

export const SECTION_OPTIONS = [
    { value: "all", label: "All Activities" },
    ...CASH_FLOW_SECTIONS.map(({ id, label }) => ({
        value: id,
        label,
    })),
];

// Define overview KPI cards using the statement's major totals.
export const KPI_DEFINITIONS = [
    {
        id: "operating",
        label: "Net Cash Flow from Operations",
        lineNo: 33,
        accent: "teal",
    },
    {
        id: "investing",
        label: "Net Cash Flow from Investing",
        lineNo: 37,
        accent: "blue",
    },
    {
        id: "financing",
        label: "Net Cash Flow from Financing",
        lineNo: 48,
        accent: "purple",
    },
    {
        id: "net",
        label: "Total Net Cash Flow",
        lineNo: 49,
        accent: "indigo",
    },
    {
        id: "closing",
        label: "Closing Cash Balance",
        lineNo: 51,
        accent: "orange",
    },
];

// Use live stored-procedure data.
export const USE_MOCK_DATA = false;