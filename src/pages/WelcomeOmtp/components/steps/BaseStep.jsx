// ============================================================
// Component: Base Step Card Template: Presents each step content
// UXLab V1.0
// ============================================================

import React from "react";
import { Box, Typography } from "@mui/material";

import {
    colors,
    cardStyle,
    masterTypo,
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
                        minWidth: 52,
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        background: colors.heroGradient,
                        color: colors.white,

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",

                        fontWeight: 700,
                        fontSize: "1rem",

                        boxShadow: "0 8px 20px rgba(123,31,162,.22)", flexShrink: 0,
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
                            ...masterTypo.h4,
                            color: colors.primaryDark,
                            mb: 0.75,
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        component="p"
                        variant="body1"
                        sx={{
                            ...masterTypo.body2,
                            maxWidth: 700,
                        }}
                    >
                        {description}
                    </Typography>
                </Box>
            </Box>

            {/* Content */}
            <Box sx={{ mt: 3 }}>
                {children}
            </Box>
        </Box>
    );
};

export default BaseStep;