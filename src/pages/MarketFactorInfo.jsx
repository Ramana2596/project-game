import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';
import GenericTable from "../components/GenericTable";
import FetchDataFromApi from "../hooks/fetchData";

export default function MarketFactorInfo() {
    const [shouldFetchMarketFactorInfo, setShouldFetchMarketFactorInfo] = useState(false);
    let selectedGameBatch = null;

    let { apiResponse: gameData, apiFailureErrorRes: gameDataFailiureRes, isLoading: gameDataIsLoading } = FetchDataFromApi('https://loving-humpback-monthly.ngrok-free.app/api/data', true);
    let { apiResponse: marketFactorInfo, apiFailureErrorRes: marketFactorInfoFailedRes, isLoading: marketFactorInfoIsLoading } = FetchDataFromApi(`https://loving-humpback-monthly.ngrok-free.app/api/getMarketFactorInfo'`, shouldFetchMarketFactorInfo);

    let tableHeading = [];

    if (gameDataIsLoading || marketFactorInfoIsLoading) return (<div>...Loading</div>);
    if (gameDataFailiureRes) return (<div>{gameDataFailiureRes}</div>);

    const onMarketFactorInfoFormUpddate = (event) => {
        setShouldFetchMarketFactorInfo(false);
        if (event.currentTarget) {
            selectedGameBatch = event.currentTarget.value;
        } else if (event.target) {
            selectedGameBatch = event.target.value;
        }
    };

    const marketFormInfoSumbit = (event) => {
        event.preventDefault();
        setShouldFetchMarketFactorInfo(true);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={marketFormInfoSumbit}>
                <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="gameBatch">Game Batch</InputLabel>
                            <Select
                                labelId="gameBatch"
                                id="gameBatchRequired"
                                name="gameBatch"
                                value={selectedGameBatch}
                                label="Game Batch *"
                                onChange={onMarketFactorInfoFormUpddate}>
                                {
                                    gameData?.map((mapObj) =>
                                        <MenuItem value={mapObj.Game_Batch}>{mapObj.Game_Batch}</MenuItem>
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Grid>
            </form>
            <GenericTable inputTableHeadings={tableHeading} inputTableData={marketFactorInfo} ifNoData={marketFactorInfoFailedRes}></GenericTable>
        </Box>
    );
}