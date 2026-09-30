
// Component Name : useFinIS
// Module         : FinIS (Income Statement)
// Purpose        : Business logic hook - fetch, derive, filter and export Income Statement data
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, hook, business-logic, finance, drill-down, kpi

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
    DEFAULT_DENSITY,
    USE_MOCK_DATA,
    LINE_CHILDREN,
} from "../constants/finISConstants";

const KPI_DEFINITIONS = [
    {
        key: "grossProfitPct",
        label: "Gross Profit %",
        lineNo: 3,
    },
    {
        key: "manufacturingOverheadsPct",
        label: "Manufacturing Overheads %",
        lineNo: 13,
    },
    {
        key: "administrativeOverheadsPct",
        label: "Administrative Overheads %",
        lineNo: 23,
    },
    {
        key: "profitBeforeInterestTaxPct",
        label: "Profit Before Interest & Tax %",
        lineNo: 25,
    },
    {
        key: "financeCostPct",
        label: "Finance Cost %",
        lineNo: 26,
    },
    {
        key: "netProfitPct",
        label: "Net Profit %",
        lineNo: 30,
        isRatio: true,
    },
];

const toNumber = (value) => {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
};

const calculateRatio = (value, revenue) => {
    const revenueValue = toNumber(revenue);

    if (revenueValue === 0) return null;

    return (toNumber(value) / revenueValue) * 100;
};

const calculateChange = (currentValue, firstValue) => {
    if (currentValue === null || firstValue === null) return null;

    const base = Math.abs(firstValue);

    if (base === 0) return null;

    return ((currentValue - firstValue) / base) * 100;
};

export const useFinIS = () => {
    const { userInfo } = useUser();
    const { gameId, gameBatch, gameTeam } = userInfo || {};

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [density, setDensity] = useState(DEFAULT_DENSITY);
    const [activeGroup, setActiveGroup] = useState("all");
    const [productionMonth, setProductionMonth] = useState(null);
    const [expandedLines, setExpandedLines] = useState(new Set());

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

                const {
                    success,
                    message,
                    data: responseRows,
                } = response?.data || {};

                if (!success) {
                    throw new Error(
                        message || "Income Statement could not be generated."
                    );
                }

                data = responseRows || [];
            }

            setRows(data);
            setExpandedLines(new Set());
        } catch (err) {
            setError(
                err?.message || "Unable to load the Income Statement."
            );
            setRows([]);
            setExpandedLines(new Set());
        } finally {
            setLoading(false);
        }
    }, [gameId, gameBatch, gameTeam, productionMonth]);

    useEffect(() => {
        loadIncomeStatement();
    }, [loadIncomeStatement]);

    const periods = useMemo(() => {
        if (!rows.length) return [];

        return Object.keys(rows[0]).filter(
            (column) => !FIXED_COLUMNS.includes(column)
        );
    }, [rows]);

    const latestPeriod = periods[periods.length - 1];
    const firstPeriod = periods[0];

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
                ? row.Line_No >= group.start &&
                      row.Line_No <= group.end
                : true;
        });
    }, [rows, search, activeGroup]);

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
                children.forEach((child) => addNode(child, depth + 1));
            }
        };

        roots.forEach((root) => addNode(root));

        return result;
    }, [filteredRows, expandedLines]);

    const displayRows =
        density === "compact"
            ? treeRows
            : filteredRows.map((row) => ({
                  ...row,
                  lineNo: Number(row.Line_No),
                  depth: 0,
                  hasChildren: false,
                  isExpanded: false,
              }));

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

    // Derive KPI values through the actual P&L flow from Revenue.
    const kpis = useMemo(() => {
        if (!rows.length || !firstPeriod || !latestPeriod) return [];

        const rowByLine = new Map(
            rows.map((row) => [Number(row.Line_No), row])
        );

        const getLineValue = (lineNo, period) => {
            const row = rowByLine.get(lineNo);

            return row ? toNumber(row[period]) : 0;
        };

        const calculatePnl = (period) => {
            const revenue = getLineValue(1, period);
            const cogs = getLineValue(2, period);

            // Revenue - COGS = Gross Profit.
            const grossProfit = revenue - cogs;

            // Lines 4-12 = Manufacturing Overheads.
            const manufacturingOverheads = Array.from(
                { length: 9 },
                (_, index) => getLineValue(index + 4, period)
            ).reduce((total, value) => total + value, 0);

            // Gross Profit - Manufacturing Overheads.
            const profitAfterMoq =
                grossProfit - manufacturingOverheads;

            // Line 23 + Line 24 = Administrative Overheads.
            const administrativeOverheads =
                getLineValue(23, period) +
                getLineValue(24, period);

            // Profit After MOH - Administrative Overheads = PBIT.
            const pbit =
                profitAfterMoq -
                administrativeOverheads;

            // PBIT - Finance Cost = PBT.
            const financeCost = getLineValue(26, period);
            const pbt = pbit - financeCost;

            // PBT - Corporate Tax = Net Profit.
            const corporateTax = getLineValue(28, period);
            const netProfit = pbt - corporateTax;

            return {
                revenue,
                grossProfit,
                manufacturingOverheads,
                administrativeOverheads,
                pbit,
                financeCost,
                pbt,
                corporateTax,
                netProfit,
            };
        };

        const latestPnl = calculatePnl(latestPeriod);
        const firstPnl = calculatePnl(firstPeriod);

        const latestValues = {
            grossProfitPct: calculateRatio(
                latestPnl.grossProfit,
                latestPnl.revenue
            ),
            manufacturingOverheadsPct: calculateRatio(
                latestPnl.manufacturingOverheads,
                latestPnl.revenue
            ),
            administrativeOverheadsPct: calculateRatio(
                latestPnl.administrativeOverheads,
                latestPnl.revenue
            ),
            profitBeforeInterestTaxPct: calculateRatio(
                latestPnl.pbit,
                latestPnl.revenue
            ),
            financeCostPct: calculateRatio(
                latestPnl.financeCost,
                latestPnl.revenue
            ),
            netProfitPct: calculateRatio(
                latestPnl.netProfit,
                latestPnl.revenue
            ),
        };

        const firstValues = {
            grossProfitPct: calculateRatio(
                firstPnl.grossProfit,
                firstPnl.revenue
            ),
            manufacturingOverheadsPct: calculateRatio(
                firstPnl.manufacturingOverheads,
                firstPnl.revenue
            ),
            administrativeOverheadsPct: calculateRatio(
                firstPnl.administrativeOverheads,
                firstPnl.revenue
            ),
            profitBeforeInterestTaxPct: calculateRatio(
                firstPnl.pbit,
                firstPnl.revenue
            ),
            financeCostPct: calculateRatio(
                firstPnl.financeCost,
                firstPnl.revenue
            ),
            netProfitPct: calculateRatio(
                firstPnl.netProfit,
                firstPnl.revenue
            ),
        };

        return KPI_DEFINITIONS.map((definition) => {
            const latestValue = latestValues[definition.key];
            const firstValue = firstValues[definition.key];

            return {
                ...definition,
                value: latestValue,
                firstValue,
                change: calculateChange(
                    latestValue,
                    firstValue
                ),
                period: latestPeriod,
            };
        });
    }, [rows, firstPeriod, latestPeriod]);

    const isSubtotalLine = useCallback(
        (lineNo) => SUBTOTAL_LINES.has(Number(lineNo)),
        []
    );

    const isRatioLine = useCallback(
        (lineNo) => RATIO_LINES.has(Number(lineNo)),
        []
    );

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
        firstPeriod,
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
