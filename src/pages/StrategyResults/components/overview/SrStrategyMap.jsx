// Component: SrStrategyMap
// Module: StrategyResults
// Purpose: render selected strategy map cards as full-width horizontal cards.
// Author/Version: OpsMgt UX Lab / v3.2
// AI Tags: strategy-results, strategy-map, responsive, horizontal-cards

import React from "react";
import { Box, Typography } from "@mui/material";
import { AccountTreeOutlined } from "@mui/icons-material";
import { cardStyle, colors, masterTypo } from "../../../../ux/styles";
import SrStrategyMapCard from "./SrStrategyMapCard";

export default function SrStrategyMap({
  srCards = [],
}) {
  return (
    <Box
      sx={{
        ...cardStyle.base,
        overflow: "hidden",
        borderTop: `4px solid ${colors.primary}`,
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.25,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          borderBottom: `1px solid ${colors.border}`,
          backgroundColor: colors.card,
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
          <AccountTreeOutlined
            sx={{
              color: colors.primary,
              fontSize: 24,
              flexShrink: 0,
            }}
          />

          <Typography
            component="h2"
            sx={{
              ...masterTypo.h5,
              color: colors.title,
              fontWeight: 700,
            }}
          >
            Strategy Map
          </Typography>
        </Box>

        <Typography
          sx={{
            ...masterTypo.bodyB1,
            color: colors.primary,
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {srCards.length} strateg{srCards.length === 1 ? "y" : "ies"}
        </Typography>
      </Box>

      {srCards.length > 0 ? (
        <Box
          sx={{
            p: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {srCards.map((card) => (
            <SrStrategyMapCard
              key={card.id}
              card={card}
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ p: 2 }}>
          <Typography
            sx={{
              ...masterTypo.bodyB1,
              color: colors.subtitle,
            }}
          >
            No selected strategies are available.
          </Typography>
        </Box>
      )}
    </Box>
  );
}