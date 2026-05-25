import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Grid } from "@mui/material";

export default function BatchMstSelector({ gameId = "", gameBatchList = [], selectedBatch = "", onSubmit }) {
  
  // Matching the Form's "label" look
  const labelSx = {
    fontSize: "14px",
    fontWeight: "800",
    color: "#78909c",
    textTransform: "uppercase",
    position: "relative",
    transform: "none",
    marginBottom: "2px"
  };

  // Matching the Form's "input container" look
  const selectorSx = {
    height: "48px",
    width: "100%",
    "& .MuiOutlinedInput-notchedOutline": { border: "1px solid #cfd8dc" },
    "& .MuiSelect-select": {
      fontSize: "18px",
      fontWeight: "700",
      padding: "0 8px",
      display: "flex",
      alignItems: "center"
    }
  };

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {/* Read-only Game Id */}
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel shrink sx={labelSx}>Learn Platform</InputLabel>
          <Select value={gameId} sx={selectorSx} disabled>
            <MenuItem value={gameId}>{gameId}</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      {/* Batch Selector */}
      <Grid item xs={2}>
        <FormControl fullWidth>
          <InputLabel id="batch-label" shrink sx={labelSx}>Batch</InputLabel>
          <Select
            labelId="batch-label"
            value={selectedBatch}
            sx={selectorSx}
            onChange={(e) => onSubmit({ gameId, gameBatch: e.target.value })}
          >
            {gameBatchList.map(opt => (
              <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}