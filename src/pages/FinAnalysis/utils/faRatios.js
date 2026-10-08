// Utility: arRatios
// Module: AnnualReport
// Purpose: Calculate financial ratios from normalized Annual Report data
// Author/Version: OpsMgt UX Lab / v1.0
// AI Tags: annual-report, ratios, profitability, returns, liquidity, leverage

// Safely divide two numeric values.
const safeDivide = (numerator, denominator) => {
  const n = Number(numerator);
  const d = Number(denominator);

  if (!Number.isFinite(n) || !Number.isFinite(d) || d === 0) {
    return null;
  }

  return n / d;
};

// Convert a ratio to percentage form.
const percent = (numerator, denominator) => {
  const value = safeDivide(numerator, denominator);

  return value === null ? null : value * 100;
};

// Calculate an average balance when a previous period exists.
const average = (current, previous) => {
  const currentValue = Number(current) || 0;

  if (previous === null || previous === undefined) {
    return currentValue;
  }

  const previousValue = Number(previous) || 0;

  return (currentValue + previousValue) / 2;
};

// Determine the number of days represented by the reporting period.
const getDaysInPeriod = (period) => {
  if (!period) {
    return 30;
  }

  const date = new Date(period);

  if (Number.isNaN(date.getTime())) {
    return 30;
  }

  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
};

// Calculate percentage growth between two periods.
const calculateGrowth = (current, previous) => {
  if (previous === null || previous === undefined) {
    return null;
  }

  return percent(current - previous, previous);
};

// Calculate return on average equity.
const calculateROE = (current, previous) => {
  const currentEquity = current.finBS?.equity || 0;
  const previousEquity = previous?.finBS?.equity;

  const averageEquity = average(
    currentEquity,
    previousEquity
  );

  return percent(
    current.finIS?.profitAfterTax || 0,
    averageEquity
  );
};

// Calculate return on average assets.
const calculateROA = (current, previous) => {
  const currentAssets =
    current.finBS?.totalAssets || 0;
  const previousAssets =
    previous?.finBS?.totalAssets;

  const averageAssets = average(
    currentAssets,
    previousAssets
  );

  return percent(
    current.finIS?.profitAfterTax || 0,
    averageAssets
  );
};

// Calculate asset turnover.
const calculateAssetTurnover = (
  current,
  previous
) => {
  const currentAssets =
    current.finBS?.totalAssets || 0;
  const previousAssets =
    previous?.finBS?.totalAssets;

  const averageAssets = average(
    currentAssets,
    previousAssets
  );

  return safeDivide(
    current.finIS?.revenue || 0,
    averageAssets
  );
};

// Calculate receivable days.
const calculateReceivableDays = (
  current,
  previous
) => {
  const currentReceivable =
    current.finBS?.accountsReceivable || 0;
  const previousReceivable =
    previous?.finBS?.accountsReceivable;

  const averageReceivable = average(
    currentReceivable,
    previousReceivable
  );

  const revenue =
    current.finIS?.revenue || 0;
  const days = getDaysInPeriod(current.period);

  const ratio = safeDivide(
    averageReceivable,
    revenue
  );

  return ratio === null ? null : ratio * days;
};

// Calculate inventory days.
const calculateInventoryDays = (
  current,
  previous
) => {
  const currentInventory =
    current.finBS?.totalInventory || 0;
  const previousInventory =
    previous?.finBS?.totalInventory;

  const averageInventory = average(
    currentInventory,
    previousInventory
  );

  const cogs =
    current.finIS?.cogs || 0;
  const days = getDaysInPeriod(current.period);

  const ratio = safeDivide(
    averageInventory,
    cogs
  );

  return ratio === null ? null : ratio * days;
};

// Calculate payable days.
const calculatePayableDays = (
  current,
  previous
) => {
  const currentPayable =
    current.finBS?.accountsPayable || 0;
  const previousPayable =
    previous?.finBS?.accountsPayable;

  const averagePayable = average(
    currentPayable,
    previousPayable
  );

  const cogs =
    current.finIS?.cogs || 0;
  const days = getDaysInPeriod(current.period);

  const ratio = safeDivide(
    averagePayable,
    cogs
  );

  return ratio === null ? null : ratio * days;
};

// Calculate interest coverage.
const calculateInterestCoverage = (current) => {
  const ebit = current.finIS?.ebit || 0;
  const financeCost =
    current.finIS?.financeCost || 0;

  return safeDivide(ebit, financeCost);
};

// Calculate total debt using the existing Annual Report convention.
const calculateTotalDebt = (finBS = {}) => {
  const longTermLoan =
    Number(finBS.longTermLoan) || 0;
  const securedLoan =
    Number(finBS.securedLoan) || 0;
  const bankCredit =
    Number(finBS.bankCredit) || 0;
  const unsecuredLoan =
    Number(finBS.unsecuredLoan) || 0;

  return (
    longTermLoan +
    securedLoan +
    bankCredit +
    unsecuredLoan
  );
};

// Calculate macro cash-flow ratios.
const calculateCashFlowRatios = (current) => {
  const revenue =
    current.finIS?.revenue || 0;
  const pat =
    current.finIS?.profitAfterTax || 0;

  const operatingCashFlow =
    current.finCF?.operatingCashFlow || 0;
  const investingCashFlow =
    current.finCF?.investingCashFlow || 0;

  const freeCashFlow =
    operatingCashFlow + investingCashFlow;

  return {
    operatingCashFlow,
    freeCashFlow,
    cashFlowMargin: percent(
      operatingCashFlow,
      revenue
    ),
    ocfPat: safeDivide(
      operatingCashFlow,
      pat
    ),
    fcfMargin: percent(
      freeCashFlow,
      revenue
    ),
  };
};

// Calculate the complete Annual Report ratio set.
export const calculateRatios = (
  current,
  previous = null
) => {
  const revenue =
    current.finIS?.revenue || 0;
  const previousRevenue =
    previous?.finIS?.revenue;

  const grossProfit =
    current.finIS?.grossProfit || 0;
  const ebit =
    current.finIS?.ebit || 0;
  const profitAfterTax =
    current.finIS?.profitAfterTax || 0;

  const currentAssets =
    current.finBS?.currentAssets || 0;
  const currentLiabilities =
    current.finBS?.currentLiability || 0;

  const equity =
    current.finBS?.equity || 0;
  const totalDebt =
    calculateTotalDebt(current.finBS);

  const receivableDays =
    calculateReceivableDays(
      current,
      previous
    );

  const inventoryDays =
    calculateInventoryDays(
      current,
      previous
    );

  const payableDays =
    calculatePayableDays(
      current,
      previous
    );

  const cashFlowRatios =
    calculateCashFlowRatios(current);

  return {
    revenueGrowth: calculateGrowth(
      revenue,
      previousRevenue
    ),

    profitGrowth: calculateGrowth(
      profitAfterTax,
      previous?.finIS?.profitAfterTax
    ),

    grossMargin: percent(
      grossProfit,
      revenue
    ),

    ebitMargin: percent(
      ebit,
      revenue
    ),

    netMargin: percent(
      profitAfterTax,
      revenue
    ),

    roe: calculateROE(
      current,
      previous
    ),

    roa: calculateROA(
      current,
      previous
    ),

    assetTurnover:
      calculateAssetTurnover(
        current,
        previous
      ),

    currentRatio: safeDivide(
      currentAssets,
      currentLiabilities
    ),

    debtEquity: safeDivide(
      totalDebt,
      equity
    ),

    receivableDays,
    inventoryDays,
    payableDays,

    cashConversionCycle:
      receivableDays === null ||
      inventoryDays === null ||
      payableDays === null
        ? null
        : receivableDays +
          inventoryDays -
          payableDays,

    interestCoverage:
      calculateInterestCoverage(current),

    ...cashFlowRatios,
  };
};

// Calculate ratios across all reporting periods.
export const calculateRatioSeries = (
  data = []
) =>
  data.map((current, index) => ({
    period: current.period,
    previousPeriod:
      current.previousPeriod || null,
    ratios: calculateRatios(
      current,
      data[index - 1] || null
    ),
  }));

// Calculate the latest reporting-period ratios.
export const calculateLatestRatios = (
  data = []
) => {
  if (!data.length) {
    return null;
  }

  const index = data.length - 1;
  const current = data[index];

  return {
    period: current.period,
    ratios: calculateRatios(
      current,
      data[index - 1] || null
    ),
  };
};

// Extract one ratio from the complete ratio series.
export const getRatioValue = (
  ratioSeries = [],
  ratioId
) =>
  ratioSeries.map((item) => ({
    period: item.period,
    value:
      item.ratios?.[ratioId] ?? null,
  }));

// Calculate absolute ratio movement.
export const calculateRatioChange = (
  currentValue,
  previousValue
) => {
  if (
    currentValue === null ||
    currentValue === undefined ||
    previousValue === null ||
    previousValue === undefined
  ) {
    return null;
  }

  return currentValue - previousValue;
};

// Calculate percentage ratio movement.
export const calculateRatioChangePercent = (
  currentValue,
  previousValue
) => {
  if (
    currentValue === null ||
    currentValue === undefined ||
    previousValue === null ||
    previousValue === undefined ||
    previousValue === 0
  ) {
    return null;
  }

  return (
    ((currentValue - previousValue) /
      Math.abs(previousValue)) *
    100
  );
};

export { safeDivide, percent };

export default {
  calculateRatios,
  calculateRatioSeries,
  calculateLatestRatios,
  getRatioValue,
  calculateRatioChange,
  calculateRatioChangePercent,
};

// getDirection: Map ratio movement to a generic improving, declining, or stable direction

export const getDirection = (change, inverse = false) => {
  const value = Number(change);

  if (!Number.isFinite(value) || value === 0) {
    return "stable";
  }

  const isPositive = value > 0;

  if (inverse) {
    return isPositive ? "declining" : "improving";
  }

  return isPositive ? "improving" : "declining";
};