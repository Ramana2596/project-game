// File: src/pages/TeamPlan/components/TeamPlanReviewCard.jsx
// Review half of the info panel: ONE card for the active tab and line. Live: it moves as the user types.
//   Line 1  description only (Part_No is the database key, not shown)
//   Line 2  the result figures for that tab (see utils/reviewCalc.js)
//   Line 3  lines in plan: X out of Y
// Results only, no advice. The Guide card beside it holds the fixed reference figures.

import React from "react";
import { alpha, useTheme, Box, Typography } from "@mui/material";
import { reviewFigures } from "../utils/reviewCalc.js";

const TAB_NAME = { "OI 001": "Product", "OI 002": "Material", "OI 003": "Machine" };

const TeamPlanReviewCard = ({ tab, row, rows, info, unsaved = false, calculating = false }) => {
  const theme = useTheme();
  const accent = theme.palette.secondary?.main || theme.palette.primary.main;
  const r = reviewFigures(tab, row, rows, info);

  return (
    <Box
      role="region"
      aria-label="Review of your plan"
      aria-live="polite"
      sx={{ p: 1.5, borderLeft: `4px solid ${accent}`, borderRadius: 1, bgcolor: alpha(accent, 0.06) }}
    >
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.25 }}>
        Review{TAB_NAME[tab] ? `: ${TAB_NAME[tab]}` : ""}
        {calculating ? " (calculating prices)" : unsaved ? " (unsaved changes)" : ""}
      </Typography>

      {!r ? (
        <Typography variant="body2" color="text.secondary">Select a line to see the result of your plan.</Typography>
      ) : (
        <>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{r.name}</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 3, rowGap: 0.5, mt: 0.5 }}>
            {r.fields.filter((f) => !(f.optional && f.text == null)).map((f) => (
              <Typography key={f.label} variant="body2" sx={{ fontVariantNumeric: "tabular-nums" }}>
                <Box component="span" sx={{ color: "text.secondary" }}>{f.label} </Box>
                <Box component="span" sx={{ fontWeight: 600 }}>{f.text == null || f.text === "" ? "-" : f.text}</Box>
              </Typography>
            ))}
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
            Lines in plan {r.lines.done} out of {r.lines.total}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default TeamPlanReviewCard;