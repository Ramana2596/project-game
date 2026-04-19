// src/pages/BatchMaster/components/BatchMstSelector.jsx
// Component to select Batch to get Master details page.

import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

// Batch Selector:
export default function BatchMstSelector({ gameId = "", gameBatchList = [], onSubmit }) {

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="flex-start">

      {/* Read-only Game Id */}
      <Grid item>
        <FormControl size="small" variant="outlined" disabled>
          <InputLabel shrink>Learn Platform</InputLabel>
          <Select value={gameId} sx={{ minWidth: 140 }}>
            <MenuItem value={gameId}>{gameId}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Batch Selector (AUTO LOAD ON CHANGE*/}

      <Grid item>
        <FormControl size="small" variant="outlined">
          <InputLabel id="game-batch-label">Batch</InputLabel>

          {/* Auto-Load Form on selecting Batch */}
          <Select
            labelId="game-batch-label"
            label="Batch"
            sx={{ minWidth: 160 }}

            onChange={e => {
              const value = e.target.value;
              if (gameId && value && onSubmit) {
                onSubmit({ gameId, gameBatch: value });
              }
            }}
          >

            {/* Batch options */}
            {gameBatchList.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}

          </Select>
        </FormControl>
      </Grid>

    </Grid>
  );
}