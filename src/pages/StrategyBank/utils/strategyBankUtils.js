
// ============================================================
// Module: StrategyBank Utils
// Purpose: Filter, sort and calculate Strategy Bank values
// AI Tags: strategy-bank, utility, filter, sort, kpi
// ============================================================

export function computeImpact(row) {
  return (
    Number(row.Gain_Norm || 0) -
    Number(row.Loss_Norm || 0)
  ).toFixed(1);
}

export function formatAmount(row) {
  const amount = Number(row.Implied_Cost || 0);

  if (!Number.isFinite(amount)) return "—";

  return amount.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}

export function formatMoney(value) {
  return Number(value || 0).toLocaleString("en-US", {
    maximumFractionDigits: 2,
  });
}

export function distinctChoiceGroups(rows) {
  return [...new Set(
    rows
      .map((r) => r.Mutual_X_Group)
      .filter(Boolean)
  )].sort();
}

export function filterAndSortRows(rows, filters) {
  const {
    search = "",
    choice = "ALL",
    sort = "default",
  } = filters;

  const term = search.trim().toLowerCase();

  let result = rows.filter((r) => {
    const matchesChoice =
      choice === "ALL" || r.Mutual_X_Group === choice;

    const matchesSearch =
      !term ||
      [
        r.Strategy,
        r.Benefit,
        r.Category_Name,
        r.Resultant,
      ].some((value) =>
        String(value || "").toLowerCase().includes(term)
      );

    return matchesChoice && matchesSearch;
  });

  result = [...result];

  switch (sort) {
    case "impact-desc":
      result.sort((a, b) => computeImpact(b) - computeImpact(a));
      break;

    case "impact-asc":
      result.sort((a, b) => computeImpact(a) - computeImpact(b));
      break;

    case "budget-desc":
      result.sort(
        (a, b) =>
          Number(b.Implied_Cost || 0) -
          Number(a.Implied_Cost || 0)
      );
      break;

    case "budget-asc":
      result.sort(
        (a, b) =>
          Number(a.Implied_Cost || 0) -
          Number(b.Implied_Cost || 0)
      );
      break;

    case "duration-desc":
      result.sort(
        (a, b) =>
          Number(b.Duration_Month || 0) -
          Number(a.Duration_Month || 0)
      );
      break;

    default:
      result.sort(
        (a, b) => Number(a.S_No || 0) - Number(b.S_No || 0)
      );
  }

  return result;
}

export function computeKpis(rows) {
  const totalStrategies = rows.length;

  // Investment is the total of Fixed Cost strategies only.
  const investmentRows = rows.filter(
    (r) => String(r.Cost_Type || "").toLowerCase() === "fixed"
  );

  const totalInvestment = investmentRows.reduce(
    (sum, r) => sum + Number(r.Implied_Cost || 0),
    0
  );

  const investmentUOM = investmentRows[0]?.UOM || "";

  const totalGain = rows.reduce(
    (sum, r) => sum + Number(r.Gain_Norm || 0),
    0
  );

  const avgGain = totalStrategies
    ? totalGain / totalStrategies
    : 0;

  const avgDuration = totalStrategies
    ? Math.round(
        rows.reduce(
          (sum, r) => sum + Number(r.Duration_Month || 0),
          0
        ) / totalStrategies
      )
    : 0;

  return {
    totalStrategies,
    totalInvestment,
    investmentUOM,
    avgGain,
    totalGain,
    avgDuration,
  };
}
