// ============================================================
// LEAP V1.1
// File : LeapToolbar.jsx
// Purpose : Display premium LEAP content filter toolbar
// SEO    : LEAP Toolbar, Learn Help Toolbar, Section Filter
// ============================================================

import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Chip,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { colors } from "../../../ux/styles";
import { LEAP_SECTION_ORDER } from "../constants/leapConstants";
import { getContentType } from "../constants/leapContentTypes";

// ============================================================
// Component
// ============================================================

export default function LeapToolbar({
  selectedType,
  availableTypes,
  onTypeChange,
}) {

  const types = availableTypes || [];
 // Search feature temporarily disabled 
  const showSearch = false;

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        px: 3,
        py: 2,
        bgcolor: colors.backgroundPaper,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >

      {/* Toolbar layout */}
      <Stack
        spacing={2}
      >

        {/* Search box */}
        {showSearch && (
          <TextField
            fullWidth
            size="small"
            placeholder="Search learning resources..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    sx={{
                      color: colors.textSecondary,
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
        )}

        {/* Content type filter */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            overflowX: "auto",
            pb: 0.5,
            "&::-webkit-scrollbar": {
              height: 6,
            },
          }}
        >

          {/* All filter */}
          <Chip
            label="All"
            clickable
            color={selectedType === "ALL" ? "primary" : "default"}
            onClick={() => onTypeChange("ALL")}
            sx={{
              borderRadius: 5,
              fontWeight: 600,
              flexShrink: 0,
            }}
          />

          {/* Available content types */}
          {LEAP_SECTION_ORDER
            .filter((type) => types.includes(type))
            .map((type) => {
              const config = getContentType(type);

              return (
                <Chip
                  key={type}
                  label={config.title}
                  clickable
                  color={selectedType === type ? "primary" : "default"}
                  onClick={() => onTypeChange(type)}
                  sx={{
                    borderRadius: 5,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                />
              );
            })}

        </Stack>

      </Stack>

    </Box>
  );
}

// ============================================================
// Component Props
// ============================================================

LeapToolbar.propTypes = {
  selectedType: PropTypes.string.isRequired,
  availableTypes: PropTypes.arrayOf(
    PropTypes.string
  ).isRequired,
  onTypeChange: PropTypes.func.isRequired,
};