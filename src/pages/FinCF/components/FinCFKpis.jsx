// Component Name : FinCFKpis
// Module         : FinCF (Cash Flow Statement)
// Purpose        : Render five key cash-flow KPI measures in the same card style as FinISKpis
// Author/Version : UXLab V2.0 (aligned with FinISKpis)
// AI Tags        : cash-flow, kpi, operating, investing, financing, closing-cash

import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import { cardStyle, masterTypo } from "../../../ux/styles";
import { accent, brand, status, text } from "../../../ux/styles/colorPalette";
import { formatAmount } from "../utils/finCFFormatters";

// Icon, short label and accent for each cash-flow measure
const STAT_CARDS = {
    operating: { label: "Operations", Icon: AccountBalanceWalletRoundedIcon, color: accent.teal },
    investing: { label: "Investing", Icon: TrendingUpRoundedIcon, color: accent.blue },
    financing: { label: "Financing", Icon: AccountBalanceRoundedIcon, color: accent.purple },
    net: { label: "Net Cash Flow", Icon: SwapVertRoundedIcon, color: accent.indigo },
    closing: { label: "Closing Cash", Icon: PaymentsRoundedIcon, color: accent.orange },
};

// Convert a raw value to a finite number, or null
const toNumber = (value) => {
    if (value === null || value === undefined || value === "") return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
};

// Optional change versus previous period, shown as a percentage
const formatChange = (value) => {
    const n = toNumber(value);
    if (n === null) return "";
    return `${n >= 0 ? "+" : ""}${n.toFixed(1)}%`;
};

const FinCFKpis = ({ kpis = [], loading = false }) => {
    if (!loading && !kpis.length) return null;

    // Bars are scaled to the largest absolute flow so cards compare at a glance
    const maxAbs = Math.max(
        1,
        ...kpis.map((k) => Math.abs(toNumber(k.value) ?? 0))
    );

    return (
        <Box>
            {/* KPI section header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    mb: 0.75,
                }}
            >
                <Typography sx={{ ...masterTypo.cardH5, color: text.title }}>
                    Cash Flow Summary
                </Typography>
                <Typography sx={{ ...masterTypo.caption, color: text.subtitle }}>
                    Bars scaled to largest flow
                </Typography>
            </Box>

            {/* KPI cards */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "repeat(2, minmax(0, 1fr))",
                        md: "repeat(3, minmax(0, 1fr))",
                        lg: "repeat(5, minmax(0, 1fr))",
                    },
                    gap: 1,
                    width: "100%",
                    mb: 2,
                }}
            >
                {kpis.map((kpi) => {
                    const card = STAT_CARDS[kpi.id] || {};
                    const Icon = card.Icon || AccountBalanceWalletRoundedIcon;
                    const value = toNumber(kpi.value);
                    const hasValue = value !== null;
                    const isNegative = hasValue && value < 0;

                    // Share of the largest flow, drawn as the reference bar
                    const shareWidth = hasValue ? Math.min((Math.abs(value) / maxAbs) * 100, 100) : 0;
                    const barColor = isNegative ? status.error : card.color || brand.primary;

                    const change = toNumber(kpi.change);
                    const changeColor =
                        change === null ? text.subtitle : change >= 0 ? accent.teal : accent.orange;

                    return (
                        <Box
                            key={kpi.id}
                            sx={{
                                ...cardStyle.statCard,
                                p: 1.1,
                                borderRadius: 2.5,
                                minWidth: 0,
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                                {/* KPI icon */}
                                <Box
                                    sx={{
                                        ...cardStyle.statIconCircle(card.color || accent.purple),
                                        width: 34,
                                        height: 34,
                                        minWidth: 34,
                                        "& svg": { fontSize: 18, color: text.white },
                                    }}
                                >
                                    <Icon />
                                </Box>

                                {/* KPI label + value */}
                                <Box sx={{ minWidth: 0, flex: 1 }}>
                                    <Typography
                                        title={kpi.label}
                                        sx={{
                                            ...masterTypo.caption,
                                            color: text.subtitle,
                                            fontWeight: 600,
                                            lineHeight: 1.2,
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        {card.label || kpi.label}
                                    </Typography>

                                    {loading ? (
                                        <Skeleton variant="text" width="80%" height={28} />
                                    ) : (
                                        <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75, mt: 0.35 }}>
                                            <Typography
                                                sx={{
                                                    ...masterTypo.h6,
                                                    color: isNegative ? status.error : text.title,
                                                    lineHeight: 1.15,
                                                    fontVariantNumeric: "tabular-nums",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {hasValue ? formatAmount(value) : "—"}
                                            </Typography>

                                            {change !== null && (
                                                <Typography
                                                    sx={{
                                                        ...masterTypo.caption,
                                                        color: changeColor,
                                                        fontWeight: 700,
                                                        lineHeight: 1.15,
                                                        fontVariantNumeric: "tabular-nums",
                                                    }}
                                                >
                                                    {formatChange(change)}
                                                </Typography>
                                            )}
                                        </Box>
                                    )}
                                </Box>
                            </Box>

                            {/* Reference bar: share of the largest flow */}
                            <Box
                                sx={{
                                    mt: 1,
                                    height: 5,
                                    borderRadius: 999,
                                    backgroundColor: accent.primarySoft,
                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: loading ? "0%" : `${shareWidth}%`,
                                        height: "100%",
                                        borderRadius: 999,
                                        background: barColor,
                                        transition: "width 0.3s ease",
                                    }}
                                />
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default FinCFKpis;