// Component: DemoContent | Module: Demo Virtual Simulation | Purpose: Display the primary simulation workspace
import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

export default function DemoContent({ leftContent, rightContent }) {
  return (
    <Grid container spacing={3} alignItems="flex-start">
      <Grid item xs={12} lg={8.5}>
        {leftContent}
      </Grid>
      <Grid item xs={12} lg={3.5}>
        {rightContent}
      </Grid>
    </Grid>
  );
}

DemoContent.propTypes = {
  leftContent: PropTypes.node,
  rightContent: PropTypes.node,
};