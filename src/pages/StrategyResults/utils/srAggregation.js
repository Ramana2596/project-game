// Utility: srAggregation
// Module: StrategyResults
// Purpose: prepare strategy cards and overview totals
// Author/Version: OpsMgt UX Lab / v2.0
// AI Tags: strategy, results, aggregation, overview

export const listSetNos = (rowLists) =>
  [...new Set(
    rowLists
      .flat()
      .map((row) => row.setNo)
      .filter((value) => value !== null && value !== undefined)
  )].sort((a, b) => Number(b) - Number(a));

const sumOf = (rows, key) =>
  rows.reduce((total, row) => {
    if (row[key] === null || row[key] === undefined) return total;
    return total + Number(row[key]);
  }, 0);

const avgOf = (rows, key) => {
  const values = rows
    .filter((row) => row[key] !== null && row[key] !== undefined)
    .map((row) => Number(row[key]));

  return values.length
    ? values.reduce((total, value) => total + value, 0) / values.length
    : null;
};

const sumByCurrency = (rows, currencyKey, amountKey) =>
  rows.reduce((result, row) => {
    if (row[amountKey] === null || row[amountKey] === undefined) {
      return result;
    }

    const currency = row[currencyKey] || "—";

    return {
      ...result,
      [currency]: (result[currency] || 0) + Number(row[amountKey]),
    };
  }, {});

export const buildCards = (
  planRows,
  budgetRows,
  demandRows,
  discountRows,
  savingsRows
) => {
  const strategyMap = new Map();

  const getStrategy = (row) => {
    if (!strategyMap.has(row.stratId)) {
      strategyMap.set(row.stratId, {
        id: row.stratId,
        strategy: row.strategy,
        plan: null,
        budget: [],
        demand: [],
        discount: [],
        savings: [],
      });
    }

    return strategyMap.get(row.stratId);
  };

  planRows.forEach((row) => {
    getStrategy(row).plan = row;
  });

  budgetRows.forEach((row) => {
    getStrategy(row).budget.push(row);
  });

  demandRows.forEach((row) => {
    getStrategy(row).demand.push(row);
  });

  discountRows.forEach((row) => {
    getStrategy(row).discount.push(row);
  });

  savingsRows.forEach((row) => {
    getStrategy(row).savings.push(row);
  });

  return [...strategyMap.values()]
    .map((item) => ({
      id: item.id,
      strategy: item.strategy,
      plan: item.plan,
      nBud: item.budget.length,
      budget: sumByCurrency(item.budget, "cur", "amt"),
      implFrom: item.budget[0]?.implDate,
      nDem: item.demand.length,
      nDisc: item.discount.length,
      nSav: item.savings.length,
      addlDem: sumOf(item.demand, "addlDem"),
      discAmt: sumByCurrency(item.discount, "cur", "discAmt"),
      savAvg: avgOf(item.savings, "savPct"),
    }))
    .sort((a, b) =>
      String(a.id).localeCompare(
        String(b.id),
        undefined,
        { numeric: true }
      )
    );
};

export const buildTotals = (
  cards,
  planRows,
  budgetRows,
  demandRows,
  discountRows,
  savingsRows
) => ({
  nSel: cards.length,
  nTotal: planRows.length || cards.length,
  budget: sumByCurrency(budgetRows, "cur", "amt"),
  addlDem: sumOf(demandRows, "addlDem"),
  discAmt: sumByCurrency(discountRows, "cur", "discAmt"),
  savAvg: avgOf(savingsRows, "savPct"),
});