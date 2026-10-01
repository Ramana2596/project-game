
import React from "react";
import { Box, Typography } from "@mui/material";
import { layoutStyle, masterTypo, colors } from "../../../ux/styles";

export const PcHeader = () => (
  <Box
    sx={{
      ...layoutStyle.pageHeader,
      py: 0.75,
      minHeight: 54,
    }}
  >
    {/* Page heading and subtitle */}
    <Box>
      <Typography
        variant="h4"
        sx={{
          ...masterTypo.h4,
          color: colors.title,
          lineHeight: 1.15,
          mb: 0.15,
        }}
      >
        Plant Capacity & Load
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: colors.subtitle,
          lineHeight: 1.2,
        }}
      >
        Real-time Analytics: Manufacturing Capacity, Load, Utilisation & Bottleneck
      </Typography>
    </Box>
  </Box>
);
