// Component: SimContent | Module: OMTP Simulation | Purpose: Display the primary simulation workspace
import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

export default function SimContent({ leftContent, rightContent }) {
  return (
    <Grid
      container
      spacing={2.5}
      alignItems="flex-start"
    >
      <Grid item xs={12} lg={8}>
        {leftContent}
      </Grid>

      <Grid
        item
        xs={12}
        lg={4}
        sx={{
          position: {
            lg: "sticky",
          },

          top: {
            lg: 16,
          },

          alignSelf: "flex-start",

          height: {
            lg: "calc(100vh - 32px)",   // viewport - top offset
          },

          overflow: {
            lg: "auto",
          },

          pr: {
            lg: 0.5,
          },

          display: "flex",
          flexDirection: "column",
        }}
      >
        {rightContent}
      </Grid>
    </Grid>
  );
}

SimContent.propTypes = {
  leftContent: PropTypes.node,
  rightContent: PropTypes.node,
};