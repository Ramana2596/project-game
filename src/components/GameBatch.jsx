import { TextField, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function GameBatch() {

    const [planFromDateValue, setValue] = useState(null);
    const [planToDateValue, setPlanToDateValue] = useState(null);
    const [batchStartDateValue, setBatchStartDate] = useState(null);
    

    const initialGameBatchFormData = {
        gameId: '1',
        gameBatch: '',
        venue: '',
        occupancy: '',
        planFromDate: '',
        planToDate: '',
        planDuration: '',
        uom: '',
        administrator: '',
        coordinator: '',
        actualDuration: '',
        batchStartDate: '',
        batchStatus: ''
    };
    const [GameBatchFormData, setFormData] = useState(initialGameBatchFormData);

    const onGMstFormControlChange = (event) => {
        if (event.currentTarget) {
            setFormData({
                ...GameBatchFormData,
                [event.currentTarget.id]: event.currentTarget.value,
            });
        } else if (event.target) {
            setFormData({
                ...GameBatchFormData,
                [event.target.name]: event.target.value,
            });
        }
    };

    const GameBatchUpdate = () => {
        return new Promise(resolve => {
            console.log(GameBatchFormData);
            setTimeout(resolve, 1000);
        });
    }

    const onGameBatchFormSubmit = (event) => {
        event.preventDefault();
        GameBatchUpdate();
    };

    const GameBatchFormReset = () => {
        setFormData({ ...initialGameBatchFormData });
        setValue(null);
    }

    const onFormSubmit = () => {
        GameBatchFormData.planFromDate = planFromDateValue ? planFromDateValue.format() : null;
        GameBatchFormData.planToDate = planToDateValue ? planToDateValue.format() : null;
        GameBatchFormData.batchStartDate = batchStartDateValue ? batchStartDateValue.format() : null;
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={onGameBatchFormSubmit}>
                <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField required disabled type="number" id="gameId" label="Game Id" variant="outlined" value={GameBatchFormData.gameId} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField required type="number" id="gameBatch" label="Game Batch" variant="outlined" value={GameBatchFormData.gameBatch} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="venue">Venue</InputLabel>
                            <Select
                                labelId="venue"
                                id="venueRequired"
                                name="venue"
                                value={GameBatchFormData.venue}
                                label="Venue *"
                                onChange={onGMstFormControlChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Ten'}>Ten</MenuItem>
                                <MenuItem value={'Twenty'}>Twenty</MenuItem>
                                <MenuItem value={'Thirty'}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField required type="number" id="occupancy" label="Occupancy" variant="outlined" value={GameBatchFormData.occupancy} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker defaultValue={dayjs('2022-04-17')} name="planFromDate" label="Plan from Date" value={planFromDateValue} onChange={setValue}/>
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker defaultValue={dayjs('2022-04-17')} name="planToDate" label="Plan To Date" value={planToDateValue} onChange={setPlanToDateValue}/>
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField required type="number" id="planDuration" label="Plan Duration" variant="outlined" value={GameBatchFormData.planDuration} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="uom">UOM</InputLabel>
                            <Select
                                labelId="uom"
                                id="uomRequired"
                                name="uom"
                                value={GameBatchFormData.uom}
                                label="UOM *"
                                onChange={onGMstFormControlChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Ten'}>Ten</MenuItem>
                                <MenuItem value={'Twenty'}>Twenty</MenuItem>
                                <MenuItem value={'Thirty'}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="administrator">Administrator</InputLabel>
                            <Select
                                labelId="administrator"
                                id="administratorRequired"
                                name="administrator"
                                value={GameBatchFormData.administrator}
                                label="Administrator *"
                                onChange={onGMstFormControlChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Ten'}>Ten</MenuItem>
                                <MenuItem value={'Twenty'}>Twenty</MenuItem>
                                <MenuItem value={'Thirty'}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="coordinator">Coordinator</InputLabel>
                            <Select
                                labelId="coordinator"
                                id="coordinatorRequired"
                                name="coordinator"
                                value={GameBatchFormData.coordinator}
                                label="Coordinator *"
                                onChange={onGMstFormControlChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Ten'}>Ten</MenuItem>
                                <MenuItem value={'Twenty'}>Twenty</MenuItem>
                                <MenuItem value={'Thirty'}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField required type="number" id="actualDuration" label="Actual Duration" variant="outlined" value={GameBatchFormData.actualDuration} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker defaultValue={dayjs('2022-04-17')} name="batchStartDate" label="Batch Start Date" value={batchStartDateValue} onChange={setBatchStartDate}/>
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        {/* <TextField id="batchStatus" label="Batch Status" variant="outlined" value={GameBatchFormData.batchStatus} onChange={onGMstFormControlChange} /> */}
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="batchStatus">Batch Status</InputLabel>
                            <Select
                                labelId="batchStatus"
                                id="batchStatusRequired"
                                name="batchStatus"
                                value={GameBatchFormData.batchStatus}
                                label="Batch Status *"
                                onChange={onGMstFormControlChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'Ten'}>Ten</MenuItem>
                                <MenuItem value={'Twenty'}>Twenty</MenuItem>
                                <MenuItem value={'Thirty'}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Button color="white" type="reset" variant="contained" onClick={GameBatchFormReset}>
                        Reset
                    </Button>
                    <Button type="submit" variant="contained" onClick={onFormSubmit}>
                        Submit
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}