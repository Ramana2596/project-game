import { TextField, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import GenericTable from "../../components/GenericTable";
import ProductDescription from "./components/ProductDescription";
import Quantity from "./components/Quantity";
import UnitPrice from "./components/UnitPrice";

export default function MarketFactorInfoInput() {
    const initMarketFactorInfoInputPayload = {};

    const [marketFactorInfoInputPayload, setFormData] = useState(initMarketFactorInfoInputPayload);

    const tableHeading = ['Item Description', 'UOM', 'Quantity', 'Unit Price', 'Currency', 'Info Price'];

    // if (gameBatchIsLoading) return (<div>...Loading</div>);
    // if (gameBatchFailureRes) return (<div>{gameBatchFailureRes}</div>);

    const onMarketFactorInputFormUpdate = (event) => {
        if (event.currentTarget) {
            setFormData({
                ...marketFactorInfoInputPayload,
                [event.currentTarget.id]: event.currentTarget.value,
            });
        } else if (event.target) {
            setFormData({
                ...marketFactorInfoInputPayload,
                [event.target.name]: event.target.value,
            });
        }
    };

    const marketFactorInfoInputUpdate = () => {
        return new Promise(resolve => {
            setTimeout(resolve, 1000);
        });
    }

    const marketFactorInputFormSubmit = (event) => {
        event.preventDefault();
        marketFactorInfoInputUpdate();
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={marketFactorInputFormSubmit}>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <h1>Market Factor Info Input</h1>
                </Grid>
                <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="gameBatch">Game Batch</InputLabel>
                            <Select
                                labelId="gameBatch"
                                id="gameBatchRequired"
                                name="gameBatch"
                                value={marketFactorInfoInputPayload.gameBatch}
                                label="Game Batch *"
                                onChange={onMarketFactorInputFormUpdate}>
                                {/* {
                                    gameBatchData?.map((mapObj) =>
                                        <MenuItem value={mapObj.Game_Batch}>{mapObj.Game_Batch}</MenuItem>
                                    )
                                } */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker defaultValue={dayjs('2022-04-17')} name="period" label="Period" />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <ProductDescription></ProductDescription>
                    <Quantity></Quantity>
                    <UnitPrice></UnitPrice>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Grid>
            </form>
            <GenericTable inputTableHeadings={tableHeading} inputTableData={[]} ifNoData={null}></GenericTable>
        </Box>
    );
}