import { TextField } from "@mui/material"
import Grid from '@mui/material/Grid2';
import { useState } from "react";

export default function Quantity() {
    return (
        <Grid id="quantity" size={{ xs: 2, sm: 4, md: 4 }}>
            <TextField required type="number" id="quantityTextField" label="Quantity" variant="outlined" />
        </Grid>)
}