// src/pages/DemoOmg/components/StageProp.jsx
// Purpose: Propagates orchestrated stage data for UI of stage rows

import React from "react";
import { Stack } from "@mui/material";
import StageShow from "./StageShow";

export default function StageProp({
  stageUI,
  actionLoading,
  effectiveHalt,
  isSimulationEnd,
  haltStageNo,
  handleStageClick,
  handleOpenReport,
  handleNextMonth,
  loadingStageNo
}) {
  return (
    // Disburse Props of Stage by stageNo
    <Stack spacing={2} sx={{ mt: 2 }}> 
      {stageUI.map((s) => (
        <StageShow
          key={s.stageNo}
          Stage={s} 
          actionLoading={actionLoading} 
          effectiveHalt={effectiveHalt} 
          isSimulationEnd={isSimulationEnd} 
          haltStageNo={haltStageNo} 
          handleStageClick={handleStageClick} 
          handleOpenReport={handleOpenReport} 
          handleNextMonth={handleNextMonth} 
          isLoading={loadingStageNo === s.stageNo}
        />
      ))}
    </Stack>
  );
}