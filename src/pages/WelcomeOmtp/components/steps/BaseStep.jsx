// ============================================================
// Component: Base Step Card Template
// UXLab V1.0
// ============================================================

import React from "react";
import { Box, Typography } from "@mui/material";

import {
    colors,
    cardStyle,
    semanticTypo,
} from "../../../../ux/styles";

const BaseStep = ({
    number,
    title,
    description,
    children,
}) => {
    return (
        <Box
            sx={{
                ...cardStyle.primary,
                p: { xs: 3, md: 4 },
                mb: 4,
                borderRadius: 6,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    mb: 3,
                }}
            >
                {/* Step Number */}
                <Box
                    sx={{
                        minWidth: 44,
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: colors.heroGradient,
                        color: colors.white,

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        fontWeight: 700,
                        fontSize: "1rem",

                        boxShadow: `0 6px 16px ${colors.shadowColor}`,
                        flexShrink: 0,
                    }}
                >
                    {number}
                </Box>

                {/* Title & Description */}
                <Box>
                    <Typography
                        component="h3"
                        variant="h3"
                        sx={{
                            ...semanticTypo.cardH4,
                            mb: 0.75,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        component="p"
                        variant="body1"
                        sx={{
                            ...semanticTypo.bodyB2,
                            maxWidth: 700,
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
            </Box>

            {/* Content */}
            <Box sx={{ mt: 2 }}>
                {children}
            </Box>
        </Box>
    );
};

export default BaseStep;