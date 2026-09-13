// Component: Strategy — top-level page for Strategy Plan
// Purpose: orchestrates UI components, delegates logic to useStrategy
// Author/Version: OpsMgt UX Lab / v1.8

import React from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import StHeader from "./components/StHeader";
import StBanner from "./components/StBanner";
import StFilterChips from "./components/StFilterChips";
import StSearchBox from "./components/StSearchBox";
import StGroupList from "./components/StGroupList";
import StBudgetCard from "./cards/StBudgetCard";
import useStrategy from "./hooks/useStrategy";

import { layoutStyle } from "../../ux/styles";

const MESSAGE_SLOT_WIDTH = 420;
const MESSAGE_SLOT_HEIGHT = 36;

const PAGE_TITLE = "Strategies for You";
const PAGE_SUBTITLE =
  "Review each strategy, weigh the investment against its gain, and decide what to implement.";

const severityForSucValue = (val) => {
  switch (val) {
    case 0:
      return "success";
    case 1:
      return "warning";
    case -1:
      return "error";
    default:
      return "info";
  }
};

const Strategy = () => {
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
    outMessage,
    sucValue,
    error,
  } = useStrategy();

  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        <StHeader title={PAGE_TITLE} subtitle={PAGE_SUBTITLE} />

        {/* 
          Grid layout aligned precisely with the content columns below:
          - Left column (Banner + Filter chips) aligns with StGroupList.
          - Right column expands StSearchBox to match StBudgetCard's full width edge-to-edge.
        */}
        <Grid container spacing={3} sx={{ mb: 2, alignItems: "center" }}>
          {/* Left Side: Banner and Filter Chips */}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "stretch", sm: "center" },
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", sm: MESSAGE_SLOT_WIDTH },
                  height: MESSAGE_SLOT_HEIGHT,
                  flexShrink: 0,
                }}
              >
                {error && <StBanner severity="error">Error loading strategies</StBanner>}
                {!error && outMessage && (
                  <StBanner severity={severityForSucValue(sucValue)}>{outMessage}</StBanner>
                )}
              </Box>

              <StFilterChips
                availableEnablers={availableEnablers}
                enablerFilter={enablerFilter}
                onEnablerChange={handleEnablerFilterChange}
              />
            </Box>
          </Grid>

          {/* Right Side: SearchBox sized edge-to-edge with StBudgetCard */}
          <Grid item xs={12} md={4}>
            <Box sx={{ width: "100%", "& > *": { width: "100% !important" } }}>
              <StSearchBox searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            </Box>
          </Grid>
        </Grid>

        {sucValue === 0 ? (
          isLoading ? (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {[0, 1, 2].map((i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      height={140}
                      sx={{ borderRadius: 5 }}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Skeleton
                  variant="rounded"
                  height={220}
                  sx={{ borderRadius: 4 }}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <StGroupList
                  groupedStrategies={groupedStrategies}
                  decisions={decisions}
                  onToggle={handleToggleDecision}
                  onSelect={handleSelectGroupChoice}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={layoutStyle.panel}>
                  <StBudgetCard
                    selectedCount={budgetSummary.selectedCount}
                    totalCount={budgetSummary.totalCount}
                    totalAmount={budgetSummary.totalAmount}
                    currency={budgetSummary.currency}
                    onSave={handleSaveDecisions}
                    isSaving={isSaving}
                  />
                </Box>
              </Grid>
            </Grid>
          )
        ) : null}
      </Box>
    </Box>
  );
};

export default Strategy;