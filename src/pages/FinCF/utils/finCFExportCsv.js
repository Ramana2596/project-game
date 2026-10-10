
// File: finCFExportCsv.js
// Module: FinCF
// Purpose: Export cash-flow statement rows and reporting periods to a CSV file.

import { getPeriodColumns, formatPeriodLabel } from "./finCFFormatters";

// Escape CSV fields so commas, quotes and line breaks do not corrupt the file.
const escapeCsv = (value) => {
    const text = value === null || value === undefined ? "" : String(value);
    return `"${text.replace(/"/g, '""')}"`;
};

// Build and download the displayed cash-flow statement as a CSV file.
export const exportCashFlowCsv = (rows = [], fileName = "FinCF_CashFlow.csv") => {
    if (!rows.length) return false;

    const periods = getPeriodColumns(rows);
    const headers = ["Line No.", "Details", ...periods.map(formatPeriodLabel)];

    const csvRows = [
        headers.map(escapeCsv).join(","),
        ...rows.map((row) => [
            row.Line_No ?? "",
            row.Details ?? "",
            ...periods.map((period) => row[period] ?? ""),
        ].map(escapeCsv).join(",")),
    ];

    const csvContent = `\uFEFF${csvRows.join("\r\n")}`;
    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    return true;
};
