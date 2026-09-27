// Component Name : FinISKpis
// Module         : FinIS (Income Statement)
// Purpose        : Render the KPI stat card row (revenue, gross margin, operating profit, PAT, profit %)
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, kpi, stat-card

import React from "react";
import { Box, Typography } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PercentIcon from "@mui/icons-material/Percent";
import { cardStyle, masterTypo, colors } from "../../../ux/styles";
import { formatLineValue } from "../utils/finISFormatters";

// Constants: icon per KPI key
const STAT_ICONS = {
    revenue: <ReceiptLongIcon />,
    grossMargin: <TrendingUpIcon />,
    operatingProfit: <TrendingUpIcon />,
    profitAfterTax: <TrendingUpIcon />,
    profitPct: <PercentIcon />,
};

// Component: presentational KPI card grid, driven entirely by the `kpis` prop from useFinIS
const FinISKpis = ({ kpis }) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: `repeat(${kpis.length}, 1fr)` },
                gap: 2,
                mb: 3,
            }}
        >
            {kpis.map((kpi) => (
                <Box key={kpi.key} sx={cardStyle.statCard}>
                    <Box sx={cardStyle.statIconCircle(colors[kpi.accent] || colors.primary)}>
                        {STAT_ICONS[kpi.icon]}
                    </Box>
                    <Box>
                        <Typography sx={{ ...masterTypo.caption, color: colors.subtitle }}>
                            {kpi.label}
                        </Typography>
                        <Typography sx={{ ...masterTypo.h4, color: colors.title }}>
                            {formatLineValue(kpi.value, kpi.isRatio)}
                        </Typography>
                        <Typography sx={{ ...masterTypo.caption, color: colors.muted }}>
                            {kpi.period ? `As at ${kpi.period}` : ""}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default FinISKpis;
