import { TextField, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function StrategyLaunched() {
    const [gameBatchData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [launchDateValue, setValue] = useState(null);

    const initialStrategyLaunchedFormData = {
        gameId: '',
        gameBatch: '',
        strategySetNo: '',
        approvedBy: '',
        launchDate: ''
    };

    const [strategyLaunchedFormData, setFormData] = useState(initialStrategyLaunchedFormData);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    'https://loving-humpback-monthly.ngrok-free.app/api/data',
                    {
                        headers: {
                            'ngrok-skip-browser-warning': 'true'
                        }
                    });
                if (!response.ok) {
                    throw new Error('Some Error occurred');
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err?.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) return (<div>...Loading</div>);
    if (error) return (<div>...Error</div>);

    const onStrategyFormControlUpdate = (event) => {
        if (event.currentTarget) {
            setFormData({
                ...strategyLaunchedFormData,
                [event.currentTarget.id]: event.currentTarget.value,
            });
        } else if (event.target) {
            setFormData({
                ...strategyLaunchedFormData,
                [event.target.name]: event.target.value,
            });
        }
    };

    const strategFormUpdate = () => {
        return new Promise(resolve => {
            console.log(strategyLaunchedFormData);
            setTimeout(resolve, 1000);
        });
    }

    const strategyFormSubmit = (event) => {
        event.preventDefault();
        strategyLaunchedFormData.launchDate = launchDateValue ? launchDateValue.format() : null;
        strategFormUpdate();
    };

    const strategyFormReset = () => {
        setFormData({ ...initialStrategyLaunchedFormData });
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={strategyFormSubmit}>
                <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                            <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                                <InputLabel id="gameId">Game Id</InputLabel>
                                <Select
                                    labelId="gameId"
                                    id="gameIdRequired"
                                    name="gameId"
                                    value={strategyLaunchedFormData.gameId}
                                    label="Game Id *"
                                    onChange={onStrategyFormControlUpdate}
                                >
                                    {gameBatchData?.map((mapObj) =>
                                        <MenuItem value={mapObj.Game_Id}>{mapObj.Game_Id}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="gameBatch">Game Batch</InputLabel>
                            <Select
                                labelId="gameBatch"
                                id="gameBatchRequired"
                                name="gameBatch"
                                value={strategyLaunchedFormData.gameBatch}
                                label="Game Batch *"
                                onChange={onStrategyFormControlUpdate}>
                                <MenuItem value="test">Test</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField required id="strategySetNo" type="number" label="Strategy Set No" variant="outlined" value={strategyLaunchedFormData.strategySetNo} onChange={onStrategyFormControlUpdate} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField required id="approvedBy" label="Approved By" variant="outlined" value={strategyLaunchedFormData.approvedBy} onChange={onStrategyFormControlUpdate} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker defaultValue={dayjs('2022-04-17')} name="launchDate" label="Launch Date" value={launchDateValue} onChange={setValue} />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Button color="white" type="reset" variant="contained" onClick={strategyFormReset}>
                        Reset
                    </Button>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}