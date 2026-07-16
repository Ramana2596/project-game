// ==========================================
// Component: WalkThrough Section Container
// UXLab V1.0
// ==========================================

import React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";

import {
    colors,
    semanticTypo,
} from "../../../ux/styles";

// Demo Steps
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";
import Step7 from "./steps/Step7";

const WalkThroughSection = () => {
    return (
        <Box
            id="how-it-works"
            component="section"
            sx={{
                py: { xs: 8, md: 10 },
                background: colors.pageGradient,
                position: "relative",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(circle at right center, rgba(123,31,162,.05), transparent 60%)",
                    pointerEvents: "none",
                },
            }}
        >
            <Container maxWidth="lg">

                <Box
                    sx={{ mb: 7, position: "relative", zIndex: 1, }}
                >
                    <Typography
                        component="h2"
                        variant="h2"
                        sx={{
                            ...semanticTypo.pageH3,
                            background: colors.heroGradient,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent", mb: 2,
                        }}
                    >
                        OMTP: A 7-step Guided Walkthrough
                    </Typography>

                    <Typography
                        component="p"
                        variant="body1"
                        sx={{
                            ...semanticTypo.sectionB1,
                            maxWidth: 650,
                        }}
                    >
                        Follow our structured simulation journey to master
                        Operations Management—from initial setup through
                        strategic decision-making and performance analysis.
                    </Typography>
                </Box>

                <Stack spacing={4}>
                    <Step1 />
                    <Step2 />
                    <Step3 />
                    <Step4 />
                    <Step5 />
                    <Step6 />
                    <Step7 />
                </Stack>

            </Container>
        </Box>
    );
};

export default WalkThroughSection;