// ==========================================
// Component: Pricing Section
// UXLab V1.0
// ==========================================

import React from "react";
import {
    Box,
    Typography,
    Container,
    Grid,
    Chip,
    Button,
    Stack,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import {
    buttonStyle,
    cardStyle,
    colors,
    semanticTypo,
} from "../../../ux/styles";

const PricingFeature = ({ text }) => (
    <Stack
        direction="row"
        spacing={1.25}
        sx={{
            mb: 1.2,
            alignItems: "center",
        }}
    >
        <CheckIcon
            sx={{
                fontSize: "1rem",
                color: colors.primary,
            }}
        />

        <Typography
            component="span"
            sx={semanticTypo.cardB2}
        >
            {text}
        </Typography>
    </Stack>
);

const PricingCard = ({
    title,
    subtitle,
    price,
    priceSuffix,
    features,
    badge,
    buttonText,
    isPrimary,
}) => (
    <Box
        sx={{
            ...cardStyle.primary,

            p: { xs: 3.5, md: 4 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",

            border: isPrimary
                ? `2px solid ${colors.primary}`
                : `2px solid ${colors.border}`,

            bgcolor: isPrimary
                ? colors.hover
                : colors.white,
            transition: "all .25s ease",

            "&:hover": {
                transform: "translateY(-4px)",
            },
        }}
    >
        {badge && (
            <Chip
                label={badge}
                size="small"
                sx={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    bgcolor: colors.primary,
                    color: colors.white,
                    fontWeight: 700,
                }}
            />
        )}

        <Box>

            <Typography
                component="h3"
                sx={{
                    ...semanticTypo.cardH5,
                    mb: 1,
                }}
            >
                {title}
            </Typography>

            <Typography
                component="p"
                sx={{
                    ...semanticTypo.cardB2,
                    mb: 3,
                    minHeight: 42,
                }}
            >
                {subtitle}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "baseline",
                    mb: 3,
                }}
            >
                <Typography
                    sx={{
                        ...semanticTypo.heroH2,
                        color: colors.primaryDark,
                        lineHeight: 1,
                    }}
                >
                    {price}
                </Typography>

                <Typography
                    sx={{
                        ...semanticTypo.cardB2,
                        ml: 1,
                    }}
                >
                    {priceSuffix}
                </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
                {features.map((feature, index) => (
                    <PricingFeature
                        key={index}
                        text={feature}
                    />
                ))}
            </Box>

        </Box>

        <Button
            fullWidth
            variant={isPrimary ? "contained" : "outlined"}
            sx={
                isPrimary
                    ? buttonStyle.primary
                    : buttonStyle.secondary
            }
        >
            {buttonText}
        </Button>
    </Box>
);

const PricingSection = () => (
    <Box
        component="section"
        id="pricing"
        sx={{
            py: { xs: 8, md: 10 }, 
            bgcolor: colors.white,
        }}
    >
        <Container maxWidth="lg">

            <Box sx={{ mb: 5 }}>

                <Typography
                    component="h2"
                    sx={{
                        ...semanticTypo.pageH3,
                        color: colors.primaryDark,
                        mb: 2,
                    }}
                >
                    Simple, Affordable Pricing
                </Typography>

                <Typography
                    component="p"
                    sx={{
                        ...semanticTypo.bodyB1,
                        maxWidth: 600,
                    }}
                >
                    Experiential Learning Journey.
                </Typography>

            </Box>

            <Grid container spacing={3}>

                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <PricingCard
                        title="Students"
                        subtitle="Perfect for university and early learning use."
                        price="Free"
                        priceSuffix="to start"
                        badge="Best Reach"
                        buttonText="Start Free"
                        isPrimary={true}
                        features={[
                            "Full simulation experience",
                            "Practical operations learning",
                            "Ideal for classroom use",
                            "No prior experience required",
                        ]}
                    />
                </Grid>

                <Grid
                    item
                    xs={12}
                    md={6}
                >
                    <PricingCard
                        title="Young Professionals"
                        subtitle="Affordable practical skill development."
                        price="$10"
                        priceSuffix="per Learn Capsule"
                        badge="Best Value"
                        buttonText="Get Started"
                        isPrimary={false}
                        features={[
                            "Complete simulation journey",
                            "Real-world business practice",
                            "Excellent value",
                            "Career-oriented learning",
                        ]}
                    />
                </Grid>

            </Grid>

        </Container>
    </Box>
);

export default PricingSection;