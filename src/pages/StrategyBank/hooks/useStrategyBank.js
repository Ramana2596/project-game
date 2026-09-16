// ============================================================
// Hook: useStrategyBank
// Module: StrategyBank
// Purpose: Manage Strategy Bank data, filters, sorting and KPIs
// AI Tags: strategy-bank, hook, data, filter, sort, kpi
// ============================================================

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { getStrategyBenefit } from "../services/strategyBankService";
import { filterAndSortRows, computeKpis, distinctChoiceGroups } from "../utils/strategyBankUtils";

export default function useStrategyBank(gameId) {
  // Manage Strategy Bank data and request state.
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Manage search, group filter and sort state.
  const [search, setSearch] = useState("");
  const [choice, setChoice] = useState("ALL");
  const [sort, setSort] = useState("default");

  // Track the latest request so stale responses cannot overwrite current data.
  const requestIdRef = useRef(0);

  // Fetch Strategy Bank data and ignore stale responses.
  const load = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    if (!gameId) {
      setRows([]);
      setLoading(false);
      setError("No active game session — sign in or select a game to load Strategy Bank.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getStrategyBenefit({ gameId });
      const payload = response?.data;

      if (requestId !== requestIdRef.current) return;

      if (!payload?.success) {
        throw new Error(payload?.message || "Unable to load Strategy Bank");
      }

      setRows(payload.data || []);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setError(err.response?.data?.message || err.message || "Unable to load Strategy Bank");
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [gameId]);

  // Reset filters and reload data when the active game changes.
  useEffect(() => {
    setSearch("");
    setChoice("ALL");
    setSort("default");
    load();
  }, [gameId, load]);

  // Derive available choice groups from the loaded strategies.
  const choiceGroups = useMemo(() => distinctChoiceGroups(rows), [rows]);

  // Derive rows after applying search, group and sort selections.
  const filteredRows = useMemo(
    () => filterAndSortRows(rows, { search, choice, sort }),
    [rows, search, choice, sort]
  );

  // Derive KPI values from the complete Strategy Bank dataset.
  const kpis = useMemo(() => computeKpis(rows), [rows]);

  // Expose data, derived values and controls to the page.
  return {
    rows,
    filteredRows,
    kpis,
    choiceGroups,
    loading,
    error,
    reload: load,
    search,
    setSearch,
    choice,
    setChoice,
    sort,
    setSort,
  };
}