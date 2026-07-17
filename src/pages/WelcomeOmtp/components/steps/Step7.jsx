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
                        color: colors.primaryDark,
                        mb: 1.5,
                    }}
                >
                    Review results and prepare for the next cycle
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
                        src={imgImprovement}
                        alt="Business dashboard used to review performance and drive continuous improvement"
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

export default Step7;