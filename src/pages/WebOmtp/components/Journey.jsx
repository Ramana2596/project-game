// ==========================================================
// Component Name : Journey
// Module         : WebOmtp (Landing)
// Purpose        : Learn - Decide - See Results flow that explains OMTP in three moves
// Author/Version : UXLab V1.3 / v1.1
// AI Tags        : landing, journey, learn, decide, results
// ==========================================================

// Imports
import React from "react";
import { Box, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TuneIcon from "@mui/icons-material/Tune";
import BarChartIcon from "@mui/icons-material/BarChart";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { colors, layoutStyle, cardStyle, masterTypo } from "../../../ux/styles";
import SectionHead from "./SectionHead.jsx";
import { JOURNEY } from "../constants/content.js";

// Constants: icon key to MUI icon
const ICONS = { learn: MenuBookIcon, decide: TuneIcon, results: BarChartIcon };

const Journey = () => {
  // Render
  return (
    <Box sx={{ py: { xs: 4, md: 5 }, background: colors.paper }}>
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 } }}>
        <SectionHead
          dense
          title="How OMTP works"
          text="Run a virtual business, make strategic and operational decisions, and review the resulting business performance."
        />

        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "center", gap: { xs: 2, md: 3 } }}>
          {JOURNEY.map((j, i) => {
            const Icon = ICONS[j.icon];
            return (
              <React.Fragment key={j.title}>
                <Box sx={{ textAlign: "center", maxWidth: 240 }}>
                  <Box sx={{ ...cardStyle.iconBox, ...cardStyle.iconBoxCircle, mx: "auto", mb: 1 }}><Icon /></Box>
                  <Typography sx={{ ...masterTypo.h5, color: colors.title }}>{j.title}</Typography>
                  <Typography sx={{ ...masterTypo.body2, color: colors.body, mt: 0.5 }}>{j.text}</Typography>
                </Box>
                {i < JOURNEY.length - 1 && <ArrowForwardIcon sx={{ color: colors.primary, transform: { xs: "rotate(90deg)", md: "none" } }} />}
              </React.Fragment>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Journey;