import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import GameBatch from "./components/GameBatch";
import Period from "./components/Period";
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import MarketType from "./components/MarketType";
import { getMarketFactorInfoTableData } from "./services/marketFactorInputService";
import MarketFactorInputTable from "./components/MarketFactorInputTable";

export default function MarketFactorInfoInput() {
    const [isTableActionsEnable, setIsTableActionsEnable] = useState(false);
    const [shouldTriggerGetApi, setShouldTriggerApi] = useState(false);

    const initMarketFactorInfoInputPayload = {
        gameBatch: '',
        gameId: 'OpsMgt',
        marketInputId: '',
        productionMonth: '',
        partCategory: ''
    };

    const [marketFactorInfoInputPayload, setFormData] = useState(initMarketFactorInfoInputPayload);
    const marketFactorInfoTableData = getMarketFactorInfoTableData('getMarketInfo', marketFactorInfoInputPayload, shouldTriggerGetApi);

    useEffect(() => {
        if (shouldTriggerGetApi &&
            marketFactorInfoTableData?.apiResponse &&
            marketFactorInfoTableData?.apiResponse.length > 0) {
            setIsTableActionsEnable(true);
        }
    }, [shouldTriggerGetApi, marketFactorInfoTableData]);

    useEffect(() => {
        if (isTableActionsEnable) {
            setShouldTriggerApi(false);
        }
    }, [isTableActionsEnable]);

    const marketFactorInputFormSubmit = (event) => {
        event.preventDefault();
        setShouldTriggerApi(true);
    };

    const formControlUpdate = (value) => {
        setShouldTriggerApi(false);
        setFormData({ ...marketFactorInfoInputPayload, ...value });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={marketFactorInputFormSubmit}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <h1>Market Factor Info Input</h1>
                </Grid>
                <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <GameBatch gameBatch={marketFactorInfoInputPayload.gameBatch} onFormControlUpdate={formControlUpdate} />
                    <MarketType marketType={marketFactorInfoInputPayload.marketInputId} onFormControlUpdate={formControlUpdate} />
                    <Period onDateChange={(date) => formControlUpdate({ productionMonth: date })} />
                </Grid>
                <Grid sx={{ margin: 5 }} container spacing={2} justifyContent="center" alignItems="center">
                    <Button type="submit" variant="contained">
                        Load Table
                    </Button>
                </Grid>
            </form>
            <Divider />
            <MarketFactorInputTable tableData={marketFactorInfoTableData.apiResponse}
                isEnableTableActions={isTableActionsEnable} />
        </Box>
    );
}
