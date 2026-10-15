
/**
 * Component: PlantCapacity
 * Module: Plant Capacity
 * Purpose: Plant capacity workspace for standalone and ReportDrawer deployment.
 * Author/Version: UXLab V1.1
 * AI Tags: plant-capacity, work-centres, simulation, uxlab
 */

import React, { useMemo, useState } from "react";
import { Box, Alert } from "@mui/material";
import { useUser } from "../../core/access/userContext.jsx";
import { usePlantCapacity } from "./hooks/usePlantCapacity";
import { PcHeader } from "./components/PcHeader";
import { PcNavigation } from "./components/PcNavigation";
import { PcQuickInsight } from "./components/PcQuickInsight";
import { PcOverview } from "./components/PcOverview";
import { PcWorkspace } from "./components/PcWorkspace";
import { layoutStyle } from "../../ux/styles";

// Render plant capacity in standalone and ReportDrawer modes.
export default function PlantCapacity({
  productionMonth,
  hideHeader = false,
}) {
  // Read the authenticated simulation context.
  const { userInfo } = useUser();

  // Keep the selected simulation period synchronized with the initial context.
  const [selectedMonth, setSelectedMonth] = useState(
    productionMonth || userInfo?.productionMonth || ""
  );

  // Build API query from the current user and selected simulation period.
  const queryParams = useMemo(() => {
    if (!userInfo?.gameId) return null;

    return {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
      productionMonth: selectedMonth || null,
    };
  }, [userInfo, selectedMonth]);

  // Load plant, work-centre, status, and filter data.
  const {
    plant,
    workCentres,
    productionMonth: returnedMonth,
    criticalCount,
    loading,
    error,
    activeTab,
    setActiveTab,
    filter,
    setFilter,
  } = usePlantCapacity(queryParams);

  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        {/* Show the module header only in standalone mode. */}
        {!hideHeader && (
          <PcHeader
            productionMonth={returnedMonth}
            onMonthChange={setSelectedMonth}
          />
        )}

        {/* Keep navigation and work-centre filters available in both modes. */}
        <PcNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Display API errors without removing the rest of the workspace. */}
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}

        {/* Show the insight and plant summary on the Overview tab. */}
        {activeTab === "overview" && (
          <>
            <PcQuickInsight
              plant={plant}
              criticalCount={criticalCount}
            />

            <PcOverview
              plant={plant}
              workCentres={workCentres}
              loading={loading}
            />
          </>
        )}

        {/* Render the selected tab's workspace. */}
        <PcWorkspace
          activeTab={activeTab}
          workCentres={workCentres}
          plant={plant}
          loading={loading}
          filter={filter}
        />
      </Box>
    </Box>
  );
}