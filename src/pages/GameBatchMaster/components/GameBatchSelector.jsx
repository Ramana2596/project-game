import React, { useState } from "react";
import { Button, FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

/**
 * Top section for selecting Game_Id and Game_Batch via dropdowns and submitting to fetch details.
 * Props:
 *   gameIdList: array of { value, label } for Game_Id
 *   gameBatchList: array of { value, label } for Game_Batch
 *   onSubmit: function({ gameId, gameBatch })
 */
export default function GameBatchSelector({ gameIdList = [], gameBatchList = [], onSubmit }) {
  const [gameId, setGameId] = useState("");
  const [gameBatch, setGameBatch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameId && gameBatch && onSubmit) {
      onSubmit({ gameId, gameBatch });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
        <Grid item>
          <FormControl size="small" variant="outlined">
            <InputLabel id="game-id-label">Game Id</InputLabel>
            <Select
              labelId="game-id-label"
              value={gameId}
              label="Game Id"
              onChange={e => setGameId(e.target.value)}
              style={{ minWidth: 120 }}
            >
              {gameIdList.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
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
              {gameBatchList.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" color="primary" disabled={!gameId || !gameBatch}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
