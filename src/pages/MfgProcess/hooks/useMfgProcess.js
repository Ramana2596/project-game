// ============================================================
// Hook: useMfgProcess
// Module: MfgProcess
// Purpose: Load and combine routing, BOM, RM stock and FG stock
// UXLab V1.3 
// ============================================================

import { useEffect, useMemo, useState } from "react";
import {
  getMfgProcess,
  getFgStockInfo,
  getRmStockInfo,
  getBomInfo,
} from "../services/mfgProcessService";

// Get the rows array out of the API response.
const getRows = (res) => {
  const p = res?.data;
  return (
    [p, p?.data, p?.rows, p?.recordset, p?.result].find(Array.isArray) || []
  );
};

// Trim any value to a string ("" when null).
const clean = (v) => (v == null ? "" : String(v).trim());

// Read a row's production month as "YYYY-MM-DD" (e.g. "2026-04-01").
const monthOf = (row) => clean(row?.Production_Month).slice(0, 10);

// Load and combine manufacturing data for the active team.
export function useMfgProcess(userInfo, productionMonth) {
  const [processes, setProcesses] = useState([]);
  const [bom, setBom] = useState([]);
  const [rmRows, setRmRows] = useState([]); // raw API rows
  const [fgRows, setFgRows] = useState([]); // raw API rows
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { gameId, gameBatch, gameTeam } = userInfo || {};

  // 1. Call the APIs. Re-run when the user or the selected month changes.
  useEffect(() => {
    if (!(gameId && gameBatch && gameTeam)) {
      setProcesses([]);
      setBom([]);
      setRmRows([]);
      setFgRows([]);
      setLoading(false);
      setError("");
      return;
    }

    let cancelled = false;
    const base = { gameId, gameBatch, gameTeam };
    const month = productionMonth ? String(productionMonth).slice(0, 10) : null;

    setLoading(true);
    setError("");

    Promise.all([
      getMfgProcess(base),
      getBomInfo(base),
      getRmStockInfo({ ...base, productionMonth: month }),
      getFgStockInfo({ ...base, productionMonth: month }),
    ])
      .then(([p, b, rm, fg]) => {
        if (cancelled) return; // ignore stale responses
        setProcesses(getRows(p));
        setBom(getRows(b));
        setRmRows(getRows(rm));
        setFgRows(getRows(fg));
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("[MfgProcess] Data loading error:", err);
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Unable to load manufacturing data."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [gameId, gameBatch, gameTeam, productionMonth]);

  // 2. Month to display: Selected month, else the latest month in the data.
  const displayMonth = useMemo(() => {
    if (productionMonth) return String(productionMonth).slice(0, 10);
    return [...fgRows, ...rmRows].map(monthOf).sort().pop() || null;
  }, [productionMonth, fgRows, rmRows]);

  // 3. Keep only the rows of the display month.
  //    Rows without a production month are always included (they are "current stock").
  const fgStock = useMemo(
    () => fgRows.filter((r) => !monthOf(r) || monthOf(r) === displayMonth),
    [fgRows, displayMonth]
  );
  const rmStock = useMemo(
    () => rmRows.filter((r) => !monthOf(r) || monthOf(r) === displayMonth),
    [rmRows, displayMonth]
  );

  // 4. Build the product cards.
  const productProcesses = useMemo(() => {
    const groups = new Map();
    processes.forEach((p) => {
      const no = clean(p?.Part_No);
      if (!no) return;
      groups.set(no, [...(groups.get(no) || []), p]);
    });

    return [...groups].map(([productNo, rows]) => {
      const sorted = [...rows].sort(
        (a, b) => Number(a?.Mfg_Seq_No || 0) - Number(b?.Mfg_Seq_No || 0)
      );

      // Each BOM component with its raw-material stock for the display month.
      const materials = bom
        .filter((b) => clean(b?.Used_in_Product) === productNo)
        .map((b) => {
          const stock = rmStock.find(
            (r) => clean(r?.Part_No) === clean(b?.Part_No)
          );
          return {
            material: b?.Part_Description || b?.Part_No || "—",
            stock: stock?.CB_Qty ?? stock?.Stock_Qty ?? null,
            uom: b?.UOM || stock?.UOM || "",
            perSet: b?.CB_Qty ?? b?.Qty_Per_Set ?? b?.Quantity ?? null,
          };
        });

      return {
        productNo,
        product: sorted[0]?.Part_Description || productNo,
        plmStage: sorted[0]?.PLM_Stage || "",
        processes: sorted,
        materials,
        fgStock: fgStock.find((r) => clean(r?.Part_No) === productNo) || null,
      };
    });
  }, [processes, bom, rmStock, fgStock]);

  return { productProcesses, displayMonth, loading, error };
}

export default useMfgProcess;