// ==========================================
// Component: Walkthrough Step 5
// UXLab V1.0
// ==========================================

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import BaseStep from "./BaseStep";

import imgOpsPlan from "../../../../assets/DemoPicture/OpsPlan.jpg";
import imgSimComplete from "../../../../assets/DemoPicture/SimComplete.jpg";

import {
    colors,
    semanticTypo,
} from "../../../../ux/styles";

const Step5 = () => {
    return (
        <BaseStep
            number="5"
            title="Business Plan Execution - Monthly Simulation"
            description="Execute the month's operational decisions and monitor simulation progress. Experience how your planning decisions translate into business performance over time."
        >
            <Grid container spacing={2}>

                <Grid item xs={12} md={6}>
                    <Typography
                        component="h3"
                        variant="h6"
                        sx={{
                            ...semanticTypo.cardH5,
                            mb: 1,
                        }}
                    >
                        Operations decisions for each month
                    </Typography>

                    <Box
                        sx={{
                            p: 1,
                            bgcolor: colors.background,
                            border: `1px solid ${colors.border}`,
                            borderRadius: 3,
                        }}
                    >
                        <Box
                            component="img"
                            src={imgOpsPlan}
                            alt="Operations Decisions Panel"
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
                        component="h3"
                        variant="h6"
                        sx={{
                            ...semanticTypo.cardH5,
                            mb: 1,
                        }}
                    >
                        Four months of simulation completed
                    </Typography>

                    <Box
                        sx={{
                            p: 1,
                            bgcolor: colors.background,
                            border: `1px solid ${colors.border}`,
                            borderRadius: 3,
                        }}
                    >
                        <Box
                            component="img"
                            src={imgSimComplete}
                            alt="Simulation Complete Progress Panel"
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

export default Step5;