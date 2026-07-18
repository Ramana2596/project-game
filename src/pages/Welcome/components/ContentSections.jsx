import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import {
    cardStyle,
    colors,
    semanticTypo,
} from "../../../ux/styles";

const ContentSections = ({
    pageConstants,
    findImageForSection,
    imageSectionsOrder,
}) => {
    return (
        <Box
            component="main"
            sx={{
                background: colors.pageGradient,
                py: { xs: 7, md: 9 },
                position: "relative",
                overflow: "hidden",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(circle at top right, rgba(123,31,162,.08), transparent 42%)",
                    pointerEvents: "none",
                },
            }}
        >
            {pageConstants.toolBarSections.map((section, idx) => {
                const imgEntry = findImageForSection(section);
                const img = imgEntry ? imgEntry.src : null;

                let side = "right";

                if (img) {
                    const imageIndex = imageSectionsOrder[section.key];

                    if (typeof imageIndex === "number") {
                        side = imageIndex % 2 === 0 ? "left" : "right";
                    } else {
                        side = idx % 2 === 0 ? "right" : "left";
                    }

                    if (imgEntry.name === "what-is-omg") {
                        side = "right";
                    }
                }

                return (
                    <Box
                        component="section"
                        key={section.key}
                        id={section.key}
                        aria-labelledby={`${section.key}-title`}
                        sx={{
                            py: { xs: 3, md: 4 },
                            scrollMarginTop: "var(--welcome-scroll-margin,80px)",
                            position: "relative",
                            zIndex: 1,
                        }}
                    >
                        <Container maxWidth="lg">
                            <Box
                                sx={{
                                    ...cardStyle.primary,
                                    p: { xs: 3, md: 5 },
                                    borderRadius: 6,
                                    background: colors.panelGradient,
                                }}
                            >

                                {img ? (
                                    <Grid
                                        container
                                        spacing={{ xs: 4, md: 6 }} alignItems="center"
                                    >
                                        {side === "left" ? (
                                            <>
                                                <Grid item xs={12} sm={12} lg={5}>                                                    <Box
                                                        sx={{
                                                            ...cardStyle.primary,
                                                            borderRadius: 5,
                                                            overflow: "hidden",
                                                            background: colors.panelGradient,
                                                            border: `1px solid ${colors.border}`,
                                                            aspectRatio: "4 / 3",
                                                            position: "relative",

                                                            "&::before": {
                                                                content: '""',
                                                                position: "absolute",
                                                                inset: 0,
                                                                background:
                                                                    "radial-gradient(circle at top right, rgba(123,31,162,.08), transparent 45%)",
                                                                pointerEvents: "none",
                                                                zIndex: 1,
                                                            },

                                                            "& img": {
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                                display: "block",
                                                                transition: "transform .35s ease",
                                                            },

                                                            "&:hover img": {
                                                                transform: "scale(1.04)",
                                                            },
                                                        }}
                                                    >
                                                        <img
                                                            src={img}
                                                            alt={`${section.title} - OMTP`}
                                                            loading="lazy"
                                                        />
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12} lg={7}>
                                                    <Box
                                                        sx={{
                                                            maxWidth: 700,
                                                            mx: "auto",
                                                        }}
                                                    >                                                    <Typography
                                                        id={`${section.key}-title`}
                                                        component="h2"
                                                        sx={{
                                                            ...semanticTypo.pageH3,
                                                            color: colors.primaryDark,
                                                            mb: 2,
                                                            position: "relative",
                                                        }}
                                                    >
                                                            {section.title}
                                                        </Typography>

                                                        <Box
                                                            sx={{
                                                                ...semanticTypo.bodyB1,
                                                                color: colors.body,
                                                                lineHeight: 1.85,
                                                                maxWidth: 680,

                                                                "& p:not(:last-child)": {
                                                                    mb: 2,
                                                                },

                                                                "& ul": {
                                                                    pl: 3,
                                                                    my: 2,
                                                                },

                                                                "& li": {
                                                                    mb: 1,
                                                                },
                                                            }}
                                                        >
                                                            {section.content}
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </>
                                        ) : (
                                            <>
<Grid item xs={12} sm={12} lg={6}>                                                    <Typography
                                                        id={`${section.key}-title`}
                                                        component="h2"
                                                        sx={{
                                                            ...semanticTypo.pageH3,
                                                            color: colors.primaryDark,
                                                            mb: 2,
                                                            position: "relative",
                                                        }}
                                                    >
                                                        {section.title}
                                                    </Typography>

                                                    <Box
                                                        sx={{
                                                            ...semanticTypo.bodyB1,
                                                            color: colors.body,
                                                            lineHeight: 1.85,
                                                            maxWidth: 680,

                                                            "& p:not(:last-child)": {
                                                                mb: 2,
                                                            },

                                                            "& ul": {
                                                                pl: 3,
                                                                my: 2,
                                                            },

                                                            "& li": {
                                                                mb: 1,
                                                            },
                                                        }}
                                                    >
                                                        {section.content}
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12} sm={12} md={6}>
                                                    <Box
                                                        sx={{
                                                            ...cardStyle.primary,
                                                            borderRadius: 5,
                                                            overflow: "hidden",
                                                            background: colors.panelGradient,
                                                            border: `1px solid ${colors.border}`,
                                                            aspectRatio: "4 / 3",
                                                            position: "relative",

                                                            "&::before": {
                                                                content: '""',
                                                                position: "absolute",
                                                                inset: 0,
                                                                background:
                                                                    "radial-gradient(circle at top right, rgba(123,31,162,.08), transparent 45%)",
                                                                pointerEvents: "none",
                                                                zIndex: 1,
                                                            },

                                                            "& img": {
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                                display: "block",
                                                                transition: "transform .35s ease",
                                                            },

                                                            "&:hover img": {
                                                                transform: "scale(1.04)",
                                                            },
                                                        }}
                                                    >
                                                        <img
                                                            src={img}
                                                            alt={`${section.title} - OMTP`}
                                                            loading="lazy"
                                                        />
                                                    </Box>
                                                </Grid>
                                            </>
                                        )}
                                    </Grid>
                                ) : (
                                    <Box>
                                        <Typography
                                            id={`${section.key}-title`}
                                            component="h2"
                                            sx={{
                                                ...semanticTypo.pageH3,
                                                color: colors.primaryDark,
                                                mb: 2,
                                                position: "relative",
                                            }}
                                        >
                                            {section.title}
                                        </Typography>

                                        <Box
                                            sx={{
                                                ...semanticTypo.bodyB1,
                                                color: colors.body,
                                                lineHeight: 1.85,
                                                maxWidth: 680,

                                                "& p:not(:last-child)": {
                                                    mb: 2,
                                                },

                                                "& ul": {
                                                    pl: 3,
                                                    my: 2,
                                                },

                                                "& li": {
                                                    mb: 1,
                                                },
                                            }}
                                        >
                                            {section.content}
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Container>
                    </Box>
                );
            })}
        </Box>
    );
};

export default ContentSections;