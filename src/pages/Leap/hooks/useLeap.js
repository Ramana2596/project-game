// ============================================================
// LEAP V1.0
// File : useLeap.js
// Purpose : LEAP custom hook
// ============================================================
import { useEffect, useMemo, useState } from "react";
import { getStageContent } from "../services/leapService";

// ============================================================
export default function useLeap(stageId) {

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // --------------------------------------------------------
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
              const data = await getStageContent(stageId);
              setRows(data);
          } catch (err) {
              setError(err?.message || "Unable to load LEAP content.");
          } finally {
              setLoading(false);
          }
      }
    if (stageId) {
      load();
    }
  }, [stageId]);

  // --------------------------------------------------------
  // Group by Info Type
  // --------------------------------------------------------
    const grouped = useMemo(() => {
        const result = {};
        rows.forEach((row) => {
            if (!result[row.infoType]) {
                result[row.infoType] = [];
            }
            result[row.infoType].push(row);
        });
        return result;
    }, [rows]);

    // --------------------------------------------------------
    // Available Info Types
    // --------------------------------------------------------
    const availableTypes = useMemo(() => {
        return Object.keys(grouped);
    }, [grouped]);

    // --------------------------------------------------------
    return {
        rows,
        grouped,
        availableTypes,
        loading,
        error,
    };
}
