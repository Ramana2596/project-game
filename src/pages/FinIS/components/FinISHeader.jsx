/**
 * Component Name: FinISHeader
 * Module: Finance / FinIS
 * Purpose: Page title, session context and cut-off month control.
 * Author/Version: UXLab / v1.0
 * AI Tags: income-statement, header, calendar, month picker
 */

import React, { useState } from "react";
import { Box, IconButton, Popover, TextField, Typography } from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { buttonStyle, masterTypo } from "../../../ux/styles";
import { brand, surface, text } from "../../../ux/styles/colorPalette";
import { formatMonthLabel } from "../utils/finISFormatters";

// Compact calendar control
const iconControlSx = {
    ...buttonStyle.icon,
    background: surface.panelAlt,
    color: text.heading,
    borderRadius: 2,
    width: 32,
    height: 32,
};

// Render
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

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: 32,
                mb: 1.5,
            }}
        >
            {/* Page heading */}
            <Box>
                <Typography
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

            {/* Session and period controls */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <Typography sx={masterTypo.caption}>
                    {gameId} / {gameBatch} / {gameTeam}
                </Typography>

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

                {/* Month popover */}
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
                            onChange={(event) =>
                                onMonthChange(event.target.value || null)
                            }
                            InputLabelProps={{ shrink: true }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 3,
                                },
                            }}
                        />
                    </Box>
                </Popover>
            </Box>
        </Box>
    );
}