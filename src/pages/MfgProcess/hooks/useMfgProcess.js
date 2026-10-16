
// ============================================================
// Hook: useMfgProcess
// Module: MfgProcess
// Purpose: Load and combine routing, BOM, RM stock and FG stock
// AI Tags: manufacturing, routing, bom, inventory, fg-stock, uxlab
// UXLab V1.1 — FG Stock diagnostics and response handling
// ============================================================

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getMfgProcess,
  getFgStockInfo,
  getRmStockInfo,
  getBomInfo,
} from "../services/mfgProcessService";

// Normalize API responses that contain rows in common wrapper shapes.
const getRows = (response) => {
  const payload = response?.data;
  const candidates = [
    payload,
    payload?.data,
    payload?.rows,
    payload?.recordset,
    payload?.data?.rows,
    payload?.data?.recordset,
    payload?.result,
    payload?.result?.rows,
    payload?.result?.recordset,
  ];

  return candidates.find(Array.isArray) || [];
};

// Normalize part numbers for reliable product-to-stock matching.
const normalizePartNo = (value) =>
  value == null ? "" : String(value).trim();

// Read User Info from the active user context.
const getQueryParams = (userInfo) => ({
  gameId: userInfo?.gameId,
  gameBatch: userInfo?.gameBatch,
  gameTeam: userInfo?.gameTeam,
});

// Format production-month parameter.
const getProductionMonth = (productionMonth) =>
  productionMonth ? String(productionMonth).slice(0, 10) : null;

// Load and combine manufacturing data for the active team.
export function useMfgProcess(userInfo, productionMonth) {
  const [processes, setProcesses] = useState([]);
  const [bom, setBom] = useState([]);
  const [rmStock, setRmStock] = useState([]);
  const [fgStock, setFgStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Build shared request parameters from the active user context.
  const queryParams = useMemo(
    () => getQueryParams(userInfo),
    [userInfo?.gameId, userInfo?.gameBatch, userInfo?.gameTeam]
  );

  // Load manufacturing routing.
  const loadProcesses = useCallback(async () => {
    const response = await getMfgProcess(queryParams);
    const rows = getRows(response);
    setProcesses(rows);
    return rows;
  }, [queryParams]);

  // Load bill-of-materials data.
  const loadBom = useCallback(async () => {
    const response = await getBomInfo(queryParams);
    const rows = getRows(response);
    setBom(rows);
    return rows;
  }, [queryParams]);

  // Load raw-material stock for the selected production month.
  const loadRmStock = useCallback(async () => {
    const response = await getRmStockInfo({
      ...queryParams,
      productionMonth: getProductionMonth(productionMonth),
    });
    const rows = getRows(response);
    setRmStock(rows);
    return rows;
  }, [queryParams, productionMonth]);

  // Load finished-goods stock for the selected production month
  const loadFgStock = useCallback(async () => {
    const params = {
      ...queryParams,
      productionMonth: getProductionMonth(productionMonth),
    };

    try {
      const response = await getFgStockInfo(params);
      const rows = getRows(response);
      setFgStock(rows);
      return rows;
    } catch (err) {
      console.error(
        "[MfgProcess] FG Stock API request failed:",
        err?.response?.data || err
      );
      setFgStock([]);
      throw err;
    }
  }, [queryParams, productionMonth]);

  // Load all data sources and report request failures.
  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError("");

    const results = await Promise.allSettled([
      loadProcesses(),
      loadBom(),
      loadRmStock(),
      loadFgStock(),
    ]);

    const failed = results.filter((result) => result.status === "rejected");

    if (failed.length) {
      const message =
        failed[0]?.reason?.response?.data?.message ||
        failed[0]?.reason?.message ||
        "Unable to load some manufacturing data.";

      setError(message);
      console.error("[MfgProcess] Data loading errors:", failed);
    }

    setLoading(false);
  }, [loadProcesses, loadBom, loadRmStock, loadFgStock]);

  // Reload when user or selected production month changes.
  useEffect(() => {
    if (
      !queryParams.gameId ||
      queryParams.gameBatch == null ||
      !queryParams.gameTeam
    ) {
      setProcesses([]);
      setBom([]);
      setRmStock([]);
      setFgStock([]);
      setLoading(false);
      setError("");
      return;
    }

    loadAllData();
  }, [queryParams, loadAllData]);

  // Index FG stock by product part number and selected period.
  const fgStockByPartNo = useMemo(() => {
    const stockMap = new Map();
    const selectedMonth = getProductionMonth(productionMonth);

    fgStock.forEach((row) => {
      const partNo = normalizePartNo(row?.Part_No);
      if (!partNo) return;

      const rowMonth = row?.Production_Month
        ? String(row.Production_Month).slice(0, 10)
        : "";

      if (selectedMonth && rowMonth && rowMonth !== selectedMonth) {
        return;
      }

      const existing = stockMap.get(partNo);

      // Keep the latest dated record when multiple periods are returned.
      if (!existing || (!selectedMonth && rowMonth >= existing.rowMonth)) {
        stockMap.set(partNo, { ...row, rowMonth });
      }
    });

    return stockMap;
  }, [fgStock, productionMonth]);

  // Group routing and attach the existing BOM, RM stock and FG stock data.
  const productProcesses = useMemo(() => {
    const grouped = new Map();

    processes.forEach((process) => {
      const productNo = normalizePartNo(process?.Part_No);
      if (!productNo) return;

      if (!grouped.has(productNo)) grouped.set(productNo, []);
      grouped.get(productNo).push(process);
    });

    return Array.from(grouped.entries()).map(([productNo, productRows]) => {
      const sortedProcesses = [...productRows].sort(
        (a, b) =>
          Number(a?.Mfg_Seq_No || 0) - Number(b?.Mfg_Seq_No || 0)
      );

      const firstProcess = sortedProcesses[0] || {};
      const productBom = bom.filter(
        (row) => normalizePartNo(row?.Used_in_Product) === productNo
      );

      // Match each BOM component to its raw-material stock record.
      const materials = productBom.map((bomRow) => {
        const materialPartNo = normalizePartNo(bomRow?.Part_No);
        const stockRow = rmStock.find(
          (row) => normalizePartNo(row?.Part_No) === materialPartNo
        );

        return {
          material: bomRow?.Part_Description || bomRow?.Part_No || "—",
          stock: stockRow?.CB_Qty ?? stockRow?.Stock_Qty ?? null,
          uom: bomRow?.UOM || stockRow?.UOM || "",
          perSet:
            bomRow?.CB_Qty ??
            bomRow?.Qty_Per_Set ??
            bomRow?.Quantity ??
            null,
        };
      });

      // Attach FG closing quantity and unit using the product part number.
      const matchedFgStock = fgStockByPartNo.get(productNo) || null;

      return {
        productNo,
        product: firstProcess?.Part_Description || productNo,
        plmStage: firstProcess?.PLM_Stage || "",
        processes: sortedProcesses,
        materials,
        fgStock: matchedFgStock,
        material: materials[0]?.material || "—",
        materialUom: materials[0]?.uom || "",
        perSet: materials[0]?.perSet ?? null,
        stock: materials[0]?.stock ?? null,
      };
    });
  }, [processes, bom, rmStock, fgStockByPartNo]);

  // Expose data, derived product cards and reload functions.
  return {
    processes,
    productProcesses,
    bom,
    rmStock,
    fgStock,
    loading,
    error,
    loadProcesses,
    loadBom,
    loadRmStock,
    loadFgStock,
    loadAllData,
  };
}

export default useMfgProcess;