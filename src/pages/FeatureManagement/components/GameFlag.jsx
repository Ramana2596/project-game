import { Button, Grid2 } from "@mui/material";
import { pageConstants } from "../constants/pageConstants";

export default function GameFlag() {
    const onFlagButtonClick = () => {
        console.log("Flag Button Clicked");
    }

    return (
        <div>
            <Grid2 container size={{ xs: 0, sm: 2, md: 2 }} justifyContent="center" alignItems="center">
                <Button onClick={onFlagButtonClick} variant="contained">
                    {pageConstants?.gameFlagButtonLabel}
                </Button>
            </Grid2>
        </div>
    );
}