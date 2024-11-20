import { Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import EditableTable from "../components/EditableTable";
import FetchDataFromApi from "../hooks/fetchData";
import UpdateApiCall from "../hooks/updateData";

export default function StrategyPlanApproval() {
    const [shouldUpdateStrategyPlan, setShouldUpdateStrategyPlan] = useState(false);
    const [strategyPlanRequestBody, setStrategyPlanRequestBody] = useState(null);
    const [checkboxStates, setCheckboxStates] = useState({});
    let [editableTableData, setEditableTableData] = useState([]);


    let { apiResponse: gameIdData, apiFailureErrorRes: gameBatchFailureRes, isLoading: gameBatchIsLoading } = FetchDataFromApi('https://loving-humpback-monthly.ngrok-free.app/api/getStrategyPlan?type=getStrategyPlan&gameId=OpsMgt&gameBatch=1&gameTeam=ALPHA', true);
    let { apiResponse: updateStrategyPlanAppr, apiFailureErrorRes: updateStrategyPlanFailureRes, isLoading: updateStrategyPlanIsLoading } = UpdateApiCall(strategyPlanRequestBody, `https://loving-humpback-monthly.ngrok-free.app/api/updateStrategyPlan`, shouldUpdateStrategyPlan);

    useEffect(() => {
        if (gameIdData) {
            setEditableTableData(gameIdData?.map((strategyPlanApprObj) =>
            ({
                ...strategyPlanApprObj,
                Decision: strategyPlanApprObj.Decision && strategyPlanApprObj.Decision === 'Yes' ? true : false
            })));
        }
    }, [gameIdData]);



    if (gameBatchIsLoading) return (<div>...Loading</div>);
    if (gameBatchFailureRes) return (<div>{gameBatchFailureRes}</div>);

    const strategFormUpdate = () => {
        setStrategyPlanRequestBody(editableTableData?.map((strategyPlanApprObj) => ({
            gameId: 'OpsMgt',
            gameBatch: 1,
            gameTeam: 'ALPHA',
            strategySetNo: strategyPlanApprObj.Strategy_Set_No,
            strategyId: strategyPlanApprObj.Strategy_Id,
            playerDecision: strategyPlanApprObj.Decision ? 'Yes' : 'No',
            decidedBy: 'player'
        })));
        console.log(strategyPlanRequestBody);
        setShouldUpdateStrategyPlan(true);
    }

    const strategyFormSubmit = (event) => {
        event.preventDefault();
        strategFormUpdate();
    };

    const handleCheckboxChange = (id, checked) => {
        setShouldUpdateStrategyPlan(false);
        setCheckboxStates((prevState) => (
            { ...prevState, [id]: checked, }));
        editableTableData.forEach((tableObj) => tableObj.Strategy_Id === id ? tableObj.Decision = checked : null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={strategyFormSubmit}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <h1>Strategy Plan Approval</h1>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <h3>Game Batch</h3>
                    <h3>Game Team</h3>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Button type="submit" variant="contained" onClick={strategyFormSubmit}>
                        Submit
                    </Button>
                </Grid>
            </form>
            {
                <EditableTable editableTableData={editableTableData} onCheckboxChange={handleCheckboxChange} hiddenColumns={['Strategy_Id', 'Strategy_Set_No']}></EditableTable>
            }
        </Box>
    );
}