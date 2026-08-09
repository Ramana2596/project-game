/**
 * Component Name : Strategy
 * Module         : Strategy
 * Purpose        : Top-level page for the Strategy Plan ("Strategies for
 *                   You") screen. Replaces the legacy flat-table decision
 *                   grid with a rich, groupable decision UX. Orchestrates
 *                   reusable components (StHeader, StToolbar,
 *                   StGroupList, StBudgetCard) and delegates
 *                   all business logic to useStrategy, per Front-End
 *                   Coding Standards Section 4 (Separation of Responsibilities).
 * Author/Version : OpsMgt UX Lab / v1.0
 * AI Tags        : strategy, page, orchestration, decision, budget
 */

// --------------------------------------------------------------
// Imports
// --------------------------------------------------------------
import React from "react";
import { Box, Grid, Skeleton, Stack } from "@mui/material";
import StHeader from "./components/StHeader";
import StToolbar from "./components/StToolbar";
import StGroupList from "./components/StGroupList";
import StBudgetCard from "./cards/StBudgetCard";
import useStrategy from "./hooks/useStrategy";
import { layoutStyle } from "../../styles/ux";

// --------------------------------------------------------------
// Constants
// --------------------------------------------------------------
const PAGE_TITLE = "Strategies for You";
const PAGE_SUBTITLE = "Review each strategy, weigh the investment against its gain, and decide what to implement this quarter.";

/**
 * Strategy
 * Page component — no local state beyond what useStrategy exposes.
 */
const Strategy = () => {
  // ------------------------------------------------------------
  // State / Derived Values — sourced entirely from useStrategy
  // ------------------------------------------------------------
  const {
    groupedStrategies,
    decisions,
    availableEnablers,
    budgetSummary,
    enablerFilter,
    searchTerm,
    handleEnablerFilterChange,
    handleSearchChange,
    handleToggleDecision,
    handleSelectGroupChoice,
    handleSaveDecisions,
    isLoading,
    isSaving,
  } = useStrategy();

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        {/* Page header */}
        <Box sx={layoutStyle.section}>
          <StHeader title={PAGE_TITLE} subtitle={PAGE_SUBTITLE} />
        </Box>

        {isLoading ? (
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} variant="rounded" height={140} sx={{ borderRadius: 5 }} />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton variant="rounded" height={220} sx={{ borderRadius: 4 }} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {/* Decision workspace */}
            <Grid item xs={12} md={8}>
              <Box sx={layoutStyle.section}>
                <StToolbar
                  availableEnablers={availableEnablers}
                  enablerFilter={enablerFilter}
                  searchTerm={searchTerm}
                  onEnablerChange={handleEnablerFilterChange}
                  onSearchChange={handleSearchChange}
                />
              </Box>
              <StGroupList
                groupedStrategies={groupedStrategies}
                decisions={decisions}
                onToggle={handleToggleDecision}
                onSelect={handleSelectGroupChoice}
              />
            </Grid>

            {/* Sticky budget roll-up */}
            <Grid item xs={12} md={4}>
              <StBudgetCard
                selectedCount={budgetSummary.selectedCount}
                totalCount={budgetSummary.totalCount}
                totalUsd={budgetSummary.totalUsd}
                onSave={handleSaveDecisions}
                isSaving={isSaving}
              />
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Strategy;