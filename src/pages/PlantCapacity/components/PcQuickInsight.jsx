import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { AutoAwesome as AIIcon } from "@mui/icons-material";
import { cardStyle, colors } from "../../../ux/styles";

export const PcQuickInsight = ({ plant, criticalCount }) => {
  const isWarn = criticalCount > 0;
  const util = plant?.Plant_Utilisation_Percent || 0;
  const stColor = isWarn ? colors.warning : colors.success;

  let msg = "Capacity distribution across work centres is optimal.";
  if (isWarn) {
    msg = `Critical bottleneck detected in ${criticalCount} work centre(s). Consider load re-routing or overtime schedule.`;
  } else if (util > 90) {
    msg = "Plant operating near maximum load capacity (>90%). Monitor machine maintenance intervals.";
  }

  return (
    <Box
      sx={{
        ...cardStyle.banner,
        mb: 3,
        borderColor: `${stColor}44`,
        background: `${stColor}0D`,
      }}
    >
      <Box
        sx={{
          ...cardStyle.bannerIconCircle,
          background: `${stColor}22`,
          "& svg": { color: stColor },
        }}
      >
        <AIIcon />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ color: colors.title, fontWeight: 700 }}>
          AI Capacity Insight
        </Typography>
        <Typography variant="body2" sx={{ color: colors.body }}>
          {msg}
        </Typography>
      </Box>
      <Chip
        label="94% Confidence"
        size="small"
        sx={{ background: colors.primarySoft, color: colors.primaryDark, fontWeight: 700 }}
      />
    </Box>
  );
};