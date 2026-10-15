/**
 * Component Name: FinCF
 * Module: Finance / FinCF
 * Purpose: Assemble the Cash Flow Statement for standalone and ReportDrawer deployment.
 * Author/Version: UXLab V1.2
 * AI Tags: cash-flow, page, orchestrator, deployment, opsmgt
 */

import React from "react";
import {
    Box,
    Alert,
    CircularProgress,
    Typography,
} from "@mui/material";
import { useUser } from "../../core/access/userContext";
import { layoutStyle, masterTypo } from "../../ux/styles";
import { surface, text } from "../../ux/styles/colorPalette";
import FinCFHeader from "./components/FinCFHeader";
import FinCFKpis from "./components/FinCFKpis";
import FinCFTakeaways from "./components/FinCFTakeaways";
import FinCFToolbar from "./components/FinCFToolbar";
import FinCFTable from "./components/FinCFTable";
import { useFinCF } from "./hooks/useFinCF";
import { useFinCFAi } from "./hooks/useFinCFAi";

// Compose the report for standalone and ReportDrawer deployment.
export default function FinCF({ hideHeader = false }) {
    // Load the authenticated user and current learning session.
    const { userInfo } = useUser();

    // Load and manage cash-flow data, filters and reporting controls.
    const {
        rows,
        filteredRows,
        displayRows,
        periods,
        kpis,
        sections,
        loading,
        error,
        search,
        setSearch,
        density,
        setDensity,
        isTreeView,
        activeSection,
        setActiveSection,
        productionMonth,
        setProductionMonth,
        exportCsv,
        reload,
    } = useFinCF();

    // Prepare cash-flow insights using the selected reporting period.
    const { narrative: insights } = useFinCFAi(
        rows,
        periods,
        productionMonth
    );

    return (
        <Box sx={{ ...layoutStyle.root, bgcolor: surface.page }}>
            <Box sx={layoutStyle.pageContainer}>
                {/* Show the module header only in standalone mode. */}
                {!hideHeader && (
                    <FinCFHeader
                        gameId={userInfo?.gameId}
                        gameBatch={userInfo?.gameBatch}
                        gameTeam={userInfo?.gameTeam}
                        productionMonth={productionMonth}
                        onMonthChange={setProductionMonth}
                        onRefresh={reload}
                    />
                )}

                {/* Display report-generation errors in both deployment modes. */}
                {error && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2, borderRadius: 2 }}
                    >
                        {error}
                    </Alert>
                )}

                {/* Keep the KPI summary available in both deployment modes. */}
                <FinCFKpis
                    kpis={kpis}
                    loading={loading}
                />

                {/* Preserve search, density, section filtering and CSV export. */}
                <FinCFToolbar
                    search={search}
                    onSearchChange={setSearch}
                    density={density}
                    onDensityChange={setDensity}
                    sections={sections}
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                    onExport={exportCsv}
                />

                {/* Show loading feedback while the cash-flow statement is loading. */}
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 1.5,
                            py: 8,
                        }}
                    >
                        <CircularProgress size={24} />
                        <Typography
                            sx={{
                                ...masterTypo.body2,
                                color: text.muted,
                            }}
                        >
                            Loading cash flow statement…
                        </Typography>
                    </Box>
                ) : (
                    <FinCFTable
                        rows={displayRows}
                        totalCount={rows.length}
                        periods={periods}
                        isTree={isTreeView}
                        loading={false}
                    />
                )}

                {/* Explain when the current filters return no cash-flow rows. */}
                {!loading && filteredRows.length === 0 && !error && (
                    <Typography
                        sx={{
                            ...masterTypo.caption,
                            color: text.muted,
                            textAlign: "center",
                            mt: 1,
                        }}
                    >
                        No cash-flow rows match the current filters.
                    </Typography>
                )}

                {/* Keep cash-flow insights after the statement in both modes. */}
                <Box sx={{ mt: 3 }}>
                    <FinCFTakeaways
                        insights={insights}
                        loading={loading}
                    />
                </Box>
            </Box>
        </Box>
    );
}
