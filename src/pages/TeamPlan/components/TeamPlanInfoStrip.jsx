// File: src/pages/TeamPlan/components/TeamPlanInfoStrip.jsx
// Purpose: Arrange Guide, Review and Plan Summary cards.

import React from "react";
import { Box } from "@mui/material";

import TeamPlanGuide from "./TeamPlanGuide.jsx";
import TeamPlanReview from "./TeamPlanReview.jsx";
import TeamPlanSummary from "./TeamPlanSummary.jsx";

const TeamPlanInfoStrip = ({
  tab,
  partNo,
  row,
  rows = [],
  info,
  guideLoading = false,
  guideError = "",
  unsaved = false,
  calculating = false,
}) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(3, minmax(0, 1fr))",
        },
        gap: 2,
        mx: 2,
        mt: 1.5,
        alignItems: "stretch",
      }}
    >
      <TeamPlanGuide
        tab={tab}
        partNo={partNo}
        info={info}
        loading={guideLoading}
        error={guideError}
      />

      <TeamPlanReview
        tab={tab}
        row={row}
        rows={rows}
        info={info}
        unsaved={unsaved}
        calculating={calculating}
      />

      <TeamPlanSummary
        tab={tab}
        rows={rows}
        info={info}
      />
    </Box>
  );
};

export default TeamPlanInfoStrip;