
// File: FinCFTakeaways.jsx
// Module: FinCF
// Purpose: Display cash-flow line insights with clear status comments.

import React from "react";
import {
    Box,
    Card,
    CardContent,
    Skeleton,
    Stack,
    Typography,
    Chip,
} from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import { cardStyle, masterTypo } from "../../../ux/styles";
import { status, surface, text, border } from "../../../ux/styles/colorPalette";

// Assign semantic colors, icons and concise status comments.
const STATUS_STYLES = {
    success: {
        color: status.success,
        background: surface.panelAlt,
        Icon: CheckCircleOutlineOutlinedIcon,
        label: "Positive",
    },
    warning: {
        color: status.warning,
        background: surface.panelAlt,
        Icon: WarningAmberOutlinedIcon,
        label: "Review needed",
    },
    error: {
        color: status.error,
        background: surface.panelAlt,
        Icon: WarningAmberOutlinedIcon,
        label: "Attention",
    },
    info: {
        color: status.info,
        background: surface.panel,
        Icon: InfoOutlinedIcon,
        label: "No positive flow",
    },
    unknown: {
        color: text.subtitle,
        background: surface.panel,
        Icon: InfoOutlinedIcon,
        label: "Unavailable",
    },
};

// Match statement insight types to recognizable icons.
const INSIGHT_ICONS = {
    best: TrendingUpOutlinedIcon,
    worst: WarningAmberOutlinedIcon,
    operating: AccountBalanceWalletOutlinedIcon,
    movement: SwapVertOutlinedIcon,
    closing: PaymentsOutlinedIcon,
    investing: TrendingUpOutlinedIcon,
    financing: AccountBalanceWalletOutlinedIcon,
};

// Render insight cards with statement-line titles and colored status chips.
const FinCFTakeaways = ({ insights = [], loading = false }) => {
    if (loading) {
        return (
            <Box sx={{ mb: 2.5 }}>
                <Typography
                    sx={{
                        ...masterTypo.h6,
                        color: text.title,
                        fontWeight: 800,
                        mb: 1.5,
                    }}
                >
                    Cash Flow Insights
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "repeat(2, minmax(0, 1fr))",
                        },
                        gap: 1.5,
                    }}
                >
                    {[1, 2].map((item) => (
                        <Card key={item} sx={cardStyle.primary}>
                            <CardContent sx={cardStyle.content}>
                                <Skeleton variant="text" width="45%" />
                                <Skeleton variant="text" width="95%" />
                                <Skeleton variant="text" width="75%" />
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>
        );
    }

    if (!insights.length) return null;

    return (
        <Box sx={{ mb: 2.5 }}>
            <Typography
                sx={{
                    ...masterTypo.h6,
                    color: text.title,
                    fontWeight: 800,
                    mb: 1.5,
                }}
            >
                Cash Flow Insights
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, minmax(0, 1fr))",
                    },
                    gap: 1.5,
                }}
            >
                {insights.map((item) => {
                    const style =
                        STATUS_STYLES[item.status] || STATUS_STYLES.unknown;
                    const StatusIcon = style.Icon;
                    const TitleIcon =
                        INSIGHT_ICONS[item.id] || InfoOutlinedIcon;

                    return (
                        <Card
                            key={item.id}
                            sx={{
                                ...cardStyle.primary,
                                minWidth: 0,
                                height: "100%",
                                border: 1,
                                borderColor: border.default,
                            }}
                        >
                            <CardContent
                                sx={{
                                    ...cardStyle.content,
                                    p: 2,
                                    "&:last-child": { pb: 2 },
                                }}
                            >
                                <Stack spacing={1.25}>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={1}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                width: 34,
                                                height: 34,
                                                flexShrink: 0,
                                                borderRadius: 2,
                                                color: style.color,
                                                bgcolor: style.background,
                                            }}
                                        >
                                            <TitleIcon fontSize="small" />
                                        </Box>

                                        <Typography
                                            sx={{
                                                ...masterTypo.body2,
                                                color: text.heading,
                                                fontWeight: 800,
                                                flex: 1,
                                                minWidth: 0,
                                            }}
                                        >
                                            {item.title}
                                        </Typography>

                                        <Chip
                                            icon={<StatusIcon />}
                                            label={style.label}
                                            size="small"
                                            sx={{
                                                flexShrink: 0,
                                                color: style.color,
                                                border: 1,
                                                borderColor: style.color,
                                                bgcolor: style.background,
                                                fontWeight: 700,
                                                "& .MuiChip-icon": {
                                                    color: style.color,
                                                },
                                            }}
                                        />
                                    </Stack>

                                    <Typography
                                        sx={{
                                            ...masterTypo.body2,
                                            color: text.body,
                                            overflowWrap: "anywhere",
                                        }}
                                    >
                                        {item.text}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    );
                })}
            </Box>
        </Box>
    );
};

export default FinCFTakeaways;
