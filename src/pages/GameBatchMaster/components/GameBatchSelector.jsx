import React, { useState } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

/**
 * Component: GameBatchSelector
 * ----------------------------
 * Props:
 *   gameId: string (fixed, display-only)
 *   gameBatchList: array of { value, label } objects for Game_Batch
 *   onSubmit: function({ gameId, gameBatch }) - called on Submit
 */
export default function GameBatchSelector({ gameId = "", gameBatchList = [], onSubmit }) {
  const [gameBatch, setGameBatch] = useState(""); // selected batch

  /** Handle submit button click */
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
            <InputLabel shrink>Game Id</InputLabel>
            <Select value={gameId} style={{ minWidth: 120 }}>
              <MenuItem value={gameId}>{gameId}</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Selectable Game Batch */}
        <Grid item>
          <FormControl size="small" variant="outlined">
            <InputLabel id="game-batch-label">Game Batch</InputLabel>
            <Select
              labelId="game-batch-label"
              value={gameBatch}
              label="Game Batch"
              onChange={e => setGameBatch(e.target.value)}
              style={{ minWidth: 120 }}
            >
              {/* Requires Game_Batch in { value, label } format */}
              {gameBatchList.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>  
                  {opt.label}                                
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Submit button */}
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!gameBatch} // enable only when a batch is selected
          >
            Submit
          </Button>
        </Grid>

      </Grid>
    </form>
  );
}
