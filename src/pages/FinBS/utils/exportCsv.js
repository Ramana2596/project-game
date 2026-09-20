/**
 * Component Name: exportCsv
 * Module: Finance / FinBS
 * Purpose: Build and download a CSV copy of the Balance Sheet table.
 * Author/Version: UXLab / v1.0
 * AI Tags: export, csv, download, balance sheet
 */

import { formatPeriodLabel } from "./formatters";

// Escape one CSV cell
const cell = (value) => {
  const text = value === null || value === undefined ? "" : String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

// Build CSV text: Line No, Details, then one column per period (raw numbers, no grouping)
export const buildCsv = (rows, periods) => {
  const header = ["Line No", "Details", ...periods.map(formatPeriodLabel)];
  const body = rows.map((row) => [row.lineNo, row.details, ...periods.map((p) => row.values[p])]);
  return [header, ...body].map((line) => line.map(cell).join(",")).join("\r\n");
};

// Trigger a browser download (BOM added so Excel reads UTF-8 correctly)
export const downloadCsv = (filename, csvText) => {
  const blob = new Blob(["\uFEFF", csvText], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
