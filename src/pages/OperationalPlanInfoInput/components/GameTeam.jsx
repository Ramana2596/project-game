import React, { useEffect, useState } from "react";
import { InputLabel, FormControl, Select, MenuItem, CircularProgress, Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { getOperationalPlanInfoData } from '../services/operationalPlanInfoInputService';

export default function GameTeam({ gameTeam, onFormControlUpdate }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameTeamData, setGameBatchData] = useState([]);

    const gameTeamResponse = getOperationalPlanInfoData({ cmdLine: 'Get_Batch', gameId: 'OpsMgt', gameTeam: 1 });

    useEffect(() => {
        setLoading(false);
        if (gameTeamResponse?.apiResponse) {
            setGameBatchData(gameTeamResponse?.apiResponse);
        } else if (gameTeamResponse?.apiFailureErrorRes) {
            setError(gameTeamResponse.apiFailureErrorRes);
        }
    }, [gameTeamResponse])

    const handleChange = (event) => {
        const { value } = event.target;
        onFormControlUpdate({ 'gameTeam': value });
    };

    return (
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                <InputLabel id="gameTeam">Game Team</InputLabel>
                <Select
                    labelId="gameTeam"
                    id="gameTeamRequired"
                    name="gameTeam"
                    value={gameTeam}
                    label="Game Team *"
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
                        gameTeamData?.map((batch, index) => (
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
