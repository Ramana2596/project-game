// ============================================================
// OpsMgt UX Lab
// Component : HeroSection
// Purpose   : Landing page hero using UXLab V1.0
// ============================================================

import React from "react";
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
    buttonStyle,
    colors,
    semanticTypo,
} from "../../../ux/styles";

const HeroSection = ({ handleDemoLogin }) => {
    return (
        <Box
            sx={{
                background: colors.pageGradient,
                position: "relative",
                pt: 20,
                pb: 16,
                overflow: "hidden",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-50%",
                    width: "200%",
                    height: "100%",
                    background:
                        "radial-gradient(circle at 20% 50%, rgba(123,31,162,.08) 0%, transparent 50%)",
                    animation: "float 20s ease-in-out infinite",
                },

                "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    right: "-10%",
                    width: 400,
                    height: 400,
                    borderRadius: "50%",
                    background:
                        "radial-gradient(circle, rgba(123,31,162,.05) 0%, transparent 70%)",
                },
            }}
        >
            <Container
                maxWidth="lg"
                sx={{
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Grid
                    container
                    spacing={6}
                    alignItems="center"
                >
                    {/* Left Content */}

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                animation:
                                    "slideInLeft .8s cubic-bezier(.34,1.56,.64,1) both",
                            }}
                        >
                            <Typography
                                component="h1"
                                sx={{
                                    ...semanticTypo.heroH2,
                                    mb: 3,
                                    background: colors.heroGradient,
                                    backgroundClip: "text",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Master your Operations Management Skills!
                            </Typography>

                            <Typography
                                component="p"
                                sx={{
                                    ...semanticTypo.heroB1,
                                    mb: 4,
                                    maxWidth: 540,
                                }}
                            >
                                Learn to make strategic and operational decisions
                                in a realistic business simulation. Experience
                                the real impact of your choices on company
                                performance.
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    mb: 4,
                                    flexWrap: "wrap",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    onClick={handleDemoLogin}
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        ...buttonStyle.primary,
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: "50px",
                                        boxShadow:
                                            "0 8px 24px rgba(123,31,162,.35)",

                                        "&:hover": {
                                            ...buttonStyle.primary["&:hover"],
                                            boxShadow:
                                                "0 12px 32px rgba(123,31,162,.45)",
                                        },
                                    }}
                                >
                                    Try Demo Now
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    component={Link}
                                    to="/login"
                                    sx={{
                                        ...buttonStyle.secondary,
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: "50px",

                                        "&:hover": {
                                            ...buttonStyle.secondary["&:hover"],
                                            bgcolor: "rgba(123,31,162,.06)",
                                        },
                                    }}
                                >
                                    Get Started
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    {/* Right Illustration */}

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                animation:
                                    "slideInRight .8s cubic-bezier(.34,1.56,.64,1) both",
                                perspective: "1200px",
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    height: 400,
                                    borderRadius: "20px",
                                    overflow: "hidden",
                                    boxShadow:
                                        "0 20px 60px rgba(123,31,162,.25)",
                                    transform: "rotateY(-5deg)",
                                    transition: "transform .3s ease",

                                    background: colors.heroGradient,

                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    gap: 3,

                                    "&:hover": {
                                        transform:
                                            "rotateY(0deg) translateY(-6px)",
                                    },
                                }}
                            >
                                <RocketLaunchIcon
                                    sx={{
                                        fontSize: 80,
                                        color: colors.white,
                                        opacity: 0.9,
                                    }}
                                />

                                <Typography
                                    component="h2"
                                    sx={{
                                        ...semanticTypo.pageH3,
                                        color: colors.white,
                                        textAlign: "center",
                                        px: 2,
                                    }}
                                >
                                    Real-time Interactive Operations Management
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default HeroSection;