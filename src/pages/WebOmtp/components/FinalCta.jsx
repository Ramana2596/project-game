
 // ==========================================================
 // Component Name : FinalCta
 // Module         : WebOmtp (Landing)
 // Purpose        : Closing call to action on the hero gradient
 // Author/Version : UXLab V1.3 / v1.4
 // AI Tags        : landing, cta, demo, get-started
 // ==========================================================

// Imports
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { colors, layoutStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import { FINAL_CTA } from "../constants/content.js";

// Constants: paired colours on gradient
const ON_GRADIENT_FILLED = {
  ...buttonStyle.primary,
  ...masterTypo.button,
  ...buttonStyle.large,
  background: colors.onPrimary,
  color: colors.primaryDark,
  "&:hover": { background: colors.primarySoft, color: colors.primaryDark, borderColor: colors.primarySoft },
};

const ON_GRADIENT_OUTLINE = {
  ...buttonStyle.secondary,
  ...masterTypo.button,
  ...buttonStyle.large,
  background: "transparent",
  color: colors.onPrimary,
  borderColor: colors.onPrimary,
  "&:hover": { background: colors.onPrimary, color: colors.primaryDark, borderColor: colors.onPrimary },
};

// Constants: rounded-rectangle card, centred stack
const CARD = {
  ...layoutStyle.flexColumn,
  ...layoutStyle.contentNarrow,
  alignItems: "center",
  textAlign: "center",
  gap: 2,
  px: { xs: 3, md: 6 },
  py: { xs: 4, md: 5 },
  borderRadius: 4,
  background: colors.heroGradient,
  boxShadow: `0 6px 16px ${colors.primary}33`,
};

// Constants: responsive button arrangement
const ACTIONS = {
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "center",
  gap: 1.5,
  width: { xs: "100%", sm: "auto" },
  "& .MuiButton-root": { width: { xs: "100%", sm: "auto" }, whiteSpace: "nowrap" },
};

const FinalCta = ({ onDemo, onStart }) => {
  // Render
  return (
    <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 }, py: { xs: 4, md: 6 } }}>
      <Box sx={CARD}>
        <Box sx={{ maxWidth: 580 }}>
          <Typography component="h2" sx={{ ...masterTypo.h3, color: colors.onPrimary }}>
            {FINAL_CTA.title}
          </Typography>
          <Typography sx={{ ...masterTypo.body1, color: colors.onPrimary, mt: 0.5 }}>
            {FINAL_CTA.text}
          </Typography>
        </Box>
        <Box sx={ACTIONS}>
          <Button onClick={onStart} sx={ON_GRADIENT_FILLED}>Get Started</Button>
          <Button onClick={onDemo} sx={ON_GRADIENT_OUTLINE}>Try the Demo</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FinalCta;
