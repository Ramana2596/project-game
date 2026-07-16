// ==========================================
// Component: Value Propositions (UXLab V1.0)
// ==========================================

import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";

import {
  colors,
  cardStyle,
  semanticTypo,
} from "../../../ux/styles";

const valueCards = [
  {
    title: "Real Decisions",
    desc: "Choose strategy, production, and sales inside a realistic business environment.",
    icon: "🎯",
  },
  {
    title: "Instant Feedback",
    desc: "See how every decision affects profitability and operating results.",
    icon: "📈",
  },
  {
    title: "Practical Learning",
    desc: "Build judgment through experience and repeated improvement.",
    icon: "🧠",
  },
];

const ValueProps = () => (
  <Box
    component="section"
    sx={{
      py: 6,
      background: colors.pageGradient,
      position: "relative",

      "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at left center, rgba(123,31,162,.04), transparent 55%)",
        pointerEvents: "none",
      },
    }}
  >
    <Container maxWidth="lg">

      {/* Section Header */}

      <Box sx={{ mb: 4 }}>
        <Typography
          component="h2"
          variant="h3"
          sx={{
            ...semanticTypo.pageH3,
            background: colors.heroGradient,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Learn by Running a Business
        </Typography>

        <Typography
          component="p"
          variant="body2"
          sx={{
            ...semanticTypo.sectionB1,
            maxWidth: 600,
          }}
        >
          OMTP connects operations, strategy, and finance through one
          practical experience.
        </Typography>
      </Box>

      {/* Cards */}

      <Grid
        container
        spacing={2}
        sx={{
          flexWrap: "nowrap",
          overflowX: { xs: "auto", md: "visible" },
          pb: { xs: 2, md: 0 },
        }}
      >
        {valueCards.map((card, index) => (
          <Grid
            item
            xs={4}
            key={index}
            sx={{
              minWidth: {
                xs: 260,
                md: "auto",
              },
            }}
          >
            <Box
              sx={{
                ...cardStyle.primary,

                p: 2.5,
                borderRadius: 4,

                display: "flex",
                flexDirection: "column",
                gap: 1,

                height: "100%",
                maxHeight: 170,

                "&:hover": {
                  ...cardStyle.primary["&:hover"],
                },
              }}
            >

              {/* Icon */}

              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  background: colors.heroGradient,
                  color: colors.white,
                  boxShadow: "0 6px 18px rgba(123,31,162,.22)", fontSize: "1.4rem",
                }}
              >
                {card.icon}
              </Box>

              {/* Title */}

              <Typography
                component="h3"
                variant="h5"
                sx={{
                  ...semanticTypo.cardH5,
                }}
              >
                {card.title}
              </Typography>

              {/* Description */}

              <Typography
                component="p"
                variant="body2"
                sx={{
                  ...semanticTypo.cardB2,
                  lineHeight: 1.45,
                }}
              >
                {card.desc}
              </Typography>

            </Box>
          </Grid>
        ))}
      </Grid>

    </Container>
  </Box>
);

export default ValueProps;