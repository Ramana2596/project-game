// ============================================================
// Component: useMfgProcess
// Module: MfgProcess
// Purpose: Manufacturing Process data and UI state management
// AI Tags: manufacturing-process, product-flow, routing, hook,
//          bom, raw-material-stock
// ============================================================

import { useCallback, useEffect, useMemo, useState } from "react";

import {
  getMfgProcess,
  getRmStockInfo,
  getBomInfo,
} from "../services/mfgProcessService";

// ------------------------------------------------------------
// Manufacturing Process Hook
// ------------------------------------------------------------
export function useMfgProcess(userInfo, productionMonth) {
  const [processes, setProcesses] = useState([]);
  const [bom, setBom] = useState([]);
  const [rmStock, setRmStock] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ----------------------------------------------------------
  // Common Query Parameters
  // ----------------------------------------------------------
  const getQueryParams = useCallback(() => ({
    gameId: userInfo?.gameId,
    gameBatch: userInfo?.gameBatch,
    gameTeam: userInfo?.gameTeam,
  }), [userInfo]);

  // ----------------------------------------------------------
  // Load Manufacturing Process information
  // ----------------------------------------------------------
  const loadProcesses = useCallback(async () => {
    if (!userInfo?.gameId) return;

    try {
      const response = await getMfgProcess(getQueryParams());

      setProcesses(response?.data ?? []);
    } catch (err) {
      console.error(
        "MfgProcess - Process data load failed:",
        err
      );

      setProcesses([]);
      throw err;
    }
  }, [userInfo, getQueryParams]);

  // ----------------------------------------------------------
  // Load BOM information
  // ----------------------------------------------------------
  const loadBom = useCallback(async () => {
    if (!userInfo?.gameId) return;

    try {
      const response = await getBomInfo(getQueryParams());

      setBom(response?.data ?? []);
    } catch (err) {
      console.error(
        "MfgProcess - BOM data load failed:",
        err
      );

      setBom([]);
      throw err;
    }
  }, [userInfo, getQueryParams]);

// ----------------------------------------------------------
// Load Raw Material Stock information
// ----------------------------------------------------------
const loadRmStock = useCallback(async () => {
  if (!userInfo?.gameId) return;

  try {
    const response = await getRmStockInfo({
      ...getQueryParams(),
      productionMonth: productionMonth?.slice(0, 10),
    });

    const stockData = Array.isArray(response?.data?.data)
      ? response.data.data
      : [];

    setRmStock(stockData);
  } catch (err) {
    console.error(
      "MfgProcess - Raw Material Stock load failed:",
      err
    );

    setRmStock([]);
    throw err;
  }
}, [
  userInfo,
  productionMonth,
  getQueryParams,
]);

  // ----------------------------------------------------------
  // Load all Manufacturing Process data
  // ----------------------------------------------------------
  const loadAllData = useCallback(async () => {
    if (!userInfo?.gameId) return;

    setLoading(true);
    setError(null);

    try {
      await Promise.all([
        loadProcesses(),
        loadBom(),
        loadRmStock(),
      ]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [
    userInfo,
    loadProcesses,
    loadBom,
    loadRmStock,
  ]);

  // ----------------------------------------------------------
  // Load data when user information is available
  // ----------------------------------------------------------
  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // ----------------------------------------------------------
  // Group process operations by product
  // ----------------------------------------------------------
  const productProcesses = useMemo(() => {
    const grouped = new Map();

    processes.forEach((process) => {
      const productNo = process?.Part_No;

      if (!productNo) return;

      if (!grouped.has(productNo)) {
        grouped.set(productNo, {
          productNo,
          product: process?.Part_Description || "Product",
          routingNo: process?.Mfg_Routing_No,
          processes: [],
        });
      }

      grouped.get(productNo).processes.push(process);
    });

    // --------------------------------------------------------
    // Keep operations in manufacturing sequence
    // --------------------------------------------------------
    const products = Array.from(grouped.values()).map((product) => ({
      ...product,

      processes: [...product.processes].sort(
        (a, b) =>
          Number(a?.Mfg_Seq_No || 0) -
          Number(b?.Mfg_Seq_No || 0)
      ),
    }));

    // --------------------------------------------------------
    // Enrich each product with BOM + RM Stock information
    // --------------------------------------------------------
    return products.map((product) => {
      // ------------------------------------------------------
      // BOM relationship:
      // Mfg Process Part_No = BOM Used_in_Product
      // ------------------------------------------------------
      const productBom = bom.filter(
        (item) =>
          String(item?.Used_in_Product) ===
          String(product.productNo)
      );

      // ------------------------------------------------------
      // Add stock information to each BOM material
      // ------------------------------------------------------
const materials = productBom.map((item) => {
  const stock = rmStock.find(
    (rm) =>
      String(rm?.Part_No).trim() ===
      String(item?.Part_No).trim()
  );

  return {
    material: item?.Part_Description || "—",
    uom: item?.UOM || stock?.UOM || "—",
    perSet: item?.Qty_per_Set ?? null,
    stock: stock?.CB_Qty ?? null,
  };
});

      return {
        ...product,

        // ----------------------------------------------------
        // Material information for Process Card
        // ----------------------------------------------------
        materials,

        // ----------------------------------------------------
        // Convenience values for single-material products
        // ----------------------------------------------------
        material: materials[0]?.material || "—",
        materialUom: materials[0]?.uom || "—",
        perSet: materials[0]?.perSet ?? "—",
        stock: materials[0]?.stock ?? "—",
      };
    });
  }, [processes, bom, rmStock]);

  // ----------------------------------------------------------
  // Hook API
  // ----------------------------------------------------------
  return {
    processes,
    productProcesses,

    bom,
    rmStock,

    loading,
    error,

    loadProcesses,
    loadBom,
    loadRmStock,
    loadAllData,
  };
}