import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import GenericTable from "../../components/GenericTable";
import GameBatch from "./components/GameBatch";
import Period from "./components/Period";
import Grid from '@mui/material/Grid2';
import Divider from '@mui/material/Divider';
import MarketType from "./components/MarketType";
import { getMarketFactorInfoTableData } from "./services/marketFactorInputService";

export default function MarketFactorInfoInput() {
    const [isDisableActionBtns, setIsDisableActionBtns] = useState(true);
    const [isDisableSubCanBtns, setIsDisableSubCanBtns] = useState(true);
    const [shouldTriggerGetApi, setShouldTriggerApi] = useState(false);

    const initMarketFactorInfoInputPayload = {
        gameBatch: '',
        gameId: 'OpsMgt',
        marketInputId: '',
        productionMonth: '',
        partCategory: ''
    };

    const [marketFactorInfoInputPayload, setFormData] = useState(initMarketFactorInfoInputPayload);
    const tableHeading = ['Item Description', 'UOM', 'Quantity', 'Unit Price', 'Currency', 'Info Price'];
    const hiddenTableColumns = ['Qty_Id', 'Info_Qty', 'Part', 'Period', 'Price_Id'];
    const marketFactorInfoTableData = getMarketFactorInfoTableData('getMarketInfo', marketFactorInfoInputPayload, shouldTriggerGetApi);

    useEffect(() => {
        if (shouldTriggerGetApi &&
            marketFactorInfoTableData?.apiResponse &&
            marketFactorInfoTableData?.apiResponse.length > 0) {
            setIsDisableActionBtns(false);
            setIsDisableSubCanBtns(true);
        }
    }, [shouldTriggerGetApi, marketFactorInfoTableData]);

    const marketFactorInputFormSubmit = (event) => {
        event.preventDefault();
        setShouldTriggerApi(true);
    };

    const formControlUpdate = (value) => {
        setShouldTriggerApi(false);
        setFormData({ ...marketFactorInfoInputPayload, ...value });
    };

    const onAddBtnClick = () => {
        setShouldTriggerApi(false);
        setIsDisableActionBtns(true);
        setIsDisableSubCanBtns(false);
    };

    const onModifyBtnClick = () => {
        setShouldTriggerApi(false);
        setIsDisableActionBtns(true);
        setIsDisableSubCanBtns(false);
    };

    const onDeleteBtnClick = () => {
        setShouldTriggerApi(false);
        setIsDisableActionBtns(true);
        setIsDisableSubCanBtns(false);
    };

    const onSubmitBtnClick = () => {
        setShouldTriggerApi(false);
        setIsDisableActionBtns(false);
        setIsDisableSubCanBtns(true);
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
                        Submit
                    </Button>
                </Grid>
            </form>
            <Divider />
            <Grid margin={5} container spacing={2} justifyContent="center" alignItems="center">
                <Button disabled={isDisableActionBtns} type="button" variant="contained" onClick={onAddBtnClick}>
                    Add
                </Button>
                <Button disabled={isDisableActionBtns} type="button" variant="contained" onClick={onModifyBtnClick}>
                    Modify
                </Button>
                <Button disabled={isDisableActionBtns} type="button" variant="contained" onClick={onDeleteBtnClick}>
                    Delete
                </Button>
                <Button disabled={isDisableSubCanBtns} type="button" variant="contained" onClick={onSubmitBtnClick}>
                    Cancel
                </Button>
                <Button disabled={isDisableSubCanBtns} type="button" variant="contained" onClick={onSubmitBtnClick}>
                    Submit
                </Button>
            </Grid>
            <GenericTable inputTableHeadings={tableHeading}
                inputTableData={marketFactorInfoTableData?.apiResponse}
                ifNoData={null}
                hiddenColumns={hiddenTableColumns} />
        </Box>
    );
}
