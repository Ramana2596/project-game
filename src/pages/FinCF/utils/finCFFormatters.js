// File: finCFFormatters.js
// Module: FinCF
// Purpose: Format cash-flow amounts, reporting periods and statement row labels.

import {
    CASH_FLOW_SUBTOTAL_LINES,
    CASH_FLOW_TOTAL_LINES,
    FIXED_COLUMNS,
} from "../constants/finCFConstants";

// Keep the temporary display currency centralized until the API supplies UOM.
export const DEFAULT_CURRENCY = "USD";

// Format amounts with a configurable currency and explicit negative signs.
export const formatAmount = (value, currency = DEFAULT_CURRENCY) => {
    if (value === null || value === undefined || value === "") return "—";

    const amount = Number(value);
    if (!Number.isFinite(amount)) return String(value);

    const formatted = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Math.abs(amount));

    const prefix = currency ? `${currency} ` : "";
    return amount < 0
        ? `${prefix}-${formatted}`
        : `${prefix}${formatted}`;
};

// Format a month value for the report heading and period selector.
export const formatMonthLabel = (value) => {
    if (!value) return "All periods";

    const date = value instanceof Date
        ? value
        : new Date(`${String(value).slice(0, 7)}-01T00:00:00`);

    if (Number.isNaN(date.getTime())) return String(value);

    return new Intl.DateTimeFormat("en-IN", {
        month: "short",
        year: "numeric",
    }).format(date);
};

// Convert database period keys such as 2026-03 into readable month labels.
export const formatPeriodLabel = (period) => {
    if (!period) return "";

    const value = String(period).trim();
    const match = value.match(/^(\d{4})[-/](\d{1,2})$/);

    if (match) {
        return formatMonthLabel(
            `${match[1]}-${match[2].padStart(2, "0")}`
        );
    }

    return value;
};

// Identify reporting-period columns while excluding fixed statement fields.
export const getPeriodColumns = (rows = []) => {
    if (!rows.length) return [];

    return Object.keys(rows[0]).filter(
        (column) => !FIXED_COLUMNS.includes(column)
    );
};

// Safely resolve a statement line number.
export const getLineNo = (row) => {
    const lineNo = Number(row?.Line_No);
    return Number.isFinite(lineNo) ? lineNo : null;
};

// Identify subtotal and total rows using the shared statement definitions.
export const isTotalLine = (lineNo) =>
    CASH_FLOW_TOTAL_LINES.has(Number(lineNo));

export const isSubtotalLine = (lineNo) =>
    CASH_FLOW_SUBTOTAL_LINES.has(Number(lineNo));

// Convert numeric values while preserving missing and invalid values as null.
export const toAmount = (value) => {
    if (value === null || value === undefined || value === "") return null;

    const amount = Number(value);
    return Number.isFinite(amount) ? amount : null;
};

// Sum only valid numeric values.
export const sumAmounts = (values = []) =>
    values.reduce((sum, value) => {
        const amount = toAmount(value);
        return amount === null ? sum : sum + amount;
    }, 0);

// Classify a cash-flow value for insight and status presentation.
export const getCashStatus = (value) => {
    const amount = toAmount(value);

    if (amount === null) return "unknown";
    if (amount > 0) return "positive";
    if (amount < 0) return "negative";

    return "neutral";
};
