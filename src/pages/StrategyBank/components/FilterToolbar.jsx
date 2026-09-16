// ============================================================
// Component: FilterToolbar
// Module: StrategyBank
// Purpose: Provide strategy search, group filter and sort controls
// AI Tags: strategy-bank, filter, search, sort, toolbar
// ============================================================

import React from "react";
import { Box, TextField, InputAdornment, MenuItem, Select } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { layoutStyle, buttonStyle, masterTypo, colors } from "../../../ux/styles";
import { SORT_OPTIONS } from "../constants/constants";

export default function FilterToolbar({
  search,
  onSearchChange,
  choice,
  onChoiceChange,
  choiceGroups,
  sort,
  onSortChange,
}) {
  // Build the available strategy group filters.
  const groups = ["ALL", ...choiceGroups];

  // Render the search, group filter and sort toolbar.
  return (
    <Box sx={layoutStyle.toolbar}>
      {/* Search strategies by name, benefit or enabler. */}
      <TextField
        size="small"
        placeholder="Search strategy, benefit or enabler…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 240, maxWidth: 340, flex: 1 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          ),
          sx: { borderRadius: "999px" },
        }}
      />

      {/* Filter strategies by group. */}
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        {groups.map((g) => {
          const selected = g === choice;

          return (
            <Box
              key={g}
              component="button"
              onClick={() => onChoiceChange(g)}
              sx={{
                ...(selected ? buttonStyle.primary : buttonStyle.secondary),
                height: 36,
                px: 2,
                ...masterTypo.caption,
                color: selected ? "#FFFFFF" : colors.title,
                border: selected ? "none" : buttonStyle.secondary.border,
              }}
            >
              {g === "ALL" ? "All groups" : `Group ${g}`}
            </Box>
          );
        })}
      </Box>

      {/* Sort the displayed strategy list. */}
      <Select
        size="small"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        sx={{
          borderRadius: "999px",
          minWidth: 190,
          ...masterTypo.bodyB1,
          color: colors.title,
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}