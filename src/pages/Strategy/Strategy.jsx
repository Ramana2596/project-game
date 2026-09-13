// Component: Strategy — top-level page for Strategy Plan
// Purpose: orchestrates UI components, delegates logic to useStrategy
// Author/Version: OpsMgt UX Lab / v1.2

import React from "react";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import StHeader from "./components/StHeader";
import StToolbar from "./components/StToolbar";
import StGroupList from "./components/StGroupList";
import StBudgetCard from "./cards/StBudgetCard";
import useStrategy from "./hooks/useStrategy";
import { layoutStyle, cardStyle, masterTypo } from "../../ux/styles";

const PAGE_TITLE = "Strategies for You";
const PAGE_SUBTITLE =
  "Review each strategy, weigh the investment against its gain, and decide what to implement .";

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
    outMessage,   // banner message
    sucValue,     // success/failure code
    error,
  } = useStrategy();

  return (
    <Box sx={layoutStyle.root}>
      <Box sx={layoutStyle.pageContainer}>
        {/* Header */}
        <Box sx={layoutStyle.section}>
          <StHeader title={PAGE_TITLE} subtitle={PAGE_SUBTITLE} />
        </Box>

        {/* Error state */}
        {error && (
          <Typography sx={masterTypo.body1} color="error">
            Error loading strategies
          </Typography>
        )}

        {/* Banner always */}
        {outMessage && (
          <Box sx={cardStyle.banner}>
            <Box sx={cardStyle.bannerIconCircle}>
              <InfoIcon />
            </Box>
            <Typography sx={masterTypo.body1}>{outMessage}</Typography>
          </Box>
        )}

        {/* Show workspace only if success */}
        {sucValue === 0 ? (
          isLoading ? (
            // Loading skeletons
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Stack spacing={2}>
                  {[0, 1, 2].map((i) => (
                    <Skeleton
                      key={i}
                      variant="rounded"
                      height={140}
                      sx={{ borderRadius: 5 }}
                    />
                  ))}
                </Stack>
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
            // Main workspace
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

              {/* Budget roll-up */}
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
