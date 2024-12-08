import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid2';

export default function Period({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(dayjs('2022-04-17'));

  const handleChange = (newDate) => {
    setSelectedDate(newDate);
    if (onDateChange) {
      onDateChange({'productionMonth': newDate.format('YYYY-MM-DD')});
    }
  };

  return (
    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          name="productionMonth" 
          value={selectedDate} 
          onChange={handleChange} 
          label="Period" 
        />
      </LocalizationProvider>
    </Grid>
  );
}