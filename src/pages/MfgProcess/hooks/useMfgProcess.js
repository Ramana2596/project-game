// ============================================================
// Component: useMfgProcess
// Module: MfgProcess
// Purpose: Manufacturing Process data and UI state management
// AI Tags: manufacturing-process, product-flow, routing, hook
// ============================================================

import { useCallback, useEffect, useMemo, useState } from "react";

import { getMfgProcess } from "../services/mfgProcessService";

// ------------------------------------------------------------
// Manufacturing Process Hook
// ------------------------------------------------------------
export function useMfgProcess(userInfo) {
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ----------------------------------------------------------
  // Load Manufacturing Process information
  // ----------------------------------------------------------
  const loadProcesses = useCallback(async () => {
    if (!userInfo?.gameId) return;

    setLoading(true);
    setError(null);

    try {
      const queryParams = {
        gameId: userInfo.gameId,
        gameBatch: userInfo.gameBatch,
        gameTeam: userInfo.gameTeam,
      };

      const response = await getMfgProcess(queryParams);

      setProcesses(response?.data ?? []);
    } catch (err) {
      console.error(
        "MfgProcess - Process data load failed:",
        err
      );

      setError(err);
      setProcesses([]);
    } finally {
      setLoading(false);
    }
  }, [userInfo]);

  // ----------------------------------------------------------
  // Load data when user information is available
  // ----------------------------------------------------------
  useEffect(() => {
    loadProcesses();
  }, [loadProcesses]);

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
    return Array.from(grouped.values()).map((product) => ({
      ...product,
      processes: [...product.processes].sort(
        (a, b) =>
          Number(a?.Mfg_Seq_No || 0) -
          Number(b?.Mfg_Seq_No || 0)
      ),
    }));
  }, [processes]);

  // ----------------------------------------------------------
  // Hook API
  // ----------------------------------------------------------
  return {
    processes,
    productProcesses,
    loading,
    error,
    loadProcesses,
  };
}