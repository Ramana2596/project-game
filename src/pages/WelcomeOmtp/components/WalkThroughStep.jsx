// ==========================================
// Component: Unified Dynamic WalkThroughStep
// UXLab V1.0
// ==========================================

import React from "react";
import { Box, Typography, Grid } from "@mui/material";

import {
    colors,
    cardStyle,
    semanticTypo,
} from "../../../../ux/styles";

const WalkThroughStep = ({
    number,
    title,
    description,
    images = [],
    labels = [],
}) => (
    <Box
        sx={{
            ...cardStyle.primary,
            p: { xs: 2.5, md: 4 },
            mb: 6,
            borderRadius: 6,
        }}
    >
        {/* Step Header */}
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 2,
                mb: 3,
            }}
        >
            <Box
                sx={{
                    minWidth: 52,
                    width: 52,
                    height: 52,
                    boxShadow: "0 8px 18px rgba(123,31,162,.22)",
                    borderRadius: 3,
                    background: colors.heroGradient,
                    color: colors.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "1rem",
                    flexShrink: 0,
                }}
            >
                {number}
            </Box>

            <Box>
                <Typography
                    component="h3"
                    variant="h3"
                    sx={{
                        ...semanticTypo.pageH4,
                        color: colors.primaryDark,
                    }}
                >
                    {title}
                </Typography>

                <Typography
                    component="p"
                    variant="body1"
                    sx={{
                        ...semanticTypo.bodyB1,
                        maxWidth: 700,
                    }}
                >
                    {description}
                </Typography>
            </Box>
        </Box>

        {/* Images */}
        <Grid container spacing={3}>
            {images.map((img, index) => (
                <Grid
                    item
                    xs={12}
                    md={images.length > 1 ? 6 : 12}
                    key={index}
                >
                    <Box
                        sx={{
                            bgcolor: colors.panel,
                            border: `1px solid ${colors.border}`,
                            borderRadius: 4,
                            p: 2,
                            maxWidth: 520,
                            mx: "auto",
                            boxShadow: "0 8px 24px rgba(123,31,162,.08)",
                            transition: "all .25s ease",

                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: "0 16px 36px rgba(123,31,162,.15)",
                            },
                        }}
                    >
                        {labels[index] && (
                            <Typography
                                component="h4"
                                variant="h6"
                                sx={{
                                    ...semanticTypo.cardH6,
                                    mb: 1.5,
                                }}
                            >
                                {labels[index]}
                            </Typography>
                        )}

                        <Box
                            component="img"
                            src={img}
                            alt={labels[index] || `Step ${number}`}
                            sx={{
                                width: "100%",
                                display: "block",
                                borderRadius: 2,
                                border: `1px solid ${colors.border}`,
                            }}
                        />
                    </Box>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default WalkThroughStep;