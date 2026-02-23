// src/pages/DemoVirtual/components/StageList.jsx
// Renders the list of stages using StageItem.
import React from "react";
import { Stack } from "@mui/material";
import StageItem from "./StageItem";

export default function StageList(
  { stageUI,
    actionLoading,
    effectiveHalt,
    isSimulationEnd,
    haltStageNo,
    handleStageClick,
    handleOpenReport,
    handleNextMonth }) {
  return (
    <Stack spacing={2}>
      {/* Iterates through processed stage data to render interactive items */}
      {stageUI.map(Stage => (
        <StageItem
          key={Stage.stageNo}
          Stage={Stage}
          actionLoading={actionLoading}
          effectiveHalt={effectiveHalt}
          isSimulationEnd={isSimulationEnd}
          haltStageNo={haltStageNo}
          handleStageClick={handleStageClick}
          handleOpenReport={handleOpenReport}
          handleNextMonth={handleNextMonth}
        />
      ))}
    </Stack>
  );
}
