// ==========================================
// Component: What Learners Gain
// UXLab V1.0
// ==========================================

import React from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Stack,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import onlinestudyIcon from "../../../assets/navigation-menu/onlinestudy.png";

import {
    colors,
    semanticTypo,
} from "../../../ux/styles";

const GainItem = ({ text }) => (
    <Stack
        direction="row"
        spacing={1.5}
        sx={{
            mb: 2,
            alignItems: "flex-start",
        }}
    >
        <CheckCircleIcon
            sx={{
                color: colors.primary,
                mt: 0.5,
                fontSize: "1.3rem",
            }}
        />

        <Typography
            component="p"
            variant="body1"
            sx={{
                ...semanticTypo.bodyB1,
                fontWeight: 600,
            }}
        >
            {text}
        </Typography>
    </Stack>
);

const WhatLearnersGain = () => {
    return (
        <Box
            component="section"
            sx={{
                py: 12,
                background: colors.pageGradient,
            }}
        >
            <Container maxWidth="lg">
                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                >

                    {/* Illustration */}

                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                bgcolor: colors.panel,
                                border: `1px solid ${colors.border}`,
                                borderRadius: 4,
                                p: 3,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: 320,

                                boxShadow: "0 8px 22px rgba(123,31,162,.08)",
                                transition: "all .25s ease",

                                "&:hover": {
                                    transform: "translateY(-3px)",
                                    boxShadow: "0 14px 30px rgba(123,31,162,.15)",
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={onlinestudyIcon}
                                alt="Learner Benefits"
                                sx={{
                                    width: "100%",
                                    maxWidth: 360,
                                    height: "auto",
                                }}
                            />
                        </Box>
                    </Grid>

                    {/* Content */}

                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{
                            pl: { md: 6 },
                        }}
                    >
                        <Typography
                            component="h2"
                            variant="h2"
                            sx={{
                                ...semanticTypo.pageH3,
                                color: colors.primaryDark, mb: 3,
                            }}
                        >
                            What Learners Gain
                        </Typography>

                        <Typography
                            component="p"
                            variant="body1"
                            sx={{
                                ...semanticTypo.bodyB1,
                                mb: 4,
                                maxWidth: 500,
                            }}
                        >
                            OMTP strengthens business understanding through
                            practical experience, repeated decision-making,
                            and real cause-and-effect learning.
                        </Typography>

                        <Box sx={{ mt: 4 }}>
                            <GainItem text="Understand real-world Operations Management more clearly." />
                            <GainItem text="Improve decision-making under uncertainty and constraints." />
                            <GainItem text="See how operational choices affect financial performance." />
                            <GainItem text="Learn the trade-offs between growth, cost, service, and efficiency." />
                            <GainItem text="Build practical confidence for study, work, and entrepreneurship." />
                        </Box>
                    </Grid>

                </Grid>
            </Container>
        </Box>
    );
};

export default WhatLearnersGain;