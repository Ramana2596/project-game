import React from "react";
import { Box, Typography } from "@mui/material";
import { layoutStyle, masterTypo, colors } from "../../../ux/styles";
export const PcHeader = () => (
  <Box sx={{ ...layoutStyle.pageHeader, py: 1.5 }}>
    <Typography
      variant="h4"
      sx={{ ...masterTypo.h4, color: colors.title }}
    >
      Plant Capacity & Load
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: colors.subtitle, mt: 0.25 }}
    >
      Real-time Analytics: Manufacturing Capacity, Load, Utilisation & Bottleneck
    </Typography>
  </Box>
);