import { TextField, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function GameSession() {

    const [productionMonthValue, setValue] = useState(null);
    const [sessionDateValue, setPlanToDateValue] = useState(null);
    

    const initialGameSessionFormData = {
        gameId: '1',
        gameBatch: '11',
        productionMonth: '',
        sessionDate: '',
        sessionHandler: '',
        venue: ''
    };
    const [GameSessionFormData, setFormData] = useState(initialGameSessionFormData);

    const onSessionFormControlChange = (event) => {
        if (event.currentTarget) {
            setFormData({
                ...GameSessionFormData,
                [event.currentTarget.id]: event.currentTarget.value,
            });
        } else if (event.target) {
            setFormData({
                ...GameSessionFormData,
                [event.target.name]: event.target.value,
            });
        }
    };

    const GameSessionUpdate = () => {
        return new Promise(resolve => {
            console.log(GameSessionFormData);
            setTimeout(resolve, 1000);
        });
    }

    const onGameSessionFormSubmit = (event) => {
        event.preventDefault();
        GameSessionUpdate();
    };

    const GameSessionFormReset = () => {
        setFormData({ ...initialGameSessionFormData });
        setValue(null);
    }

    const onSessionFormSubmit = () => {
        GameSessionFormData.productionMonth = productionMonthValue ? productionMonthValue.format() : null;
        GameSessionFormData.sessionDate = sessionDateValue ? sessionDateValue.format() : null;
    }
    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={onGameSessionFormSubmit}>
                <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField required disabled type="number" id="gameId" label="Game Id" variant="outlined" value={GameSessionFormData.gameId} onChange={onSessionFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField required disabled type="number" id="gameBatch" label="Game Batch" variant="outlined" value={GameSessionFormData.gameBatch} onChange={onSessionFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker defaultValue={dayjs('2022-04-17')} name="productionMonth" label="Plan from Date" value={productionMonthValue} onChange={setValue}/>
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker defaultValue={dayjs('2022-04-17')} name="sessionDate" label="Plan To Date" value={sessionDateValue} onChange={setPlanToDateValue}/>
                        </LocalizationProvider>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="sessionHandler">Session Handler</InputLabel>
                            <Select
                                labelId="sessionHandler"
                                id="sessionHandlerRequired"
                                name="sessionHandler"
                                value={GameSessionFormData.sessionHandler}
                                label="Session Handler *"
                                onChange={onSessionFormControlChange}
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
                            <InputLabel id="venue">Venue</InputLabel>
                            <Select
                                labelId="venue"
                                id="venueRequired"
                                name="venue"
                                value={GameSessionFormData.venue}
                                label="Venue *"
                                onChange={onSessionFormControlChange}
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
                    <Button color="white" type="reset" variant="contained" onClick={GameSessionFormReset}>
                        Reset
                    </Button>
                    <Button type="submit" variant="contained" onClick={onSessionFormSubmit}>
                        Submit
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}