
/**
 * Component Name: FinBSHeader
 * Module: Finance / FinBS
 * Purpose: Cut-off month control with automatic popover close on selection.
 * Author/Version: UXLab / v1.1
 * AI Tags: month picker, calendar, cut-off month, header
 */

import React, { useState } from "react";
import {
    Box,
    Button,
    IconButton,
    Popover,
    TextField,
    Typography,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { buttonStyle, masterTypo } from "../../../ux/styles";
import { brand, surface, text } from "../../../ux/styles/colorPalette";
import { formatMonthLabel } from "../utils/formatters";

// Compact calendar control.
const iconControlSx = {
    ...buttonStyle.icon,
    bgcolor: surface.panelAlt,
    color: text.heading,
    borderRadius: 2,
    width: 32,
    height: 32,
};

// Render the selected period and its calendar popover.
export default function FinBSHeader({ month, onMonthChange }) {
    const [anchor, setAnchor] = useState(null);
    const monthText = month ? formatMonthLabel(month) : "All periods";

    // Apply the selected month and close the calendar.
    const handleMonthChange = (event) => {
        const value = event.target.value;
        onMonthChange(value);
        if (value) setAnchor(null);
    };

    // Clear the month filter and close the calendar.
    const handleAllPeriods = () => {
        onMonthChange("");
        setAnchor(null);
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                minHeight: 32,
            }}
        >
            <Typography
                sx={{
                    ...masterTypo.h6,
                    color: brand.primary,
                    lineHeight: 1.2,
                }}
            >
                {monthText}
            </Typography>

            <IconButton
                sx={iconControlSx}
                aria-label="Change month"
                onClick={(event) => setAnchor(event.currentTarget)}
            >
                <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
            </IconButton>

            {/* Month popover: select a cut-off month or show all periods. */}
            <Popover
                open={Boolean(anchor)}
                anchorEl={anchor}
                onClose={() => setAnchor(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        minWidth: 240,
                    }}
                >
                    <TextField
                        size="small"
                        type="month"
                        label="Up to month"
                        value={month || ""}
                        onChange={handleMonthChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 3,
                            },
                        }}
                    />

                    <Button
                        sx={buttonStyle.text}
                        onClick={handleAllPeriods}
                    >
                        Show all periods
                    </Button>
                </Box>
            </Popover>
        </Box>
    );
}