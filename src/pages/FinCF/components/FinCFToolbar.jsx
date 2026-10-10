
/**
 * Component Name: FinCFToolbar
 * Module: Finance / FinCF
 * Purpose: Search, view selector, cash-flow group pills and CSV export.
 * Author/Version: UXLab / v1.0
 * AI Tags: toolbar, search, group filter, density, export
 */

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
import { brand, surface, text, border } from "../../../ux/styles/colorPalette";

// Give search a pill shape and use the brand color on focus.
const pillSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "999px",
        bgcolor: surface.card,
        color: text.body,
        "& fieldset": { borderColor: border.default },
        "&:hover fieldset": { borderColor: brand.primaryLight },
        "&.Mui-focused fieldset": { borderColor: brand.primary },
    },
    "& .MuiInputBase-input::placeholder": {
        color: text.muted,
        opacity: 1,
    },
};

// Style Compact and Detailed as one connected segmented selector.
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
        bgcolor: brand.primary,
        color: brand.onPrimary,
    },
    "&:focus-visible": {
        outline: `2px solid ${brand.primary}`,
        outlineOffset: 2,
        zIndex: 1,
    },
};

// Render the Compact Toolbar one-line layout pattern.
export default function FinCFToolbar({
    search = "",
    onSearchChange,
    density = "compact",
    onDensityChange,
    sections = [],
    activeSection = "all",
    onSectionChange,
    onExport,
    onExportCsv,
}) {
    const exportHandler = onExport || onExportCsv;

    // Retain the existing density values and section IDs.
    const viewModes = [
        { key: "compact", label: "Compact" },
        { key: "detailed", label: "Detailed" },
    ];

    const groupFilters = [
        { key: "all", label: "All CF" },
        ...sections.map(({ id, shortLabel, label }) => ({
            key: id,
            label: shortLabel || label,
        })),
    ];

    return (
        <Box
            sx={{
                ...layoutStyle.toolbar,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 1.5,
                mb: 2,
            }}
        >
            {/* Search by cash-flow line description. */}
            <TextField
                size="small"
                placeholder="Search line item…"
                value={search}
                onChange={(event) => onSearchChange?.(event.target.value)}
                inputProps={{ "aria-label": "Search cash-flow line item" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRoundedIcon sx={{ color: text.muted }} />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    ...pillSx,
                    flex: "1 1 200px",
                    maxWidth: 320,
                    minWidth: 180,
                }}
            />

            {/* View selector: Compact and Detailed share one segmented control. */}
            <ToggleButtonGroup
                exclusive
                size="small"
                value={density}
                onChange={(_event, next) => {
                    if (next) onDensityChange?.(next);
                }}
                aria-label="Statement view"
                sx={{ flexShrink: 0 }}
            >
                {viewModes.map(({ key, label }) => (
                    <ToggleButton key={key} value={key} sx={toggleSx}>
                        {label}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>

            {/* Cash-flow group pills with a filled active selection. */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 0.75,
                }}
                role="group"
                aria-label="Cash-flow group"
            >
                {groupFilters.map(({ key, label }) => {
                    const selected = activeSection === key;

                    return (
                        <Button
                            key={key}
                            size="small"
                            aria-pressed={selected}
                            onClick={() => onSectionChange?.(key)}
                            sx={{
                                ...(selected
                                    ? buttonStyle.primary
                                    : buttonStyle.secondary),
                                ...buttonStyle.compact,
                                borderRadius: "999px",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {label}
                        </Button>
                    );
                })}
            </Box>

            {/* Keep export at the right edge when space allows. */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    ml: "auto",
                }}
            >
                <Button
                    sx={{
                        ...buttonStyle.secondary,
                        ...buttonStyle.compact,
                        borderRadius: "999px",
                        whiteSpace: "nowrap",
                    }}
                    onClick={exportHandler}
                    disabled={!exportHandler}
                    startIcon={<FileDownloadRoundedIcon />}
                >
                    Export CSV
                </Button>
            </Box>
        </Box>
    );
}