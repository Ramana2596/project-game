import { Box } from "@mui/material";
import { useState } from "react";
import Button from '@mui/material/Button';
import GenericTable from "../../components/GenericTable";
import ProductDescription from "./components/ProductDescription";
import Quantity from "./components/Quantity";
import UnitPrice from "./components/UnitPrice";
import GameBatch from "./components/GameBatch";
import Period from "./components/Period";
import Grid from '@mui/material/Grid2';
import InfoPrice from "./components/InfoPrice";
import Divider from '@mui/material/Divider';
import MarketType from "./components/MarketType";


export default function MarketFactorInfoInput() {
    const initMarketFactorInfoInputPayload = {
        gameBatch: '',
        gameId: 'OpsMgt',
        marketInputId: '',
        productionMonth: '',
        partCategory: ''
    };

    const [marketFactorInfoInputPayload, setFormData] = useState(initMarketFactorInfoInputPayload);

    const tableHeading = ['Item Description', 'UOM', 'Quantity', 'Unit Price', 'Currency', 'Info Price'];

    const marketFactorInfoInputUpdate = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    };

    const marketFactorInputFormSubmit = (event) => {
        event.preventDefault();
        console.log(marketFactorInfoInputPayload);
        // marketFactorInfoInputUpdate();
    };

    const formControlUpdate = (value) => {
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
                    <MarketType marketType={marketFactorInfoInputPayload.marketInputId} onFormControlUpdate={formControlUpdate}/>
                    <Period onDateChange={formControlUpdate}/>
                </Grid>
                <Grid sx={{ margin: 5 }} container spacing={2} justifyContent="center" alignItems="center">
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Grid>
            </form>
            <Divider />
            <Grid margin={5} container spacing={2} justifyContent="center" alignItems="center">
                    <Button type="submit" variant="contained">
                        Add
                    </Button>
                    <Button type="submit" variant="contained">
                        Modify
                    </Button>
                    <Button type="submit" variant="contained">
                        Delete
                    </Button>
                </Grid>
            <GenericTable inputTableHeadings={tableHeading} inputTableData={[]} ifNoData={null} />
        </Box>
    );
}
