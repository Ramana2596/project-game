// Component Name : FinISToolbar
// Module         : FinIS (Income Statement)
// Purpose        : Search box, density toggle, group filter chips and CSV export action
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, toolbar, search, filter, export

import React from "react";
import { Box, TextField, InputAdornment, Button, Chip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { buttonStyle, layoutStyle } from "../../../ux/styles";

// Component: presentational toolbar - all state lives in useFinIS, handlers passed down as props
const FinISToolbar = ({
    search, onSearchChange,
    density, onDensityChange,
    groups, activeGroup, onGroupChange,
    onExportCsv,
}) => {
    return (
        <Box sx={layoutStyle.toolbar}>
            {/* Search line items */}
            <TextField
                size="small"
                placeholder="Search line item..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                sx={{ minWidth: 260 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon fontSize="small" />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Table density toggle */}
            <Box sx={layoutStyle.flexRow}>
                <Button
                    sx={density === "compact" ? buttonStyle.primary : buttonStyle.secondary}
                    onClick={() => onDensityChange("compact")}
                >
                    Compact
                </Button>
                <Button
                    sx={density === "detailed" ? buttonStyle.primary : buttonStyle.secondary}
                    onClick={() => onDensityChange("detailed")}
                >
                    Detailed
                </Button>
            </Box>

            {/* Group filter chips */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                <Chip
                    label="All lines"
                    onClick={() => onGroupChange("all")}
                    sx={activeGroup === "all" ? buttonStyle.tabActive : buttonStyle.tab}
                />
                {groups.map((g) => (
                    <Chip
                        key={g.key}
                        label={g.label}
                        onClick={() => onGroupChange(g.key)}
                        sx={activeGroup === g.key ? buttonStyle.tabActive : buttonStyle.tab}
                    />
                ))}
            </Box>

            {/* Export */}
            <Button startIcon={<FileDownloadIcon />} sx={buttonStyle.secondary} onClick={onExportCsv}>
                Export CSV
            </Button>
        </Box>
    );
};

export default FinISToolbar;
