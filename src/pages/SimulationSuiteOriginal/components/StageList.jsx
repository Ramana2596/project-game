// file: src/pages/SimulationSuite/components/StageList.jsx
// Convert Stage UI array to Stage Item rows
import React from "react";
import { Stack } from "@mui/material";
import StageItem from "./StageItem.jsx";

export default function StageList({ stages, onStageClick, onOpenReport, actionLoading }) {
  // Render Rows of Stage Item components
  return (
    <Stack spacing={2}>
      {stages.map(s => (
        <StageItem key={s.stageNo}
          stage={s}
          onClick={onStageClick}
          onOpenReport={onOpenReport}
          actionLoading={actionLoading} />
      ))}
    </Stack>
  );
}
