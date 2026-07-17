// ==========================================
// Component: Walkthrough Step 4
// UXLab V1.0
// ==========================================

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import BaseStep from "./BaseStep";

import imgOpsPlanMatl from "../../../../assets/DemoPicture/OpsPlanMatl.jpg";
import imgOpsPlanProduct from "../../../../assets/DemoPicture/OpsPlanProduct.jpg";

import {
    colors,
    semanticTypo,
} from "../../../../ux/styles";

const Step4 = () => {
    return (
        <BaseStep
            number="4"
            title="Make Operational Decisions"
            description="Prepare monthly forecast, Production plan, Sales plan and material requirements.
             This is where business strategy is translated into operational execution."
        >
            <Grid container spacing={4}>

                <Grid item xs={12} md={6}>
                    <Typography
                        component="h4"
                        variant="h4"
                        sx={{
                            ...semanticTypo.cardH5,
                            color: colors.primaryDark,
                            mb: 1.5,
                        }}
                    >
                        Forecast, Production & Sales Plan
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
                            src={imgOpsPlanProduct}
                            alt="Production forecast and sales planning"
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
                            color: colors.primaryDark,
                            mb: 1.5,
                        }}
                    >
                        Materials Requirements Planning
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
                            src={imgOpsPlanMatl}
                            alt="Material requirements planning"
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

export default Step4;