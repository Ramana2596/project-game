// ==========================================================
// Component Name : Industry
// Module         : WebOmtp (Landing)
// Purpose        : Industry story - customer-built simulation for business analytics
// Author/Version : UXLab V1.3 / v1.0
// AI Tags        : landing, industry, analytics, custom-simulation, cta
// ==========================================================

// Imports
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { colors, layoutStyle, cardStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import ShotFrame from "./ShotFrame.jsx";
import { INDUSTRY } from "../constants/content.js";
import shotOperations from "../../../assets/web-omtp/OperationsPlan.png";

const Industry = ({ onAction }) => {
  // Render
  return (
    <Box id="industry" sx={{ py: { xs: 5, md: 8 }, background: colors.panel, scrollMarginTop: "88px" }}>
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 }, display: "grid", gap: 5, alignItems: "center", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
        <Box>
          <Typography component="h2" sx={{ ...masterTypo.h2, color: colors.primaryDark }}>{INDUSTRY.title}</Typography>
          <Typography sx={{ ...masterTypo.body1, color: colors.body, my: 2 }}>{INDUSTRY.text}</Typography>
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
