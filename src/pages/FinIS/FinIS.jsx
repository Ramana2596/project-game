// Component Name : FinIS
// Module         : FinIS (Income Statement)
// Purpose        : Page orchestrator for the Income Statement report - wires useFinIS /
//                  useFinISAi to the FinISHeader, FinISKpis, FinISToolbar and FinISTable components.
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, page, orchestrator, opsmgt

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Component Definition
// ---------------------------------------------------------------------------
const FinIS = () => {

    // Load authenticated user / Learning session (team badge in the header)
    const { userInfo } = useUser();

    // Core business logic: fetch, derive, filter, export
    const {
        rows, filteredRows, periods, kpis, groups,
        loading, error,
        search, setSearch,
        density, setDensity,
        activeGroup, setActiveGroup,
        isSubtotalLine, isRatioLine,
        exportCsv,
    } = useFinIS();

    // AI-Ready extension point (placeholder today - narration/anomaly hooks for later)
    const { narrative } = useFinISAi(rows, periods);

    // ---------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------
    return (
        <Box sx={layoutStyle.root}>
            <Box sx={layoutStyle.pageContainer}>

                {/* Page header */}
                <FinISHeader gameBatch={userInfo?.gameBatch} gameTeam={userInfo?.gameTeam} />

                {/* KPI stat cards */}
                <FinISKpis kpis={kpis} />

                {/* Toolbar: search, density, group filters, export */}
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
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {/* AI Extension Hooks: reserved for narration once useFinISAi is enabled */}
                {narrative && <Alert severity="info" sx={{ mb: 2 }}>{narrative}</Alert>}

                {/* Report table */}
                <FinISTable
                    rows={filteredRows}
                    totalCount={rows.length}
                    periods={periods}
                    density={density}
                    loading={loading}
                    isSubtotalLine={isSubtotalLine}
                    isRatioLine={isRatioLine}
                />
            </Box>
        </Box>
    );
};

export default FinIS;
