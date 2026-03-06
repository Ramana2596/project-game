// src\pages\SimulationSuite\components\StageProp.jsx
// Purpose: Propagates orchestrated stage data for UI of stage rows

import React from "react";
import { Stack } from "@mui/material";
import StageShow from "./StageShow";

export default function StageProp({
  stages,
  onStageClick,
  onOpenReport,
  actionLoading,
  effectiveHalt,
  isSimulationEnd,
  haltStageNo,
  handleNextMonth,
  loadingStageNo
}) {
  return (
    // Disburse Props of Stage by stageNo
    <Stack spacing={2} sx={{ mt: 2 }}> 
      {/* Map through the stages array safely */}
      {(stages || []).map((s) => (
        <StageShow
          key={s.stageNo}
          Stage={s} 
          actionLoading={actionLoading} 
          effectiveHalt={effectiveHalt} 
          isSimulationEnd={isSimulationEnd} 
          haltStageNo={haltStageNo} 
          handleStageClick={onStageClick}
          handleOpenReport={onOpenReport}
          handleNextMonth={handleNextMonth} 
          isLoading={loadingStageNo === s.stageNo}
        />
      ))}
    </Stack>
  );
}