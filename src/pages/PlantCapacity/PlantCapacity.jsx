
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

export default function PlantCapacity({ productionMonth }) {
  const { userInfo } = useUser();

  const [selectedMonth, setSelectedMonth] = useState(
    productionMonth || userInfo?.productionMonth || ""
  );

  // Build API query from current user and selected simulation period
  const queryParams = useMemo(() => {
    if (!userInfo?.gameId) return null;

    return {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
      productionMonth: selectedMonth || null,
    };
  }, [userInfo, selectedMonth]);

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
        {/* Page header and simulation period */}
        <PcHeader
          productionMonth={returnedMonth}
          onMonthChange={setSelectedMonth}
        />

        {/* Tab navigation and work centre filter */}
        <PcNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filter={filter}
          setFilter={setFilter}
        />

        {/* API error */}
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}

        {/* Overview-only insight */}
        {activeTab === "overview" && (
          <PcQuickInsight
            plant={plant}
            criticalCount={criticalCount}
          />
        )}

        {/* Overview-only plant summary */}
        {activeTab === "overview" && (
          <PcOverview
            plant={plant}
            workCentres={workCentres}
            loading={loading}
          />
        )}

        {/* Tab-specific workspace */}
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

