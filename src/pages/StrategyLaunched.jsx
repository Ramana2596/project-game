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

    const initialStrategyLaunchedFormData = {
        gameId: '',
        gameBatch: '',
        strategySetNo: ''
    };

    const [strategyLaunchedFormData, setFormData] = useState(initialStrategyLaunchedFormData);

    const tableHeading = ['Strategy', 'Benefit', 'Choice Group', 'Currency', 'Budget', 'Invest date', 'Outcome', 'From Month', 'Duration', 'Norm %', 'Loss %'];

    let { apiResponse: gameIdData, apiFailureErrorRes: gameBatchFailureRes, isLoading: gameBatchIsLoading } = FetchDataFromApi('/api/data', true);
    const { apiResponse: strategyLaunchedRes,
        apiFailureErrorRes: strategyLaunchedFailureRes,
        isLoading: strategyLaunchedIsLoading } = FetchDataFromApi(`/api/getStrategySetData`, shouldFetchStratechLaunch, {
            "type": "launchData",
            "gameId": `'${strategyLaunchedFormData?.gameId}'`,
            "gameBatch": strategyLaunchedFormData?.gameBatch,
            "strategySetNo": strategyLaunchedFormData?.strategySetNo
        });
    let { apiResponse: gameBatchData,
        apiFailureErrorRes: gameBatchDataFailureRes,
        isLoading: gameBatchDataIsLoading } = FetchDataFromApi(`/api/getStrategySetData`, shouldFetchGameBatch, {
            "type": "getGameBatch",
            "gameId": "'OpsMgt'"
        }
        );
    let { apiResponse: getStrategySetNoData,
        apiFailureErrorRes: getStrategySetNoDataFailed,
        isLoading: getStrategySetNoDataIsLoading } = FetchDataFromApi(`/api/getStrategySetData`, shouldFetchStrategySet, {
            "type": "getGameBatch",
            "gameId": "'OpsMgt'"
        });

    if (gameBatchIsLoading) return (<div>...Loading</div>);
    if (gameBatchFailureRes) return (<div>{gameBatchFailureRes}</div>);

    const onStrategyFormControlUpdate = (event) => {
        setShouldFetchStrategyLaunch(false);
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
                                        <MenuItem value={mapObj.Game_Id}>{mapObj.Game_Title}</MenuItem>
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