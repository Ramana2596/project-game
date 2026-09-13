// Component: StFilterChips — filter strip for enablers
// Purpose: Show "All" + distinct enabler chips

// 📦 Imports
import React from "react";
import PropTypes from "prop-types";
import { Chip, Stack } from "@mui/material";
import { BUSINESS_ENABLER } from "../constants/constants";
import { colors } from "../../../ux/styles";

// 🔑 Constants
const ALL_KEY = "ALL";              // Special key for "All"
const FILTER_WIDTH = 260;           // Strip width
const FILTER_HEIGHT = 36;           // Strip height

// 🎯 Component
const StFilterChips = ({ availableEnablers, enablerFilter, onEnablerChange }) => {
  // Handle chip click → call parent
  const handleChipClick = (key) => () => onEnablerChange(key);

  // Render strip with "All" + enabler chips
  return (
    <Stack
      direction="row"               // Horizontal layout
      alignItems="center"           // Center vertically
      spacing={0.75}                // Gap between chips
      sx={{
        width: FILTER_WIDTH,
        height: FILTER_HEIGHT,
        flexShrink: 0,
        flexWrap: "nowrap",
        overflowX: "auto",          // Scroll if overflow
        border: `1px solid ${colors.border || "#d1d5db"}`,
        borderRadius: 2,
        px: 1,
        background: colors.paper || "#ffffff",
      }}
    >
      {/* "All" chip */}
      <Chip
        size="small"
        label="All"
        onClick={handleChipClick(ALL_KEY)}
        sx={{
          fontWeight: 600,
          flexShrink: 0,
          background: enablerFilter === ALL_KEY ? colors.primary : "transparent",
          color: enablerFilter === ALL_KEY ? colors.white : colors.subtitle,
          border: enablerFilter === ALL_KEY ? "none" : `1px solid ${colors.border || "#d1d5db"}`,
        }}
      />

      {/* Enabler chips */}
      {availableEnablers.map((key) => {
        const enabler = BUSINESS_ENABLER[key];              // Lookup enabler details
        const accent = colors[enabler?.colorToken] || colors.primary; // Accent color
        const isActive = enablerFilter === key;             // Active check

        return (
          <Chip
            key={key}
            size="small"
            label={key}
            onClick={handleChipClick(key)}
            sx={{
              fontWeight: 600,
              flexShrink: 0,
              background: isActive ? accent : `${accent}14`,
              color: isActive ? colors.white : accent,
            }}
          />
        );
      })}
    </Stack>
  );
};

// 📋 Prop validation
StFilterChips.propTypes = {
  availableEnablers: PropTypes.array.isRequired,   // Keys to display
  enablerFilter: PropTypes.string.isRequired,      // Current active filter
  onEnablerChange: PropTypes.func.isRequired,      // Callback on change
};

// 🚀 Exports
export default StFilterChips;
export { FILTER_WIDTH, FILTER_HEIGHT };
