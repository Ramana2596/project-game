// File: src/pages/TeamPlan/hooks/useTeamPlan.js
// Purpose: Manage TeamPlan state, tab data, LOVs, edit and API integration
// V2 — Save result read from SP return value (0 = success), row validation
//      (numeric 8,2), calculating state, race-safe loads, pure state updates

import { useState, useEffect, useMemo, useRef } from "react";
import { getOpsPlanQuery, updateOpsPlanBulk } from "../services/service.js";
import { getResolvedColumns } from "../utils/getResolvedColumns.js";
import { COLUMN_RULES } from "../constants/columnRules.js";
import { useUser } from "../../../core/access/userContext.jsx";

/* ---------------- Helpers ---------------- */

// Largest value the database columns (numeric 8,2) can hold.
export const MAX_AMOUNT = 999999.99;

// Unique row key inside a tab: Part_No + Quantity_Id.
export const getRowKey = (r) => `${r?.Part_No ?? ""}|${r?.Quantity_Id ?? ""}`;

const isBlank = (v) => v === "" || v == null;

// Replace changed rows with the same key, then append the new ones.
const mergeChanged = (list = [], rows) => {
  const keys = new Set(rows.map(getRowKey));
  return [...list.filter((r) => !keys.has(getRowKey(r))), ...rows];
};

// Validate one money / quantity value. Returns "" when valid.
const checkAmount = (label, value) => {
  if (isBlank(value)) return `${label} is required`;
  const text = String(value).trim();
  if (!/^\d+(\.\d+)?$/.test(text)) return `${label} must be a positive number`;
  if (!/^\d+(\.\d{1,2})?$/.test(text)) return `${label} allows at most 2 decimals`;
  if (Number(text) > MAX_AMOUNT) return `${label} must be 999,999.99 or less`;
  return "";
};

// Validate changed rows. Returns { rowKey: message } for rows with a problem.
const validateRows = (rows, tab) => {
  const errors = {};
  rows.forEach((r) => {
    const message =
      checkAmount("Quantity", r.Quantity) ||
      (isBlank(r.Unit_Price) ? "" : checkAmount("Unit price", r.Unit_Price)) ||
      (tab !== "OI 001" && isBlank(r.Price_Id) ? "Select a price" : "");
    if (message) errors[getRowKey(r)] = message;
  });
  return errors;
};

export const useTeamPlan = (userInfo) => {
  const { user } = useUser();

  const { gameId, gameBatch, gameTeam } = userInfo || {};
  const ready = Boolean(gameId && gameTeam) && gameBatch != null;
  const userId = userInfo?.userId ?? user?.userId ?? null;

  const [tabDataMap, setTabDataMap] = useState({});
  const [savedDataMap, setSavedDataMap] = useState({});
  const [changedRowsMap, setChangedRowsMap] = useState({});
  const [rowErrorsMap, setRowErrorsMap] = useState({});
  const [lovsMap, setLovsMap] = useState({});
  const [productionMonth, setProductionMonth] = useState("");
  const [currentTab, setCurrentTab] = useState("OI 001");
  const [loadingMap, setLoadingMap] = useState({});
  const [saving, setSaving] = useState(false);
  const [pendingCalc, setPendingCalc] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [tabStatusMap, setTabStatusMap] = useState({});
  const [error, setError] = useState("");

  // Refs: latest data for async code, plus request bookkeeping.
  const tabDataRef = useRef({});
  const changedRef = useRef({});
  const sessionRef = useRef(0); // changes when the user / batch / team changes
  const inflightRef = useRef({}); // tabs currently loading
  const lovCounterRef = useRef(0);
  const lovReqRef = useRef({}); // latest LOV request id per tab|part
  const lovQtyRef = useRef({}); // required quantity of the last LOV per tab|part
  const savingRef = useRef(false);

  tabDataRef.current = tabDataMap;
  changedRef.current = changedRowsMap;

  const columns = useMemo(() => getResolvedColumns(currentTab), [currentTab]);
  const loading = Boolean(loadingMap[currentTab]);
  const calculating = pendingCalc > 0;

  const isEditable = (key) => {
    const rules = COLUMN_RULES[key];
    return rules ? rules[currentTab] : true;
  };

  /* ---------------- Fetch Production Month (resets all data per team) ---------------- */
  useEffect(() => {
    const session = ++sessionRef.current;

    setTabDataMap({});
    setSavedDataMap({});
    setChangedRowsMap({});
    setRowErrorsMap({});
    setLovsMap({});
    setTabStatusMap({});
    setLoadingMap({});
    setPendingCalc(0);
    setEditMode(false);
    setError("");
    setProductionMonth("");
    inflightRef.current = {};
    lovReqRef.current = {};
    lovQtyRef.current = {};

    if (!ready) return;

    const fetchMonth = async () => {
      try {
        const resp = await getOpsPlanQuery({
          gameId,
          gameBatch,
          gameTeam,
          cmdLine: "Get_Period",
        });
        if (session !== sessionRef.current) return;

        const month = resp.data?.[0]?.Production_Month || "";
        setProductionMonth(month);
        if (!month) setError("Production period is not available for this team.");
      } catch (err) {
        if (session !== sessionRef.current) return;
        console.error("[TeamPlan] Get_Period failed:", err);
        setProductionMonth("");
        setError("Unable to load the production period.");
      }
    };

    fetchMonth();
  }, [ready, gameId, gameBatch, gameTeam]);

  /* ---------------- Fetch table data per tab (Get_Info) ---------------- */
  useEffect(() => {
    if (!ready || !productionMonth) return;
    if (tabDataRef.current[currentTab]) return; // already loaded
    if (inflightRef.current[currentTab]) return; // already loading

    const tab = currentTab;
    const session = sessionRef.current;
    inflightRef.current[tab] = true;
    setLoadingMap((p) => ({ ...p, [tab]: true }));

    const fetchTable = async () => {
      try {
        const resp = await getOpsPlanQuery({
          gameId,
          gameBatch,
          gameTeam,
          productionMonth: productionMonth.split("T")[0],
          operationsInputId: tab,
          cmdLine: "Get_Info",
        });
        if (session !== sessionRef.current) return;

        const rows = Array.isArray(resp.data) ? resp.data : [];
        setTabDataMap((p) => ({ ...p, [tab]: rows }));
        setSavedDataMap((p) => ({ ...p, [tab]: structuredClone(rows) }));
        setChangedRowsMap((p) => ({ ...p, [tab]: [] }));
        setTabStatusMap((p) => ({ ...p, [tab]: p[tab] || "saved" }));
      } catch (err) {
        if (session !== sessionRef.current) return;
        console.error(`[TeamPlan] Get_Info failed for ${tab}:`, err);
        setError("Unable to load plan data. Switch tab and back to retry.");
      } finally {
        if (session === sessionRef.current) {
          inflightRef.current[tab] = false;
          setLoadingMap((p) => ({ ...p, [tab]: false }));
        }
      }
    };

    fetchTable();
  }, [ready, productionMonth, currentTab]);

  /* ---------------- Fetch Buy_Info LOV per part ---------------- */
  // Option A: when Required_Quantity is blank the price list is still loaded
  // (for the dropdown) but the saved Quantity / Unit_Price are NOT recalculated.
  const fetchBuyInfoLovForPart = async (tabKey, partNo, requiredQuantity) => {
    if (!ready || !productionMonth || !partNo) return;

    const hasRequired =
      !isBlank(requiredQuantity) && Number.isFinite(Number(requiredQuantity));
    const qtyKey = hasRequired ? String(Number(requiredQuantity)) : "";
    const reqKey = `${tabKey}|${partNo}`;

    // Same part and same required quantity already loaded: nothing to do.
    if (lovQtyRef.current[reqKey] === qtyKey) return;
    lovQtyRef.current[reqKey] = qtyKey;

    const reqId = ++lovCounterRef.current;
    lovReqRef.current[reqKey] = reqId;
    const session = sessionRef.current;

    setPendingCalc((n) => n + 1);

    try {
      const resp = await getOpsPlanQuery({
        gameId,
        gameBatch,
        gameTeam,
        productionMonth: productionMonth.split("T")[0],
        operationsInputId: tabKey,
        partNo,
        requiredQuantity: hasRequired ? Number(requiredQuantity) : null,
        cmdLine: tabKey === "OI 003" ? "Buy_Asset" : "Buy_Material",
      });

      // Ignore answers that are out of date.
      if (session !== sessionRef.current) return;
      if (lovReqRef.current[reqKey] !== reqId) return;

      const data = Array.isArray(resp.data) ? resp.data : [];
      const priceLov = data.map((item) => ({
        Price_Id: item.Price_Id,
        Info_Price: item.Info_Price,
        Quantity: item.Quantity,
        Unit_Price: item.Unit_Price,
      }));

      setLovsMap((p) => ({
        ...p,
        [tabKey]: { ...(p[tabKey] || {}), [partNo]: { Price_Lov: priceLov } },
      }));

      if (!hasRequired) return; // Option A: no recalculation without an input

      // Sync Quantity and Unit_Price of rows that already have a price chosen.
      const rows = tabDataRef.current[tabKey] || [];
      const touched = [];
      const updatedRows = rows.map((r) => {
        if (r.Part_No !== partNo || !r.Price_Id) return r;
        const match = priceLov.find((p) => p.Price_Id === r.Price_Id);
        if (
          match &&
          (Number(match.Quantity) !== Number(r.Quantity) ||
            Number(match.Unit_Price) !== Number(r.Unit_Price))
        ) {
          const updated = {
            ...r,
            Quantity: match.Quantity,
            Unit_Price: match.Unit_Price,
          };
          touched.push(updated);
          return updated;
        }
        return r;
      });

      if (touched.length === 0) return;

      setTabDataMap((p) => ({ ...p, [tabKey]: updatedRows }));
      setChangedRowsMap((p) => ({
        ...p,
        [tabKey]: mergeChanged(p[tabKey], touched),
      }));
      setTabStatusMap((p) => ({ ...p, [tabKey]: "unsaved" }));
    } catch (err) {
      if (session !== sessionRef.current) return;
      if (lovReqRef.current[reqKey] !== reqId) return;
      console.error(`[TeamPlan] ${tabKey} price list failed for ${partNo}:`, err);
      delete lovQtyRef.current[reqKey]; // allow a retry
      setLovsMap((p) => ({
        ...p,
        [tabKey]: { ...(p[tabKey] || {}), [partNo]: { Price_Lov: [] } },
      }));
    } finally {
      if (session === sessionRef.current) {
        setPendingCalc((n) => Math.max(0, n - 1));
      }
    }
  };

  /* ---------------- Cell change handler ---------------- */
  const handleCellChange = (rowIndex, key, valueOrRow) => {
    const rows = tabDataRef.current[currentTab] || [];
    const current = rows[rowIndex];
    if (!current) return;

    const row = key === null ? valueOrRow : { ...current, [key]: valueOrRow };
    const next = rows.map((r, i) => (i === rowIndex ? row : r));

    // Update the refs at once so back-to-back changes see the latest data.
    tabDataRef.current = { ...tabDataRef.current, [currentTab]: next };
    changedRef.current = {
      ...changedRef.current,
      [currentTab]: mergeChanged(changedRef.current[currentTab], [row]),
    };

    setTabDataMap(tabDataRef.current);
    setChangedRowsMap(changedRef.current);
    setTabStatusMap((p) => ({ ...p, [currentTab]: "unsaved" }));

    // The edited row is no longer flagged.
    setRowErrorsMap((p) => {
      const tabErrors = p[currentTab];
      if (!tabErrors || !tabErrors[getRowKey(row)]) return p;
      const { [getRowKey(row)]: _removed, ...rest } = tabErrors;
      return { ...p, [currentTab]: rest };
    });
  };

  /* ---------------- Save ---------------- */
  // Returns { success, message }. Success is the SP return value 0.
  const saveTableData = async () => {
    if (savingRef.current) return { success: false, message: "Save already in progress" };

    const tab = currentTab;
    const rows = changedRef.current[tab] || [];

    if (rows.length === 0) return { success: true, message: "Nothing to save" };
    if (pendingCalc > 0) {
      return {
        success: false,
        message: "Prices are still being calculated. Try again in a moment.",
      };
    }
    if (userId == null) {
      return { success: false, message: "User id is missing. Please sign in again." };
    }

    // Check values before calling the API.
    const errors = validateRows(rows, tab);
    const firstKey = Object.keys(errors)[0];
    if (firstKey) {
      setRowErrorsMap((p) => ({ ...p, [tab]: errors }));
      const [partNo] = firstKey.split("|");
      return { success: false, message: `Part ${partNo}: ${errors[firstKey]}` };
    }
    setRowErrorsMap((p) => ({ ...p, [tab]: {} }));

    savingRef.current = true;
    setSaving(true);
    try {
      const payload = rows.map((r) => ({
        Game_Id: gameId,
        Game_Batch: gameBatch,
        Game_Team: gameTeam,
        Production_Month: productionMonth.split("T")[0],
        Operations_Input_Id: tab,
        Part_No: r.Part_No,
        Quantity_Id: r.Quantity_Id,
        Quantity: Number(r.Quantity),
        Price_Id: r.Price_Id,
        Unit_Price: Number(r.Unit_Price || 0),
        // Required_Quantity: r.Required_Quantity, // enable when the column exists (option B)
      }));

      const resp = await updateOpsPlanBulk(payload, userId);
      const { success, message } = resp.data || {};

      if (!success) {
        // Blocked by a business rule or nothing updated: keep the edits.
        return { success: false, message: message || "Save failed" };
      }

      setSavedDataMap((p) => ({
        ...p,
        [tab]: structuredClone(tabDataRef.current[tab] || []),
      }));
      setChangedRowsMap((p) => ({ ...p, [tab]: [] }));
      changedRef.current = { ...changedRef.current, [tab]: [] };
      setTabStatusMap((p) => ({ ...p, [tab]: "saved" }));
      setEditMode(false);

      return { success: true, message };
    } catch (err) {
      console.error("[TeamPlan] Save failed:", err);
      const data = err?.response?.data;
      return {
        success: false,
        message: data?.error || data?.message || err?.message || "Save failed",
      };
    } finally {
      savingRef.current = false;
      setSaving(false);
    }
  };

  /* ---------------- Cancel (restore last saved data) ---------------- */
  const cancelEdit = () => {
    const restored = structuredClone(savedDataMap[currentTab] || []);
    tabDataRef.current = { ...tabDataRef.current, [currentTab]: restored };
    changedRef.current = { ...changedRef.current, [currentTab]: [] };

    setTabDataMap(tabDataRef.current);
    setChangedRowsMap(changedRef.current);
    setRowErrorsMap((p) => ({ ...p, [currentTab]: {} }));
    setTabStatusMap((p) => ({ ...p, [currentTab]: "saved" }));
    setEditMode(false);
  };

  // The screen asks Save / Discard / Stay before calling this with unsaved data.
  const handleTabChange = (tabKey) => {
    if (tabKey === currentTab) return;
    setEditMode(false);
    setCurrentTab(tabKey);
  };

  return {
    tabDataMap,
    tableData: tabDataMap[currentTab] || [],
    loading,
    saving,
    calculating,
    error,
    columns,
    editMode,
    setEditMode,
    currentTab,
    handleTabChange,
    handleCellChange,
    saveTableData,
    cancelEdit,
    isEditable,
    changedRows: changedRowsMap[currentTab] || [],
    rowErrors: rowErrorsMap[currentTab] || {},
    fetchBuyInfoLovForPart,
    lovsMap,
    productionMonth,
    tabStatusMap,
  };
};