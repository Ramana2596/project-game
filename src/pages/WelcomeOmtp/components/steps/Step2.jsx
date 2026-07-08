// ==========================================
// Component: Walkthrough Step 2
// UXLab V1.0
// ==========================================

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import BaseStep from "./BaseStep";

import imgStrategyDraft from "../../../../assets/DemoPicture/StrategyDraft.jpg";
import imgStrategicPlan from "../../../../assets/DemoPicture/StrategicPlan.jpg";

import {
    colors,
    semanticTypo,
} from "../../../../ux/styles";

const Step2 = () => {
    return (
        <BaseStep
            number="2"
            title="Choose Your Strategy"
            description="Review the available strategic alternatives, select the strategy that best fits your objectives, and establish the direction for your business."
        >
            <Grid container spacing={3}>

                <Grid item xs={12} md={6}>
                    <Typography
                        component="h4"
                        variant="h4"
                        sx={{
                            ...semanticTypo.cardH5,
                            mb: 1.5,
                        }}
                    >
                        Strategies Available
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
                            src={imgStrategyDraft}
                            alt="Available Strategies"
                            sx={{
                                width: "100%",
                                display: "block",
                                borderRadius: 2,
                            }}
                        />
                    </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Typography
                        component="h4"
                        variant="h4"
                        sx={{
                            ...semanticTypo.cardH5,
                            mb: 1.5,
                        }}
                    >
                        Strategy Selected
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
                            src={imgStrategicPlan}
                            alt="Selected Strategy"
                            sx={{
                                width: "100%",
                                display: "block",
                                borderRadius: 2,
                            }}
                        />
                    </Box>
                </Grid>

            </Grid>
        </BaseStep>
    );
};

export default Step2;