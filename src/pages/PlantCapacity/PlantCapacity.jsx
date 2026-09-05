import React, { useMemo } from "react";
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

  const queryParams = useMemo(() => {
    if (!userInfo?.gameId) return null;
    return {
      gameId: userInfo.gameId,
      gameBatch: userInfo.gameBatch,
      gameTeam: userInfo.gameTeam,
      productionMonth: productionMonth || null,
    };
  }, [userInfo, productionMonth]);

  const {
    plant,
    workCentres,
    criticalCount,
    loading,
    error,
    activeTab,
    setActiveTab,
    filter,
    setFilter,
    reload,
  } = usePlantCapacity(queryParams);

  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        {/* Header */}
        <PcHeader plant={plant} gameTeam={userInfo?.gameTeam} onRefresh={reload} />

        {/* Navigation & Filters */}
        <PcNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          filter={filter}
          setFilter={setFilter}
        />

        {/* Error Notice */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Quick AI Insight Banner */}
        <PcQuickInsight plant={plant} criticalCount={criticalCount} />

        {/* Top KPI Cards */}
        <PcOverview plant={plant} criticalCount={criticalCount} loading={loading} />

        {/* Work Cards & Table Workspace */}
        <PcWorkspace
          activeTab={activeTab}
          workCentres={workCentres}
          plant={plant}
          loading={loading}
        />
      </Box>
    </Box>
  );
}