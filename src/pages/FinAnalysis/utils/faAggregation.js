// Utility: faAggregation
// Module: AnnualReport
// Purpose: Convert FinIS, FinBS and future FinCF rows into one analytical model
// Author/Version: OpsMgt UXLab V1.3
// AI Tags: annual-report, aggregation, financial-analysis, finBS, finIS, finCF

// Find a statement row using its line number or business description.
const getRow = (rows = [], lineNo, detailNames = []) => {
  const names = detailNames.map((name) =>
    String(name).trim().toLowerCase()
  );

  return rows.find((row) => {
    const rowLineNo = Number(
      row?.Line_No ??
        row?.lineNo ??
        row?.line_no
    );

    const details = String(
      row?.Details ??
        row?.details ??
        ""
    )
      .trim()
      .toLowerCase();

    return (
      (lineNo !== undefined &&
        Number.isFinite(rowLineNo) &&
        rowLineNo === Number(lineNo)) ||
      names.includes(details)
    );
  });
};

// Read a financial value from either normalized values or native SP columns.
const getValue = (row, period) => {
  if (!row || !period) {
    return null;
  }

  const values = row.values || row;
  const key = Object.keys(values).find(
    (item) =>
      String(item).trim().toLowerCase() ===
      String(period).trim().toLowerCase()
  );

  if (key === undefined) {
    return null;
  }

  const value = values[key];

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
};

// Identify period columns from either normalized FinBS or native FinIS rows.
const getPeriods = (rows = []) => {
  if (!rows.length) {
    return [];
  }

  if (rows.some((row) => row?.values)) {
    return [
      ...new Set(
        rows.flatMap((row) =>
          row?.values
            ? Object.keys(row.values)
            : []
        )
      ),
    ];
  }

  const metadataColumns = new Set([
    "game_id",
    "game_batch",
    "game_team",
    "line_no",
    "lineno",
    "details",
    "production_month",
    "uom",
    "currency",
  ]);

  return [
    ...new Set(
      rows.flatMap((row) =>
        Object.keys(row || {}).filter(
          (key) =>
            !metadataColumns.has(
              String(key).trim().toLowerCase()
            )
        )
      )
    ),
  ];
};

// Build the income statement model for one period.
const buildIncomeStatementModel = (
  rows = [],
  period
) => {
  const salesRevenue = getRow(rows, 1, [
    "Sales Revenue",
    "Revenue",
  ]);

  const cogs = getRow(rows, 2, [
    "Cost of Goods Sold",
    "COGS",
  ]);

  const grossProfit = getRow(rows, 3, [
    "Gross Profit",
  ]);

  const pbit = getRow(rows, 25, [
    "PBIT",
    "EBIT",
    "Profit Before Interest & Tax",
  ]);

  const financeCost = getRow(rows, 26, [
    "Finance Cost",
    "Interest Expense",
  ]);

  const pbt = getRow(rows, 27, [
    "PBT",
    "Profit Before Tax",
  ]);

  const corporateTax = getRow(rows, 28, [
    "Corporate Tax",
    "Tax",
  ]);

  const netProfit = getRow(rows, 29, [
    "Net Profit",
    "Profit After Tax",
  ]);

  return {
    revenue: getValue(salesRevenue, period),
    cogs: getValue(cogs, period),
    grossProfit: getValue(grossProfit, period),
    ebit: getValue(pbit, period),
    financeCost: getValue(financeCost, period),
    pbt: getValue(pbt, period),
    tax: getValue(corporateTax, period),
    profitAfterTax: getValue(netProfit, period),
    netProfit: getValue(netProfit, period),
  };
};

// Build the balance sheet model for one period.
const buildBalanceSheetModel = (
  rows = [],
  period
) => {
  const equity = getRow(rows, 1, [
    "Equity",
  ]);

  const retainedEarning = getRow(rows, 4, [
    "Retained Earning",
    "Retained Earnings",
  ]);

  const reserveSurplus = getRow(rows, 6, [
    "Reserve & Surplus",
    "Reserves & Surplus",
  ]);

  const longTermLoan = getRow(rows, 7, [
    "Long Term Loan",
    "Long-Term Loan",
  ]);

  const shortTermLoan = getRow(rows, 8, [
    "Short Term Loan",
    "Short-Term Loan",
  ]);

  const securedLoan = getRow(rows, 9, [
    "Secured Loan",
  ]);

  const bankCredit = getRow(rows, 10, [
    "Bank Credit",
  ]);

  const unsecuredLoan = getRow(rows, 12, [
    "Unsecured Loan",
  ]);

  const accountsPayable = getRow(rows, 13, [
    "Ac_Payable",
    "Accounts Payable",
    "A/C Payable",
  ]);

  const currentLiability = getRow(rows, 16, [
    "Current Liability",
    "Current Liabilities",
  ]);

  const totalLiability = getRow(rows, 17, [
    "Total Liability",
    "Total Liabilities",
  ]);

  const fixedAssets = getRow(rows, 20, [
    "Fixed Assets",
  ]);

  const cash = getRow(rows, 21, [
    "Cash Balance",
    "Cash",
  ]);

  const rawMaterialInventory = getRow(
    rows,
    22,
    ["Raw Material Inventory"]
  );

  const workInProgress = getRow(
    rows,
    23,
    [
      "Work In Progress",
      "Work in Progress",
      "WIP",
    ]
  );

  const finishedGoodsInventory = getRow(
    rows,
    24,
    ["Finished Goods Inventory"]
  );

  const totalInventory = getRow(
    rows,
    25,
    [
      "Total Inventory",
      "Inventory",
    ]
  );

  const accountsReceivable = getRow(
    rows,
    28,
    [
      "Ac Receivable",
      "Accounts Receivable",
      "A/C Receivable",
    ]
  );

  const currentAssets = getRow(
    rows,
    34,
    [
      "Current Asset",
      "Current Assets",
    ]
  );

  const totalAssets = getRow(
    rows,
    36,
    ["Total Assets"]
  );

  return {
    equity: getValue(equity, period),
    retainedEarning: getValue(
      retainedEarning,
      period
    ),
    reserveSurplus: getValue(
      reserveSurplus,
      period
    ),
    longTermLoan: getValue(
      longTermLoan,
      period
    ),
    shortTermLoan: getValue(
      shortTermLoan,
      period
    ),
    securedLoan: getValue(
      securedLoan,
      period
    ),
    bankCredit: getValue(
      bankCredit,
      period
    ),
    unsecuredLoan: getValue(
      unsecuredLoan,
      period
    ),
    accountsPayable: getValue(
      accountsPayable,
      period
    ),
    currentLiability: getValue(
      currentLiability,
      period
    ),
    fixedAssets: getValue(
      fixedAssets,
      period
    ),
    cash: getValue(cash, period),
    rawMaterialInventory: getValue(
      rawMaterialInventory,
      period
    ),
    workInProgress: getValue(
      workInProgress,
      period
    ),
    finishedGoodsInventory: getValue(
      finishedGoodsInventory,
      period
    ),
    totalInventory: getValue(
      totalInventory,
      period
    ),
    accountsReceivable: getValue(
      accountsReceivable,
      period
    ),
    currentAssets: getValue(
      currentAssets,
      period
    ),
    totalLiability: getValue(
      totalLiability,
      period
    ),
    totalAssets: getValue(
      totalAssets,
      period
    ),
  };
};

// Build the future-compatible cash flow model for one period.
const buildCashFlowModel = (
  rows = [],
  period
) => {
  if (!rows.length) {
    return {
      operatingCashFlow: null,
      investingCashFlow: null,
      financingCashFlow: null,
      freeCashFlow: null,
    };
  }

  const operatingCashFlow = getRow(
    rows,
    undefined,
    [
      "Operating Cash Flow",
      "Cash Flow From Operations",
      "Net Cash From Operating Activities",
    ]
  );

  const investingCashFlow = getRow(
    rows,
    undefined,
    [
      "Investing Cash Flow",
      "Cash Flow From Investing",
      "Net Cash From Investing Activities",
    ]
  );

  const financingCashFlow = getRow(
    rows,
    undefined,
    [
      "Financing Cash Flow",
      "Cash Flow From Financing",
      "Net Cash From Financing Activities",
    ]
  );

  return {
    operatingCashFlow: getValue(
      operatingCashFlow,
      period
    ),
    investingCashFlow: getValue(
      investingCashFlow,
      period
    ),
    financingCashFlow: getValue(
      financingCashFlow,
      period
    ),
    freeCashFlow: null,
  };
};

// Convert a reporting period into a sortable date.
const toPeriodDate = (value) => {
  if (!value) {
    return null;
  }

  const text = String(value).trim();

  const match = text.match(
    /^([A-Za-z]{3})[-/](\d{4})$/
  );

  if (match) {
    const monthIndex = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ].indexOf(
      match[1].toLowerCase()
    );

    if (monthIndex >= 0) {
      return new Date(
        Number(match[2]),
        monthIndex,
        1
      );
    }
  }

  const date = new Date(text);

  return Number.isNaN(date.getTime())
    ? null
    : date;
};

// Combine all financial statements into one period-based analytical model.
export const buildAnnualData = (
  finISRows = [],
  finBSRows = [],
  finCFRows = []
) => {
  const periods = [
    ...new Set([
      ...getPeriods(finISRows),
      ...getPeriods(finBSRows),
      ...getPeriods(finCFRows),
    ]),
  ].sort((a, b) => {
    const dateA = toPeriodDate(a);
    const dateB = toPeriodDate(b);

    if (dateA && dateB) {
      return dateA - dateB;
    }

    return String(a).localeCompare(
      String(b)
    );
  });

  return periods.map((period, index) => ({
    period,
    previousPeriod:
      index > 0
        ? periods[index - 1]
        : null,
    finIS: buildIncomeStatementModel(
      finISRows,
      period
    ),
    finBS: buildBalanceSheetModel(
      finBSRows,
      period
    ),
    finCF: buildCashFlowModel(
      finCFRows,
      period
    ),
  }));
};

// Return the latest analytical reporting period.
export const getLatestAnnualData = (
  annualData = []
) =>
  annualData.length
    ? annualData[annualData.length - 1]
    : null;

// Return the previous analytical reporting period.
export const getPreviousAnnualData = (
  annualData = []
) =>
  annualData.length > 1
    ? annualData[annualData.length - 2]
    : null;

export default {
  buildAnnualData,
  getLatestAnnualData,
  getPreviousAnnualData,
};