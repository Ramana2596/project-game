// ==========================================
// Component: Final Call To Action
// UXLab V1.0
// ==========================================

import React from "react";
import {
    Box,
    Typography,
    Container,
    Button,
    Stack,
} from "@mui/material";

import {
    colors,
    semanticTypo,
} from "../../../ux/styles";

const FinalCTA = ({ onStart }) => {

    const scrollToSteps = () => {
        document
            .getElementById("how-it-works")
            ?.scrollIntoView({
                behavior: "smooth",
            });
    };

    return (
        <Box
            component="section"
            sx={{
                py: { xs: 8, md: 10 },
                bgcolor: colors.white,
            }}
        >
            <Container maxWidth="lg">

                <Box
                    sx={{
                        background: colors.heroGradient,
                        borderRadius: 6,
                        p: { xs: 5, md: 7 },
                        color: colors.white,
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: `0 20px 50px ${colors.primary}40`,
                    }}
                >
                    {/* Decorative Accent */}
                    <Box
                        sx={{
                            position: "absolute",
                            top: "-12%",
                            right: "-5%",
                            width: 260,
                            height: 260,
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(255,255,255,.12) 0%, transparent 70%)",
                        }}
                    />

                    <Stack
                        direction={{
                            xs: "column",
                            lg: "row",
                        }}
                        spacing={4}
                        alignItems="center"
                        justifyContent="space-between"
                    >

                        {/* Left */}
                        <Box
                            sx={{
                                maxWidth: 620,
                                textAlign: {
                                    xs: "center",
                                    lg: "left",
                                },
                            }}
                        >
                            <Typography
                                component="h2"
                                sx={{
                                    ...semanticTypo.pageH3,
                                    color: colors.white,
                                    mb: 2,
                                }}
                            >
                                Ready to experience real 
                                <br/>
                                Business Decision-Making?
                            </Typography>

                            <Typography
                                component="p"
                                sx={{
                                    ...semanticTypo.bodyB1,
                                    color: "rgba(255,255,255,0.92)",
                                }}
                            >
                                Give learners a practical way to understand
                                operations, strategy, and finance through one
                                modern business simulation platform.
                            </Typography>
                        </Box>

                        {/* Right */}
                        <Stack
                            direction={{
                                xs: "column",
                                sm: "row",
                            }}
                            spacing={2.5}
                            sx={{
                                width: {
                                    xs: "100%",
                                    sm: "auto",
                                },
                            }}
                        >
                            {/* Primary CTA */}
                            <Button
                                variant="contained"
                                onClick={onStart}
                                sx={{
                                    bgcolor: colors.white,
                                    color: colors.primary,

                                    px: 4.5,
                                    py: 1.7,

                                    minWidth: 180,

                                    borderRadius: "50px",

                                    fontWeight: 700,
                                    fontSize: "1rem",

                                    textTransform: "none",

                                    boxShadow:
                                        "0 8px 20px rgba(0,0,0,0.12)",

                                    "&:hover": {
                                        bgcolor: "#F8F8F8",
                                        color: colors.primaryDark,
                                        transform: "translateY(-2px)",
                                    },

                                    transition: "all .25s ease",
                                }}
                            >
                                Try Live Simulation
                            </Button>

                            {/* Secondary CTA */}
                            <Button
                                variant="outlined"
                                onClick={scrollToSteps}
                                sx={{
                                    color: colors.white,

                                    border: `2px solid ${colors.white}`,

                                    px: 4,
                                    py: 1.7,

                                    minWidth: 160,

                                    borderRadius: "50px",

                                    fontWeight: 700,
                                    fontSize: "1rem",

                                    textTransform: "none",

                                    "&:hover": {
                                        background:
                                            "rgba(255,255,255,0.12)",

                                        border: `2px solid ${colors.white}`,

                                        color: colors.white,
                                    },

                                    transition: "all .25s ease",
                                }}
                            >
                                See the 7 Steps
                            </Button>

                        </Stack>

                    </Stack>

                </Box>

            </Container>
        </Box>
    );
};

export default FinalCTA;