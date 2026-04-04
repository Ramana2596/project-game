// src/pages/BatchMaster/components/BatchMstSelector.jsx
// Component to select Batch to get Master details page.

import React, { useState } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

// Batch Selector:
export default function BatchMstSelector({ gameId = "", gameBatchList = [], onSubmit }) {
  const [gameBatch, setGameBatch] = useState(""); // selected batch

  // Handle submit button click
  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameId && gameBatch && onSubmit) {
      onSubmit({ gameId, gameBatch });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start">

        {/* Read-only Game Id */}
        <Grid item>
          <FormControl size="small" variant="outlined" disabled>
            <InputLabel shrink>Game</InputLabel> {/* label improved */}
            <Select value={gameId} sx={{ minWidth: 140 }}>
              <MenuItem value={gameId}>{gameId}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Selectable Game Batch */}
        <Grid item>
          <FormControl size="small" variant="outlined">
            <InputLabel id="game-batch-label">Batch</InputLabel> {/* label improved */}
            <Select
              labelId="game-batch-label"
              value={gameBatch}
              label="Batch"
              onChange={e => setGameBatch(e.target.value)}
              sx={{ minWidth: 160 }} // consistent width
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

        {/* Submit button (enabled only when batch selected) */}
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            disabled={!gameBatch}
          >
            Load {/* label improved */}
          </Button>
        </Grid>

      </Grid>
    </form>
  );
}