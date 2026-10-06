// Component: SrOverview
// Module: StrategyResults
// Purpose: render compact overview insight cards for strategy results.
// Author/Version: OpsMgt UX Lab / v3.0
// AI Tags: strategy-results, overview, insight, summary-cards

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
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        },
        gap: 1.5,
      }}
    >
      <SrStrategyCard
        setNo={setNo}
        srTotals={srTotals}
        srCards={srCards}
      />

      <SrCommitmentCard
        setNo={setNo}
        srTotals={srTotals}
        discRows={discRows}
      />

      <SrDemandCard
        setNo={setNo}
        srTotals={srTotals}
        demRows={demRows}
      />

      <SrSavingsCard
        setNo={setNo}
        srTotals={srTotals}
        savRows={savRows}
      />
    </Box>
  );
}