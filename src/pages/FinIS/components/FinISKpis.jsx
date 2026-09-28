// Component Name : FinISKpis
// Module         : FinIS (Income Statement)
// Purpose        : Render the KPI stat card row (revenue, gross margin, operating profit, PAT, profit %)
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, kpi, stat-card

import React from "react";
import { Box, Typography } from "@mui/material";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import { cardStyle, masterTypo } from "../../../ux/styles";
import { accent, text } from "../../../ux/styles/colorPalette";
import { formatLineValue } from "../utils/finISFormatters";

// Constants: icon and accent per KPI key.
const STAT_CARDS = {
    revenue: {
        Icon: ReceiptLongRoundedIcon,
        color: accent.blue,
    },
    grossMargin: {
        Icon: TrendingUpRoundedIcon,
        color: accent.teal,
    },
    operatingProfit: {
        Icon: TrendingUpRoundedIcon,
        color: accent.orange,
    },
    profitAfterTax: {
        Icon: TrendingUpRoundedIcon,
        color: accent.purple,
    },
    profitPct: {
        Icon: PercentRoundedIcon,
        color: accent.orange,
    },
};

// Component: presentational KPI card grid, driven entirely by the `kpis` prop.
const FinISKpis = ({ kpis }) => {
    if (!kpis?.length) return null;

    return (
        <Box
            sx={{
                display: "grid",
                gap: 1,
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            }}
        >
            {kpis.map((kpi) => {
                const card = STAT_CARDS[kpi.key] || {};
                const Icon = card.Icon;

                return (
                    <Box
                        key={kpi.key}
                        sx={{
                            ...cardStyle.statCard,
                            p: 1,
                            gap: 1,
                            borderRadius: 2.5,
                        }}
                    >
                        <Box
                            sx={{
                                ...cardStyle.statIconCircle(
                                    card.color || accent.purple
                                ),
                                width: 32,
                                height: 32,
                                minWidth: 32,
                                "& svg": {
                                    fontSize: 18,
                                    color: text.white,
                                },
                            }}
                        >
                            {Icon && <Icon />}
                        </Box>

                        <Box sx={{ minWidth: 0 }}>
                            <Typography
                                sx={{
                                    ...masterTypo.caption,
                                    color: text.subtitle,
                                    lineHeight: 1.15,
                                }}
                            >
                                {kpi.label}
                            </Typography>

                            <Typography
                                sx={{
                                    ...masterTypo.h6,
                                    color: text.title,
                                    lineHeight: 1.2,
                                    fontVariantNumeric: "tabular-nums",
                                }}
                            >
                                {formatLineValue(kpi.value, kpi.isRatio)}
                            </Typography>

                            <Typography
                                sx={{
                                    ...masterTypo.caption,
                                    color: text.subtitle,
                                    lineHeight: 1.15,
                                }}
                            >
                                {kpi.period
                                    ? `As at ${kpi.period}`
                                    : ""}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default FinISKpis;