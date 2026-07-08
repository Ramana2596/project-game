// ==========================================
// Component: Walkthrough Step 7 (Historical Data)
// UXLab V1.0
// ==========================================

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import BaseStep from "./BaseStep";

import imgInfoDesk1 from "../../../../assets/DemoPicture/InfoDesk1.jpg";
import imgInfoDesk2 from "../../../../assets/DemoPicture/InfoDesk2.jpg";

import {
    colors,
    semanticTypo,
} from "../../../../ux/styles";

const Step7Hist = () => {
    return (
        <BaseStep
            number="7"
            title="Learn from Historical Data"
            description="Review historical information and business trends to understand past performance, identify improvement opportunities, and make better operational decisions in future simulation cycles."
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
                    Historical Data and Trend Analysis
                </Typography>

                <Grid container spacing={2}>

                    <Grid item xs={12} md={6}>
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
                                src={imgInfoDesk1}
                                alt="Historical Data View 1"
                                sx={{
                                    width: "100%",
                                    display: "block",
                                    borderRadius: 2,
                                }}
                            />
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
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
                                src={imgInfoDesk2}
                                alt="Historical Data View 2"
                                sx={{
                                    width: "100%",
                                    display: "block",
                                    borderRadius: 2,
                                }}
                            />
                        </Box>
                    </Grid>

                </Grid>

            </Box>
        </BaseStep>
    );
};

export default Step7Hist;