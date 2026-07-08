// ==========================================
// Component: Walkthrough Step 1
// UXLab V1.0
// ==========================================

import React from "react";
import { Box, Typography } from "@mui/material";

import BaseStep from "./BaseStep";
import imgDashboard from "../../../../assets/DemoPicture/Dashboard.jpg";

import {
    colors,
    semanticTypo,
} from "../../../../ux/styles";

const Step1 = () => {
    return (
        <BaseStep
            number="1"
            title="Start from the Dashboard"
            description="Begin from the main dashboard to access key financial information and understand the overall business performance before making decisions."
        >
            <Box>

                <Typography
                    component="h4"
                    variant="h4"
                    sx={{
                        ...semanticTypo.cardH5,
                        mb: 1.5,
                    }}
                >
                    Main Dashboard
                </Typography>

                <Box
                    sx={{
                        bgcolor: colors.panel,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 4,
                        p: 1.5,
                    }}
                >
                    <Box
                        component="img"
                        src={imgDashboard}
                        alt="Main Dashboard"
                        sx={{
                            width: "100%",
                            display: "block",
                            borderRadius: 2,
                        }}
                    />
                </Box>

            </Box>
        </BaseStep>
    );
};

export default Step1;