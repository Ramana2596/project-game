
/**
 * Component Name: useFinBS
 * Module: Finance / FinBS
 * Purpose: Load the Balance Sheet and derive compact tree, filters, periods and KPIs.
 * Author/Version: UXLab / v1.0
 * AI Tags: hook, finBS, balance sheet, business logic, compact view, drill-down, search, filters, KPI
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getBalanceSheetInfo, normalizeRows } from "../services/finBSService";
import { toMonthEndIso } from "../utils/formatters";
import {
  BALANCE_TOLERANCE,
  DEFAULT_VIEW,
  KPI_LINES,
  LINE_CHILDREN,
  LINE_TYPES,
  SP_RETURN,
  STATEMENT_SECTIONS,
  STATUS,
} from "../constants/finBS.constants";

const INITIAL = {
  status: STATUS.IDLE,
  rows: [],
  periods: [],
  message: "",
  code: null,
};

export default function useFinBS({
  gameId,
  gameBatch,
  gameTeam,
  productionMonth,
  enabled = true,
}) {
  // State
  const [result, setResult] = useState(INITIAL);
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("all");
  const [view, setView] = useState(DEFAULT_VIEW);
  const [expanded, setExpanded] = useState([]);
  const latestRequest = useRef(0);

  // Load Balance Sheet
  const load = useCallback(async () => {
    const requestId = ++latestRequest.current;

    setResult((prev) => ({
      ...prev,
      status: STATUS.LOADING,
      message: "",
    }));

    try {
      const response = await getBalanceSheetInfo({
        params: {
          gameId,
          gameBatch: Number(gameBatch),
          gameTeam,
          productionMonth: toMonthEndIso(productionMonth),
        },
      });

      if (requestId !== latestRequest.current) return;

      const payload = response?.data || {};
      const normalized = normalizeRows(payload.data || []);
      const code = payload.code;
      const message = payload.message || "";

      if (code === SP_RETURN.OK && normalized.rows.length) {
        setResult({
          status: STATUS.SUCCESS,
          rows: normalized.rows,
          periods: normalized.periods,
          message,
          code,
        });
      } else if (
        code === SP_RETURN.NOT_FOUND ||
        (code === SP_RETURN.OK && !normalized.rows.length)
      ) {
        setResult({
          ...INITIAL,
          status: STATUS.EMPTY,
          message,
          code,
        });
      } else {
        setResult({
          ...INITIAL,
          status: STATUS.ERROR,
          message,
          code,
        });
      }
    } catch (error) {
      if (requestId !== latestRequest.current) return;

      setResult({
        ...INITIAL,
        status: STATUS.ERROR,
        message: error.message,
      });
    }
  }, [gameId, gameBatch, gameTeam, productionMonth]);

  // Load when enabled and context changes
  useEffect(() => {
    if (enabled) load();
  }, [enabled, load]);

  // Periods containing data
  const populatedPeriods = useMemo(
    () =>
      result.periods.filter((period) =>
        result.rows.some((row) => row.values[period] !== null)
      ),
    [result.periods, result.rows]
  );

  // Visible period columns
  const visiblePeriods = useMemo(
    () => (populatedPeriods.length ? populatedPeriods : result.periods),
    [populatedPeriods, result.periods]
  );

  // Compact view becomes a tree when there is no search text
  const isTreeView = view === "compact" && !search.trim();

  // Apply group, search and compact-tree rules
  const visibleRows = useMemo(() => {
    const section = STATEMENT_SECTIONS.find((item) => item.key === group);
    const term = search.trim().toLowerCase();

    const inSection = (row) =>
      !section ||
      (row.lineNo >= section.fromLine && row.lineNo <= section.toLine);

    // Detailed view or search: show every matching line
    if (!isTreeView) {
      return result.rows
        .filter(
          (row) =>
            inSection(row) &&
            (!term || row.details.toLowerCase().includes(term))
        )
        .map((row) => ({
          ...row,
          depth: 0,
          hasChildren: false,
          isExpanded: false,
        }));
    }

    // Compact view: build the configured statement tree
    const byLine = new Map(result.rows.map((row) => [row.lineNo, row]));
    const childLines = new Set(Object.values(LINE_CHILDREN).flat());
    const hasBalance = (row) =>
      result.periods.some((period) => (row.values[period] ?? 0) !== 0);

    const tree = [];

    const addRow = (row, depth) => {
      const children = (LINE_CHILDREN[row.lineNo] || [])
        .map((lineNo) => byLine.get(lineNo))
        .filter(Boolean);

      const isExpanded =
        children.length > 0 && expanded.includes(row.lineNo);

      tree.push({
        ...row,
        depth,
        hasChildren: children.length > 0,
        isExpanded,
      });

      if (isExpanded) {
        children.forEach((child) => addRow(child, depth + 1));
      }
    };

    result.rows
      .filter(
        (row) =>
          !childLines.has(row.lineNo) &&
          inSection(row) &&
          (LINE_TYPES[row.lineNo] || hasBalance(row))
      )
      .forEach((row) => addRow(row, 0));

    return tree;
  }, [
    result.rows,
    result.periods,
    group,
    search,
    isTreeView,
    expanded,
  ]);

  // Expand or collapse a compact tree line
  const toggleLine = useCallback((lineNo) => {
    setExpanded((prev) =>
      prev.includes(lineNo)
        ? prev.filter((item) => item !== lineNo)
        : [...prev, lineNo]
    );
  }, []);

  // Latest period containing data
  const latestPeriod = populatedPeriods.length
    ? populatedPeriods[populatedPeriods.length - 1]
    : result.periods[result.periods.length - 1] ?? null;

  // Calculate KPI figures and balance check
  const summary = useMemo(() => {
    if (!latestPeriod) return null;

    const valuesByLine = new Map(
      result.rows.map((row) => [row.lineNo, row.values[latestPeriod]])
    );

    const valueOf = (lineNo) => valuesByLine.get(lineNo) ?? null;

    const totalAssets = valueOf(KPI_LINES.totalAssets);
    const totalLiability = valueOf(KPI_LINES.totalLiability);
    const currentAsset = valueOf(KPI_LINES.currentAsset);
    const currentLiability = valueOf(KPI_LINES.currentLiability);

    const canCheck =
      totalAssets !== null && totalLiability !== null;

    const difference = canCheck
      ? totalAssets - totalLiability
      : null;

    return {
      period: latestPeriod,
      totalAssets,
      totalLiability,
      cash: valueOf(KPI_LINES.cash),
      currentRatio:
        currentAsset !== null &&
        currentLiability !== null &&
        currentLiability !== 0
          ? currentAsset / currentLiability
          : null,
      difference,
      isBalanced: canCheck
        ? Math.abs(difference) <= BALANCE_TOLERANCE
        : null,
    };
  }, [result.rows, latestPeriod]);

  return {
    ...result,
    isLoading: result.status === STATUS.LOADING,
    visibleRows,
    visiblePeriods,
    hiddenPeriodCount:
      result.periods.length - visiblePeriods.length,
    latestPeriod,
    summary,
    search,
    setSearch,
    group,
    setGroup,
    view,
    setView,
    isTreeView,
    toggleLine,
    reload: load,
  };
}