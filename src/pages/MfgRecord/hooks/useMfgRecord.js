// hooks/useMfgRecord.js – loads month list and month data, maps SP columns, derives card values
import { useEffect, useMemo, useState } from "react";
import { getProductionInfo, getSalesInfo } from "../services/mrService";
import { toPeriod } from "../utils/mrFormat";
import { MR_PROD_MAP, MR_SALES_MAP, mrMapRow } from "../constants/mrMap";

// Text columns stay as text; everything else is converted to a number
const TEXT = ["period", "product", "uom", "currency", "prodLevel", "salesLevel"];
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

  // One card per product: production + sales joined. Levels, %, value gap and share come from the SPs.
  const cards = useMemo(() => {
    const names = [...new Set([...data.prod, ...data.sales].map((r) => r.product))];
    return names.map((product) => {
      const prod = data.prod.find((r) => r.product === product) || {};
      const sale = data.sales.find((r) => r.product === product) || {};
      // DERIVED – needs both datasets, so it stays here
      const { stockQty = null } = prod;
      const { soldQty = null } = sale;
      const unsoldQty = stockQty != null && soldQty != null ? stockQty - soldQty : null;
      return { ...prod, ...sale, product, period, unsoldQty };
    });
  }, [data, period]);

  const products = useMemo(() => cards.map((c) => c.product), [cards]);
  const pick = (a) => a.filter((r) => filter === "ALL" || r.product === filter);

  return {
    period, months, loading, error, activeTab, setActiveTab, filter, setFilter, products,
    cards: pick(cards), prodRows: pick(data.prod), salesRows: pick(data.sales),
  };
}