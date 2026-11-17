// ==========================================================
// Component Name : Industry
// Module         : WebOmtp (Landing)
// Purpose        : Industry story - customer-built simulation for business analytics
// Author/Version : UXLab V1.3 / v1.5
// AI Tags        : landing, industry, analytics, custom-simulation, cta
// ==========================================================

// Imports
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { colors, layoutStyle, cardStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import SectionHead from "./SectionHead.jsx";
import ShotFrame from "./ShotFrame.jsx";
import { INDUSTRY } from "../constants/content.js";
import shotOperations from "../../../assets/web-omtp/OperationsPlan.png";

const Industry = ({ onAction }) => {
  // Render
  return (
    <Box id="industry" sx={{ py: { xs: 4, md: 6 }, background: colors.panel, scrollMarginTop: "88px" }}>
      {/* Same method as Steps: text column fixed narrow at lg, the screenshot takes all the rest */}
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 }, display: "grid", gap: 5, alignItems: "center", gridTemplateColumns: { xs: "minmax(0, 1fr)", md: "minmax(0, 5fr) minmax(0, 7fr)", lg: "440px minmax(0, 1fr)" } }}>
        <Box>
          {/* Shared heading: dense and left-aligned to sit beside the screenshot */}
          <SectionHead dense align="left" title={INDUSTRY.title} text={INDUSTRY.text} />
          {/* Numbered because it is a real sequence */}
          {INDUSTRY.flow.map((f, i) => (
            <Box key={f.title} sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Box sx={{ ...cardStyle.statIconCircle(colors.primary), width: 40, height: 40, minWidth: 40, color: colors.onPrimary, fontWeight: 700 }}>{i + 1}</Box>
              <Box>
                <Typography sx={{ ...masterTypo.h6, color: colors.title }}>{f.title}</Typography>
                <Typography sx={{ ...masterTypo.body2, color: colors.body }}>{f.text}</Typography>
              </Box>
            </Box>
          ))}
          <Button onClick={() => onAction("contact")} sx={{ ...buttonStyle.primary, mt: 1 }}>{INDUSTRY.cta}</Button>
        </Box>
        <ShotFrame src={shotOperations} alt="OMTP operations plan view used for customer-built simulations" />
      </Box>
    </Box>
  );
};

export default Industry;