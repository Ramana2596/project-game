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
import { useUser } from "../../../core/access/userContext.js";
import { getOperationalPlanInfoTableData } from "../services/operationalPlanInfoInputService.js";

export default function Period({ period, onFormControlUpdate }) {
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gamePeriod, setGamePeriod] = useState([]);

  useEffect(() => {
    getOperationalPlanInfoTableData({
      cmdLine: "Get_Period",
      gameId: userInfo?.gameId,
      gameBatch: userInfo?.gameBatch,
    })
      .then((response) => {
        setLoading(false);
        setGamePeriod(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    const selectedValueObj = gamePeriod.filter(
      (gamePeriodObj) => gamePeriodObj.Valid_Period === value
    );
    onFormControlUpdate({ productionMonth: selectedValueObj[0]?.Valid_Period });
  };

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <FormControl required sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}>
        <InputLabel id="period">Period</InputLabel>
        <Select
          labelId="period"
          id="periodRequired"
          name="productionMonth"
          value={period}
          label="Period *"
          onChange={handleChange}
          disabled={loading}
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
            gamePeriod?.map((obj, index) => (
              <MenuItem key={index} value={obj.Valid_Period}>
                {new Date(obj.Valid_Period).toLocaleString("default", {
                  month: "long",
                }) +
                  " " +
                  new Date(obj.Valid_Period).getFullYear()}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </Grid>
  );
}
