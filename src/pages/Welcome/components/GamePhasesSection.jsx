import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import {
    cardStyle,
    colors,
    semanticTypo,
} from "../../../ux/styles";

const GamePhasesSection = () => {
    const phases = [
        { icon: "🎯", title: "Strategic Decision", description: "Plan your Strategy" },
        { icon: "📊", title: "Market Dynamics", description: "Analyze Market Trends" },
        { icon: "⚙️", title: "Operational Decision", description: "Make Key Decisions" },
        { icon: "▶️", title: "Simulation Run", description: "Execute Simulation" },
        { icon: "📈", title: "Financial Reports", description: "Review Financial Statements" },
        { icon: "📋", title: "Assessment Card", description: "Assessment & Feedback" },
    ];

    return (
        <Box
            component="section"
            aria-labelledby="simulation-phases-heading"
            sx={{
                py: { xs: 6, md: 8 },
                mt: 4,
                background: colors.pageGradient,
                position: "relative",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(circle at right center, rgba(123,31,162,.06), transparent 55%)",
                    pointerEvents: "none",
                },
            }}
        >
            <Container maxWidth="lg">

                <Typography
                    id="simulation-phases-heading"
                    component="h2"
                    sx={{
                        ...semanticTypo.pageH3,
                        color: colors.primaryDark,
                        textAlign: "center",
                        mb: 1.5,
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    Simulation Phases
                </Typography>
                <Typography
                    component="p"
                    sx={{
                        ...semanticTypo.bodyB1,
                        textAlign: "center",
                        color: colors.body,
                        maxWidth: 700,
                        mx: "auto",
                        mb: 5,
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    Experience the complete Operations Management lifecycle—from strategic planning and market analysis to simulation, financial evaluation, and performance assessment.
                </Typography>

                <Grid container spacing={3}>
                    {phases.map((item, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={2}
                            key={index}
                        >
                            <Box
                                sx={{
                                    ...cardStyle.primary,

                                    textAlign: "center",
                                    background: colors.panelGradient,
                                    px: 2.5,
                                    py: 3,
                                    borderRadius: 6,
                                    height: "100%",
                                    position: "relative",

                                    "&:hover": {
                                        ...cardStyle.primary["&:hover"],
                                    },
                                }}
                            >
                                <Typography
                                    component="div"
                                    sx={{
                                        fontSize: "2.7rem",
                                        mb: 1.5,
                                        lineHeight: 1,
                                    }}
                                >
                                    {item.icon}
                                </Typography>

                                <Typography
                                    component="h3"
                                    sx={{
                                        ...semanticTypo.cardH5,
                                        mb: 0.75,
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography
                                    component="p"
                                    sx={{
                                        ...semanticTypo.bodyB2,
                                    }}
                                >
                                    {item.description}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

            </Container>
        </Box>
    );
};

export default GamePhasesSection;