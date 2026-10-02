import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { cardStyle, layoutStyle, masterTypo, colors } from "../../../ux/styles";
import { MR_LEVELS } from "../constants/mrConstants";

const Level = ({ level }) => {
  const l = MR_LEVELS.find((x) => x.value === level);
  return l ? <Chip size="small" label={l.label} sx={cardStyle.badge(colors[l.color])} />
           : <Typography sx={{ ...masterTypo.caption, color: colors.muted }}>Not judged</Typography>;
};

// Gist only: one line per product with its Production and Sales result
export function MrInsight({ cards }) {
  return (
    <Box sx={{ ...layoutStyle.compactPanel, mb: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <TrackChangesIcon sx={{ color: colors.primary, fontSize: 22 }} />
        <Typography sx={{ ...masterTypo.h6, color: colors.title }}>Performance vs Target</Typography>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "max-content max-content max-content", justifyContent: "start", justifyItems: "start",
        columnGap: 4, rowGap: 0.75, alignItems: "center", maxHeight: 220, overflowY: "auto" }}>
        <span />
        <Typography sx={{ ...masterTypo.caption, fontWeight: 700, color: colors.accentBlue }}>Production</Typography>
        <Typography sx={{ ...masterTypo.caption, fontWeight: 700, color: colors.accentOrange }}>Sales</Typography>
        {cards.map((c) => (
          <React.Fragment key={c.product}>
            <Typography sx={{ ...masterTypo.body2, fontWeight: 600, color: colors.title }}>{c.product}</Typography>
            <Level level={c.prodLevel} />
            <Level level={c.salesLevel} />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
}