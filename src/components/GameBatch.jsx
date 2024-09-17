import { TextField, Box, InputLabel, MenuItem, FormControl, Select } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';

export default function GameBatch() {

    const initialGameBatchFormData = {
        gameBatch: '',
        venue: '',
        occupancy: '',
        planFromDate: '',
        planToDate: '',
        planDuration: '',
        uom: '',
        adminstrator: '',
        coordinator: '',
        actualDuration: '',
        batchStartDate: '',
        batchStatus: ''
    };
    const [GameBatchFormData, setFormData] = useState(initialGameBatchFormData);

    const onGMstFormControlChange = (event) => {
        if(event.currentTarget) {
            setFormData({
                ...GameBatchFormData,
                [event.currentTarget.id]: event.currentTarget.value,
            });
        } else if (event.target) {
            setFormData({
                ...GameBatchFormData,
                [event.target.name]: event.target.value,
            });
        }
        
    };

    const GameBatchUpdate = () => {
        return new Promise(resolve => {
            console.log(GameBatchFormData);
            setTimeout(resolve, 1000);
        });
    }

    const onGameBatchFormSubmit = (event) => {
        event.preventDefault();
        GameBatchUpdate();
    };

    const GameBatchFormReset = () => {
        setFormData({ ...initialGameBatchFormData });
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={onGameBatchFormSubmit}>
                <Grid sx={{ margin: 5 }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        {/* <TextField id="gameBatch" label="Game Batch" variant="outlined" value={GameBatchFormData.gameBatch} onChange={onGMstFormControlChange} /> */}
                        <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                            <InputLabel id="gameBatch">Game Batch</InputLabel>
                            <Select
                                labelId="gameBatch"
                                id="gameBatchRequired"
                                name="gameBatch"
                                value={GameBatchFormData.gameBatch}
                                label="Game Batch *"
                                onChange={onGMstFormControlChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="venue" label="Venue" variant="outlined" value={GameBatchFormData.venue} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="occupancy" label="Occupancy" variant="outlined" value={GameBatchFormData.occupancy} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="planFromDate" label="Plan from Date" variant="outlined" value={GameBatchFormData.planFromDate} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="planToDate" label="Plan to Date" variant="outlined" value={GameBatchFormData.planToDate} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="planDuration" label="Plan Duration" variant="outlined" value={GameBatchFormData.planDuration} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="uom" label="UOM" variant="outlined" value={GameBatchFormData.uom} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="adminstrator" label="Adminstrator" variant="outlined" value={GameBatchFormData.adminstrator} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="coordinator" label="Coordinator" variant="outlined" value={GameBatchFormData.coordinator} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="actualDuration" label="Actual Duration" variant="outlined" value={GameBatchFormData.actualDuration} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="batchStartDate" label="Batch Start Date" variant="outlined" value={GameBatchFormData.batchStartDate} onChange={onGMstFormControlChange} />
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="batchStatus" label="Batch Status" variant="outlined" value={GameBatchFormData.batchStatus} onChange={onGMstFormControlChange} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Button color="white" type="reset" variant="contained" onClick={GameBatchFormReset}>
                        Reset
                    </Button>
                    <Button type="submit" variant="contained">
                        Submit
                    </Button>
                </Grid>
            </form>
        </Box>
    );
}