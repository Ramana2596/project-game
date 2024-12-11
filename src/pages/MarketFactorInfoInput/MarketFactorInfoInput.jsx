import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import GameBatch from "./components/GameBatch";
import Period from "./components/Period";
import MarketType from "./components/MarketType";
import { getMarketFactorInfoTableData } from "./services/marketFactorInputService";
import MarketFactorInputTable from "./components/MarketFactorInputTable";

export default function MarketFactorInfoInput() {
    const [isTableActionsEnable, setIsTableActionsEnable] = useState(false);
    const [shouldTriggerGetApi, setShouldTriggerApi] = useState(false);

    const initGetMarketFactorInput = {
        gameId: 'OpsMgt',
        gameBatch: null,
        productionMonth: null,
        marketInputId: null,
        partCategory: null,
        refTypeInfo: null,
        refTypePrice: null,
        cmdLine: 'Get_Info'
    };

    const [getMarketFactorInput, setFormData] = useState(initGetMarketFactorInput);
    const marketFactorInfoTableData = getMarketFactorInfoTableData(getMarketFactorInput, shouldTriggerGetApi);

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

    useEffect(() => {
        // Check if all required inputs have values and trigger API call
        if (getMarketFactorInput.gameBatch &&
            getMarketFactorInput.productionMonth &&
            getMarketFactorInput.marketInputId) {
            setShouldTriggerApi(true);
        }
    }, [getMarketFactorInput]);

    const formControlUpdate = (value) => {
        setShouldTriggerApi(false);
        setFormData({ ...getMarketFactorInput, ...value });
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <h1>Market Factor Info Input</h1>
            </Grid>
            <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                <GameBatch gameBatch={getMarketFactorInput.gameBatch} onFormControlUpdate={formControlUpdate} />
                <MarketType marketType={getMarketFactorInput.marketInputId} onFormControlUpdate={formControlUpdate} />
                <Period onDateChange={(date) => formControlUpdate({ productionMonth: date })} />
            </Grid>
            <Divider />
            <MarketFactorInputTable tableData={marketFactorInfoTableData.apiResponse}
                isEnableTableActions={isTableActionsEnable} />
        </Box>
    );
}
