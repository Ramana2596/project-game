// Component Name : finISExportCsv
// Module         : FinIS (Income Statement)
// Purpose        : Build and download a CSV of the currently filtered Income Statement rows
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, utils, export, csv

// Function: trigger a browser download of the given CSV text
const downloadCsv = (csvText, fileName) => {
    const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};

// Function: convert Income Statement rows + period columns into a CSV file and download it
export const exportIncomeStatementCsv = ({ rows, periods, gameTeam = "export" }) => {
    const header = ["Details", ...periods].join(",");
    const lines = rows.map((row) => [row.Details, ...periods.map((p) => row[p] ?? "")].join(","));
    const csv = [header, ...lines].join("\n");
    downloadCsv(csv, `IncomeStatement_${gameTeam}.csv`);
};

export default exportIncomeStatementCsv;
