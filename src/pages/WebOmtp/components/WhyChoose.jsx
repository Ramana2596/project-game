// ==========================================================
// Component Name : WhyChoose
// Module         : WebOmtp (Landing)
// Purpose        : "Why Choose OMTP?" strip - four short benefits shown directly under the Hero
// Author/Version : UXLab V1.3 / v1.0
// AI Tags        : landing, benefits, why-choose, omtp
// ==========================================================

// Imports
import React from "react";
import { Box, Typography } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import LayersIcon from "@mui/icons-material/Layers";
import GroupsIcon from "@mui/icons-material/Groups";
import { colors, layoutStyle, cardStyle, masterTypo } from "../../../ux/styles";
import { WHY_CHOOSE } from "../constants/content.js";

// Constants: item id (from WHY_CHOOSE.items) to MUI icon
const ICONS = { decisions: BarChartIcon, operations: SettingsIcon, acumen: LayersIcon, learners: GroupsIcon };

const WhyChoose = () => {
  // Render
  return (
    <Box
      component="section"
      id="why-choose-omtp"
      aria-labelledby="why-choose-omtp-title"
      sx={{ background: colors.paper, borderTop: `1px solid ${colors.border}`, borderBottom: `1px solid ${colors.border}` }}
    >
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 }, py: 5 }}>
        <Typography id="why-choose-omtp-title" component="h2" sx={{ ...masterTypo.h4, color: colors.primary, textAlign: "center", mb: 3 }}>
          {WHY_CHOOSE.title}
        </Typography>

        <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" } }}>
          {WHY_CHOOSE.items.map((b) => {
            const Icon = ICONS[b.id];
            return (
              <Box key={b.id} sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Box aria-hidden="true" sx={cardStyle.iconBoxSmall}>{Icon && <Icon />}</Box>
                <Box>
                  <Typography component="h3" sx={{ ...masterTypo.h6, color: colors.title, mb: 0.5 }}>{b.title}</Typography>
                  <Typography sx={{ ...masterTypo.body2, color: colors.body }}>{b.text}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default WhyChoose;