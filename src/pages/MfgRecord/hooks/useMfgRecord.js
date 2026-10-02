// hooks/useMfgRecord.js – loads month list and month data, maps SP columns, derives card values
import { useEffect, useMemo, useState } from "react";
import { getProductionInfo, getSalesInfo } from "../services/mrService";
import { toPeriod } from "../utils/mrFormat";
import { MR_TOL_PCT } from "../constants/mrConstants";
import { MR_PROD_MAP, MR_SALES_MAP, mrMapRow } from "../constants/mrMap";

// Generic rule: actual vs reference -> { level: BELOW | ON | ABOVE, pct }, or nulls when not judgeable
const judge = (actual, ref) => {
  if (actual == null || !ref) return { level: null, pct: null };
  const pct = (actual / ref) * 100;
  return { level: pct < 100 - MR_TOL_PCT ? "BELOW" : pct > 100 + MR_TOL_PCT ? "ABOVE" : "ON", pct: Math.round(pct) };
};

const TEXT = ["period", "product", "uom", "currency"];
const toRow = (r, map) => {
  const o = mrMapRow(r, map);
  Object.keys(o).forEach((k) => { if (!TEXT.includes(k) && o[k] != null) o[k] = Number(o[k]); });
  return o;
};

export function useMfgRecord(query, selectedMonth) {
  const [months, setMonths] = useState([]);
  const [data, setData] = useState({ prod: [], sales: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [filter, setFilter] = useState("ALL");

  // Month list = distinct periods from an all-period call
  useEffect(() => {
    if (!query) return;
    let live = true;
    getProductionInfo(query, null)
      .then((rows) => live && setMonths([...new Set(rows.map((r) => r.Period))]))
      .catch((e) => live && setError(e.message));
    return () => { live = false; };
  }, [query]);

  // Month shown = chosen month, else the latest month with records
  const period = toPeriod(selectedMonth) || months[months.length - 1] || "";

  useEffect(() => {
    if (!query || !period) return;
    let live = true;
    setLoading(true);
    Promise.all([getProductionInfo(query, period), getSalesInfo(query, period)])
      .then(([p, s]) => live && (setData({
        prod: p.map((r) => toRow(r, MR_PROD_MAP)),
        sales: s.map((r) => toRow(r, MR_SALES_MAP)),
      }), setError("")))
      .catch((e) => live && setError(e.message))
      .finally(() => live && setLoading(false));
    return () => { live = false; };
  }, [query, period]);

  // One card per product: production + sales joined, plus derived values
  const cards = useMemo(() => {
    const names = [...new Set([...data.prod, ...data.sales].map((r) => r.product))];
    return names.map((product) => {
      const prod = data.prod.find((r) => r.product === product) || {};
      const sale = data.sales.find((r) => r.product === product) || {};
      const { stockQty = null } = prod;
      const { soldQty = null, salesTarget = null, unitPrice = null, salesValue = null } = sale;
      // DERIVED – move to SP/API later; only this block changes
      const unsoldQty = stockQty != null && soldQty != null ? stockQty - soldQty : null;
            const { planQty = null } = prod;
      const { level: prodLevel, pct: prodPct } = judge(stockQty, planQty);
      const { level: salesLevel, pct: salesPct } = judge(soldQty, salesTarget);
      const valueGap = unitPrice != null && soldQty != null && salesValue != null
        ? Math.round(soldQty * unitPrice - salesValue) : 0;
      return { ...prod, ...sale, product, period, unsoldQty, prodLevel, prodPct, salesLevel, salesPct, valueGap };
    });
  }, [data, period]);

  const products = useMemo(() => cards.map((c) => c.product), [cards]);
  const pick = (a) => a.filter((r) => filter === "ALL" || r.product === filter);

  return {
    period, months, loading, error, activeTab, setActiveTab, filter, setFilter, products,
    cards: pick(cards), prodRows: pick(data.prod), salesRows: pick(data.sales),
  };
}