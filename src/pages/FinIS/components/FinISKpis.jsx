
// Component Name : FinISKpis
// Module         : FinIS (Income Statement)
// Purpose        : Render six key revenue-flow KPI measures
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, kpi, revenue-flow, profitability

import React from "react";
import { Box, Typography } from "@mui/material";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import { cardStyle, masterTypo } from "../../../ux/styles";
import { accent, text } from "../../../ux/styles/colorPalette";

const STAT_CARDS = {
    grossProfitPct: {
        label: "Gross Profit %",
        Icon: ReceiptLongRoundedIcon,
        color: accent.blue,
    },
    manufacturingOverheadsPct: {
        label: "Mfg OH %",
        Icon: PrecisionManufacturingRoundedIcon,
        color: accent.teal,
    },
    administrativeOverheadsPct: {
        label: "Admn OH + Other %",
        Icon: BusinessRoundedIcon,
        color: accent.purple,
    },
    profitBeforeInterestTaxPct: {
        label: "PBIT %",
        Icon: TrendingUpRoundedIcon,
        color: accent.orange,
    },
    financeCostPct: {
        label: "Finance Cost %",
        Icon: PaymentsRoundedIcon,
        color: accent.blue,
    },
    netProfitPct: {
        label: "Net Profit %",
        Icon: AccountBalanceRoundedIcon,
        color: accent.teal,
    },
};

const formatPercent = (value) => {
    if (
        value === null ||
        value === undefined ||
        !Number.isFinite(Number(value))
    ) {
        return "—";
    }

    return `${Number(value).toFixed(1)}%`;
};

const formatChange = (value) => {
    if (
        value === null ||
        value === undefined ||
        !Number.isFinite(Number(value))
    ) {
        return "—";
    }

    const number = Number(value);

    return `${number >= 0 ? "+" : ""}${number.toFixed(1)}%`;
};

const FinISKpis = ({ kpis }) => {
    if (!kpis?.length) return null;

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
                <Typography
                    sx={{
                        ...masterTypo.cardH5,
                        color: text.title,
                    }}
                >
                    Revenue Flow
                </Typography>

                <Typography
                    sx={{
                        ...masterTypo.caption,
                        color: text.subtitle,
                    }}
                >
                    Revenue = 100%
                </Typography>
            </Box>

            {/* KPI cards */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
                    gap: 1,
                    width: "100%",
                }}
            >
                {kpis.map((kpi) => {
                    const card = STAT_CARDS[kpi.key] || {};
                    const Icon = card.Icon;

                    const value = Number(kpi.value);
                    const shareWidth = Number.isFinite(value)
                        ? Math.min(Math.abs(value), 100)
                        : 0;

                    const changeColor =
                        kpi.change === null ||
                        kpi.change === undefined
                            ? text.subtitle
                            : Number(kpi.change) >= 0
                              ? accent.teal
                              : accent.orange;

                    return (
                        <Box
                            key={kpi.key}
                            sx={{
                                ...cardStyle.statCard,
                                p: 1.1,
                                borderRadius: 2.5,
                                minWidth: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    minWidth: 0,
                                }}
                            >
                                {/* KPI icon */}
                                <Box
                                    sx={{
                                        ...cardStyle.statIconCircle(
                                            card.color || accent.purple
                                        ),
                                        width: 34,
                                        height: 34,
                                        minWidth: 34,
                                        "& svg": {
                                            fontSize: 18,
                                            color: text.white,
                                        },
                                    }}
                                >
                                    {Icon && <Icon />}
                                </Box>

                                {/* KPI label + value */}
                                <Box
                                    sx={{
                                        minWidth: 0,
                                        flex: 1,
                                    }}
                                >
                                    <Typography
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

                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "baseline",
                                            gap: 0.75,
                                            mt: 0.35,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                ...masterTypo.h6,
                                                color: text.title,
                                                lineHeight: 1.15,
                                                fontVariantNumeric:
                                                    "tabular-nums",
                                            }}
                                        >
                                            {formatPercent(kpi.value)}
                                        </Typography>

                                        <Typography
                                            sx={{
                                                ...masterTypo.caption,
                                                color: changeColor,
                                                fontWeight: 700,
                                                lineHeight: 1.15,
                                                fontVariantNumeric:
                                                    "tabular-nums",
                                            }}
                                        >
                                            {formatChange(kpi.change)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* Revenue reference bar */}
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
                                        width: `${shareWidth}%`,
                                        height: "100%",
                                        borderRadius: 999,
                                        background: accent.purple,
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

export default FinISKpis;