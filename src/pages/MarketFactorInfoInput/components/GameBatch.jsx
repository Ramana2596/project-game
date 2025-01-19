import React, { useEffect, useState } from "react";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getMarketFactorInfoTableData } from "../services/marketFactorInputService";
import { useUser } from "../../../core/access/userContext.js";
import { useLoading } from "../../../hooks/loadingIndicatorContext.js";

export default function GameBatch({
  gameBatch,
  onFormControlUpdate,
  isDisabled,
}) {
  const { setIsLoading } = useLoading();
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameBatchData, setGameBatchData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getMarketFactorInfoTableData({
      cmdLine: "Get_Batch",
      gameId: userInfo?.gameId,
      gameBatch: userInfo?.gameBatch,
    })
      .then((response) => {
        setLoading(false);
        setGameBatchData(response?.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    onFormControlUpdate({ gameBatch: value });
  };

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <FormControl required sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}>
        <InputLabel id="gameBatch">Game Batch</InputLabel>
        <Select
          labelId="gameBatch"
          id="gameBatchRequired"
          name="gameBatch"
          value={gameBatch}
          label="Game Batch *"
          onChange={handleChange}
          disabled={isDisabled}
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={24} />
            </MenuItem>
          ) : error ? (
            <MenuItem disabled>
              <Alert severity="error">{error}</Alert>
            </MenuItem>
          ) : (
            gameBatchData?.map((batch, index) => (
              <MenuItem key={index} value={batch.Game_Batch}>
                {batch.Game_Batch}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Grid>
  );
}
