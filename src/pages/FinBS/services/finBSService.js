
/**
 * Component Name: finBSService
 * Module: Finance / FinBS
 * Purpose: API service and response normalization for the Balance Sheet.
 * Author/Version: UXLab / v1.0
 * AI Tags: service, api, finBS, balance sheet, normalization
 */

import api from "../../../core/interceptor/api-interceptor";
import { KEY_COLUMNS } from "../constants/finBS.constants";

// Read a value regardless of column-name casing
const pick = (row, name) => {
  const key = Object.keys(row).find(
    (item) => item.toLowerCase() === name.toLowerCase()
  );
  return key === undefined ? undefined : row[key];
};

// Convert API recordset into the table structure used by FinBS
export const normalizeRows = (rawRows = []) => {
  if (!rawRows.length) {
    return { rows: [], periods: [] };
  }

  const periods = Object.keys(rawRows[0]).filter(
    (key) => !KEY_COLUMNS.includes(key.toLowerCase())
  );

  const rows = rawRows
    .map((raw) => ({
      lineNo: Number(pick(raw, "line_no")),
      details: String(pick(raw, "details") ?? "").trim(),
      values: Object.fromEntries(
        periods.map((period) => [
          period,
          raw[period] === null || raw[period] === undefined
            ? null
            : Number(raw[period]),
        ])
      ),
    }))
    .sort((a, b) => a.lineNo - b.lineNo);

  return { rows, periods };
};

// API service
export function getBalanceSheetInfo(queryParams) {
  return api.post("/api/getBalanceSheetInfo", { ...queryParams });
}