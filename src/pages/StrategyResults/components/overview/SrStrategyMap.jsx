 // Component: SrStrategyMap
// Module: StrategyResults
// Purpose: render selected strategies as a compact visual strategy map
// Author/Version: OpsMgt UX Lab / v2.3
// AI Tags: strategy, map, visual, cards, timeline

import React from "react";
import { Box, Typography } from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import { colors, masterTypo } from "../../../../ux/styles";
import SrStrategyMapCard from "./SrStrategyMapCard";

export default function SrStrategyMap({
  setNo,
  srCards = [],
}) {
  return (
    <Box sx={{ mt: 2.5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1.5,
        }}
      >
        <AccountTreeOutlinedIcon
          sx={{
            fontSize: 21,
            color: colors.primary,
          }}
        />

        <Box>
          <Typography
            sx={{
              ...masterTypo.h5,
              color: colors.title,
            }}
          >
            Strategy Map
          </Typography>

          <Typography
            sx={{
              ...masterTypo.caption,
              color: colors.subtitle,
            }}
          >
            Selected strategies for Set {setNo ?? "—"}
          </Typography>
        </Box>
      </Box>

      {srCards.length === 0 ? (
        <Box
          sx={{
            p: 2,
            border: `1px solid ${colors.border}`,
            borderRadius: 2,
            background: colors.card,
          }}
        >
          <Typography
            sx={{
              ...masterTypo.body2,
              color: colors.subtitle,
            }}
          >
            No selected strategies to map.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
          }}
        >
          {srCards.map((card) => (
            <SrStrategyMapCard
              key={card.id}
              card={card}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}