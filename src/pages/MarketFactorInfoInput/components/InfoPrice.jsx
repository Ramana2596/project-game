import React, { useEffect, useState } from "react";
import { InputLabel, FormControl, Select, MenuItem, CircularProgress, Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { getMarketFactorInfoFormData } from '../services/marketFactorInputService';
import { useUser } from "../../../core/access/userContext.js";

export default function InfoPrice({ infoPrice, onFormControlUpdate }) {
    const {userInfo} = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [infoPriceData, setInfoPriceData] = useState([]);

    const infoPriceResponse = getMarketFactorInfoFormData('getBatch', userInfo?.gameId);

    useEffect(() => {
        setLoading(false);
        if (infoPriceResponse?.apiResponse) {
            setInfoPriceData(infoPriceResponse?.apiResponse);
        } else if (infoPriceResponse?.apiFailureErrorRes) {
            setError(infoPriceResponse.apiFailureErrorRes);
        }
    }, [infoPriceResponse])

    const handleChange = (event) => {
        const { name, value } = event.target;
        onFormControlUpdate(name, value);
    };

    return (
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                <InputLabel id="infoPrice">Price Info</InputLabel>
                <Select
                    labelId="infoPrice"
                    id="infoPriceRequired"
                    name="infoPrice"
                    value={infoPrice}
                    label="Price Info *"
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
                        infoPriceData?.map((batch, index) => (
                            <MenuItem key={index} value={batch.Game_Batch}>
                                {batch.Game_Batch}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
        </Grid>
    );
}
