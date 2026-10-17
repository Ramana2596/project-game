// File: src/pages/TeamPlan/hooks/useTeamPlan.js
// Purpose: Manage TeamPlan state, tab data, LOVs, edit and API integration
// V4 — Save result read from SP return value (0 = success), row validation:
//      Quantity is a whole number 0..99,999,999 (numeric 8,0), prices are 2
//      decimals (numeric 8,2), never negative; system values are not blamed on
//      the user. Required_Quantity 0 = not ordering now,
//      "no price source" messages, calculating state, race-safe loads

import { useState, useEffect, useMemo, useRef } from "react";
import { getOpsPlanQuery, updateOpsPlanBulk } from "../services/service.js";
import { getResolvedColumns } from "../utils/getResolvedColumns.js";
import { COLUMN_RULES } from "../constants/columnRules.js";
import { useUser } from "../../../core/access/userContext.jsx";

/* ---------------- Helpers ---------------- */

// Largest values the database columns can hold.
export const MAX_QUANTITY = 99999999; // Quantity: numeric(8,0), whole numbers
export const MAX_AMOUNT = 999999.99; // Unit price: numeric(8,2)

// Unique row key inside a tab: Part_No + Quantity_Id.
export const getRowKey = (r) => `${r?.Part_No ?? ""}|${r?.Quantity_Id ?? ""}`;

const isBlank = (v) => v === "" || v == null;

// 0 (or "0", "0.") typed in Required_Quantity means: not ordering now.
const isZero = (v) => !isBlank(v) && Number.isFinite(Number(v)) && Number(v) === 0;

// Replace changed rows with the same key, then append the new ones.
const mergeChanged = (list = [], rows) => {
  const keys = new Set(rows.map(getRowKey));
  return [...list.filter((r) => !keys.has(getRowKey(r))), ...rows];
};

// Typed Quantity (Product tab): whole number, 0 or more. Returns "" when valid.
const checkQuantity = (value) => {
  if (isBlank(value)) return "Quantity is required";
  const text = String(value).trim();
  if (!/^\d+$/.test(text)) return "Quantity must be a whole number, 0 or more";
  if (Number(text) > MAX_QUANTITY) {
    return `Quantity must be ${MAX_QUANTITY.toLocaleString("en-US")} or less`;
  }
  return "";
};

// System-generated value (price list, price): only guard against values the
// database cannot hold. The user cannot edit these, so decimals are not blamed.
const checkSystemValue = (label, value, max) => {
  if (isBlank(value)) return `${label} is missing`;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return `${label} is not valid`;
  if (n > max) return `${label} is too large (maximum ${max.toLocaleString("en-US")})`;
  return "";
};

// Validate changed rows. Returns { rowKey: message } for rows with a problem.
const validateRows = (rows, tab) => {
  const errors = {};
  rows.forEach((r) => {
    const message =
      (tab === "OI 001"
        ? checkQuantity(r.Quantity)
        : checkSystemValue("Order quantity", r.Quantity, MAX_QUANTITY)) ||
      (isBlank(r.Unit_Price) ? "" : checkSystemValue("Unit price", r.Unit_Price, MAX_AMOUNT)) ||
      (tab !== "OI 001" && isBlank(r.Price_Id) && Number(r.Quantity) !== 0
        ? "Select a price"
        : "");
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
  const lovCacheRef = useRef({}); // last price list per tab|part: { qty, priceLov }
  const noPriceRef = useRef({}); // "no price source" messages per tab|rowKey
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
    lovCacheRef.current = {};
    noPriceRef.current = {};

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

  // Show or clear the "no price source" message on the rows of a part.
  const setNoPrice = (tabKey, partNo, message) => {
    const rows = (tabDataRef.current[tabKey] || []).filter((r) => r.Part_No === partNo);
    const previous = {};
    rows.forEach((r) => {
      const rowKey = getRowKey(r);
      const k = `${tabKey}|${rowKey}`;
      previous[rowKey] = noPriceRef.current[k];
      if (message) noPriceRef.current[k] = message;
      else delete noPriceRef.current[k];
    });
    setRowErrorsMap((p) => {
      const tabErrors = { ...(p[tabKey] || {}) };
      rows.forEach((r) => {
        const rowKey = getRowKey(r);
        if (message) tabErrors[rowKey] = message;
        else if (previous[rowKey] && tabErrors[rowKey] === previous[rowKey]) {
          delete tabErrors[rowKey];
        }
      });
      return { ...p, [tabKey]: tabErrors };
    });
  };

  // Recalculate Quantity / Unit_Price of a part's rows from its price list.
  const applyPriceList = (tabKey, partNo, priceLov) => {
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

    tabDataRef.current = { ...tabDataRef.current, [tabKey]: updatedRows };
    changedRef.current = {
      ...changedRef.current,
      [tabKey]: mergeChanged(changedRef.current[tabKey], touched),
    };
    setTabDataMap(tabDataRef.current);
    setChangedRowsMap(changedRef.current);
    setTabStatusMap((p) => ({ ...p, [tabKey]: "unsaved" }));
  };

  // Option A: when Required_Quantity is blank the price list is still loaded
  // (for the dropdown) but Quantity / Unit_Price are NOT recalculated.
  // Required_Quantity 0 = not ordering now: Quantity becomes 0 (set in
  // handleCellChange) and no price list is needed.
  const fetchBuyInfoLovForPart = async (tabKey, partNo, requiredQuantity) => {
    if (!ready || !productionMonth || !partNo) return;

    const hasRequired =
      !isBlank(requiredQuantity) && Number.isFinite(Number(requiredQuantity));
    const required = hasRequired ? Number(requiredQuantity) : null;
    const qtyKey = hasRequired ? String(required) : "";
    const reqKey = `${tabKey}|${partNo}`;

    if (required === 0) {
      lovReqRef.current[reqKey] = ++lovCounterRef.current; // drop answers on the way
      setNoPrice(tabKey, partNo, null);
      return;
    }

    // Same part and quantity as the last price list: reuse it, no API call.
    const cached = lovCacheRef.current[reqKey];
    if (cached && cached.qty === qtyKey) {
      if (hasRequired) applyPriceList(tabKey, partNo, cached.priceLov);
      return;
    }

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
        requiredQuantity: required,
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

      lovCacheRef.current[reqKey] = { qty: qtyKey, priceLov };
      setLovsMap((p) => ({
        ...p,
        [tabKey]: { ...(p[tabKey] || {}), [partNo]: { Price_Lov: priceLov } },
      }));

      // A quantity with no price source cannot be saved: tell the user.
      setNoPrice(
        tabKey,
        partNo,
        hasRequired && priceLov.length === 0
          ? `No price source available for quantity ${required}`
          : null
      );

      if (hasRequired) applyPriceList(tabKey, partNo, priceLov);
    } catch (err) {
      if (session !== sessionRef.current) return;
      if (lovReqRef.current[reqKey] !== reqId) return;
      console.error(`[TeamPlan] ${tabKey} price list failed for ${partNo}:`, err);
      delete lovCacheRef.current[reqKey]; // allow a retry
      setLovsMap((p) => ({
        ...p,
        [tabKey]: { ...(p[tabKey] || {}), [partNo]: { Price_Lov: [] } },
      }));
      setNoPrice(tabKey, partNo, "Could not load price sources. Try again.");
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

    let row = key === null ? valueOrRow : { ...current, [key]: valueOrRow };

    if (key === "Required_Quantity") {
      // Not ordering now: Quantity 0. Any other value is recalculated on blur.
      if (currentTab !== "OI 001" && isZero(valueOrRow)) row = { ...row, Quantity: 0 };
      delete noPriceRef.current[`${currentTab}|${getRowKey(row)}`];
    }
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
    rows.forEach((r) => {
      const k = getRowKey(r);
      const message = noPriceRef.current[`${tab}|${k}`];
      if (message && !errors[k]) errors[k] = message;
    });
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
    Object.keys(noPriceRef.current).forEach((k) => {
      if (k.startsWith(`${currentTab}|`)) delete noPriceRef.current[k];
    });

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