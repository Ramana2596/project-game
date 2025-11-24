import React, { useEffect, useState } from "react";
import { CircularProgress, Alert, TextField } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { getOperationalPlanInfoTableData } from "../services/operationalPlanInfoInputService.js";
import { useUser } from "../../../core/access/userContext.jsx";
import ToastMessage from "../../../components/ToastMessage.jsx";

export default function DatePeriod({
  onFormControlUpdate,
  isDisabled,
  selectedGameBatch,
}) {
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gamePeriod, setGamePeriod] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null); // Initialize as null
  const [minDate, setMinDate] = useState(null); // Initialize minDate as null
  const [maxDate, setMaxDate] = useState(null); // Initialize maxDate as null
  const [alertData, setAlertData] = useState({
    severity: "",
    message: "",
    isVisible: false,
  });

  useEffect(() => {
    if (selectedGameBatch) {
      getOperationalPlanInfoTableData({
        cmdLine: "Get_Period",
        gameId: userInfo?.gameId,
        gameBatch: selectedGameBatch,
        gameTeam: userInfo?.gameTeam
      })
        .then((response) => {
          setLoading(false);
          setGamePeriod(response.data);
          const latestPeriod =
            response.data[response.data.length - 1]?.Period;
          const earliestPeriod = response.data[0]?.Period;
          setSelectedPeriod(earliestPeriod);
          setMinDate(dayjs(earliestPeriod));
          setMaxDate(dayjs(latestPeriod));
          onFormControlUpdate({ productionMonth: earliestPeriod });
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [userInfo?.gameBatch, selectedGameBatch]);

  const handleChange = (date) => {
    if (!date) return; // If the value is empty, do nothing.

    // Manually construct the date as the 1st of the selected month
    const year = date.year();
    const month = date.month();
    const firstOfMonth = dayjs()
      .year(year)
      .month(month)
      .date(1)
      .startOf("day")
      .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

    setSelectedPeriod(firstOfMonth);
    onFormControlUpdate({ productionMonth: firstOfMonth });
  };

  const handleCloseToast = () => {
    setAlertData((prevState) => ({
      ...prevState,
      isVisible: false,
    }));
  };

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      {loading ? (
        <CircularProgress size={24} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : gamePeriod.length > 0 ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            views={["year", "month"]}
            label="Period"
            value={selectedPeriod ? dayjs(selectedPeriod) : null}
            onChange={handleChange}
            disabled={isDisabled}
            minDate={minDate}
            maxDate={maxDate}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" fullWidth />
            )}
          />
        </LocalizationProvider>
      ) : (
        <Alert severity="info">No available periods to select.</Alert>
      )}
      <ToastMessage
        open={alertData.isVisible}
        severity={alertData.severity}
        message={alertData.message}
        onClose={handleCloseToast}
      />
    </Grid>
  );
}
