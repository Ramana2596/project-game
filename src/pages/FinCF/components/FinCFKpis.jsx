
// File: FinCFKpis.jsx
// Module: FinCF
// Purpose: Display compact cash-flow KPI cards in a single horizontal row.

import React from "react";
import {
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
    Skeleton,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import SwapVertOutlinedIcon from "@mui/icons-material/SwapVertOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { cardStyle, masterTypo } from "../../../ux/styles";
import { accent, brand, status, text } from "../../../ux/styles/colorPalette";
import { formatAmount } from "../utils/finCFFormatters";

// Map each cash-flow measure to its matching icon.
const KPI_ICONS = {
    operating: AccountBalanceWalletOutlinedIcon,
    investing: TrendingUpOutlinedIcon,
    financing: AccountBalanceOutlinedIcon,
    net: SwapVertOutlinedIcon,
    closing: PaymentsOutlinedIcon,
};

// Select a semantic accent for each KPI and flag negative balances.
const getKpiAccent = (id, value) => {
    if (id === "closing" && value !== null && value < 0) return status.error;
    if (id === "operating" && value !== null && value < 0) return status.warning;

    const accents = {
        operating: accent.teal,
        investing: accent.blue,
        financing: accent.purple,
        net: accent.indigo,
        closing: accent.orange,
    };

    return accents[id] || brand.primary;
};

// Render compact KPI cards with left-aligned icons and no repeated period labels.
const FinCFKpis = ({ kpis = [], loading = false }) => (
    <Box
        sx={{
            display: "grid",
            gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
                lg: "repeat(5, minmax(0, 1fr))",
                xl: "repeat(6, minmax(0, 1fr))",
            },
            gap: 1.5,
            mb: 2.5,
        }}
    >
        {kpis.map((kpi) => {
            const Icon = KPI_ICONS[kpi.id] || AccountBalanceWalletOutlinedIcon;
            const value = kpi.value;
            const hasValue = value !== null && value !== undefined;
            const isNegative = hasValue && value < 0;
            const iconColor = getKpiAccent(kpi.id, value);

            return (
                <Card
                    key={kpi.id}
                    sx={{
                        ...cardStyle.primary,
                        minWidth: 0,
                        height: "100%",
                        borderTop: 3,
                        borderTopColor: iconColor,
                    }}
                >
                    <CardContent
                        sx={{
                            ...cardStyle.content,
                            p: 1.5,
                            "&:last-child": { pb: 1.5 },
                        }}
                    >
                        <Stack
                            direction="row"
                            alignItems="flex-start"
                            spacing={1}
                        >
                            <Box
                                sx={{
                                    ...cardStyle.statIconCircle(iconColor),
                                    flexShrink: 0,
                                    mt: 0.25,
                                }}
                            >
                                <Icon fontSize="small" />
                            </Box>

                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography
                                    sx={{
                                        ...masterTypo.body2,
                                        color: text.subtitle,
                                        fontWeight: 600,
                                        minHeight: "2.8em",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    {kpi.label}
                                </Typography>

                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        width="90%"
                                        height={36}
                                        sx={{ mt: 0.75 }}
                                    />
                                ) : (
                                    <Typography
                                        sx={{
                                            ...masterTypo.h5,
                                            color: isNegative
                                                ? status.error
                                                : text.title,
                                            fontWeight: 800,
                                            fontSize: {
                                                xs: "1.05rem",
                                                xl: "1.15rem",
                                            },
                                            mt: 0.75,
                                            overflowWrap: "anywhere",
                                            fontVariantNumeric: "tabular-nums",
                                        }}
                                    >
                                        {hasValue ? formatAmount(value) : "—"}
                                    </Typography>
                                )}
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            );
        })}
    </Box>
);

export default FinCFKpis;
