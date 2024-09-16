import { TextField, Box } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import Button from '@mui/material/Button';

export default function GameMaster() {
    const initialGameMasterFormData = {
        gameTitle: '',
        gameShortTitle: '',
        gameObjective: '',
        discipline: '',
        subject: '',
        faculty: '',
        subject: '',
        durationHours: '',
        maxSeats: '',
        maxSessions: ''
    };
    const [gameMasterFormData, setFormData] = useState(initialGameMasterFormData);

    const onGMstFormControlChange = (event) => {
        setFormData({
          ...gameMasterFormData,
          [event.currentTarget.id]: event.currentTarget.value,
        });
      };

    const gameMasterUpdate = () => {
        return new Promise(resolve => {
            console.log(gameMasterFormData);
            setTimeout(resolve, 1000);
        });
    }

    const onGameMasterFormSubmit = (event) => {
        event.preventDefault();
        gameMasterUpdate();
    };

    const gameMasterFormReset = () => {
        setFormData({...initialGameMasterFormData});
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={onGameMasterFormSubmit}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="gameTitle" label="Game Title" variant="outlined" value={gameMasterFormData.gameTitle} onChange={onGMstFormControlChange}/>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="gameShortTitle" label="Game Short Title" variant="outlined" value={gameMasterFormData.gameShortTitle} onChange={onGMstFormControlChange}/>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="gameObjective" label="Game Objective" variant="outlined" value={gameMasterFormData.gameObjective} onChange={onGMstFormControlChange}/>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="discipline" label="Discipline" variant="outlined" value={gameMasterFormData.discipline} onChange={onGMstFormControlChange}/>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="subject" label="Subject" variant="outlined" value={gameMasterFormData.subject} onChange={onGMstFormControlChange}/>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="faculty" label="Faculty" variant="outlined" value={gameMasterFormData.faculty} onChange={onGMstFormControlChange}/>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="durationHours" label="Duration Hours" variant="outlined" value={gameMasterFormData.durationHours} onChange={onGMstFormControlChange}/>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="maxSeats" label="Max Seats" variant="outlined" value={gameMasterFormData.maxSeats} onChange={onGMstFormControlChange}/>
                    </Grid>
                    <Grid size={{ xs: 2, sm: 4, md: 4 }}>
                        <TextField id="maxSessions" label="Max Sessions" variant="outlined" value={gameMasterFormData.maxSessions} onChange={onGMstFormControlChange}/>
                    </Grid>
                </Grid>
                <Button type="reset" variant="contained" onClick={gameMasterFormReset}>
                    Reset
                </Button>
                <Button type="submit" variant="contained">
                    Submit
                </Button>
            </form>
        </Box>
    );
}