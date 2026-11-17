// ==========================================================
// Component Name : Hero
// Module         : WebOmtp (Landing)
// Purpose        : First impression - headline, calls to action and live Control Centre preview
// Author/Version : UXLab V1.3 / v1.1
// AI Tags        : landing, hero, cta, screenshot, control-centre
// ==========================================================

// Imports
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { colors, layoutStyle, cardStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import ShotFrame from "./ShotFrame.jsx";
import { HERO } from "../constants/content.js";
import shotControlCentre from "../../../assets/web-omtp/BSCC.png";

const Hero = ({ onDemo, onStart }) => {
  // AI Extension Hook (placeholder): Learning Coach welcome message
  // const aiWelcome = useAiLearningCoach(); // future

  // Render
  return (
    <Box id="overview" sx={{ background: colors.pageGradient, py: { xs: 4, md: 6 }, scrollMarginTop: "88px" }}>
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 }, display: "grid", gap: 5, alignItems: "center", gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" } }}>
        {/* Message */}
        <Box>
          <Typography sx={{ ...masterTypo.h6, color: colors.primary }}>{HERO.eyebrow}</Typography>

          {/* Headline: one line per entry, accent in primary colour */}
          <Typography component="h1" sx={{ ...masterTypo.h2, color: colors.title, my: 2 }}>
            {HERO.titleLines.map((l) => (
              <Box component="span" key={l.text} sx={{ display: "block" }}>
                {l.text}
                {l.accent && <Box component="span" sx={{ color: colors.primary }}>{l.accent}</Box>}
              </Box>
            ))}
          </Typography>

          <Typography sx={{ ...masterTypo.body1, color: colors.body, maxWidth: 540 }}>{HERO.text}</Typography>

          <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap", mt: 3 }}>
            <Button onClick={onDemo} startIcon={<PlayCircleOutlineIcon />} sx={buttonStyle.primary}>Try the Demo</Button>
            <Button onClick={onStart} endIcon={<ArrowForwardIcon />} sx={buttonStyle.secondary}>Get Started</Button>
          </Box>

          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, mt: 3, display: "flex", gap: 2.5, flexWrap: "wrap" }}>
            {HERO.checks.map((c) => (
              <Box component="li" key={c} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <CheckCircleIcon sx={{ fontSize: 20, color: colors.primary }} />
                <Typography sx={{ ...masterTypo.body2, color: colors.heading }}>{c}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Live product preview */}
        <Box sx={{ position: "relative" }}>
          <ShotFrame src={shotControlCentre} alt="OMTP Business Simulation Control Centre" frame="device" />
          <Box sx={{ ...cardStyle.badge(colors.primary), position: "absolute", top: -14, right: 16, background: colors.paper, border: `1px solid ${colors.border}`, px: 2, py: 0.75 }}>
            Strategy → Operations → Results
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;