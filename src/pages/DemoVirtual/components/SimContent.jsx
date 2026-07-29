// Component: SimContent | Module: OMTP Simulation | Purpose: Display the primary simulation workspace
import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

export default function SimContent({ leftContent, rightContent }) {
  return (
    <Grid container spacing={3} alignItems="flex-start">
      <Grid item xs={12} lg={8}>
        {leftContent}
      </Grid>
      <Grid item xs={12} lg={4}>
        {rightContent}
      </Grid>
    </Grid>
  );
}

SimContent.propTypes = {
  leftContent: PropTypes.node,
  rightContent: PropTypes.node,
};