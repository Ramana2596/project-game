// Component: SimulationStatusCard | Module: Demo Virtual Simulation | Purpose: Display current simulation status and guide user action
import React from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Chip } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { cardStyle, colors } from "../../../ux/styles";

export default function SimulationStatusCard({ progressData, nextActionMessage }) {
  const isEnd = progressData?.Is_Simulation_End;

  return (
    <Paper elevation={0} sx={{ ...cardStyle.primary, p: 2.5, height: "auto" }}>
      {/* Render card header title */}
      <Typography sx={{ fontSize: "0.80rem", fontWeight: 800, letterSpacing: "0.05em", color: colors.subtitle, mb: 1.5, textTransform: "uppercase" }}>
        Simulation Status
      </Typography>

      {/* Render current simulation state indicator chip */}
      <Chip
        icon={isEnd ? null : <Refresh sx={{ color: "#fff !important", fontSize: "18px !important" }} />}
        label={isEnd ? "COMPLETED" : "IN PROGRESS"}
        sx={{
          width: "100%",
          height: 38,
          borderRadius: "8px",
          mb: 2,
          fontSize: "0.90rem",
          fontWeight: 800,
          color: colors.white,
          bgcolor: isEnd ? colors.success : colors.primary,
        }}
      />

      {/* Render recommended next action guidance message */}
      <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: colors.title, mb: 0.5 }}>
        Next Action
      </Typography>
      <Typography sx={{ fontSize: "0.85rem", color: colors.body, lineHeight: 1.4 }}>
        {nextActionMessage}
      </Typography>
    </Paper>
  );
}

SimulationStatusCard.propTypes = {
  progressData: PropTypes.object,
  nextActionMessage: PropTypes.string,
};