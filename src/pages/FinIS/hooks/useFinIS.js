// Component Name : useFinIS
// Module         : FinIS (Income Statement)
// Purpose        : Business logic hook - fetch, derive, filter and export Income Statement data
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, hook, business-logic, finance

import { useState, useEffect, useMemo, useCallback } from "react";
import { useUser } from "../../../core/access/userContext";
import { getIncomeStatementInfo } from "../services/finISService";
import { fetchIncomeStatementMock } from "../services/finISMock";
import { exportIncomeStatementCsv } from "../utils/finISExportCsv";
import {
    FIXED_COLUMNS, LINE_GROUPS, SUBTOTAL_LINES, RATIO_LINES, KPI_CARDS, DEFAULT_DENSITY, USE_MOCK_DATA,
} from "../constants/finISConstants";

export const useFinIS = () => {

    // Load authenticated Learning session (gameId / batch / team) from shared context
    const { userInfo } = useUser();
    const { gameId, gameBatch, gameTeam } = userInfo || {};

    // State: raw rows from the SP, load status, and UI controls
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [density, setDensity] = useState(DEFAULT_DENSITY);
    const [activeGroup, setActiveGroup] = useState("all");
    const [productionMonth, setProductionMonth] = useState(null);

    // Function: fetch the Income Statement for the current game/team/period
    const loadIncomeStatement = useCallback(async () => {
        if (!USE_MOCK_DATA && (!gameId || !gameBatch || !gameTeam)) return;
        setLoading(true);
        setError(null);
        try {
            let data;
            if (USE_MOCK_DATA) {
                data = await fetchIncomeStatementMock();
            } else {
                const response = await getIncomeStatementInfo({ gameId, gameBatch, gameTeam, productionMonth });
                const { success, message, data: rows } = response?.data || {};
                if (!success) throw new Error(message || "Income Statement could not be generated.");
                data = rows || [];
            }
            setRows(data);
        } catch (err) {
            setError(err?.message || "Unable to load the Income Statement.");
            setRows([]);
        } finally {
            setLoading(false);
        }
    }, [gameId, gameBatch, gameTeam, productionMonth]);

    // Fetch whenever the session identity or selected period changes
    useEffect(() => {
        loadIncomeStatement();
    }, [loadIncomeStatement]);

    // Derived: period (month) columns are whatever the pivot returned beyond the fixed columns
    const periods = useMemo(() => {
        if (!rows.length) return [];
        return Object.keys(rows[0]).filter((col) => !FIXED_COLUMNS.includes(col));
    }, [rows]);

    // Derived: latest period, used to drive the KPI cards
    const latestPeriod = periods[periods.length - 1];

    // Derived: rows filtered by search text and the active group chip
    const filteredRows = useMemo(() => {
        return rows.filter((row) => {
            const matchesSearch = row.Details?.toLowerCase().includes(search.toLowerCase());
            if (!matchesSearch) return false;
            if (activeGroup === "all") return true;
            const group = LINE_GROUPS.find((g) => g.key === activeGroup);
            return group ? row.Line_No >= group.start && row.Line_No <= group.end : true;
        });
    }, [rows, search, activeGroup]);

    // Derived: KPI card values resolved against the latest period
    const kpis = useMemo(() => {
        return KPI_CARDS.map((card) => {
            const row = rows.find((r) => r.Line_No === card.lineNo);
            const value = row ? row[latestPeriod] : null;
            return { ...card, value, period: latestPeriod };
        });
    }, [rows, latestPeriod]);

    // Function: is this line a bold subtotal / result row
    const isSubtotalLine = useCallback((lineNo) => SUBTOTAL_LINES.has(lineNo), []);

    // Function: is this line a ratio (percentage) rather than a currency amount
    const isRatioLine = useCallback((lineNo) => RATIO_LINES.has(lineNo), []);

    // Function: export the currently filtered view to CSV
    const exportCsv = useCallback(() => {
        exportIncomeStatementCsv({ rows: filteredRows, periods, gameTeam });
    }, [filteredRows, periods, gameTeam]);

    return {
        rows,
        filteredRows,
        periods,
        latestPeriod,
        kpis,
        groups: LINE_GROUPS,
        loading,
        error,
        search,
        setSearch,
        density,
        setDensity,
        activeGroup,
        setActiveGroup,
        productionMonth,
        setProductionMonth,
        isSubtotalLine,
        isRatioLine,
        exportCsv,
        reload: loadIncomeStatement,
    };
};

export default useFinIS;