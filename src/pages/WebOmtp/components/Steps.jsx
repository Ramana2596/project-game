// ==========================================================
// Component Name : Steps
// Module         : WebOmtp (Landing)
// Purpose        : Interactive 7-step walkthrough with real OMTP screens
// Author/Version : UXLab V1.3 / v1.3
// AI Tags        : landing, walkthrough, steps, tabs, screenshots
// ==========================================================

// Imports
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { colors, layoutStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import SectionHead from "./SectionHead.jsx";
import ShotFrame from "./ShotFrame.jsx";
import { STEPS } from "../constants/steps.js";

// Constants: paired colours - selected step keeps white text on dark background, also on hover
const ACTIVE_TAB = {
  ...buttonStyle.tabActive,
  "&:hover": { background: colors.primaryDark, color: colors.onPrimary },
};

const Steps = () => {
  // State: selected step index
  const [index, setIndex] = useState(0);

  // Derived: current step and bounds
  const step = STEPS[index];
  const isFirst = index === 0;
  const isLast = index === STEPS.length - 1;

  // AI Extension Hook (placeholder): Learning Coach tip for the current step
  // const aiStepTip = useAiLearningCoach(step.title); // future

  // Render
  return (
    <Box id="steps" sx={{ py: { xs: 4, md: 6 }, background: colors.panel, scrollMarginTop: "88px" }}>
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 } }}>
        <SectionHead dense title="The 7-step walkthrough" text="See exactly what you will do in the OMTP simulation." />
        <Box sx={{ ...layoutStyle.panel, display: "grid", gap: 2.5, gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "200px minmax(0, 1fr)" } }}>
          {/* Step list (narrower column, more width for the screen) */}
          <Box role="tablist" aria-label="Simulation steps" sx={{ display: "flex", flexDirection: { xs: "row", md: "column" }, gap: 0.5, overflowX: "auto" }}>
            {STEPS.map((s, i) => (
              <Button key={s.title} role="tab" aria-selected={i === index} onClick={() => setIndex(i)}
                sx={{ ...buttonStyle.tab, justifyContent: "flex-start", whiteSpace: "nowrap", flexShrink: 0, ...(i === index && ACTIVE_TAB) }}>
                {i + 1}. {s.short}
              </Button>
            ))}
          </Box>

          {/* Step detail */}
          <Box role="tabpanel" sx={{ minWidth: 0 }}>
            <Typography sx={{ ...masterTypo.caption, color: colors.primary }}>Step {index + 1} of {STEPS.length}</Typography>
            <Typography component="h3" sx={{ ...masterTypo.h4, color: colors.title }}>{step.title}</Typography>
            <Typography sx={{ ...masterTypo.body2, color: colors.body, mt: 0.5, mb: 1.5 }}>{step.text}</Typography>
            {/* Learn list gets a fixed narrow column; the screen takes all the rest */}
            <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "230px minmax(0, 1fr)" }, alignItems: "start" }}>
              <Box sx={{ ...layoutStyle.compactPanel, background: colors.primarySoft }}>
                <Typography sx={{ ...masterTypo.h6, color: colors.onPrimarySoft, mb: 1 }}>You will learn to:</Typography>
                {step.learn.map((l) => (
                  <Box key={l} sx={{ display: "flex", gap: 1, mb: 0.75 }}>
                    <CheckCircleIcon sx={{ fontSize: 18, color: colors.primary, mt: "2px" }} />
                    <Typography sx={{ ...masterTypo.body2, color: colors.heading }}>{l}</Typography>
                  </Box>
                ))}
              </Box>
              <ShotFrame src={step.shot} alt={`${step.title} screen in OMTP`} />
            </Box>
            <Box sx={{ ...layoutStyle.flexRight, gap: 1.5, mt: 2 }}>
              <Button disabled={isFirst} onClick={() => setIndex(index - 1)} startIcon={<ArrowBackIcon />} sx={buttonStyle.secondary}>Previous</Button>
              <Button disabled={isLast} onClick={() => setIndex(index + 1)} endIcon={<ArrowForwardIcon />} sx={buttonStyle.primary}>Next Step</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Steps;