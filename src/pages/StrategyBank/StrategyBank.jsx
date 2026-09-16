// ============================================================
// Component: StrategyBank
// Module: StrategyBank
// Purpose: Orchestrate the Strategy Bank page and its UX components
// AI Tags: strategy-bank, rich-ux, strategy-reference, filtering, sorting
// ============================================================

import React from "react";
import { Box } from "@mui/material";
import { layoutStyle } from "../../ux/styles";
import { useUser } from "../../core/access/userContext";
import PageHeader from "./components/PageHeader";
import KpiCards from "./components/KpiCards";
import FilterToolbar from "./components/FilterToolbar";
import StrategyTable from "./components/StrategyTable";
import LegendPanel from "./components/LegendPanel";
import useStrategyBank from "./hooks/useStrategyBank";

export default function StrategyBank() {
  // Load the current game context.
  const { userInfo } = useUser();
  const gameId = userInfo?.gameId;

  // Load Strategy Bank data, filters, sorting and derived values.
  const {
    filteredRows,
    kpis,
    choiceGroups,
    loading,
    error,
    search,
    setSearch,
    choice,
    setChoice,
    sort,
    setSort,
  } = useStrategyBank(gameId);

  // Handle sorting requested from table column headers.
  const handleHeaderSort = (key) => {
    if (key === "impact") {
      setSort(sort === "impact-desc" ? "impact-asc" : "impact-desc");
    } else if (key === "Implied_Cost") {
      setSort(sort === "budget-desc" ? "budget-asc" : "budget-desc");
    } else if (key === "Duration_Month") {
      setSort("duration-desc");
    }
  };

  // Render the Strategy Bank page sections.
  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        <PageHeader />
        <KpiCards kpis={kpis} />

        {/* Provide search, group filtering and sorting controls. */}
        <FilterToolbar
          search={search}
          onSearchChange={setSearch}
          choice={choice}
          onChoiceChange={setChoice}
          choiceGroups={choiceGroups}
          sort={sort}
          onSortChange={setSort}
        />

        {/* Display the filtered Strategy Bank reference data. */}
        <Box sx={layoutStyle.section}>
          <StrategyTable
            rows={filteredRows}
            onHeaderSort={handleHeaderSort}
            loading={loading}
            error={error}
          />
        </Box>

        {/* Explain the meaning of Strategy Bank indicators. */}
        <LegendPanel />
      </Box>
    </Box>
  );
}