// File: FinCF.jsx
// Module: FinCF
// Purpose: Assemble the Cash Flow Statement page using UXLab components and tokens.

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

// Compose the page from focused components and dedicated data hooks.
export default function FinCF() {
    const { userInfo } = useUser();

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
        activeSection,
        setActiveSection,
        productionMonth,
        setProductionMonth,
        exportCsv,
        reload,
    } = useFinCF();

    const { narrative: insights } = useFinCFAi(
        rows,
        periods,
        productionMonth
    );

    return (
        <Box sx={{ ...layoutStyle.root, bgcolor: surface.page }}>
            <Box sx={layoutStyle.pageContainer}>
                <FinCFHeader
                    gameId={userInfo?.gameId}
                    gameBatch={userInfo?.gameBatch}
                    gameTeam={userInfo?.gameTeam}
                    productionMonth={productionMonth}
                    onMonthChange={setProductionMonth}
                    onRefresh={reload}
                />

                {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <FinCFKpis kpis={kpis} loading={loading} />

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
                        periods={periods}
                        density={density}
                        loading={false}
                    />
                )}

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

                {/* Footer: show cash-flow insights after the statement. */}
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
