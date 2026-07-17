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
            <Grid container spacing={4}>

                <Grid item xs={12} md={6}>
                    <Typography
                        component="h4"
                        variant="h4"
                        sx={{
                            ...semanticTypo.cardH5,
                            mb: 1.5,
                        }}
                    >
                        Available Business Strategy Options
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
                            src={imgStrategyDraft}
                            alt="Available business strategy options"
                            sx={{
                                width: "100%",
                                display: "block",
                                borderRadius: 2,
                                border: `1px solid ${colors.border}`,
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
                        Selected Business Strategy
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
                            src={imgStrategicPlan}
                            alt="Selected business strategy"
                            sx={{
                                width: "100%",
                                display: "block",
                                borderRadius: 2,
                                border: `1px solid ${colors.border}`,
                            }}
                        />
                    </Box>
                </Grid>

            </Grid>
        </BaseStep>
    );
};

export default Step2;