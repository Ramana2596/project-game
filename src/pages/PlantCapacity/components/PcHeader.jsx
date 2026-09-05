import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { PrecisionManufacturing as MachineIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { layoutStyle, buttonStyle, masterTypo, colors } from "../../../ux/styles";

export const PcHeader = ({ plant, gameTeam, onRefresh }) => (
  <Box sx={layoutStyle.pageHeader}>
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <Box>
        <Box sx={layoutStyle.pageHeaderDatePill}>
          <MachineIcon fontSize="small" />
          <Typography variant="caption">
            {plant?.Production_Month || "Mar-2026"} | Team: {gameTeam || "Demo"}
          </Typography>
        </Box>
        <Typography variant="h2" sx={{ ...masterTypo.h4, color: colors.title, mt: 1 }}>
          Plant Capacity & Load
        </Typography>
        <Typography variant="body1" sx={{ color: colors.subtitle, mt: 0.5 }}>
          Real-time Analytics: Manufacturing Capacity, Load, Utilisation & Bottleneck 
        </Typography>
      </Box>

      <IconButton onClick={onRefresh} sx={buttonStyle.icon} title="Refresh Data">
        <RefreshIcon />
      </IconButton>
    </Box>
  </Box>
);