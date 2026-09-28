// Component Name : FinISToolbar
// Module         : FinIS (Income Statement)
// Purpose        : Search box, density toggle, group filter chips and CSV export action
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, toolbar, search, filter, export

import React from "react";
import {
    Box,
    Button,
    InputAdornment,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import { buttonStyle, layoutStyle } from "../../../ux/styles";
import { brand, surface, text } from "../../../ux/styles/colorPalette";

// Pill-shaped search field
const pillSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "999px",
        background: surface.paper,
    },
    "& .MuiOutlinedInput-root.Mui-focused fieldset": {
        borderColor: brand.primary,
    },
    "& .MuiInputLabel-root.Mui-focused": {
        color: brand.primary,
    },
};

// Segmented Compact / Detailed switch
const toggleSx = {
    textTransform: "none",
    fontWeight: 600,
    px: 2,
    borderColor: brand.primary,
    color: brand.primary,
    "&:first-of-type": {
        borderTopLeftRadius: 999,
        borderBottomLeftRadius: 999,
    },
    "&:last-of-type": {
        borderTopRightRadius: 999,
        borderBottomRightRadius: 999,
    },
    "&.Mui-selected, &.Mui-selected:hover": {
        background: brand.primary,
        color: text.white,
    },
};

// Component: presentational toolbar - all state lives in useFinIS
const FinISToolbar = ({
    search,
    onSearchChange,
    density,
    onDensityChange,
    groups,
    activeGroup,
    onGroupChange,
    onExportCsv,
}) => {
    return (
        <Box
            sx={{
                ...layoutStyle.toolbar,
                mb: 0,
                flexWrap: "nowrap",
            }}
        >
            {/* Search line items */}
            <TextField
                size="small"
                placeholder="Search line item…"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                inputProps={{ "aria-label": "Search line item" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRoundedIcon sx={{ color: text.muted }} />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    ...pillSx,
                    flex: "1 1 220px",
                    maxWidth: 220,
                }}
            />

            {/* Table density */}
            <ToggleButtonGroup
                exclusive
                size="small"
                value={density}
                onChange={(event, next) => next && onDensityChange(next)}
                aria-label="Table density"
            >
                <ToggleButton value="compact" sx={toggleSx}>
                    Compact
                </ToggleButton>
                <ToggleButton value="detailed" sx={toggleSx}>
                    Detailed
                </ToggleButton>
            </ToggleButtonGroup>

            {/* Income statement group filters */}
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    gap: 1,
                    flexShrink: 0,
                }}
                role="group"
                aria-label="Income statement group"
            >
                <Button
                    sx={{
                        ...(activeGroup === "all"
                            ? buttonStyle.primary
                            : buttonStyle.secondary),
                        ...buttonStyle.compact,
                    }}
                    aria-pressed={activeGroup === "all"}
                    onClick={() => onGroupChange("all")}
                >
                    All
                </Button>

                {groups.map((group) => (
                    <Button
                        key={group.key}
                        sx={{
                            ...(activeGroup === group.key
                                ? buttonStyle.primary
                                : buttonStyle.secondary),
                            ...buttonStyle.compact,
                        }}
                        aria-pressed={activeGroup === group.key}
                        onClick={() => onGroupChange(group.key)}
                    >
                        {group.label}
                    </Button>
                ))}
            </Box>

            {/* Export */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    ml: "auto",
                    flexShrink: 0,
                }}
            >
                <Button
                    startIcon={<FileDownloadRoundedIcon />}
                    sx={{
                        ...buttonStyle.secondary,
                        ...buttonStyle.compact,
                    }}
                    onClick={onExportCsv}
                >
                    Export CSV
                </Button>
            </Box>
        </Box>
    );
};

export default FinISToolbar;