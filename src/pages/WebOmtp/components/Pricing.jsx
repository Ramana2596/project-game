// ==========================================================
// Component Name : Pricing
// Module         : WebOmtp (Landing)
// Purpose        : Plans for Students, Professionals, Academia and Industry
// Author/Version : UXLab V1.3 / v1.1
// AI Tags        : landing, pricing, plans, cta
// ==========================================================

// Imports
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { colors, layoutStyle, cardStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import SectionHead from "./SectionHead.jsx";
import { PLANS } from "../constants/content.js";

const Pricing = ({ onAction }) => {
  // Render
  return (
    <Box id="pricing" sx={{ py: { xs: 4, md: 6 }, scrollMarginTop: "88px" }}>
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 } }}>
        <SectionHead dense title="Simple, affordable pricing" text="Choose the plan that fits how you will use OMTP." />
        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" } }}>
          {PLANS.map((p) => (
            <Box key={p.name} sx={{ ...layoutStyle.panel, display: "flex", flexDirection: "column", ...(p.highlight && { border: `2px solid ${colors.primary}` }) }}>
              <Box sx={cardStyle.badge(colors.primary)}>{p.tag}</Box>
              <Typography sx={{ ...masterTypo.h4, color: colors.title, mt: 1.5 }}>{p.name}</Typography>
              <Typography sx={{ ...masterTypo.body2, color: colors.body, mt: 0.5 }}>{p.desc}</Typography>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, my: 2 }}>
                <Typography sx={{ ...masterTypo.h3, color: colors.primaryDark }}>{p.price}</Typography>
                {p.unit && <Typography sx={{ ...masterTypo.caption, color: colors.subtitle }}>{p.unit}</Typography>}
              </Box>
              <Box sx={{ flexGrow: 1, mb: 3 }}>
                {p.points.map((pt) => (
                  <Box key={pt} sx={{ display: "flex", gap: 1, mb: 0.75 }}>
                    <CheckCircleIcon sx={{ fontSize: 20, color: colors.primary }} />
                    <Typography sx={{ ...masterTypo.body2, color: colors.heading }}>{pt}</Typography>
                  </Box>
                ))}
              </Box>
              <Button onClick={() => onAction(p.action)} sx={{ ...(p.highlight ? buttonStyle.primary : buttonStyle.secondary), width: "100%" }}>{p.cta}</Button>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Pricing;