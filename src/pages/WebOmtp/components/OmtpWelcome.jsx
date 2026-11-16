// ==========================================================
// Component Name : OmtpWelcome
// Module         : WebOmtp (Landing)
// Purpose        : Opening welcome section - first section of the WebOmtp page
// Author/Version : UXLab V1.3 / v1.4
// AI Tags        : landing, welcome, hero, omtp, introduction
// ==========================================================

// Imports
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { keyframes } from "@mui/material/styles";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { buttonStyle, colors, layoutStyle, masterTypo } from "../../../ux/styles";

// Constants: local animations (self-contained, no global CSS needed)
const float = keyframes`0%, 100% { transform: translateX(0); } 50% { transform: translateX(6%); }`;
const slideInLeft = keyframes`from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); }`;
const slideInRight = keyframes`from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); }`;
const EASE = "cubic-bezier(.34,1.56,.64,1)";
const MOTION_OK = "@media (prefers-reduced-motion: no-preference)";

const OmtpWelcome = ({ id = "hero", onExplore, onStart }) => {
  // Render
  return (
    <Box
      id={id}
      component="section"
      aria-labelledby="welcome-heading"
      sx={{
        background: colors.pageGradient,
        position: "relative",
        py: { xs: 4, md: 6 },
        overflow: "hidden",
        scrollMarginTop: "88px",

        // Soft brand glows from palette tokens
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-50%",
          width: "200%",
          height: "100%",
          background: `radial-gradient(circle at 20% 50%, ${colors.primarySelected} 0%, transparent 50%)`,
          [MOTION_OK]: { animation: `${float} 20s ease-in-out infinite` },
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          right: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.primarySelected} 0%, transparent 70%)`,
        },
      }}
    >
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 }, position: "relative", zIndex: 1 }}>

        {/* OMTP identity */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography component="h1" sx={{ ...masterTypo.h1, color: colors.primary, mb: 1 }}>
            Welcome to  O M T P
          </Typography>
          <Typography component="p" sx={{ ...masterTypo.h5, color: colors.heading }}>
            An integrated learning, training, simulation and business analytics platform
          </Typography>
        </Box>

        {/* Welcome content */}
        <Box sx={{ display: "grid", gap: 3, alignItems: "center", gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "repeat(2, minmax(0, 1fr))" } }}>

          {/* Left content */}
          <Box sx={{ [MOTION_OK]: { animation: `${slideInLeft} .8s ${EASE} both` } }}>
            <Typography
              id="welcome-heading"
              component="h2"
              sx={{
                ...masterTypo.h2,
                color: colors.primary, // fallback where gradient text is unsupported
                mb: 2,
                background: colors.heroGradient,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Master your Operations Management Skills!
            </Typography>

            <Typography component="p" sx={{ ...masterTypo.body1, color: colors.body, mb: 3, maxWidth: 540 }}>
              Learn to make strategic and operational decisions in a realistic business simulation.
              Experience the real impact of your choices on company performance.
            </Typography>

            {/* Welcome actions */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button onClick={onExplore} endIcon={<ArrowForwardIcon />} sx={buttonStyle.primary}>
                Explore OMTP
              </Button>
              <Button onClick={onStart} sx={buttonStyle.secondary}>
                Get Started
              </Button>
            </Box>
          </Box>

          {/* Right illustration */}
          <Box sx={{ perspective: "1200px", [MOTION_OK]: { animation: `${slideInRight} .8s ${EASE} both` } }}>
            <Box
              sx={{
                height: 320,
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: `0 20px 60px ${colors.shadowColor}`,
                transform: "rotateY(-5deg)",
                transition: "transform .3s ease",
                background: colors.heroGradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 3,
                "&:hover": { transform: "rotateY(0deg) translateY(-6px)" },
              }}
            >
              <RocketLaunchIcon sx={{ fontSize: 80, color: colors.white, opacity: 0.9 }} />
              <Typography
                component="h3"
                sx={{ ...masterTypo.h4, color: colors.white, textAlign: "center", px: 2,   whiteSpace: "pre-line", }}
              >
                Real-time Interactive
                {"\n"}
                Operations Management Training Platform
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OmtpWelcome;