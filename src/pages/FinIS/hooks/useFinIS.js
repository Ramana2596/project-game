// Component Name : useFinIS
// Module         : FinIS (Income Statement)
// Purpose        : Business logic hook - fetch, derive, filter and export Income Statement data
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, hook, business-logic, finance, drill-down

import { useState, useEffect, useMemo, useCallback } from "react";
import { useUser } from "../../../core/access/userContext";
import { getIncomeStatementInfo } from "../services/finISService";
import { fetchIncomeStatementMock } from "../services/finISMock";
import { exportIncomeStatementCsv } from "../utils/finISExportCsv";
import {
    FIXED_COLUMNS,
    LINE_GROUPS,
    SUBTOTAL_LINES,
    RATIO_LINES,
    KPI_CARDS,
    DEFAULT_DENSITY,
    USE_MOCK_DATA,
    LINE_CHILDREN,
} from "../constants/finISConstants";

export const useFinIS = () => {

    // Load authenticated Learning session
    const { userInfo } = useUser();
    const { gameId, gameBatch, gameTeam } = userInfo || {};

    // State
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [density, setDensity] = useState(DEFAULT_DENSITY);
    const [activeGroup, setActiveGroup] = useState("all");
    const [productionMonth, setProductionMonth] = useState(null);
    const [expandedLines, setExpandedLines] = useState(new Set());

    // Fetch Income Statement
    const loadIncomeStatement = useCallback(async () => {
        if (!USE_MOCK_DATA && (!gameId || !gameBatch || !gameTeam)) return;

        setLoading(true);
        setError(null);

        try {
            let data;

            if (USE_MOCK_DATA) {
                data = await fetchIncomeStatementMock();
            } else {
                const response = await getIncomeStatementInfo({
                    gameId,
                    gameBatch,
                    gameTeam,
                    productionMonth,
                });

                const { success, message, data: rows } = response?.data || {};

                if (!success) {
                    throw new Error(
                        message || "Income Statement could not be generated."
                    );
                }

                data = rows || [];
            }

            setRows(data);
            setExpandedLines(new Set());
        } catch (err) {
            setError(err?.message || "Unable to load the Income Statement.");
            setRows([]);
            setExpandedLines(new Set());
        } finally {
            setLoading(false);
        }
    }, [gameId, gameBatch, gameTeam, productionMonth]);

    // Fetch whenever session or selected period changes
    useEffect(() => {
        loadIncomeStatement();
    }, [loadIncomeStatement]);

    // Period columns
    const periods = useMemo(() => {
        if (!rows.length) return [];

        return Object.keys(rows[0]).filter(
            (col) => !FIXED_COLUMNS.includes(col)
        );
    }, [rows]);

    // Latest period
    const latestPeriod = periods[periods.length - 1];

    // Filtered rows
    const filteredRows = useMemo(() => {
        return rows.filter((row) => {
            const details = String(row.Details || "").toLowerCase();
            const matchesSearch = details.includes(search.toLowerCase());

            if (!matchesSearch) return false;

            if (activeGroup === "all") return true;

            const group = LINE_GROUPS.find(
                (item) => item.key === activeGroup
            );

            return group
                ? row.Line_No >= group.start && row.Line_No <= group.end
                : true;
        });
    }, [rows, search, activeGroup]);

    // Compact tree rows
    const treeRows = useMemo(() => {
        if (!filteredRows.length) return [];

        const rowMap = new Map(
            filteredRows.map((row) => [Number(row.Line_No), row])
        );

        const childLines = new Set(
            Object.values(LINE_CHILDREN).flat()
        );

        const roots = filteredRows.filter(
            (row) => !childLines.has(Number(row.Line_No))
        );

        const result = [];

        const addNode = (row, depth = 0) => {
            const lineNo = Number(row.Line_No);
            const children = (LINE_CHILDREN[lineNo] || [])
                .map((childLine) => rowMap.get(childLine))
                .filter(Boolean);

            const isExpanded = expandedLines.has(lineNo);

            result.push({
                ...row,
                lineNo,
                depth,
                hasChildren: children.length > 0,
                isExpanded,
            });

            if (isExpanded) {
                children.forEach((child) => {
                    addNode(child, depth + 1);
                });
            }
        };

        roots.forEach((root) => addNode(root));

        return result;
    }, [filteredRows, expandedLines]);

    // Detailed view rows
    const displayRows = density === "compact"
        ? treeRows
        : filteredRows.map((row) => ({
            ...row,
            lineNo: Number(row.Line_No),
            depth: 0,
            hasChildren: false,
            isExpanded: false,
        }));

    // Toggle Compact view parent line
    const toggleLine = useCallback((lineNo) => {
        setExpandedLines((current) => {
            const next = new Set(current);

            if (next.has(Number(lineNo))) {
                next.delete(Number(lineNo));
            } else {
                next.add(Number(lineNo));
            }

            return next;
        });
    }, []);

    // KPI values
    const kpis = useMemo(() => {
        return KPI_CARDS.map((card) => {
            const row = rows.find((item) => item.Line_No === card.lineNo);
            const value = row ? row[latestPeriod] : null;

            return {
                ...card,
                value,
                period: latestPeriod,
            };
        });
    }, [rows, latestPeriod]);

    // Statement line helpers
    const isSubtotalLine = useCallback(
        (lineNo) => SUBTOTAL_LINES.has(Number(lineNo)),
        []
    );

    const isRatioLine = useCallback(
        (lineNo) => RATIO_LINES.has(Number(lineNo)),
        []
    );

    // Export filtered view
    const exportCsv = useCallback(() => {
        exportIncomeStatementCsv({
            rows: filteredRows,
            periods,
            gameTeam,
        });
    }, [filteredRows, periods, gameTeam]);

    return {
        rows,
        filteredRows,
        displayRows,
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
        expandedLines,
        isTree: density === "compact",
        toggleLine,
        isSubtotalLine,
        isRatioLine,
        exportCsv,
        reload: loadIncomeStatement,
    };
};

export default useFinIS;