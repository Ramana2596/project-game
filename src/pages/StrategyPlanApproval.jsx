import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';
import EditableTable from "../components/EditableTable";
import FetchDataFromApi from "../hooks/fetchData";

export default function StrategyPlanApproval() {
    const [shouldFetchGameBatch, setShouldFetchGameBatch] = useState(false);

    const initialStrategyPlanFormData = {
        gameId: '',
        gameBatch: '',
        gameTeam: '',
        strategySetNo: '',
        playerDecision: ''
    };

    const [strategyPlanFormData, setFormData] = useState(initialStrategyPlanFormData);


    let { apiResponse: gameIdData, apiFailureErrorRes: gameBatchFailureRes, isLoading: gameBatchIsLoading } = FetchDataFromApi('https://loving-humpback-monthly.ngrok-free.app/api/getStrategyPlan?type=getStrategyPlan&gameId=OpsMgt&gameBatch=1&gameTeam=ALPHA', true);
    let { apiResponse: gameBatchData, apiFailureErrorRes: gameBatchDataFailureRes, isLoading: gameBatchDataIsLoading } = FetchDataFromApi(`https://loving-humpback-monthly.ngrok-free.app/api/getStrategySetData?type=getGameBatch&gameId='OpsMgt'`, shouldFetchGameBatch);
    let { apiResponse: strategyPlanData, apiFailureErrorRes: strategyPlanDataFailureRes, isLoading: strategyPlanDataIsLoading } = FetchDataFromApi(`https://loving-humpback-monthly.ngrok-free.app/api/getStrategyPlanData?type=getGameBatch&gameId='OpsMgt'`, false);

    const tableHeading = [];

    if (gameBatchIsLoading) return (<div>...Loading</div>);
    if (gameBatchFailureRes) return (<div>{gameBatchFailureRes}</div>);

    const strategFormUpdate = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    const strategyFormSubmit = (event) => {
        event.preventDefault();
        strategFormUpdate();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={strategyFormSubmit}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <h1>Strategy Plan Approval</h1>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <h3>Strategy Set No</h3>
                    <h3>Strategy Id</h3>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Button type="submit" variant="contained" onClick={strategyFormSubmit}>
                        Submit
                    </Button>
                </Grid>
            </form>
            {
                <EditableTable editableTableData={gameIdData}></EditableTable>
            }
        </Box>
    );
}