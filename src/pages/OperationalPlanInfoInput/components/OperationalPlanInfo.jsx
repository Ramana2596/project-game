import React, { useEffect, useState } from "react";
import { InputLabel, FormControl, Select, MenuItem, CircularProgress, Alert } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { getOperationalPlanInfoData } from '../services/operationalPlanInfoInputService';

export default function OperationalPlanInfoType({ operationalPlanType, onFormControlUpdate }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [operationalPlanInfoData, setGameBatchData] = useState([]);

    const operationalPlanInfoType = getOperationalPlanInfoData({ cmdLine: 'Get_Market_Input_Id', gameId: 'OpsMgt' });

    useEffect(() => {
        setLoading(false);
        if (operationalPlanInfoType?.apiResponse) {
            setGameBatchData(operationalPlanInfoType?.apiResponse);
        } else if (operationalPlanInfoType?.apiFailureErrorRes) {
            setError(operationalPlanInfoType.apiFailureErrorRes);
        }
    }, [operationalPlanInfoType])

    const handleChange = (event) => {
        const { value } = event.target;
        const selectedValueObj = operationalPlanInfoData.filter((optInfoObj) => optInfoObj.Operational_Plan_Input_Id === value);
        onFormControlUpdate({ 'operationalPlanTypeId': selectedValueObj[0]?.Operational_Plan_Input_Id, 'partCategory': selectedValueObj[0]?.Part_Category });
    };

    return (
        <Grid size={{ xs: 2, sm: 4, md: 4 }}>
            <FormControl required sx={{ flexGrow: 1, width: '100%', maxWidth: 220 }}>
                <InputLabel id="operationalPlanType">Info: Operational Plan</InputLabel>
                <Select
                    labelId="operationalPlanType"
                    id="operationalPlanTypeRequired"
                    name="operationalPlanTypeId"
                    value={operationalPlanType}
                    label="Info: Operational Plan *"
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
                        operationalPlanInfoData?.map((batch, index) => (
                            <MenuItem key={index} value={batch.Operational_Plan_Input_Id}>
                                {batch.Category_Desc}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
        </Grid>
    );
}
