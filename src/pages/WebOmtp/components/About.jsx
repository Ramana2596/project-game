// ==========================================================
// Component Name : About
// Module         : WebOmtp (Landing)
// Purpose        : About Us - mission, team and commitment
// Author/Version : UXLab V1.3 / v1.0
// AI Tags        : landing, about, mission, team
// ==========================================================

// Imports
import React from "react";
import { Box, Typography } from "@mui/material";
import { colors, layoutStyle, masterTypo } from "../../../ux/styles";
import SectionHead from "./SectionHead.jsx";
import { ABOUT } from "../constants/content.js";

const About = () => {
  // Render
  return (
    <Box id="about" sx={{ py: { xs: 5, md: 8 }, background: colors.panel, scrollMarginTop: "88px" }}>
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 } }}>
        <SectionHead title={ABOUT.title} text={ABOUT.text} />
        <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" } }}>
          {ABOUT.items.map((a) => (
            <Box key={a.title} sx={{ ...layoutStyle.compactPanel, p: 3 }}>
              <Typography sx={{ ...masterTypo.h5, color: colors.primaryDark }}>{a.title}</Typography>
              <Typography sx={{ ...masterTypo.body2, color: colors.body, mt: 0.75 }}>{a.text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default About;