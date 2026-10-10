
/**
 * Component Name: FinISHeader
 * Module: Finance / FinIS
 * Purpose: Centred page title, session context and cut-off month control.
 * Author/Version: UXLab / v1.1
 * AI Tags: income-statement, centred-header, calendar, month-picker
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
import { formatMonthLabel } from "../utils/finISFormatters";

// Compact calendar control.
const iconControlSx = {
    ...buttonStyle.icon,
    bgcolor: surface.panelAlt,
    color: text.heading,
    borderRadius: 2,
    width: 32,
    height: 32,
    flexShrink: 0,
};

export default function FinISHeader({
    gameId,
    gameBatch,
    gameTeam,
    productionMonth,
    onMonthChange,
}) {
    const [anchor, setAnchor] = useState(null);

    const monthText = productionMonth
        ? formatMonthLabel(productionMonth)
        : "All periods";

    const subtitle = productionMonth
        ? `Revenue, Expenses and Profit, up to ${monthText}.`
        : "Revenue, Expenses and Profit, all periods.";

    // Apply the selected month and close the calendar.
    const handleMonthChange = (event) => {
        const value = event.target.value;
        if (!value) return;
        onMonthChange(value);
        setAnchor(null);
    };

    // Clear the cut-off month and display all periods.
    const handleAllPeriods = () => {
        onMonthChange(null);
        setAnchor(null);
    };

    return (
        <Box sx={{ mb: 1.5 }}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr)",
                    },
                    alignItems: "center",
                    gap: 1,
                }}
            >
                {/* Keep session context on the left to balance the centred heading. */}
                <Box
                    sx={{
                        minWidth: 0,
                        justifySelf: { xs: "center", md: "start" },
                        order: { xs: 2, md: 1 },
                    }}
                >
                    <Typography
                        sx={{
                            ...masterTypo.caption,
                            color: text.secondary,
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        {gameId ?? "—"} / {gameBatch ?? "—"} / {gameTeam ?? "—"}
                    </Typography>
                </Box>

                {/* Centre the title and subtitle independently of the right-side controls. */}
                <Box
                    sx={{
                        minWidth: 0,
                        textAlign: "center",
                        order: { xs: 1, md: 2 },
                    }}
                >
                    <Typography
                        component="h1"
                        sx={{
                            ...masterTypo.h3,
                            color: brand.primary,
                            lineHeight: 1.2,
                        }}
                    >
                        Income Statement
                    </Typography>
                    <Typography
                        sx={{
                            ...masterTypo.body2,
                            color: text.secondary,
                        }}
                    >
                        {subtitle}
                    </Typography>
                </Box>

                {/* Keep month and calendar controls aligned to the right. */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { xs: "center", md: "flex-end" },
                        gap: 1,
                        minWidth: 0,
                        order: { xs: 3, md: 3 },
                    }}
                >
                    <Typography
                        sx={{
                            ...masterTypo.h6,
                            color: brand.primary,
                            lineHeight: 1.2,
                            whiteSpace: "nowrap",
                        }}
                    >
                        {monthText}
                    </Typography>

                    <IconButton
                        sx={iconControlSx}
                        aria-label="Change reporting month"
                        onClick={(event) => setAnchor(event.currentTarget)}
                    >
                        <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                </Box>
            </Box>

            {/* Close the popover after month selection or switching to all periods. */}
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
                        value={productionMonth || ""}
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