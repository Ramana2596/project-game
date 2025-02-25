import { Button, Grid2 } from "@mui/material";
import { pageConstants } from "../constants/pageConstants";

export default function GameTeamPlay() {
    const onPlayButtonClick = () => {
        console.log("Flag Button Clicked");
    }

    const onRollBackButtonClick = () => {
        console.log("Flag Button Clicked");
    }

    return (
        <div>
            <Grid2 container spacing={{ xs: 2, md: 3 }} size={{ xs: 0, sm: 2, md: 2 }} justifyContent="center" alignItems="center">
                <Button onClick={onPlayButtonClick} variant="contained">
                    {pageConstants?.gameTeamPlayButtonLabel}
                </Button>
                <Button onClick={onRollBackButtonClick} variant="outlined">
                    {pageConstants?.gameTeamPlayRollBack}
                </Button>
            </Grid2>
        </div>
    );
}