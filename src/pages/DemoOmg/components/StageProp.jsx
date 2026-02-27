// src/pages/DemoOmg/components/StageProp.jsx
// Purpose: Propagates orchestrated stage data and interaction handlers to StageShow rows.

import React from "react";
import { Box } from "@mui/material";
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
    <Box sx={{ mt: 2 }}>
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
    </Box>
  );
}