import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';
import GenericTable from "../components/GenericTable";
import FetchDataFromApi from "../hooks/fetchData";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

export default function StrategyPlan() {
    const [shouldFetchGameBatch, setShouldFetchGameBatch] = useState(false);

    const initialStrategyPlanFormData = {
        gameId: '',
        gameBatch: '',
        gameTeam: '',
        playerDecision: ''
    };

    const [strategyPlanFormData, setFormData] = useState(initialStrategyPlanFormData);

    const tableHeading = ['Decision', 'Strategy', 'Benefit', 'Choice Group', 'Currency', 'Budget', 'Invest date', 'Outcome', 'From Month', 'Duration', 'Norm %', 'Loss %'];

    let { apiResponse: gameIdData, apiFailureErrorRes: gameBatchFailureRes, isLoading: gameBatchIsLoading } = FetchDataFromApi('https://loving-humpback-monthly.ngrok-free.app/api/data', true);
    let { apiResponse: gameBatchData, apiFailureErrorRes: gameBatchDataFailureRes, isLoading: gameBatchDataIsLoading } = FetchDataFromApi(`https://loving-humpback-monthly.ngrok-free.app/api/getStrategySetData?type=getGameBatch&gameId='OpsMgt'`, shouldFetchGameBatch);

    if (gameBatchIsLoading) return (<div>...Loading</div>);
    if (gameBatchFailureRes) return (<div>{gameBatchFailureRes}</div>);

    const onStrategyFormControlUpdate = (event) => {
        if (event.currentTarget) {
            setFormData({
                ...strategyPlanFormData,
                [event.currentTarget.id]: event.currentTarget.value,
            });
        } else if (event.target) {
            setFormData({
                ...strategyPlanFormData,
                [event.target.name]: event.target.value,
            });
            if (event.target.name === 'gameId') {
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
    };

    const strategyFormReset = () => {
        setFormData({ ...initialStrategyPlanFormData });
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={strategyFormSubmit}>
                <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                            <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                                <InputLabel id="gameId">Game Details</InputLabel>
                                <Select
                                    labelId="gameId"
                                    id="gameIdRequired"
                                    name="gameId"
                                    value={strategyPlanFormData.gameId}
                                    label="Game Details *"
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
                                value={strategyPlanFormData.gameBatch}
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
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="gameTeam">Game Team</InputLabel>
                            <Select
                                labelId="gameTeam"
                                id="gameTeamRequired"
                                name="gameTeam"
                                value={strategyPlanFormData.gameTeam}
                                label="Game Team *"
                                onChange={onStrategyFormControlUpdate}>
                                <MenuItem value={'Test'}>{'Test'}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Player Decision</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                <FormControlLabel value="false" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
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
            <GenericTable inputTableHeadings={tableHeading} inputTableData={[]} ifNoData={false}></GenericTable>
        </Box>
    );
}