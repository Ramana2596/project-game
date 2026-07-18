// ============================================================
// OpsMgt UX Lab V1.0
// Component : CTASection
// Purpose   : Premium Call-To-Action Section
// ============================================================

import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import {
    colors,
    buttonStyle,
    semanticTypo,
} from "../../../ux/styles";

const CTASection = ({ handleDemoLogin }) => {
    return (
        <Box
            component="section"
            aria-labelledby="cta-heading"
            sx={{
                background: colors.heroGradient,
                py: { xs: 5, md: 6 },
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0.10,
                    backgroundImage:
                        `radial-gradient(circle at 18% 30%, rgba(255,255,255,.18), transparent 34%),
                        radial-gradient(circle at 82% 72%, rgba(255,255,255,.10), transparent 42%)`,
                }}
            />

            <Container
                maxWidth="sm"
                sx={{
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Typography
                    id="cta-heading"
                    component="h2"
                    sx={{
                        ...semanticTypo.pageH3,
                        color: colors.white,
                        mb: 3,
                    }}
                >
                    Ready to Transform Your Learning?
                </Typography>

                <Typography
                    component="p"
                    sx={{
                        ...semanticTypo.bodyB1,
                        color: "rgba(255,255,255,0.90)",
                        mb: 4,
                    }}
                >
                    Join thousands of learners experiencing the future of
                    business education.
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleDemoLogin}
                        sx={{
                            ...buttonStyle.primary,

                            background: colors.white,
                            color: colors.primary,

                            px: 5,
                            py: 1.4,
                            borderRadius: "50px",

                            "&:hover": {
                                ...buttonStyle.primary["&:hover"],
                                background: "#F8F8F8",
                                color: colors.primaryDark,
                            },
                        }}
                    >
                        Try Demo Now
                    </Button>

                    <Button
                        component={Link}
                        to="/login"
                        variant="outlined"
                        size="large"
                        sx={{
                            ...buttonStyle.secondary,

                            background: "transparent",
                            color: colors.white,
                            border: `2px solid ${colors.white}`,

                            px: 5,
                            py: 1.4,
                            borderRadius: "50px",

                            "&:hover": {
                                background: "rgba(255,255,255,0.10)",
                                border: `2px solid ${colors.white}`,
                                color: colors.white,
                            },
                        }}
                    >
                        Get Started Free
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default CTASection;