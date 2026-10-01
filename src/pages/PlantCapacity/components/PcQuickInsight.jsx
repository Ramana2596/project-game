
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
    msg =
      "Plant operating near maximum load capacity (>90%). Monitor machine maintenance intervals.";
  }

  return (
    <Box
      sx={{
        ...cardStyle.banner,
        mb: 0.75,
        py: 0.75,
        px: 1.25,
        minHeight: 48,
        borderColor: `${stColor}44`,
        background: `${stColor}0D`,
      }}
    >
      {/* Compact AI insight row */}
      <Box
        sx={{
          ...cardStyle.bannerIconCircle,
          width: 32,
          height: 32,
          minWidth: 32,
          background: `${stColor}22`,
          "& svg": { color: stColor, fontSize: 18 },
        }}
      >
        <AIIcon />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: colors.title,
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            AI Capacity Insight
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: colors.body,
              lineHeight: 1.2,
            }}
          >
            {msg}
          </Typography>
        </Box>
      </Box>

      <Chip
        label="94% Confidence"
        size="small"
        sx={{
          height: 24,
          background: colors.primarySoft,
          color: colors.primaryDark,
          fontWeight: 700,
          fontSize: "0.7rem",
        }}
      />
    </Box>
  );
};
