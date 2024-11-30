import React, { useEffect, useState } from "react";
import { InputLabel, FormControl, Select, MenuItem, CircularProgress, Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { getBatchFromMarketInfo } from '../services/getMArketInfoInput';

export default function GameBatch({ gameBatch, onGameBatchUpdate }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameBatchData, setGameBatchData] = useState([]);

    const gameBatchResponse = getBatchFromMarketInfo('getBatch', 'OpsMgt');

    useEffect(() => {
        setLoading(false);
        if (gameBatchResponse?.apiResponse) {
            setGameBatchData(gameBatchResponse?.apiResponse);
        } else if (gameBatchResponse?.apiFailureErrorRes) {
            setError(gameBatchResponse.apiFailureErrorRes);
        }
    }, [gameBatchResponse])

    const handleChange = (event) => {
        onGameBatchUpdate(event?.target?.value);
    };

    return (
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                <InputLabel id="gameBatch">Game Batch</InputLabel>
                <Select
                    labelId="gameBatch"
                    id="gameBatchRequired"
                    name="gameBatch"
                    value={gameBatch}
                    label="Game Batch *"
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
                        gameBatchData?.map((batch, index) => (
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
