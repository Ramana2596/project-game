import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid2';

export default function Period() {
    return (<Grid size={{ xs: 2, sm: 4, md: 4 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={dayjs('2022-04-17')} name="period" label="Period" />
        </LocalizationProvider>
    </Grid>);
}