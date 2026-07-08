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
            sx={{
                bgcolor: colors.background.default,
                py: 10,
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
                        key={section.key}
                        id={section.key}
                        sx={{
                            py: { xs: 4, md: 2 },
                            scrollMarginTop:
                                "var(--welcome-scroll-margin,80px)",
                        }}
                    >
                        <Container maxWidth="lg">
                            {img ? (
                                <Grid
                                    container
                                    spacing={6}
                                    alignItems="center"
                                >
                                    {side === "left" ? (
                                        <>
                                            <Grid item xs={12} md={5}>
                                                <Box
                                                    sx={{
                                                        ...cardStyle.primary,
                                                        borderRadius: 4,
                                                        boxShadow:
                                                            "0 12px 40px rgba(11,8,33,.10)",
                                                        aspectRatio: "4/3",
                                                    }}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={section.title}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={7}>
                                                <Typography
                                                    component="h2"
                                                    sx={{
                                                        ...semanticTypo.sectionH3,
                                                        mb: 3,
                                                    }}
                                                >
                                                    {section.title}
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        ...semanticTypo.bodyB1,
                                                        color: colors.body,
                                                        lineHeight: 1.8,
                                                    }}
                                                >
                                                    {section.content}
                                                </Box>
                                            </Grid>
                                        </>
                                    ) : (
                                        <>
                                            <Grid item xs={12} md={6}>
                                                <Typography
                                                    component="h2"
                                                    sx={{
                                                        ...semanticTypo.sectionH3,
                                                        mb: 3,
                                                    }}
                                                >
                                                    {section.title}
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        ...semanticTypo.bodyB1,
                                                        color: colors.body,
                                                        lineHeight: 1.8,
                                                    }}
                                                >
                                                    {section.content}
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <Box
                                                    sx={{
                                                        ...cardStyle.primary,
                                                        borderRadius: 4,
                                                        boxShadow:
                                                            "0 12px 40px rgba(11,8,33,.10)",
                                                        aspectRatio: "4/3",
                                                    }}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={section.title}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </Box>
                                            </Grid>
                                        </>
                                    )}
                                </Grid>
                            ) : (
                                <Box>
                                    <Typography
                                        component="h2"
                                        sx={{
                                            ...semanticTypo.sectionH3,
                                            mb: 3,
                                        }}
                                    >
                                        {section.title}
                                    </Typography>

                                    <Box
                                        sx={{
                                            ...semanticTypo.bodyB1,
                                            color: colors.body,
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {section.content}
                                    </Box>
                                </Box>
                            )}
                        </Container>
                    </Box>
                );
            })}
        </Box>
    );
};

export default ContentSections;