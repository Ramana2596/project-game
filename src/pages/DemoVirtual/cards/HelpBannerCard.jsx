// === HelpBannerCard | Demo Virtual Simulation ===
// Purpose: Display Help/Support used throughout the business simulation workflow.
// Tags: Help Support, Learning Guide, Enterprise Dashboard, User Assistance

import React from "react";

import {
    Avatar,
    Box,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    LightbulbOutlined,
} from "@mui/icons-material";

import {
    colors,
} from "../../../ux/styles";

export default function HelpBannerCard() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: colors.selected,
        border: `1px solid ${colors.primaryLight}`,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: "transparent",
            color: colors.primary,
            border: `2px solid ${colors.primary}`,
          }}
        >
          <LightbulbOutlined sx={{ fontSize: 20 }} />
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontSize: "0.80rem",
              fontWeight: 800,
              color: colors.primary,
              mb: 0.25,
              letterSpacing: "0.02em",
            }}
          >
            NEED HELP?
          </Typography>
          <Typography
            sx={{
              fontSize: "0.82rem",
              color: colors.body,
              lineHeight: 1.3,
              display: "block",
            }}
          >
            Click the Help button in any stage for detailed guidance.
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
