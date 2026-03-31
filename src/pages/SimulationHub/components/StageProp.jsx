// src\pages\SimulationSuite\components\StageProp.jsx
// Purpose: Propagates orchestrated stage data for UI of stage rows

import React from "react";
import { Stack } from "@mui/material";
import StageShow from "./StageShow";

export default function StageProp({
  stages,
  actionLoading,
  effectiveHalt,
  isSimulationEnd,
  haltStageNo,
  onStageClick,
  onOpenReport,
  onNextMonth,
  loadingStageNo,
  isLeader
}) {
  return (
    // Disburse Props of each stage by stageNo
    <Stack spacing={2} sx={{ mt: 2 }}>
      {(stages || []).map((stage) => (
        <StageShow
          key={stage.stageNo}
          stage={stage}
          actionLoading={actionLoading}
          effectiveHalt={effectiveHalt}
          isSimulationEnd={isSimulationEnd}
          haltStageNo={haltStageNo}
          onStageClick={onStageClick}
          onOpenReport={onOpenReport}
          onNextMonth={onNextMonth} 
          isLoading={loadingStageNo === stage.stageNo}
          isLeader={isLeader}
        />
      ))}
    </Stack>
  );
}