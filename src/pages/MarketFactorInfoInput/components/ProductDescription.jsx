import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid2';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const availableProducts = [
    'Product A',
    'Product B',
    'Product C',
    'Product D'
];

export default function ProductDescription() {
    const [productDescriptionVal, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Grid id="product-description" size={{ xs: 2, sm: 4, md: 4 }}>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="multiple-checkbox-label">Product Description</InputLabel>
                <Select
                    labelId="multiple-checkbox-label"
                    id="multiple-checkbox"
                    multiple
                    value={productDescriptionVal}
                    onChange={handleChange}
                    input={<OutlinedInput label="Product Description" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {availableProducts.map((pdValue) => (
                        <MenuItem key={pdValue} value={pdValue}>
                            <Checkbox checked={productDescriptionVal.includes(pdValue)} />
                            <ListItemText primary={pdValue} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    );
}
