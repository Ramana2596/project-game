import React, { useEffect, useState } from "react";
import { InputLabel, FormControl, Select, MenuItem, CircularProgress, Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { getOperationalPlanInfoData } from '../services/operationalPlanInfoInputService';

export default function MarketType({ marketType, onFormControlUpdate }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [marketTypeData, setGameBatchData] = useState([]);

    const marketTypeResponse = getOperationalPlanInfoData({ cmdLine: 'Get_Market_Input_Id', gameId: 'OpsMgt' });

    useEffect(() => {
        setLoading(false);
        if (marketTypeResponse?.apiResponse) {
            setGameBatchData(marketTypeResponse?.apiResponse);
        } else if (marketTypeResponse?.apiFailureErrorRes) {
            setError(marketTypeResponse.apiFailureErrorRes);
        }
    }, [marketTypeResponse])

    const handleChange = (event) => {
        const { value } = event.target;
        const selectedValueObj = marketTypeData.filter((mktTypeObj) => mktTypeObj.Market_Input_Id === value);
        onFormControlUpdate({ 'marketInputId': selectedValueObj[0]?.Market_Input_Id, 'partCategory': selectedValueObj[0]?.Part_Category });
    };

    return (
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                <InputLabel id="marketType">Market Input</InputLabel>
                <Select
                    labelId="marketType"
                    id="marketTypeRequired"
                    name="marketInputId"
                    value={marketType}
                    label="Market Type *"
                    onChange={handleChange}
                    disabled={loading}
                >
                    {loading ? (
                        <MenuItem disabled>
                            <CircularProgress size={24} />
                        </MenuItem>
                    ) : error ? (
                        <MenuItem disabled>
                            <Alert severity="error">{error}</Alert>
                        </MenuItem>
                    ) : (
                        marketTypeData?.map((batch, index) => (
                            <MenuItem key={index} value={batch.Market_Input_Id}>
                                {batch.Category_Desc}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
        </Grid>
    );
}
