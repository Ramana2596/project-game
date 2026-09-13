// Component: StToolbar — search + enabler filter row
// Purpose: stateless toolbar for strategy roster
// Author/Version: OpsMgt UX Lab / v1.0

import React from "react";
import PropTypes from "prop-types";
import { Chip, InputAdornment, Stack, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { BUSINESS_ENABLER } from "../constants/constants";
import { colors, layoutStyle } from "../../../ux/styles";

const ALL_KEY = "ALL";

const StToolbar = ({ availableEnablers, enablerFilter, searchTerm, onEnablerChange, onSearchChange }) => {
  // Handlers
  const handleSearchInput = (event) => onSearchChange(event.target.value);
  const handleChipClick = (key) => () => onEnablerChange(key);

  // Render
  return (
    <Stack sx={layoutStyle.toolbar}>
      {/* Search box */}
      <TextField
        size="small"
        placeholder="Search strategy or benefit…"
        value={searchTerm}
        onChange={handleSearchInput}
        sx={{ minWidth: 260, background: colors.paper, borderRadius: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlinedIcon sx={{ fontSize: 18, color: colors.muted }} />
            </InputAdornment>
          ),
        }}
      />

      {/* Filter chips */}
      <Stack direction="row" spacing={1} flexWrap="wrap">
        <Chip
          label="All"
          onClick={handleChipClick(ALL_KEY)}
          sx={{
            fontWeight: 600,
            background: enablerFilter === ALL_KEY ? colors.primary : colors.panel,
            color: enablerFilter === ALL_KEY ? colors.white : colors.subtitle,
          }}
        />
        {availableEnablers.map((key) => {
          const enabler = BUSINESS_ENABLER[key];
          const accent = colors[enabler?.colorToken] || colors.primary;
          const isActive = enablerFilter === key;
          return (
            <Chip
              key={key}
              label={key}
              onClick={handleChipClick(key)}
              sx={{
                fontWeight: 600,
                background: isActive ? accent : `${accent}14`,
                color: isActive ? colors.white : accent,
              }}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

StToolbar.propTypes = {
  availableEnablers: PropTypes.array.isRequired,
  enablerFilter: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onEnablerChange: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default StToolbar;
