
/**
 * Component Name: FinCFHeader
 * Module: Finance / FinCF
 * Purpose: Centre the cash-flow title with compact reporting-period controls.
 * Author/Version: UXLab / v1.1
 * AI Tags: cash flow, centred header, month picker, calendar
 */

import React, { useState, useEffect } from "react";
import {
    Box,
    Button,
    IconButton,
    Popover,
    TextField,
    Typography,
    Stack,
} from "@mui/material";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { buttonStyle, masterTypo } from "../../../ux/styles";
import { brand, surface, text, border } from "../../../ux/styles/colorPalette";
import { formatMonthLabel } from "../utils/finCFFormatters";

// Match the compact calendar control used by FinBSHeader.
const iconControlSx = {
    ...buttonStyle.icon,
    bgcolor: surface.panelAlt,
    color: text.heading,
    borderRadius: 2,
    width: 32,
    height: 32,
    flexShrink: 0,
};

// Render a centred title with balanced left and right header zones.
export default function FinCFHeader({
    gameId,
    gameBatch,
    gameTeam,
    productionMonth,
    onMonthChange,
    onRefresh,
}) {
    const [anchor, setAnchor] = useState(null);
    const [draftMonth, setDraftMonth] = useState(productionMonth || "");

    // Keep the month picker synchronized with the active reporting period.
    useEffect(() => {
        setDraftMonth(productionMonth || "");
    }, [productionMonth]);

    const monthText = productionMonth
        ? formatMonthLabel(productionMonth)
        : "All periods";

    // Apply the selected month and close the picker.
    const handleMonthChange = (event) => {
        const value = event.target.value;
        setDraftMonth(value);

        if (value) {
            onMonthChange?.(value);
            setAnchor(null);
        }
    };

    // Clear the month filter and show all available periods.
    const handleAllPeriods = () => {
        setDraftMonth("");
        onMonthChange?.(null);
        setAnchor(null);
    };

    return (
        <Box sx={{ mb: 2.5 }}>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr)",
                    },
                    alignItems: "center",
                    gap: 1.5,
                }}
            >
                {/* Left: game session context. */}
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
                            color: text.muted,
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        {gameId ?? "—"} / {gameBatch ?? "—"} / {gameTeam ?? "—"}
                    </Typography>
                </Box>

                {/* Centre: statement icon and title. */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    sx={{
                        minWidth: 0,
                        order: { xs: 1, md: 2 },
                    }}
                >
                    <AccountBalanceWalletOutlinedIcon
                        sx={{
                            color: brand.primary,
                            fontSize: 25,
                            flexShrink: 0,
                        }}
                    />
                    <Typography
                        component="h1"
                        sx={{
                            ...masterTypo.h5,
                            color: text.title,
                            fontWeight: 800,
                            textAlign: "center",
                            whiteSpace: { xs: "normal", md: "nowrap" },
                        }}
                    >
                        Cash Flow Statement
                    </Typography>
                </Stack>

                {/* Right: selected month, calendar and refresh controls. */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent={{ xs: "center", md: "flex-end" }}
                    spacing={1}
                    sx={{
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
                        onClick={(event) => {
                            setDraftMonth(productionMonth || "");
                            setAnchor(event.currentTarget);
                        }}
                    >
                        <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
                    </IconButton>

                    {onRefresh && (
                        <IconButton
                            sx={iconControlSx}
                            aria-label="Refresh cash flow statement"
                            onClick={onRefresh}
                        >
                            <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    )}
                </Stack>
            </Box>

            {/* Month picker: choose a cut-off month or show all periods. */}
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
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            border: 1,
                            borderColor: border.default,
                            borderRadius: 2,
                            bgcolor: surface.card,
                        },
                    },
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
                        fullWidth
                        size="small"
                        type="month"
                        label="Up to month"
                        value={draftMonth}
                        onChange={handleMonthChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
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
