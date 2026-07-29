// Component: SimSidebar 
// Module: OMTP Simulation 
// Purpose: Display the right-side information panel

import React from "react";
import PropTypes from "prop-types";
import { Stack } from "@mui/material";

export default function SimSidebar({ simulationStatus, helpCenter, stageLegend, helpBanner }) {
  return (
    <Stack spacing={2.5}>
      {simulationStatus}
      {helpCenter}
      {stageLegend}
      {helpBanner}
    </Stack>
  );
}

SimSidebar.propTypes = {
  simulationStatus: PropTypes.node,
  helpCenter: PropTypes.node,
  stageLegend: PropTypes.node,
  helpBanner: PropTypes.node,
};