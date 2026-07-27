// ============================================================
// LEAP V1.0
// File : useLeap.js
// Purpose : Load, group and expose LEAP content to UI components
// ============================================================
import { useEffect, useMemo, useState } from "react";
import { getStageContent } from "../services/leapService";

// ============================================================
export default function useLeap(stageId) {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [stageInfo, setStageInfo] = useState(null);

    // --------------------------------------------------------
    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                setLoading(true);
                setError(null);
                const response = await getStageContent({ stageId });
                if (isMounted) {
                    const leapData = response.data;
                    const help = leapData.help || [];
                    setRows(help);
                    if (help.length > 0) {
                        setStageInfo({
                            stageName: help[0].Stage_Name,
                            stagePurpose: help[0].Stage_Purpose,
                        });
                    }
                }
            } catch (err) {
                if (isMounted) {
                    setError(err?.message || "Unable to load LEAP content.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }
        if (stageId) {
            load();
        } else {
            setRows([]);
            setError(null);
            setLoading(false);
        }
        return () => {
            isMounted = false;
        };
    }, [stageId]);

    // --------------------------------------------------------
    // Group by Info Type
    // --------------------------------------------------------
    const grouped = useMemo(() => {
        const result = {};
        (rows || []).forEach((row) => {
            const type = row.Info_Type;
            if (!result[type]) {
                result[type] = [];
            }
            result[type].push(row);
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
        stageInfo,
        rows,
        grouped,
        availableTypes,
        loading,
        error,
    };
}
