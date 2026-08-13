// Component: SimProgressPanel
// Module: OMTP Simulation
// Purpose: Display period progress bar (now lives in left column of SimContent)

import React from "react";
import PropTypes from "prop-types";
import { Box, Stack, Typography, LinearProgress, Paper } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { formatDate } from "../../../utils/formatDate";
import { colors, masterTypo } from "../../../ux/styles";
import { UI_STRINGS } from "../constants/labels";

export default function SimProgressPanel({ progressData, progressPercent }) {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        px: 2.5,
        py: 1.25,
        mb: 2,
        borderRadius: 2.5,
        bgcolor: colors.white,
        border: `1px solid ${colors.border}`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.75}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography sx={{ ...masterTypo.body1, color: colors.primaryDark, fontWeight: 700 }}>
            {UI_STRINGS.PERIOD_DISPLAY(progressData?.Current_Period_No, progressData?.Total_Period)}
          </Typography>
          <Typography sx={{ fontSize: "0.90rem", color: colors.muted }}>•</Typography>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <CalendarToday sx={{ fontSize: 16, color: colors.primary }} />
            <Typography sx={{ ...masterTypo.h5, color: colors.title, fontWeight: 600 }}>
              {progressData?.Is_Simulation_End ? UI_STRINGS.SIM_COMPLETED : formatDate(progressData?.Current_Period)}
            </Typography>
          </Stack>
        </Stack>
        <Typography sx={{ ...masterTypo.body1, color: colors.primary, fontWeight: 700 }}>
          {progressPercent}% Complete
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progressPercent}
        sx={{
          height: 6,
          borderRadius: "999px",
          bgcolor: colors.selected || "#f0f0f0",
          "& .MuiLinearProgress-bar": {
            borderRadius: "999px",
            background: colors.heroGradient,
          },
        }}
      />
    </Paper>
  );
}

SimProgressPanel.propTypes = {
  progressData: PropTypes.object,
  progressPercent: PropTypes.number,
};