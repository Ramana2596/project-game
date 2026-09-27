// Component Name : FinISTakeaways
// Module         : FinIS (Income Statement)
// Purpose        : Bottom insight banner - narrative sentence plus headline stat callouts
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, insights, banner, narration

import React from "react";
import { Box, Typography } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import PaidIcon from "@mui/icons-material/Paid";
import { cardStyle, masterTypo, colors } from "../../../ux/styles";
import { formatPercent } from "../utils/formatter";

// Icon per stat key - kept local since these are specific to this one banner
const STAT_ICONS = {
    revenueGrowth: <TrendingUpIcon />,
    operatingMargin: <GpsFixedIcon />,
    netProfitMargin: <PaidIcon />,
};

// Component: one headline stat callout (label, value, comparison)
const FinISTakeawaystat = ({ stat }) => (
    <Box sx={cardStyle.bannerChip}>
        <Box sx={{ ...cardStyle.bannerIconCircle, width: 40, height: 40, minWidth: 40 }}>
            {STAT_ICONS[stat.key]}
        </Box>
        <Box>
            <Typography sx={{ ...masterTypo.caption, color: colors.subtitle, fontWeight: 700 }}>{stat.label}</Typography>
            <Typography sx={{ ...masterTypo.h5, color: colors.success }}>{formatPercent(stat.value)}</Typography>
            <Typography sx={{ fontSize: 11, color: colors.muted }}>{stat.comparisonLabel}</Typography>
        </Box>
    </Box>
);

// Component: full-width FinISTakeaways banner - purely presentational, driven by useInsights's output
const FinISTakeaways = ({ narrative, stats = [] }) => {
    if (!narrative) return null;

    return (
        <Box sx={cardStyle.banner}>
            <Box sx={cardStyle.bannerIconCircle}>
                <LightbulbIcon />
            </Box>
            <Box sx={{ flex: "1 1 260px" }}>
                <Typography sx={{ ...masterTypo.h5, color: colors.title }}>Key FinISTakeaways</Typography>
                <Typography sx={{ ...masterTypo.body2, color: colors.body }}>{narrative}</Typography>
            </Box>

            {stats.map((stat) => (
                <FinISTakeawaystat key={stat.key} stat={stat} />
            ))}
        </Box>
    );
};

export default FinISTakeaways;