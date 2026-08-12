// src/pages/DemoVirtual/components/StageProp.jsx
// Purpose: Propagates UI data of stage rows

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
  handleDecidePlan,
  handleNextMonth,
  loadingStageNo,
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
          handleDecidePlan={handleDecidePlan}
          handleNextMonth={handleNextMonth}
          isLoading={loadingStageNo === s.stageNo}
        />
      ))}
    </Stack>
  );
}