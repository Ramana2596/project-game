// ==========================================================
// Component Name : Features
// Module         : WebOmtp (Landing)
// Purpose        : Key features of the OMTP engine as cards
// Author/Version : UXLab V1.3 / v1.3
// AI Tags        : landing, features, cards, strategy, market, operations, finance
// ==========================================================

// Imports
import React from "react";
import { Box, Typography } from "@mui/material";
import FactoryIcon from "@mui/icons-material/Factory";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import HistoryIcon from "@mui/icons-material/History";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { colors, layoutStyle, cardStyle, masterTypo } from "../../../ux/styles";
import SectionHead from "./SectionHead.jsx";
import { FEATURES } from "../constants/content.js";

// Constants: icon key to MUI icon
const ICONS = { sim: FactoryIcon, decisions: TrackChangesIcon, periods: CalendarMonthIcon, touch: TouchAppIcon, history: HistoryIcon, demo: PlayCircleIcon, flow: AccountTreeIcon, assess: AssignmentIcon, rank: LeaderboardIcon };

// Constants: static (non-clickable) card - standard surface with the hover lift, border change and transition switched off
const CARD = {
  ...cardStyle.primary,
  transition: "none",
  "&:hover": { transform: "none", boxShadow: cardStyle.primary.boxShadow, borderColor: colors.border },
};

// Constants: tighter card content - padding p:2 as in layoutStyle.compactPanel, gap 2 as in layoutStyle.flexRow
const CARD_CONTENT = { ...cardStyle.content, p: 2, gap: 2 };

const Features = () => {
  // Render
  return (
    <Box id="features" sx={{ py: { xs: 4, md: 6 }, scrollMarginTop: "88px" }}>
      <Box sx={{ ...layoutStyle.pageContainer, px: { xs: 2, md: 4 } }}>
        <SectionHead dense title="Key features" text="Everything you need to learn operations by doing, at your own pace." />
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" } }}>
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <Box key={f.title} sx={CARD}>
                <Box sx={CARD_CONTENT}>
                  <Box sx={cardStyle.iconBoxSmall}><Icon /></Box>
                  <Box>
                    <Typography sx={{ ...cardStyle.title, ...masterTypo.h5 }}>{f.title}</Typography>
                    <Typography sx={{ ...masterTypo.body2, color: colors.body, mt: 0.5 }}>{f.text}</Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Features;