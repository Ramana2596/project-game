import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';
import GenericTable from "../components/GenericTable";
import FetchDataFromApi from "../hooks/fetchData";

export default function MarketFactorInfo() {
    const [shouldFetchMarketFactorInfo, setShouldFetchMarketFactorInfo] = useState(false);
    const [getMarketFactorInfoParam, setGetMarketInfoParam] = useState(null);
    const [selectedGameBatch, setSelectedBatch] = useState(null);


    let { apiResponse: gameData,
        apiFailureErrorRes: gameDataFailiureRes,
        isLoading: gameDataIsLoading } = FetchDataFromApi('/api/data', true);
    let { apiResponse: marketFactorInfo,
        apiFailureErrorRes: marketFactorInfoFailedRes,
        isLoading: marketFactorInfoIsLoading } = FetchDataFromApi(`/api/getMarketFactorInfo`, shouldFetchMarketFactorInfo, getMarketFactorInfoParam);
    let { apiResponse: gameBatchData,
        apiFailureErrorRes: gameBatchDataFailureRes,
        isLoading: gameBatchDataIsLoading } = FetchDataFromApi(`/api/getStrategySetData`, true, {
            "type": "getGameBatch",
            "gameId": "'OpsMgt'"
        }
        );
    let tableHeading = ['Period', 'Category', 'Part', 'Description', 'Quantity', 'Market_Info', 'Unit_Price', 'Currency', 'Price_Info'];

    if (gameDataIsLoading) return (<div>...Loading</div>);
    if (gameDataFailiureRes) return (<div>{gameDataFailiureRes}</div>);

    const onMarketFactorInfoFormUpddate = (event) => {
        setShouldFetchMarketFactorInfo(false);
        if (event.currentTarget) {
            setSelectedBatch(event.currentTarget.value);
        } else if (event.target) {
            setSelectedBatch(event.target.value);
        }
    };

    const marketFormInfoSumbit = (event) => {
        event.preventDefault();
        setGetMarketInfoParam({
            gameId: 'OpsMgt',
            gameBatch: selectedGameBatch
        });
        setShouldFetchMarketFactorInfo(true);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={marketFormInfoSumbit}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <h1>Market Factor Info</h1>
                </Grid>
                <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="gameBatch">Game Batch</InputLabel>
                            <Select
                                labelId="gameBatch"
                                id="gameBatchRequired"
                                name="gameBatch"
                                label="Game Batch *"
                                value={selectedGameBatch}
                                onChange={onMarketFactorInfoFormUpddate}>
                                {
                                    gameBatchData?.map((mapObj) =>
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