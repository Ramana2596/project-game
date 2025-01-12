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
  dateFormat,
}) {
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gamePeriod, setGamePeriod] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(period);
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    getMarketFactorInfoTableData({
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
  }, [userInfo?.gameId, userInfo?.gameBatch]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedPeriod(value);
    const selectedValueObj = gamePeriod.filter(
      (gamePeriodObj) => gamePeriodObj.Valid_Period === value
    );

    // Make an API call to validate the selected period
    getMarketFactorInfoTableData({
      cmdLine: "Valid_Period",
      gameId: userInfo?.gameId,
      gameBatch: userInfo?.gameBatch,
      productionMonth: value,
    })
      .then((response) => {
        if (response.data) {
          setAlertData({
            severity: "",
            message: "",
            isVisible: false,
          });
          if (selectedValueObj.length > 0) {
            onFormControlUpdate({ productionMonth: value });
          }
        } else {
          // Handle invalid period case
          console.error("Invalid period selected.");
        }
      })
      .catch((error) => {
        setAlertData({
          severity: "error",
          message: error?.response?.data?.error || "Invalid period selected.",
          isVisible: true,
        });
      });
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
                }) +
                  " " +
                  new Date(obj.Valid_Period).getFullYear()}
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
