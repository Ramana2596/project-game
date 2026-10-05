// Component: SrOverview
// Module: StrategyResults
// Purpose: render compact strategy result overview cards
// Author/Version: OpsMgt UX Lab / v2.2
// AI Tags: strategy, results, overview, cards

import React from "react";
import { Box } from "@mui/material";
import SrStrategyCard from "./SrStrategyCard";
import SrCommitmentCard from "./SrCommitmentCard";
import SrDemandCard from "./SrDemandCard";
import SrSavingsCard from "./SrSavingsCard";

export default function SrOverview({
  setNo,
  srTotals,
  srCards,
  demRows,
  discRows,
  savRows,
  onStrategyClick,
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 1.5,
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
      }}
    >
      <SrStrategyCard
        setNo={setNo}
        srTotals={srTotals}
        srCards={srCards}
        onClick={onStrategyClick}
      />

      <SrCommitmentCard
        srTotals={srTotals}
        discRows={discRows}
      />

      <SrDemandCard demRows={demRows} />

      <SrSavingsCard savRows={savRows} />
    </Box>
  );
}