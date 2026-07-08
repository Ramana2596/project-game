// ==========================================
// Component: Walkthrough Step 7
// UXLab V1.0
// ==========================================

import React from "react";
import { Box, Typography } from "@mui/material";

import BaseStep from "./BaseStep";
import imgImprovement from "../../../../assets/DemoPicture/Dashboard.jpg";

import {
    colors,
    semanticTypo,
} from "../../../../ux/styles";

const Step7 = () => {
    return (
        <BaseStep
            number="7"
            title="Continuous Improvement"
            description="Use the insights gained from financial performance to refine your strategy and operational plans for the next business cycle. Continuous learning and improvement are the foundation of effective operations management."
        >
            <Box>

                <Typography
                    component="h3"
                    variant="h6"
                    sx={{
                        ...semanticTypo.cardH5,
                        mb: 1,
                    }}
                >
                    Review results and prepare for the next cycle
                </Typography>

                <Box
                    sx={{
                        p: 1,
                        bgcolor: colors.background,
                        border: `1px solid ${colors.border}`,
                        borderRadius: 3,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    }}
                >
                    <Box
                        component="img"
                        src={imgImprovement}
                        alt="Dashboard Review for Continuous Improvement"
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

export default Step7;