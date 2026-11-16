// ==========================================================
// Component Name : FinalCta
// Module         : WebOmtp (Landing)
// Purpose        : Closing call to action on the hero gradient
// Author/Version : UXLab V1.3 / v1.0
// AI Tags        : landing, cta, demo, get-started
// ==========================================================

// Imports
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { colors, layoutStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import { FINAL_CTA } from "../constants/content.js";

// Constants: paired colours on gradient - white button with purple text; outline button white text, inverts on hover
const ON_GRADIENT_FILLED = { ...buttonStyle.secondary, "&:hover": { background: colors.primarySoft, color: colors.primaryDark, borderColor: colors.primarySoft } };
const ON_GRADIENT_OUTLINE = {
  ...buttonStyle.secondary, background: "transparent", color: colors.onPrimary, borderColor: colors.onPrimary,
  "&:hover": { background: colors.onPrimary, color: colors.primaryDark, borderColor: colors.onPrimary },
};

const FinalCta = ({ onDemo, onStart }) => {
  // Render
  return (
    <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 }, py: { xs: 5, md: 8 } }}>
      <Box sx={{ ...layoutStyle.flexRow, flexWrap: "wrap", p: { xs: 3, md: 5 }, borderRadius: 4, background: colors.heroGradient }}>
        <Box sx={{ maxWidth: 580 }}>
          <Typography component="h2" sx={{ ...masterTypo.h3, color: colors.onPrimary }}>{FINAL_CTA.title}</Typography>
          <Typography sx={{ ...masterTypo.body1, color: colors.onPrimary, mt: 1 }}>{FINAL_CTA.text}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
          <Button onClick={onDemo} sx={ON_GRADIENT_FILLED}>Try the Demo</Button>
          <Button onClick={onStart} sx={ON_GRADIENT_OUTLINE}>Get Started Free</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FinalCta;
