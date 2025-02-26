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
import ToastMessage from "../../../components/ToastMessage.jsx";

export default function Period({
  period,
  onFormControlUpdate,
  isDisabled,
  selectedGameBatch,
}) {
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gamePeriod, setGamePeriod] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(""); // Initialize as an empty string
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    if (selectedGameBatch) {
      getMarketFactorInfoTableData({
        cmdLine: "Get_Period",
        gameId: userInfo?.gameId,
        gameBatch: selectedGameBatch,
      })
        .then((response) => {
          setLoading(false);
          setGamePeriod(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [userInfo?.gameBatch, selectedGameBatch]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedPeriod(value);
    onFormControlUpdate({ productionMonth: value });
  };

  const handleCloseToast = () => {
    setAlertData((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
  };

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <FormControl required sx={{ flexGrow: 1, width: "100%", maxWidth: 220 }}>
        <InputLabel id="period">Period</InputLabel>
        <Select
          labelId="period"
          id="periodRequired"
          name="productionMonth"
          value={selectedPeriod}
          label="Period *"
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
            gamePeriod?.map((obj, index) => (
              <MenuItem key={index} value={obj.Valid_Period}>
                {new Date(obj.Valid_Period).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
        onClose={handleCloseToast}
      />
    </Grid>
  );
}
