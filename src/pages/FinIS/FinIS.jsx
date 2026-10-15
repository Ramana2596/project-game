/**
 * Component Name: FinIS
 * Module: Finance / FinIS (Income Statement)
 * Purpose: Orchestrate the Income Statement for standalone and ReportDrawer deployment.
 * Author/Version: UXLab V1.1
 * AI Tags: income-statement, page, orchestrator, deployment, opsmgt
 */

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

const FinIS = ({ hideHeader = false }) => {
    // Load the authenticated user and current learning session.
    const { userInfo } = useUser();

    // Load and manage the Income Statement data and table controls.
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

    // Prepare the AI-ready narrative without changing the report data flow.
    const { narrative } = useFinISAi(rows, periods);

    return (
        <Box sx={layoutStyle.root}>
            <Box sx={layoutStyle.pageContainer}>
                {/* Show the module header only when deployed as a standalone page. */}
                {!hideHeader && (
                    <FinISHeader
                        gameId={userInfo?.gameId}
                        gameBatch={userInfo?.gameBatch}
                        gameTeam={userInfo?.gameTeam}
                        productionMonth={productionMonth}
                        onMonthChange={setProductionMonth}
                    />
                )}

                {/* Display KPIs in both standalone and ReportDrawer modes. */}
                <FinISKpis kpis={kpis} />

                {/* Keep report filtering, density and export available in both modes. */}
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

                {/* Display data-loading or report-generation errors. */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Preserve the AI narrative extension point in both deployment modes. */}
                {narrative && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                        {narrative}
                    </Alert>
                )}

                {/* Render the Income Statement table with the existing controls. */}
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
