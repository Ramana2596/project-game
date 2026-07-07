// ============================================================
// OpsMgt UX Lab V1.0
// Component : PageHero
// Purpose   : Standard page header for all application pages
// ============================================================

import React from "react";
import { Box, Typography } from "@mui/material";
import { colors, semanticTypo } from "../styles";

const PageHero = ({
    title,
    subtitle,
    icon: IconComponent = null,
}) => {
    return (
        <Box
            sx={{
                mb: 4,
                p: 3,
                borderRadius: 4,
                overflow: "hidden",
                position: "relative",
                background: colors.heroGradient,
                color: colors.white,
                boxShadow: `0 10px 28px ${colors.primary}38`,
            }}
        >
            {/* Watermark Icon */}
            {IconComponent && (
                <Box
                    sx={{
                        position: "absolute",
                        right: 20,
                        top: "50%",
                        transform: "translateY(-50%)",
                        opacity: 0.10,
                        color: colors.white,
                        display: "flex",
                        alignItems: "center",
                        "& svg": {
                            fontSize: 100,
                        },
                    }}
                >
                    <IconComponent />
                </Box>
            )}

            <Typography
                variant="h1"
                sx={{
                    ...semanticTypo.pageTitle,
                    color: colors.white,
                }}
            >
                {title}
            </Typography>

            {subtitle && (
                <Typography
                    variant="body1"
                    sx={{
                        ...semanticTypo.pageSubtitle,
                        color: "rgba(255,255,255,0.90)",
                        maxWidth: 900,
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

export default PageHero;