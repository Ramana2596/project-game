/**
 * Component Name: FinBSToolbar
 * Module: Finance / FinBS
 * Purpose: Search box, statement group pills, period view selector and CSV export.
 * Author/Version: UXLab / v1.0
 * AI Tags: toolbar, search, filter pills, group filter, period view, export
 */

import React from "react";
import { Box, Button, InputAdornment, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { buttonStyle, layoutStyle } from "../../../ux/styles";
import { brand, surface, text } from "../../../ux/styles/colorPalette";
import { GROUP_FILTERS, VIEW_MODES } from "../constants/finBS.constants";

// Pill-shaped field look with the brand colour on focus
const pillSx = {
  "& .MuiOutlinedInput-root": { borderRadius: "999px", background: surface.paper },
  "& .MuiOutlinedInput-root.Mui-focused fieldset": { borderColor: brand.primary },
  "& .MuiInputLabel-root.Mui-focused": { color: brand.primary },
};

// Segmented Compact / Detailed switch: filled purple when selected
const toggleSx = {
  textTransform: "none",
  fontWeight: 600,
  px: 2,
  borderColor: brand.primary,
  color: brand.primary,
  "&:first-of-type": { borderTopLeftRadius: 999, borderBottomLeftRadius: 999 },
  "&:last-of-type": { borderTopRightRadius: 999, borderBottomRightRadius: 999 },
  "&.Mui-selected, &.Mui-selected:hover": { background: brand.primary, color: text.white },
};

export default function FinBSToolbar({ search, onSearch, view, onView, group, onGroup, onExport, disabled }) {
  // Render
  return (
    <Box sx={{ ...layoutStyle.toolbar, mb: 0 }}>
      {/* Search by line item name */}
      <TextField
        size="small"
        placeholder="Search line item…"
        value={search}
        onChange={(event) => onSearch(event.target.value)}
        inputProps={{ "aria-label": "Search line item" }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchRoundedIcon sx={{ color: text.muted }} />
            </InputAdornment>
          ),
        }}
        sx={{ ...pillSx, flex: "1 1 260px", maxWidth: 380 }}
      />

      {/* View: Compact (totals and subtotals) or Detailed (every line) */}
      <ToggleButtonGroup
        exclusive
        size="small"
        value={view}
        onChange={(event, next) => next && onView(next)}
        aria-label="Statement view"
      >
        {VIEW_MODES.map(({ key, label }) => (
          <ToggleButton key={key} value={key} sx={toggleSx}>
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Statement group pills: the active pill is filled */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }} role="group" aria-label="Statement group">
        {GROUP_FILTERS.map(({ key, label }) => (
          <Button
            key={key}
            sx={{ ...(group === key ? buttonStyle.primary : buttonStyle.secondary), ...buttonStyle.compact }}
            aria-pressed={group === key}
            onClick={() => onGroup(key)}
          >
            {label}
          </Button>
        ))}
      </Box>

      {/* Export, pushed to the right */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, ml: "auto" }}>
        <Button
          sx={{ ...buttonStyle.secondary, ...buttonStyle.compact }}
          onClick={onExport}
          disabled={disabled}
          startIcon={<FileDownloadRoundedIcon />}
        >
          Export CSV
        </Button>
      </Box>
    </Box>
  );
}