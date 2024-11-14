import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';
import GenericTable from "../components/GenericTable";
import EditableTable from "../components/EditableTable";
import FetchDataFromApi from "../hooks/fetchData";

export default function StrategyPlanApproval() {
    const [shouldFetchGameBatch, setShouldFetchGameBatch] = useState(false);
    const [isStrategyPlanEdit, setIsStrategyPlanEdit] = useState(false);

    const initialStrategyPlanFormData = {
        gameId: '',
        gameBatch: '',
        gameTeam: '',
        strategySetNo: '',
        playerDecision: ''
    };

    const [strategyPlanFormData, setFormData] = useState(initialStrategyPlanFormData);

    const tableHeading = ['Decision', 'Strategy', 'Benefit', 'Choice Group', 'Currency', 'Budget', 'Invest date', 'Outcome', 'From Month', 'Duration', 'Norm %', 'Loss %'];

    let { apiResponse: gameIdData, apiFailureErrorRes: gameBatchFailureRes, isLoading: gameBatchIsLoading } = FetchDataFromApi('https://loving-humpback-monthly.ngrok-free.app/api/data', true);
    let { apiResponse: gameBatchData, apiFailureErrorRes: gameBatchDataFailureRes, isLoading: gameBatchDataIsLoading } = FetchDataFromApi(`https://loving-humpback-monthly.ngrok-free.app/api/getStrategySetData?type=getGameBatch&gameId='OpsMgt'`, shouldFetchGameBatch);
    let { apiResponse: strategyPlanData, apiFailureErrorRes: strategyPlanDataFailureRes, isLoading: strategyPlanDataIsLoading } = FetchDataFromApi(`https://loving-humpback-monthly.ngrok-free.app/api/getStrategyPlanData?type=getGameBatch&gameId='OpsMgt'`, false);


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
        setIsStrategyPlanEdit(false);
    };

    const strategyPlanUpdate = (event) => {
        event.preventDefault();
        setIsStrategyPlanEdit(false);
    }

    const editStrategyPlan = (event) => {
        event.preventDefault();
        setIsStrategyPlanEdit(true);
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={strategyFormSubmit}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Button color="white" type="reset" variant="contained" onClick={editStrategyPlan}>
                        Edit
                    </Button>
                    <Button color="white" type="reset" variant="contained" onClick={strategyPlanUpdate}>
                        Change
                    </Button>
                    <Button type="submit" variant="contained" onClick={strategyFormSubmit}>
                        Submit
                    </Button>
                </Grid>
            </form>
            {
                isStrategyPlanEdit ?
                    <EditableTable inputTableHeadings={tableHeading} editableTableData={gameIdData}></EditableTable> :
                    <GenericTable inputTableHeadings={tableHeading} inputTableData={gameIdData} ifNoData={false} isAnEditableTable={true}></GenericTable>
            }
        </Box>
    );
}