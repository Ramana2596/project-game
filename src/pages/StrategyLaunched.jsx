import { TextField, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
import GenericTable from "../components/GenericTable";
import FetchDataFromApi from "../hooks/fetchData";

export default function StrategyLaunched() {
    const [shouldFetchStratechLaunch, setShouldFetchStrategyLaunch] = useState(false);
    const [shouldFetchGameBatch, setShouldFetchGameBatch] = useState(false);
    const [shouldFetchStrategySet, setShouldFetchStrategySet] = useState(false);
    let { apiResponse: gameIdData, apiFailureErrorRes: gameBatchFailureRes, isLoading: gameBatchIsLoading } = FetchDataFromApi('https://loving-humpback-monthly.ngrok-free.app/api/data', true);
    const { apiResponse: strategyLaunchedRes, apiFailureErrorRes: strategyLaunchedFailureRes, isLoading: strategyLaunchedIsLoading } = FetchDataFromApi(`https://loving-humpback-monthly.ngrok-free.app/api/getStrategySetData?type=launchData&gameId='OpsMgt'&gameBatch=1&strategySetNo=2`, shouldFetchStratechLaunch);
    let { apiResponse: gameBatchData, apiFailureErrorRes: gameBatchDataFailureRes, isLoading: gameBatchDataIsLoading } = FetchDataFromApi(`https://loving-humpback-monthly.ngrok-free.app/api/getStrategySetData?type=getGameBatch&gameId='OpsMgt'`, shouldFetchGameBatch);
    let { apiResponse: getStrategySetNoData, apiFailureErrorRes: getStrategySetNoDataFailed, isLoading: getStrategySetNoDataIsLoading } = FetchDataFromApi(`https://loving-humpback-monthly.ngrok-free.app/api/getStrategySetData?type=getStrategySet&gameId='OpsMgt'`, shouldFetchStrategySet);

    const initialStrategyLaunchedFormData = {
        gameId: '',
        gameBatch: '',
        strategySetNo: ''
    };

    const [strategyLaunchedFormData, setFormData] = useState(initialStrategyLaunchedFormData);

    const tableHeading = ['Strategy', 'Benefit', 'Budget', 'Invest date', 'Outcome', 'From Month', 'Duration', 'Norm Percent', 'Loss Percent']

    if (gameBatchIsLoading) return (<div>...Loading</div>);
    if (gameBatchFailureRes) return (<div>{gameBatchFailureRes}</div>);

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
            if (event.target.name === 'gameId') {
                setShouldFetchStrategySet(true);
                setShouldFetchGameBatch(true);
            }
        }
    };

    const strategFormUpdate = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    const strategyFormSubmit = (event) => {
        event.preventDefault();
        strategFormUpdate();
        setShouldFetchStrategyLaunch(true);
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
                                    {gameIdData?.map((mapObj) =>
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
                                {
                                    gameBatchData?.map((mapObj) =>
                                        <MenuItem value={mapObj.Game_Batch}>{mapObj.Game_Batch}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                            <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                                <InputLabel id="strategySetNo">Strategy Set No</InputLabel>
                                <Select
                                    labelId="strategySetNo"
                                    id="strategySetNo"
                                    name="strategySetNo"
                                    value={strategyLaunchedFormData.strategySetNo}
                                    label="Strategy Set No *"
                                    onChange={onStrategyFormControlUpdate}
                                >
                                    {getStrategySetNoData?.map((mapObj) =>
                                        <MenuItem value={mapObj.Strategy_Set_No}>{mapObj.Strategy_Set_No}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
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
            <GenericTable inputTableHeadings={tableHeading} inputTableData={strategyLaunchedRes} ifNoData={strategyLaunchedFailureRes}></GenericTable>
        </Box>
    );
}