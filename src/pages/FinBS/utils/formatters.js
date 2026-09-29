/**
 * Component Name: formatters
 * Module: Finance / FinBS
 * Purpose: Pure display helpers for amounts, period labels, ratios, percentages and dates.
 * Author/Version: UXLab / v1.1
 * AI Tags: formatting, currency, period label, ratio, percent, date helpers
 */

import { NUMBER_LOCALE, DECIMALS, EMPTY_CELL } from "../constants/finBS.constants";

// Format an amount with grouping; negatives shown in brackets, missing values as a dash
export const formatAmount = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) return EMPTY_CELL;
  const text = Math.abs(value).toLocaleString(NUMBER_LOCALE, {
    minimumFractionDigits: DECIMALS,
    maximumFractionDigits: DECIMALS,
  });
  return value < 0 ? `(${text})` : text;
};

// Turn a period column key into a readable header ("PrvYear_End" -> "Prv Year End")
export const formatPeriodLabel = (key) =>
  String(key ?? "")
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();

// Format a ratio such as 18.52x
export const formatRatio = (value) =>
  value === null || value === undefined || !Number.isFinite(value)
    ? EMPTY_CELL
    : `${value.toFixed(2)}x`;

// Format a 0-1 fraction as a percentage such as 13.7%
export const formatPercent = (fraction) =>
  fraction === null || fraction === undefined || !Number.isFinite(fraction)
    ? EMPTY_CELL
    : `${(fraction * 100).toFixed(1)}%`;

// Convert a "YYYY-MM" month input to the last day of that month ("YYYY-MM-DD")
export const toMonthEndIso = (yearMonth) => {
  if (!yearMonth) return null;
  const [year, month] = yearMonth.split("-").map(Number);
  if (!year || !month) return null;
  return new Date(Date.UTC(year, month, 0)).toISOString().slice(0, 10);
};

// Format a "YYYY-MM" month input for display ("2026-03" -> "Mar 2026")
export const formatMonthLabel = (yearMonth) => {
  if (!yearMonth) return "";
  const [year, month] = yearMonth.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleString("en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};