// Component: SrHeader
// Module: StrategyResults
// Purpose: render page heading and team context
// Author/Version: OpsMgt UX Lab / v2.0
// AI Tags: strategy, results, header, team

import React from "react";
import { Box, Typography } from "@mui/material";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import { layoutStyle, masterTypo, colors } from "../../../ux/styles";
import {
  SR_TITLE,
  SR_SUBTITLE,
} from "../constants/srConstants";

export default function SrHeader({ team }) {
  return (
    <Box sx={layoutStyle.pageHeader}>
      {team && (
        <Box
          sx={{
            ...layoutStyle.pageHeaderDatePill,
            position: { xs: "static", md: "absolute" },
            mb: { xs: 1.5, md: 0 },
            display: "flex",
            alignItems: "center",
            gap: 0.75,
          }}
        >
          <GroupsOutlinedIcon fontSize="small" />
          {team}
        </Box>
      )}

      <Typography
        component="h1"
        sx={{
          ...masterTypo.h3,
          color: colors.title,
        }}
      >
        {SR_TITLE}
      </Typography>

      <Typography
        sx={{
          ...masterTypo.body1,
          color: colors.subtitle,
        }}
      >
        {SR_SUBTITLE}
      </Typography>
    </Box>
  );
}