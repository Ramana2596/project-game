// ==========================================
// Component: Hero Section (UXLab V1.0)
// ==========================================

import React from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Stack,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import imgDashboard from "../../../assets/DemoPicture/Dashboard.jpg";

import {
  colors,
  buttonStyle,
  semanticTypo,
} from "../../../ux/styles";

const HeroSection = ({ handleDemoLogin }) => {

  const scrollToSteps = () => {
    document
      .getElementById("how-it-works")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",

        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 10 },

        background: colors.pageGradient,

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          left: "-50%",
          width: "200%",
          background:
            "radial-gradient(circle at 20% 50%, rgba(123,31,162,.08) 0%, transparent 50%)",
          animation: "heroFloat 22s ease-in-out infinite",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          right: "-120px",
          bottom: "-120px",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(123,31,162,.07) 0%, transparent 70%)",
        },

        "@keyframes heroFloat": {
          "0%": {
            transform: "translateX(0px)",
          },
          "50%": {
            transform: "translateX(60px)",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },

        "@keyframes slideInLeft": {
          from: {
            opacity: 0,
            transform: "translateX(-40px)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0)",
          },
        },

        "@keyframes slideInRight": {
          from: {
            opacity: 0,
            transform: "translateX(40px)",
          },
          to: {
            opacity: 1,
            transform: "translateX(0)",
          },
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
          spacing={8}
          alignItems="center"
        >
          {/* LEFT SIDE */}

          <Grid item xs={12} md={6}>
            <Stack
              spacing={0}
              sx={{
                textAlign: "left",
                alignItems: "flex-start",
                animation:
                  "slideInLeft .8s cubic-bezier(.34,1.56,.64,1) both",
              }}
            >
              {/* Purpose: Hero label */}

              <Typography
                component="p"
                sx={{
                  ...semanticTypo.caption,
                  bgcolor: colors.hover,
                  color: colors.primary,
                  px: 2.5,
                  py: 1,
                  borderRadius: "100px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  display: "inline-flex",
                  mb: 2.5,
                }}
              >
                REAL-TIME BUSINESS SIMULATION
              </Typography>

              {/* Purpose: Hero title */}

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
                Run a Business.
                <br />
                Make Decisions.
                <br />
                See Real Results.
              </Typography>

              {/* Purpose: Hero subtitle */}

              <Typography
                component="p"
                sx={{
                  ...semanticTypo.bodyB1,
                  mb: 4,
                  maxWidth: 520,
                }}
              >
                Experience how strategy, market intelligence,
                and operations connect in one complete business
                cycle. Built for students, professionals and
                institutions.
              </Typography>

              {/* Purpose: Primary actions */}

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2.5}
                sx={{
                  mb: 6,
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleDemoLogin}
                  sx={{
                    ...buttonStyle.primary,
                    px: 4.5,
                    py: 2,
                    borderRadius: "100px",
                    boxShadow:
                      "0 8px 24px rgba(123,31,162,.35)",

                    "&:hover": {
                      ...buttonStyle.primary["&:hover"],
                      boxShadow:
                        "0 12px 32px rgba(123,31,162,.45)",
                    },
                  }}
                >
                  Try Live Simulation
                </Button>

                <Button
                  variant="outlined"
                  onClick={scrollToSteps}
                  sx={{
                    ...buttonStyle.secondary,
                    px: 3.5,
                    py: 2,
                    borderRadius: "100px",
                  }}
                >
                  See the 7 Steps
                </Button>
              </Stack>

              {/* Purpose: Key highlights */}

              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  flexWrap: "wrap",
                  color: colors.body,
                }}
              >
                {[
                  "No experience required",
                  "Built for learners",
                  "End-to-end simulation",
                ].map((point) => (
                  <Box
                    key={point}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <CheckIcon
                      sx={{
                        color: colors.primary,
                        fontSize: "1.2rem",
                        mr: 1,
                      }}
                    />

                    <Typography
                      component="span"
                      sx={{
                        ...semanticTypo.caption,
                        fontWeight: 600,
                      }}
                    >
                      {point}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Grid>

          {/* RIGHT SIDE */}

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
                  p: { xs: 1.5, md: 2 },
                  borderRadius: "24px",
                  overflow: "hidden",

                  background: colors.heroGradient,

                  boxShadow:
                    "0 20px 60px rgba(123,31,162,.25)",

                  transform: "rotateY(-5deg)",
                  transition: "all .35s ease",

                  "&:hover": {
                    transform:
                      "rotateY(0deg) translateY(-6px)",
                    boxShadow:
                      "0 28px 72px rgba(123,31,162,.35)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={imgDashboard}
                  alt="OMTP Dashboard Preview"
                  sx={{
                    display: "block",
                    width: "100%",
                    borderRadius: "16px",
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
