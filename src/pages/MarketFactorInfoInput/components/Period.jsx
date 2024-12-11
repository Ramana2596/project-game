import React, { useState, useEffect } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid2';

export default function Period({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('month')); // Set initial value to the first day of the current month

  useEffect(() => {
    // Emit the initial value when the component mounts
    if (onDateChange) {
      onDateChange(selectedDate.format('YYYY-MM-DD'));
    }
  }, [onDateChange, selectedDate]);

  const handleChange = (newDate) => {
    const firstDayOfMonth = newDate.date(1); // Set the day to the first day of the month
    setSelectedDate(firstDayOfMonth);
    if (onDateChange) {
      onDateChange(firstDayOfMonth.format('YYYY-MM-DD')); // Format the date as 'YYYY-MM-DD'
    }
  };

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          views={['year', 'month']}
          name="productionMonth"
          value={selectedDate}
          onChange={handleChange}
          label="Period"
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
    </Grid>
  );
}
