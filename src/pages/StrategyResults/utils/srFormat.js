// Utility: srFormat
// Module: StrategyResults
// Purpose: format strategy result values for display
// Author/Version: OpsMgt UX Lab / v2.0
// AI Tags: strategy, results, formatting, currency, percentage

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const NIL = "—";

export const isNil = (value) =>
  value === null ||
  value === undefined ||
  value === "";

export const fmtNum = (value) =>
  isNil(value)
    ? NIL
    : Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      });

export const fmtPct = (value) =>
  isNil(value)
    ? NIL
    : `${Number(value).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
      })}%`;

export const fmtCost = (value, uom) => {
  if (isNil(value)) return NIL;

  return uom === "%"
    ? fmtPct(value)
    : `${uom || ""} ${fmtNum(value)}`.trim();
};

export const fmtDate = (value) => {
  if (isNil(value)) return NIL;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return `${MONTHS[date.getMonth()]}-${date.getFullYear()}`;
};

export const fmtCurMap = (currencyMap) => {
  const pairs = Object.entries(currencyMap || {});

  if (!pairs.length) return NIL;

  return pairs
    .map(([currency, amount]) => `${currency} ${fmtNum(amount)}`)
    .join("  |  ");
};