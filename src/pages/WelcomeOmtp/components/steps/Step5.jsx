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
            <Grid container spacing={4}>

                <Grid item xs={12} md={6}>
                    <Typography
                        component="h3"
                        variant="h6"
                        sx={{
                            ...semanticTypo.cardH5,
                            color: colors.primaryDark,
                            mb: 1.5,
                        }}
                    >
                        Operational Decisions for each month
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
                            src={imgOpsPlan}
                            alt="Monthly Operational Planning and Execution"
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
                        component="h3"
                        variant="h6"
                        sx={{
                            ...semanticTypo.cardH5,
                            color: colors.primaryDark,
                            mb: 1.5,
                        }}
                    >
                        Business Simulation for four months
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
                            src={imgSimComplete}
                            alt="Business Simulation progress after four months"
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

export default Step5;