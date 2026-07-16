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
                        color: colors.primaryDark,
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

                        boxShadow: "0 8px 22px rgba(123,31,162,.08)",
                        transition: "all .25s ease",

                        "&:hover": {
                            transform: "translateY(-3px)",
                            boxShadow: "0 14px 30px rgba(123,31,162,.15)",
                        },
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
                            border: `1px solid ${colors.border}`,
                        }}
                    />
                </Box>

            </Box>
        </BaseStep>
    );
};

export default Step1;