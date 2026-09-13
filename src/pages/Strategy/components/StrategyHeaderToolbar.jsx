// Component container / parent row layout for StBanner, StFilterChips, and StSearchBox
// Purpose: Full-width responsive layout aligning filter and search seamlessly alongside the StBudget card column.

import React from "react";
import { Box } from "@mui/material";
import StBanner from "./StBanner";
import StFilterChips from "./StFilterChips";
import StSearchBox from "./StSearchBox";

const StrategyHeaderToolbar = ({
  severity = "info",
  bannerMessage,
  availableEnablers,
  enablerFilter,
  onEnablerChange,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", lg: "row" },
        alignItems: { xs: "stretch", lg: "center" },
        justifyContent: "space-between",
        gap: 2,
        mb: 2,
      }}
    >
      {/* Banner takes available space or full width on mobile */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <StBanner severity={severity}>{bannerMessage}</StBanner>
      </Box>

      {/* Right-aligned group containing filters and search, matching the StBudget card alignment */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          gap: 1.5,
          flexShrink: 0,
        }}
      >
        <StFilterChips
          availableEnablers={availableEnablers}
          enablerFilter={enablerFilter}
          onEnablerChange={onEnablerChange}
        />
        <StSearchBox
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
      </Box>
    </Box>
  );
};

export default StrategyHeaderToolbar;