// File: useFinCF.js
// Module: FinCF
// Purpose: Manage cash-flow data, periods, filters, KPIs and CSV export.

import { useState, useEffect, useMemo, useCallback } from "react";
import { useUser } from "../../../core/access/userContext";
import { getCashFlowStatement } from "../services/cashFlowStatementService";
import { exportCashFlowCsv } from "../utils/finCFExportCsv";
import { getPeriodColumns, toAmount } from "../utils/finCFFormatters";
import {
    CASH_FLOW_SECTIONS,
    DEFAULT_DENSITY,
    DEFAULT_SECTION,
    KPI_DEFINITIONS,
} from "../constants/finCFConstants";

// Normalize common API response wrappers without changing the API contract.
const getResponseRows = (response) => {
    const result = response?.data;

    if (result?.success === false) {
        throw new Error(result?.message || "Unable to load cash-flow data.");
    }

    const candidates = [
        result?.data,
        result?.rows,
        result?.recordset,
        result?.data?.rows,
        result,
    ];

    return candidates.find(Array.isArray) || [];
};

// Load statement data and manage the user's reporting context.
export const useFinCF = () => {
    const { userInfo } = useUser();
    const gameId = userInfo?.gameId;
    const gameBatch = userInfo?.gameBatch;
    const gameTeam = userInfo?.gameTeam;

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [density, setDensity] = useState(DEFAULT_DENSITY);
    const [activeSection, setActiveSection] = useState(DEFAULT_SECTION);
    const [productionMonth, setProductionMonth] = useState(null);
    const [reloadKey, setReloadKey] = useState(0);

    // Fetch data when the session, selected month or refresh request changes.
    useEffect(() => {
        let active = true;

        const loadCashFlow = async () => {
            if (
                gameId === null || gameId === undefined || gameId === "" ||
                gameBatch === null || gameBatch === undefined || gameBatch === "" ||
                gameTeam === null || gameTeam === undefined || gameTeam === ""
            ) {
                setRows([]);
                setError("Game, batch or team context is missing.");
                setLoading(false);
                return;
            }

            setLoading(true);
            setError("");

            try {
                const response = await getCashFlowStatement({
                    gameId,
                    gameBatch,
                    gameTeam,
                    productionMonth,
                });

                const data = getResponseRows(response);

                if (active) setRows(data);
            } catch (err) {
                if (active) {
                    setRows([]);
                    setError(
                        err?.response?.data?.message ||
                        err?.message ||
                        "Unable to load the cash-flow statement."
                    );
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        loadCashFlow();

        return () => {
            active = false;
        };
    }, [gameId, gameBatch, gameTeam, productionMonth, reloadKey]);

    // Identify period columns and prepare searchable rows.
    const periods = useMemo(() => getPeriodColumns(rows), [rows]);

    const filteredRows = useMemo(() => {
        const query = search.trim().toLowerCase();

        return rows.filter((row) => {
            const lineNo = Number(row?.Line_No);
            const section = CASH_FLOW_SECTIONS.find(
                (item) => lineNo >= item.startLine && lineNo <= item.endLine
            );

            const sectionMatch =
                activeSection === "all" || section?.id === activeSection;

            const searchMatch =
                !query ||
                String(row?.Details ?? "").toLowerCase().includes(query) ||
                String(row?.Line_No ?? "").toLowerCase().includes(query);

            return sectionMatch && searchMatch;
        });
    }, [rows, search, activeSection]);

    // Resolve the KPI period using the selected month or the latest returned period.
    const kpis = useMemo(() => {
        const selectedPrefix = productionMonth
            ? String(productionMonth).slice(0, 7)
            : null;

        const period = selectedPrefix
            ? periods.find((item) => String(item).startsWith(selectedPrefix)) || null
            : null;

        const latestPeriod = periods.length ? periods[periods.length - 1] : null;
        const effectivePeriod = period || latestPeriod;

        return KPI_DEFINITIONS.map((item) => {
            const row = rows.find(
                (entry) => Number(entry?.Line_No) === item.lineNo
            );

            return {
                ...item,
                value: effectivePeriod
                    ? toAmount(row?.[effectivePeriod])
                    : null,
                period: effectivePeriod,
            };
        });
    }, [rows, periods, productionMonth]);

    // Export only the currently filtered rows.
    const exportCsv = useCallback(
        () => exportCashFlowCsv(filteredRows),
        [filteredRows]
    );

    // Refresh without changing the selected reporting month or filters.
    const reload = useCallback(() => {
        setReloadKey((value) => value + 1);
    }, []);

    return {
        rows,
        filteredRows,
        displayRows: filteredRows,
        periods,
        kpis,
        sections: CASH_FLOW_SECTIONS,
        loading,
        error,
        search,
        setSearch,
        density,
        setDensity,
        activeSection,
        setActiveSection,
        productionMonth,
        setProductionMonth,
        exportCsv,
        reload,
    };
};
