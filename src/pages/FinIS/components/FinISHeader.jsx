// Component Name : FinISHeader
// Module         : FinIS (Income Statement)
// Purpose        : Page title, subtitle and current period/team pill
// Author/Version : UXLab V1.0
// AI Tags        : income-statement, header, page-title

import React from "react";
import { Box, Typography } from "@mui/material";
import { layoutStyle, masterTypo, colors } from "../../../ux/styles";

// Component: static presentational header - no business logic, purely UI rendering
const FinISHeader = ({ gameBatch, gameTeam }) => {
    return (
        <Box sx={layoutStyle.pageHeader}>
            <Typography sx={{ ...masterTypo.h2, color: colors.title }}>
                Income statement
            </Typography>
            <Typography sx={{ ...masterTypo.body2, color: colors.subtitle }}>
                Revenue, expenses and profit, period by period (all periods).
            </Typography>
            <Box sx={layoutStyle.pageHeaderDatePill}>
                <Typography sx={masterTypo.caption}>
                    {gameBatch} / {gameTeam}
                </Typography>
            </Box>
        </Box>
    );
};

export default FinISHeader;
