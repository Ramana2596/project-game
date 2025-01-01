import { Box } from "@mui/material"
import Grid from '@mui/material/Grid2';
import GenericTable from "../../components/GenericTable";
import FetchDataFromApi from "../../hooks/fetchData.jsx";
import {useUser} from "../../core/access/userContext.js";

export default function OperationalPlanInfo() {
    const {userInfo} = useUser();
    let getOperationalPlanInfoParam = {
        gameId: userInfo?.gameId,
        gameBatch: userInfo?.gameBatch,
        gameTeam: userInfo?.gameTeam
    };
    let gameData = FetchDataFromApi('/api/data', true);
    let operationalInfoData = FetchDataFromApi(`/api/getOperationalPlanInfo`, true, getOperationalPlanInfoParam);
    let tableHeading = ['Period', 'Category', 'Part_Name', 'Quantity', 'Operation_Info', 'Unit_Price', 'Currency', 'Price_Info'];

    if (gameData?.isLoading) return (<div>...Loading</div>);
    if (gameData?.apiFailureErrorRes) return (<div>{gameData?.apiFailureErrorRes}</div>);

    return (
        <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <h1>Operational Plan Info</h1>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <h3>Game Batch: {userInfo?.gameBatch}</h3>
                    <h3>Game Team: {userInfo?.gameTeam}</h3>
                </Grid>
            <GenericTable inputTableHeadings={tableHeading} inputTableData={operationalInfoData?.apiResponse} ifNoData={operationalInfoData?.apiFailureErrorRes} hiddenColumns={['Part_No', 'Qty_Id', 'Price_Id']}></GenericTable>
        </Box>
    );
}