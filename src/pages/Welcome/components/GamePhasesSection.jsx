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
            sx={{
                py: 4,
                mt: 4,
                bgcolor: colors.panel,
            }}
        >
            <Container maxWidth="lg">

                <Typography
                    component="h2"
                    sx={{
                        ...semanticTypo.sectionH3,
                        textAlign: "center",
                        mb: 2,
                    }}
                >
                Simulation Phases
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
                                    px: 2.5,
                                    py: 2,
                                    borderRadius: 6,
                                    height: "100%",

                                    "&:hover": {
                                        ...cardStyle.primary["&:hover"],
                                    },
                                }}
                            >
                                <Typography
                                    component="div"
                                    sx={{
                                        fontSize: "2.4rem",
                                        mb: 1,
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