// Component: SrStrategyCard
// Module: StrategyResults
// Purpose: summarize selected strategies in the overview.
// Author/Version: OpsMgt UX Lab / v3.0
// AI Tags: strategy-results, strategy-summary, overview, card

import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import { cardStyle, colors, masterTypo } from "../../../../ux/styles";

export default function SrStrategyCard({
  setNo,
  srTotals,
}) {
  const selected = srTotals?.nSel || 0;
  const total = srTotals?.nTotal || 0;

  return (
    <Box
      sx={{
        ...cardStyle.primary,
        p: 1.75,
        minHeight: 116,
        minWidth: 0,
        borderLeft: `4px solid ${colors.primary}`,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            minWidth: 0,
          }}
        >
          <LayersOutlinedIcon
            sx={{
              color: colors.primary,
              fontSize: 22,
              flexShrink: 0,
            }}
          />

          <Typography
            sx={{
              ...masterTypo.h5,
              color: colors.title,
            }}
          >
            Strategy
          </Typography>
        </Box>

        <Chip
          label={`Set ${setNo || "—"}`}
          size="small"
          sx={{
            height: 24,
            color: colors.primary,
            backgroundColor: colors.primarySoft,
            fontWeight: 600,
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          gap: 0.75,
          mt: 1.25,
        }}
      >
        <Typography
          sx={{
            fontSize: "1.45rem",
            fontWeight: 700,
            lineHeight: 1,
            color: colors.title,
          }}
        >
          {selected}
        </Typography>

        <Typography
          sx={{
            ...masterTypo.bodyB1,
            color: colors.subtitle,
          }}
        >
          of {total} selected
        </Typography>
      </Box>

      <Typography
        sx={{
          ...masterTypo.bodyB1,
          mt: 0.75,
          color: colors.subtitle,
        }}
      >
        Selected strategies and their planned outcomes
      </Typography>
    </Box>
  );
}