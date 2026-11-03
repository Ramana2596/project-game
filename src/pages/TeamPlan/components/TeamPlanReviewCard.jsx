
// File: src/pages/TeamPlan/components/TeamPlanReviewCard.jsx
// Component: TeamPlanReviewCard
// Module: TeamPlan
// Purpose: Display live plan results and plan-line progress in one compact card.
// AI Tags: team-plan, review-card, live-review, uxlab

import React from "react";
import { Box, Typography } from "@mui/material";
import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import { cardStyle, masterTypo } from "../../../ux/styles";
import { accent, text, border } from "../../../ux/styles/colorPalette";
import { reviewFigures } from "../utils/reviewCalc.js";

const TAB_NAME = { "OI 001": "Product", "OI 002": "Material", "OI 003": "Machine" };

const TeamPlanReviewCard = ({ tab, row, rows, info, unsaved = false, calculating = false }) => {
  const r = reviewFigures(tab, row, rows, info);
  const status = calculating ? "Calculating prices" : unsaved ? "Unsaved changes" : "";

  return (
    <Box
      role="region"
      aria-label="Review of your plan"
      aria-live="polite"
      sx={{
        ...cardStyle.primary,
        height: "auto",
        p: 1.5,
        borderLeft: `3px solid ${accent.purple}`,
        "&:hover": { transform: "none" },
      }}
    >
      {/* Show the review identity and current calculation status. */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, minWidth: 0 }}>
        <Box sx={{ ...cardStyle.statIconCircle(accent.purple), width: 32, height: 32, minWidth: 32, "& svg": { fontSize: 18 } }}>
          <FactCheckRoundedIcon />
        </Box>
        <Typography sx={{ ...masterTypo.h6, color: text.title, minWidth: 0, overflowWrap: "anywhere" }}>
          {r?.name ? `Review on ${r.name}` : `Review${TAB_NAME[tab] ? `: ${TAB_NAME[tab]}` : ""}`}
        </Typography>
        {status && (
          <Typography sx={{ ...masterTypo.caption, color: text.subtitle, ml: "auto", flexShrink: 0 }}>
            {status}
          </Typography>
        )}
      </Box>

      {/* Render the existing calculated figures without changing business logic. */}
      {!r ? (
        <Typography sx={{ ...masterTypo.body2, color: text.subtitle }}>
          Select a line to see the result of your plan.
        </Typography>
      ) : (
        <>
          <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 2, rowGap: 0.5 }}>
            {r.fields.filter((f) => !(f.optional && f.text == null)).map((f) => (
              <Typography key={f.label} sx={{ ...masterTypo.body2, color: text.body, fontVariantNumeric: "tabular-nums" }}>
                <Box component="span" sx={{ color: text.subtitle }}>{f.label}: </Box>
                <Box component="span" sx={{ fontWeight: 600, color: text.title }}>
                  {f.text == null || f.text === "" ? "-" : f.text}
                </Box>
              </Typography>
            ))}
          </Box>

          {/* Keep plan progress visually separate from the result figures. */}
          <Typography sx={{ ...masterTypo.caption, color: text.subtitle, mt: 1, pt: 0.75, borderTop: `1px solid ${border.divider}`, fontVariantNumeric: "tabular-nums" }}>
            Lines in plan: <Box component="span" sx={{ fontWeight: 600, color: text.title }}>{r.lines.done} out of {r.lines.total}</Box>
          </Typography>
        </>
      )}
    </Box>
  );
};

export default TeamPlanReviewCard;