import { TextField, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
import GenericTable from "./shared/components/GenericTable";

export default function StrategyLaunched() {
    const [gameBatchData, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [strategyLaunchErr, setStartegyLaunchErr] = useState(false);
    const [strategyLaunchTableData, setStrategyLaunchTableData] = useState(null);
    const [shouldFetchStratechLaunch, setShouldFetchStrategyLaunch] = useState(false);
    // const [launchDateValue, setValue] = useState(null);

    const initialStrategyLaunchedFormData = {
        gameId: '',
        gameBatch: '',
        strategySetNo: ''
    };

    const [strategyLaunchedFormData, setFormData] = useState(initialStrategyLaunchedFormData);

    const tableHeading = ['Strategy', 'Benefit', 'Budget', 'Invest date', 'Outcome', 'From Month', 'Duration', 'Norm Percent', 'Loss Percent']

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

    useEffect(() => {
        if (shouldFetchStratechLaunch) {
            async function fetchStrategyLauncData() {
                try {
                    const tableDataRes = await fetch(
                        `https://loving-humpback-monthly.ngrok-free.app/api/getStrategySetData?gameId='OpsMgt'&gameBatch=1&strategySetNo=2`,
                        {
                            headers: {
                                'ngrok-skip-browser-warning': 'true'
                            }
                        });
                    if (!tableDataRes.ok) {
                        throw new Error('Some Error occurred');
                    }

                    const result = await tableDataRes.json();
                    setStrategyLaunchTableData(result);
                } catch (err) {
                    setStartegyLaunchErr(true);
                }
            }
            fetchStrategyLauncData();
            setShouldFetchStrategyLaunch(false);
        }
    }, [shouldFetchStratechLaunch]);

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
            setTimeout(resolve, 1000);
        });
    }

    const strategyFormSubmit = (event) => {
        event.preventDefault();
        // strategyLaunchedFormData.launchDate = launchDateValue ? launchDateValue.format() : null;
        strategFormUpdate();
        setShouldFetchStrategyLaunch(true);
    };

    const strategyFormReset = () => {
        setFormData({ ...initialStrategyLaunchedFormData });
    }

    const updateTableData = () => {

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
            <GenericTable inputTableHeadings={tableHeading} inputTableData={strategyLaunchTableData} ifNoData={strategyLaunchErr}></GenericTable>
        </Box>
    );
}