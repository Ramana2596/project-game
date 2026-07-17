// ==========================================
// Component: Walkthrough Step 3
// UXLab V1.0
// ==========================================

import React from "react";
import { Box, Typography } from "@mui/material";

import BaseStep from "./BaseStep";
import imgMktIntelligence from "../../../../assets/DemoPicture/MktIntelligence.jpg";

import {
    colors,
    semanticTypo,
} from "../../../../ux/styles";

const Step3 = () => {
    return (
        <BaseStep
            number="3"
            title="Study Market Intelligence"
            description="Analyze Product demand, Pricing and Raw material prices before making operational decisions. 
            This enables better planning and helps align business decisions with current market conditions."
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
                    Market Demand & Material Prices
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
                        src={imgMktIntelligence}
                        alt="Market intelligence showing market demand and raw material prices"
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

export default Step3;