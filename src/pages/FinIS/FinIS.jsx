// Component Name : FinIS
// Module         : FinIS (Income Statement)
// Purpose        : Page orchestrator for the Income Statement report - wires useFinIS /
//                  useFinISAi to the FinISHeader, FinISKpis, FinISToolbar and FinISTable components.
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, page, orchestrator, opsmgt

import React from "react";
import { Box, Alert } from "@mui/material";
import { layoutStyle } from "../../ux/styles";
import { useUser } from "../../core/access/userContext";

import FinISHeader from "./components/FinISHeader";
import FinISKpis from "./components/FinISKpis";
import FinISToolbar from "./components/FinISToolbar";
import FinISTable from "./components/FinISTable";
import { useFinIS } from "./hooks/useFinIS";
import { useFinISAi } from "./hooks/useFinISAi";

const FinIS = () => {

    // Load authenticated user / Learning session
    const { userInfo } = useUser();

    // Core business logic
    const {
        rows,
        filteredRows,
        displayRows,
        periods,
        kpis,
        groups,
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
        isTree,
        toggleLine,
        isSubtotalLine,
        isRatioLine,
        exportCsv,
    } = useFinIS();

    // AI-Ready extension point
    const { narrative } = useFinISAi(rows, periods);

    return (
        <Box sx={layoutStyle.root}>
            <Box sx={layoutStyle.pageContainer}>

                {/* Page header */}
                <FinISHeader
                    gameId={userInfo?.gameId}
                    gameBatch={userInfo?.gameBatch}
                    gameTeam={userInfo?.gameTeam}
                    productionMonth={productionMonth}
                    onMonthChange={setProductionMonth}
                />

                {/* KPI stat cards */}
                <FinISKpis kpis={kpis} />

                {/* Toolbar */}
                <FinISToolbar
                    search={search}
                    onSearchChange={setSearch}
                    density={density}
                    onDensityChange={setDensity}
                    groups={groups}
                    activeGroup={activeGroup}
                    onGroupChange={setActiveGroup}
                    onExportCsv={exportCsv}
                />

                {/* Error state */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* AI Extension Hooks */}
                {narrative && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        {narrative}
                    </Alert>
                )}

                {/* Report table */}
                <FinISTable
                    rows={displayRows}
                    totalCount={filteredRows.length}
                    periods={periods}
                    density={density}
                    loading={loading}
                    isTree={isTree}
                    onToggle={toggleLine}
                    isSubtotalLine={isSubtotalLine}
                    isRatioLine={isRatioLine}
                />
            </Box>
        </Box>
    );
};

export default FinIS;