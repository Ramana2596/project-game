// ==========================================================
// Component Name : Audiences
// Module         : WebOmtp (Landing)
// Purpose        : "One platform, four ways to use it" - Learn, Teach, Hone, Analyse cards with step flows
// Author/Version : UXLab V1.3 / v1.3
// AI Tags        : landing, audiences, students, academia, professionals, industry, step-flow
// ==========================================================

// Imports
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { colors, layoutStyle, cardStyle, buttonStyle, masterTypo } from "../../../ux/styles";
import SectionHead from "./SectionHead.jsx";
import { AUDIENCES, AUDIENCES_HEAD } from "../constants/audiences.js";

// Constants: icon key to MUI icon
const ICONS = { school: SchoolIcon, groups: GroupsIcon, work: WorkIcon, analytics: AnalyticsIcon };

// Constants: numbered step marker (caption token for the number, 24px to match the body2 line box)
const STEP_DOT = {
  ...cardStyle.statIconCircle(colors.primary),
  ...masterTypo.caption,
  width: 24,
  height: 24,
  minWidth: 24,
  color: colors.onPrimary,
  fontWeight: 700,
};

const Audiences = ({ onAction }) => {

  // Render
  return (
    <Box id="audiences" sx={{ py: { xs: 4, md: 6 }, scrollMarginTop: "88px" }}>
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 } }}>
        <SectionHead dense title={AUDIENCES_HEAD.title} text={AUDIENCES_HEAD.text} />
        <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "minmax(0, 1fr)", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" } }}>
          {AUDIENCES.map((a) => {
            const Icon = ICONS[a.icon];
            return (
              <Box key={a.key} sx={cardStyle.primary}>
                <Box sx={{ p: 2.5, display: "flex", flexDirection: "column", height: "100%" }}>
                  {/* Audience and verb */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                    <Box sx={cardStyle.iconBox}><Icon /></Box>
                    <Box>
                      <Box sx={cardStyle.badge(colors.primary)}>{a.verb}</Box>
                      <Typography sx={{ ...masterTypo.h5, color: colors.title, mt: 0.25 }}>{a.label}</Typography>
                    </Box>
                  </Box>

                  {/* Service line */}
                  <Typography sx={{ ...masterTypo.body2, color: colors.body, mb: 1.5 }}>{a.text}</Typography>

                  {/* Step flow */}
                  <Box component="ol" sx={{ listStyle: "none", p: 0, m: 0, mb: 2, flexGrow: 1 }}>
                    {a.steps.map((s, i) => (
                      <Box component="li" key={s} sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 0.75, "&:last-of-type": { mb: 0 } }}>
                        <Box sx={STEP_DOT}>{i + 1}</Box>
                        <Typography sx={{ ...masterTypo.body2, color: colors.heading, fontWeight: 600 }}>{s}</Typography>
                      </Box>
                    ))}
                  </Box>

                  <Button onClick={() => onAction(a.action)} sx={{ ...buttonStyle.primary, width: "100%" }}>{a.cta}</Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Audiences;