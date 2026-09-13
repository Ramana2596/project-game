// Component: StSearchBox — fixed-width search input
// Purpose: independent block sitting alongside the message box and filter chips
// Author/Version: OpsMgt UX Lab / v1.0

import React from "react";
import PropTypes from "prop-types";
import { InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { colors } from "../../../ux/styles";

const SEARCH_WIDTH = 200;
const SEARCH_HEIGHT = 36;

const StSearchBox = ({ searchTerm, onSearchChange }) => {
  const handleInput = (event) => onSearchChange(event.target.value);

  return (
    <TextField
      size="small"
      placeholder="Search by Strategy or Benefit..."
      value={searchTerm}
      onChange={handleInput}
      sx={{
        width: SEARCH_WIDTH,
        flexShrink: 0,
        background: colors.paper,
        borderRadius: 2,
        "& .MuiInputBase-root": { height: SEARCH_HEIGHT },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: colors.border || "#d1d5db",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon sx={{ fontSize: 16, color: colors.muted }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

StSearchBox.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default StSearchBox;
export { SEARCH_WIDTH, SEARCH_HEIGHT };