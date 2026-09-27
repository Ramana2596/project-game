// Component Name : formatters
// Module         : FinIS (Income Statement)
// Purpose        : Presentation-only number formatting helpers
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, utils, formatting

// Function: format a currency amount to 2 decimals, dash when missing
export const formatAmount = (value) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) return "-";
    return Number(value).toFixed(2);
};

// Function: format a ratio value as a percentage string
export const formatRatio = (value) => {
    if (value === null || value === undefined || Number.isNaN(Number(value))) return "-";
    return `${Number(value).toFixed(2)}%`;
};

// Function: pick the right formatter for a given line based on ratio membership
export const formatLineValue = (value, isRatio) => (isRatio ? formatRatio(value) : formatAmount(value));

export default { formatAmount, formatRatio, formatLineValue };
