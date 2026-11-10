// File: src/pages/TeamPlan/hooks/useTeamPlan.js
// Purpose: TeamPlan state, tab data, price lists (LOVs), cell edits, save and cancel.


import { useState, useEffect, useMemo, useRef } from "react";
import { getOpsPlanQuery, updateOpsPlanBulk } from "../services/service.js";
import { getResolvedColumns } from "../utils/getResolvedColumns.js";
import { useUser } from "../../../core/access/userContext.jsx";
import {
  getRowKey,
  isBlank,
  isZero,
  mergeChanged,
  validateRows,
} from "../utils/planRules.js";

export const useTeamPlan = (userInfo) => {
  // Signed-in user, used as the fallback source of userId.
  const { user } = useUser();

  // Game context; nothing loads until game, team and batch are known.
  const { gameId, gameBatch, gameTeam } = userInfo || {};
  const ready = Boolean(gameId && gameTeam) && gameBatch != null;
  const userId = userInfo?.userId ?? user?.userId ?? null;

  // Per-tab data: current rows, last saved rows, changed rows and row errors.
  const [tabDataMap, setTabDataMap] = useState({});
  const [savedDataMap, setSavedDataMap] = useState({});
  const [changedRowsMap, setChangedRowsMap] = useState({});
  const [rowErrorsMap, setRowErrorsMap] = useState({});

  // Price lists per tab and part.
  const [lovsMap, setLovsMap] = useState({});

  // Period, active tab and per-tab status ("saved" | "unsaved").
  const [productionMonth, setProductionMonth] = useState("");
  const [currentTab, setCurrentTab] = useState("OI 001");
  const [tabStatusMap, setTabStatusMap] = useState({});

  // Busy flags: tab loading, saving, and price calculations in progress.
  const [loadingMap, setLoadingMap] = useState({});
  const [saving, setSaving] = useState(false);
  const [pendingCalc, setPendingCalc] = useState(0);

  // Load error message.
  const [error, setError] = useState("");

  // Refs: latest data for async code, plus request bookkeeping.
  const tabDataRef = useRef({});
  const changedRef = useRef({});
  const sessionRef = useRef(0); 
  const inflightRef = useRef({}); // tabs currently loading
  const lovCounterRef = useRef(0);
  const lovReqRef = useRef({}); // latest LOV request id per tab|part
  const lovCacheRef = useRef({}); // last price list per tab|part: { qty, priceLov }
  const noPriceRef = useRef({}); // "no price source" messages per tab|rowKey
  const savingRef = useRef(false);

  // Keep the refs in step with state on every render.
  tabDataRef.current = tabDataMap;
  changedRef.current = changedRowsMap;

  // Columns for the active tab, plus simple derived flags.
  const columns = useMemo(() => getResolvedColumns(currentTab), [currentTab]);
  const loading = Boolean(loadingMap[currentTab]);
  const calculating = pendingCalc > 0;

  // Get the production period; also resets all data when the team changes.
  useEffect(() => {
    const session = ++sessionRef.current;

    // Reset everything for the new session.
    setTabDataMap({});
    setSavedDataMap({});
    setChangedRowsMap({});
    setRowErrorsMap({});
    setLovsMap({});
    setTabStatusMap({});
    setLoadingMap({});
    setPendingCalc(0);
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

  // Load the rows of the active tab once (Get_Info).
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
  const applyPriceList = (tabKey, partNo, priceLov, requiredQuantity) => {
    const rows = tabDataRef.current[tabKey] || [];
    const touched = [];
    const updatedRows = rows.map((r) => {
      if (r.Part_No !== partNo) return r;
      const targetPriceId = r.Price_Id || "CP 01";
      const match = priceLov.find((p) => p.Price_Id === targetPriceId) || priceLov[0];
      if (match) {
        // For OI 003 (Machinery), if Quantity is asset-based, ensure Required_Quantity is retained
        const computedQuantity = tabKey === "OI 003" && requiredQuantity != null 
          ? Number(requiredQuantity) 
          : match.Quantity;

        const updated = {
          ...r,
          Required_Quantity: requiredQuantity !== undefined ? requiredQuantity : r.Required_Quantity,
          Quantity: computedQuantity,
          Unit_Price: match.Unit_Price,
          Price_Id: r.Price_Id || match.Price_Id,
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

  // Load the price list of a part (OI 002 Material / OI 003: Machinery).
  const fetchBuyInfoLovForPart = async (tabKey, partNo, requiredQuantity) => {
    if (!ready || !productionMonth || !partNo) return [];

    const hasRequired =
      !isBlank(requiredQuantity) && Number.isFinite(Number(requiredQuantity));
    const required = hasRequired ? Number(requiredQuantity) : null;
    const qtyKey = hasRequired ? String(required) : "";
    const reqKey = `${tabKey}|${partNo}`;

    if (required === 0) {
      lovReqRef.current[reqKey] = ++lovCounterRef.current;
      setNoPrice(tabKey, partNo, null);
      return [];
    }

    const cached = lovCacheRef.current[reqKey];
    if (cached && cached.qty === qtyKey) {
      if (hasRequired) applyPriceList(tabKey, partNo, cached.priceLov, required);
      return cached.priceLov;
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

      if (session !== sessionRef.current) return [];
      if (lovReqRef.current[reqKey] !== reqId) return [];

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

      setNoPrice(
        tabKey,
        partNo,
        hasRequired && priceLov.length === 0
          ? `No price source available for quantity ${required}`
          : null
      );

      if (hasRequired) applyPriceList(tabKey, partNo, priceLov, required);
      return priceLov;
    } catch (err) {
      if (session !== sessionRef.current) return [];
      if (lovReqRef.current[reqKey] !== reqId) return [];
      console.error(`[TeamPlan] ${tabKey} price list failed for ${partNo}:`, err);
      delete lovCacheRef.current[reqKey];
      setLovsMap((p) => ({
        ...p,
        [tabKey]: { ...(p[tabKey] || {}), [partNo]: { Price_Lov: [] } },
      }));
      setNoPrice(tabKey, partNo, "Could not load price sources. Try again.");
      return [];
    } finally {
      if (session === sessionRef.current) {
        setPendingCalc((n) => Math.max(0, n - 1));
      }
    }
  };

  // Apply one cell edit (or a whole replaced row) to the active tab.
  const handleCellChange = (rowIndex, key, valueOrRow) => {
    const rows = tabDataRef.current[currentTab] || [];
    const current = rows[rowIndex];
    if (!current) return;

    let row = key === null ? valueOrRow : { ...current, [key]: valueOrRow };

    if (key === "Price_Id") {
      const partNo = row.Part_No;
      const reqKey = `${currentTab}|${partNo}`;
      const cached = lovCacheRef.current[reqKey];
      
      if (cached && cached.priceLov) {
        const match = cached.priceLov.find((p) => p.Price_Id === valueOrRow);
        if (match) {
          row = {
            ...row,
            Quantity: match.Quantity,
            Unit_Price: match.Unit_Price,
          };
        }
      }
    }

    if (key === "Required_Quantity") {
      if (currentTab !== "OI 001" && isZero(valueOrRow)) {
        row = { ...row, Quantity: 0 };
      } else if (currentTab !== "OI 001" && !isBlank(valueOrRow)) {
        // Immediately reflect Required_Quantity and scale Quantity if applicable
        row = {
          ...row,
          Quantity: currentTab === "OI 003" ? Number(valueOrRow) : row.Quantity,
        };
        fetchBuyInfoLovForPart(currentTab, row.Part_No, valueOrRow);
      }
      delete noPriceRef.current[`${currentTab}|${getRowKey(row)}`];
    }

    const next = rows.map((r, i) => (i === rowIndex ? row : r));

    tabDataRef.current = { ...tabDataRef.current, [currentTab]: next };
    changedRef.current = {
      ...changedRef.current,
      [currentTab]: mergeChanged(changedRef.current[currentTab], [row]),
    };

    setTabDataMap(tabDataRef.current);
    setChangedRowsMap(changedRef.current);
    setTabStatusMap((p) => ({ ...p, [currentTab]: "unsaved" }));

    setRowErrorsMap((p) => {
      const tabErrors = p[currentTab];
      if (!tabErrors || !tabErrors[getRowKey(row)]) return p;
      const { [getRowKey(row)]: _removed, ...rest } = tabErrors;
      return { ...p, [currentTab]: rest };
    });
  };

  // Save the changed rows of the active tab. Returns { success, message }.
  const saveTableData = async () => {
    if (savingRef.current) return { success: false, message: "Save already in progress" };

    const tab = currentTab;
    let rows = changedRef.current[tab] || [];

    if (rows.length === 0) return { success: true, message: "Nothing to save" };

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      if (r.Required_Quantity != null && r.Required_Quantity !== "" && !isZero(r.Required_Quantity)) {
        const priceLov = await fetchBuyInfoLovForPart(tab, r.Part_No, r.Required_Quantity);
        if (priceLov && priceLov.length > 0) {
          const targetPriceId = r.Price_Id || "CP 01";
          const match = priceLov.find((p) => p.Price_Id === targetPriceId) || priceLov[0];
          if (match) {
            rows[i] = {
              ...r,
              Quantity: tab === "OI 003" ? Number(r.Required_Quantity) : match.Quantity,
              Unit_Price: match.Unit_Price,
              Price_Id: r.Price_Id || match.Price_Id,
            };
          }
        }
      }
    }

    changedRef.current = { ...changedRef.current, [tab]: rows };
    setChangedRowsMap(changedRef.current);
    
    const fullTabRows = (tabDataRef.current[tab] || []).map((row) => {
      const foundMatch = rows.find((changedRow) => getRowKey(changedRow) === getRowKey(row));
      return foundMatch ? foundMatch : row;
    });
    tabDataRef.current = { ...tabDataRef.current, [tab]: fullTabRows };
    setTabDataMap(tabDataRef.current);

    if (pendingCalc > 0) {
      return {
        success: false,
        message: "Prices are still being calculated. Try again in a moment.",
      };
    }
    if (userId == null) {
      return { success: false, message: "User id is missing. Please sign in again." };
    }

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
        Price_Id: r.Price_Id || "CP 01",
        Unit_Price: Number(r.Unit_Price || 0),
      }));

      const resp = await updateOpsPlanBulk(payload, userId);
      const { success, message } = resp.data || {};

      if (!success) {
        return { success: false, message: message || "Save failed" };
      }

      setSavedDataMap((p) => ({
        ...p,
        [tab]: structuredClone(tabDataRef.current[tab] || []),
      }));
      setChangedRowsMap((p) => ({ ...p, [tab]: [] }));
      changedRef.current = { ...changedRef.current, [tab]: [] };
      setTabStatusMap((p) => ({ ...p, [tab]: "saved" }));

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

  // Cancel: restore the last saved rows of the active tab.
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
  };

  // Switch tab. The screen asks Save / Discard / Stay before calling this with unsaved data.
  const handleTabChange = (tabKey) => {
    if (tabKey === currentTab) return;
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
    currentTab,
    handleTabChange,
    handleCellChange,
    saveTableData,
    cancelEdit,
    changedRows: changedRowsMap[currentTab] || [],
    rowErrors: rowErrorsMap[currentTab] || {},
    fetchBuyInfoLovForPart,
    lovsMap,
    productionMonth,
    tabStatusMap,
  };
};